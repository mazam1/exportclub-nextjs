"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, remove, total } = useCart();
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold">Your Cart</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-sm">Your cart is empty. <Link href="/products" className="underline">Continue shopping</Link></p>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ul className="space-y-4 lg:col-span-2">
            {items.map((i) => (
              <li key={i.id} className="flex items-center gap-4 border border-line rounded-md p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">{i.product.name}</p>
                  <p className="text-xs text-black">Size {i.size} · Qty {i.qty}</p>
                </div>
                <div className="text-sm">{i.product.currency} {i.product.price * i.qty}</div>
                <button
                  onClick={() => remove(i.id)}
                  className="text-xs underline"
                  aria-label={`Remove ${i.product.name} size ${i.size}`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <aside className="border border-line rounded-md p-4">
            <p className="text-sm">Subtotal</p>
            <p className="mt-1 text-lg">USD {total.toFixed(2)}</p>
            <Link href="/checkout" className="mt-4 inline-block h-11 rounded-md border border-black px-6 text-sm font-medium">
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}