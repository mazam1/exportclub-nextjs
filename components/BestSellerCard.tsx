"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product, Size } from "@/lib/products";
import SizeSelector from "@/components/SizeSelector";
import { useCart } from "@/lib/cart";

export default function BestSellerCard({
  product,
  badge,
  discountedPrice,
}: {
  product: Product;
  badge?: "BEST SELLER" | "SALE";
  discountedPrice?: number;
}) {
  const { add } = useCart();
  const hero = product.images[0];
  const isSale = typeof discountedPrice === "number" && discountedPrice < product.price;
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState<Size | undefined>(product.sizes[0]);

  const handleAdd = () => {
    add(product, size ?? product.sizes[0], 1);
  };

  return (
    <article className="group">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-gradient-to-b from-[#efefef] to-[#f8f8f8]">
          {badge && (
            <span className="absolute left-2 top-2 text-[10px] leading-none px-2 py-1 rounded-full border border-[#d9d9d9] bg-white/80 text-black">
              {badge}
            </span>
          )}
          <Image
            src={hero.url}
            alt={hero.alt}
            width={1000}
            height={750}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={false}
          />
        </div>
      </Link>
      <div className="mt-2">
        <h3 className="text-[12px] font-medium uppercase tracking-wide text-black">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-[12px]">
          {isSale ? (
            <>
              <span className="font-medium">{product.currency} {discountedPrice}</span>
              <span className="text-black/60 line-through">{product.currency} {product.price}</span>
            </>
          ) : (
            <span className="font-medium">{product.currency} {product.price}</span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className="h-8 px-3 rounded-md btn-primary text-[12px] font-medium"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="h-8 px-3 rounded-md btn-secondary text-[12px] font-medium"
            aria-haspopup="dialog"
            aria-controls={`quickview-${product.id}`}
            onClick={() => setOpen(true)}
          >
            Quick View
          </button>
        </div>
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
                  className="h-full w-full object-contain"
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
                    className="h-10 px-4 rounded-md btn-primary text-sm font-medium"
                    onClick={handleAdd}
                    aria-label={`Add ${product.name} to cart from quick view`}
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/products/${product.slug}`}
                    className="h-10 px-4 rounded-md btn-secondary text-sm font-medium"
                    aria-label={`Go to ${product.name} page`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="mt-6 text-sm text-primary hover:underline"
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