"use client";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { useEffect, useMemo, useRef, useState } from "react";
import SizeSelector from "@/components/SizeSelector";
import type { Product, Size } from "@/lib/products";

export default function QuickViewModal({ product, open, onClose }: { product: Product; open: boolean; onClose: () => void }) {
  const { add } = useCart();
  const hero = product.images[0];
  const [size, setSize] = useState<Size | undefined>(product.sizes[0]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleId = useMemo(() => `qv-title-${product.id}`, [product.id]);
  const descId = useMemo(() => `qv-desc-${product.id}`, [product.id]);

  useEffect(() => {
    if (!open) return;
    const el = containerRef.current;
    if (!el) return;
    const selectors = [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(selectors));
    const first = nodes[0] || el;
    const last = nodes[nodes.length - 1] || el;
    first.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        if (nodes.length === 0) return;
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const onAdd = () => {
    if (!size) return;
    add(product, size, 1);
    onClose();
  };

  const brief = useMemo(() => {
    const d = product.description || "";
    if (d.length <= 160) return d;
    return d.slice(0, 157) + "...";
  }, [product.description]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
      id={`quickview-${product.id}`}
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div ref={containerRef} className="w-full max-w-lg rounded-md bg-white p-6 shadow-lg scale-in" tabIndex={-1}>
        <div className="flex items-start gap-4">
          <div className="w-40 shrink-0 overflow-hidden rounded-md border border-line">
            <Image src={hero.url} alt={hero.alt} width={320} height={400} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 id={titleId} className="text-base font-semibold">{product.name}</h3>
            <p className="mt-1 text-sm">{product.currency} {product.price}</p>
            <p id={descId} className="mt-2 text-sm text-black/70">{brief}</p>
            <div className="mt-4">
              <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <button type="button" className="h-10 px-4 rounded-md btn-primary text-sm font-medium" onClick={onAdd} aria-label={`Add ${product.name} to cart from quick view`}>
                Add to Cart
              </button>
              <Link href={`/products/${product.slug}`} className="h-10 px-4 rounded-md btn-secondary text-sm font-medium inline-flex items-center justify-center text-center" aria-label={`Go to ${product.name} page`} onClick={onClose}>
                View Details
              </Link>
            </div>
          </div>
        </div>
        <button type="button" className="mt-6 text-sm text-primary hover:underline" onClick={onClose} aria-label="Close quick view">
          Close
        </button>
      </div>
    </div>
  );
}