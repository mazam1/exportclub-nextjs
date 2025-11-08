"use client";
import SizeSelector from "@/components/SizeSelector";
import type { Product, Size } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";

export default function ProductActions({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | undefined>(product.sizes[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-6">
      <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
      <div className="mt-4 flex items-center gap-3">
        <label htmlFor="qty" className="text-sm">Qty</label>
        <input
          id="qty"
          type="number"
          min={1}
          max={Math.max(product.stock, 1)}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          className="h-10 w-16 rounded-md border border-line bg-background px-3 text-sm"
        />
      </div>
      <div className="mt-6 flex gap-3">
        <button
          onClick={() => size && add(product, size, qty)}
          className="h-11 rounded-md border border-black px-6 text-sm font-medium hover:bg-muted"
          aria-label="Add to cart"
        >
          Add to cart
        </button>
        <button
          className="h-11 rounded-md border border-line px-6 text-sm hover:bg-muted"
          aria-label="Save to wishlist"
        >
          Save
        </button>
      </div>
    </div>
  );
}