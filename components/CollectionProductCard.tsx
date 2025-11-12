"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product, Size } from "@/lib/products";
import SizeSelector from "@/components/SizeSelector";
import { useCart } from "@/lib/cart";
import Stars from "@/components/Stars";
import { getAverageRating } from "@/lib/reviews";

export default function CollectionProductCard({ product }: { product: Product }) {
  const hero = product.images[0];
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<Size | undefined>(product.sizes[0]);
  const { add } = useCart();

  const onAdd = () => {
    if (!size) return;
    add(product, size, 1);
    setOpen(false);
  };

  const avgRating = getAverageRating();

  return (
    <article className="group relative" itemScope itemType="https://schema.org/Product" aria-label={`${product.name} card`}>
      <Link href={`/products/${product.slug}`} className="block" aria-label={`View ${product.name} details`}>
        <div className="aspect-[4/5] overflow-hidden rounded-md border border-line">
          <Image
            src={hero.url}
            alt={hero.alt}
            width={800}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.08] cursor-zoom-in"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            priority={false}
          />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <h3 className="text-[16px] font-bold" itemProp="name">{product.name}</h3>
          <span className="text-sm font-medium" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content={product.currency} />
            <span itemProp="price">{product.currency} {product.price}</span>
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs text-black">Men • Color: {product.color}</p>
          <div className="flex items-center gap-1">
            <Stars rating={avgRating} />
            <span className="text-[11px] text-black/70">{avgRating.toFixed(1)}</span>
          </div>
        </div>
      </Link>

      <div className="mt-2 flex items-center gap-2" aria-label="Card actions">
        <button
          type="button"
          className="h-9 px-3 rounded-md bg-black text-white text-xs font-medium transition-colors hover:bg-black/85"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => onAdd()}
        >
          Add to Cart
        </button>
        <button
          type="button"
          className="h-9 px-3 rounded-md border border-line text-xs font-medium hover:bg-black/5"
          aria-haspopup="dialog"
          aria-controls={`quickview-${product.id}`}
          onClick={() => setOpen(true)}
        >
          Quick View
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          id={`quickview-${product.id}`}
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
        >
          <div className="w-full max-w-lg rounded-md bg-white p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-40 shrink-0 overflow-hidden rounded-md border border-line">
                <Image
                  src={hero.url}
                  alt={hero.alt}
                  width={320}
                  height={400}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold">{product.name}</h3>
                <p className="mt-1 text-sm">{product.currency} {product.price}</p>
                <div className="mt-4">
                  <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    className="h-10 px-4 rounded-md bg-black text-white text-sm font-medium hover:bg-black/85"
                    onClick={onAdd}
                    aria-label={`Add ${product.name} to cart from quick view`}
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/products/${product.slug}`}
                    className="h-10 px-4 rounded-md border border-line text-sm font-medium hover:bg-black/5"
                    aria-label={`Go to ${product.name} page`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 text-sm text-black hover:underline"
              onClick={() => setOpen(false)}
              aria-label="Close quick view"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </article>
  );
}