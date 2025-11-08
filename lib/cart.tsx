"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product, Size } from "@/lib/products";

export type CartItem = {
  id: string; // product id + size
  product: Product;
  size: Size;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (product: Product, size: Size, qty?: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ec-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("ec-cart", JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (product: Product, size: Size, qty = 1) => {
    setItems((prev) => {
      const id = `${product.id}-${size}`;
      const existing = prev.find((i) => i.id === id);
      if (existing) {
        return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      }
      return [...prev, { id, product, size, qty }];
    });
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clear = () => setItems([]);

  const total = useMemo(() => items.reduce((sum, i) => sum + i.product.price * i.qty, 0), [items]);

  const value = useMemo(() => ({ items, add, remove, clear, total }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}