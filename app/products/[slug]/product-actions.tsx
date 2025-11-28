"use client";
import type { Product, Size } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { FormEvent, useEffect, useId, useState } from "react";

export default function ProductActions({ product }: { product: Product }) {
  const { add } = useCart();
  const [size, setSize] = useState<Size | undefined>();
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const qtyInputId = useId();
  const maxQty = Math.max(product.stock, 1);

  useEffect(() => {
    if (size && error) {
      setError(null);
    }
  }, [size, error]);

  const clampQty = (value: number) => {
    if (Number.isNaN(value)) return 1;
    return Math.min(Math.max(1, value), maxQty);
  };

  const changeQty = (next: number) => {
    setQty(clampQty(next));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!size) {
      setError("Please select a size to continue.");
      return;
    }
    setError(null);
    add(product, size, qty);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend className="text-sm font-semibold tracking-wide text-black/70">Select size</legend>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5" role="radiogroup" aria-label="Size selector">
          {product.sizes.map((option) => {
            const selected = size === option;
            return (
              <label key={option} className="relative inline-flex cursor-pointer items-center justify-center rounded-full border border-black/15 px-4 py-2 text-sm font-medium uppercase tracking-wide text-black/70 transition-colors hover:border-black focus-within:border-black focus-within:outline-none focus-within:ring-2 focus-within:ring-black/40">
                <input
                  type="radio"
                  name="product-size"
                  value={option}
                  className="sr-only"
                  checked={selected}
                  onChange={() => setSize(option)}
                  required
                />
                <span aria-hidden>{option}</span>
                {selected && <span className="absolute inset-0 rounded-full ring-2 ring-black/80" aria-hidden />}
              </label>
            );
          })}
        </div>
      </fieldset>
      <div>
        <label htmlFor={qtyInputId} className="text-sm font-semibold tracking-wide text-black/70">
          Quantity
        </label>
        <div className="mt-3 flex items-center gap-3" role="group" aria-label="Quantity selector">
          <button
            type="button"
            onClick={() => changeQty(qty - 1)}
            aria-label="Decrease quantity"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-lg font-semibold text-black transition-colors hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={qty <= 1}
          >
            −
          </button>
          <input
            id={qtyInputId}
            type="number"
            min={1}
            max={maxQty}
            value={qty}
            onChange={(event) => changeQty(Number(event.target.value))}
            className="h-11 w-20 rounded-2xl border border-black/15 bg-white text-center text-base font-semibold tracking-wide text-black focus:border-black focus:outline-none focus:ring-2 focus:ring-black/40"
            inputMode="numeric"
            aria-live="polite"
          />
          <button
            type="button"
            onClick={() => changeQty(qty + 1)}
            aria-label="Increase quantity"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black/15 text-lg font-semibold text-black transition-colors hover:border-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 disabled:cursor-not-allowed disabled:opacity-40"
            disabled={qty >= maxQty}
          >
            +
          </button>
        </div>
        <p className="mt-2 text-xs text-black/50">Available: {maxQty} pieces</p>
      </div>
      {error && (
        <p className="text-sm font-medium text-red-600" role="alert" aria-live="assertive">
          {error}
        </p>
      )}
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="flex-1 rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
          aria-label="Add to cart"
        >
          Add to cart
        </button>
        <button
          type="button"
          className="flex-1 rounded-full border border-black/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition-colors hover:border-black hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
          aria-label="Save to wishlist"
        >
          Save
        </button>
      </div>
    </form>
  );
}