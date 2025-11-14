"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product, Size } from "@/lib/products";
import { useCart } from "@/lib/cart";
import Stars from "@/components/Stars";
import { getAverageRating } from "@/lib/reviews";
import QuickViewModal from "@/components/QuickViewModal";

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
        <div className="aspect-[4/5] overflow-hidden rounded-md border border-line shadow-sm transition-shadow duration-300 group-hover:shadow-md">
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
          <span className="text-[14px] font-bold" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content={product.currency} />
            <span itemProp="price">{product.currency} {product.price}</span>
          </span>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <p className="text-xs text-black">{product.category} • Color: {product.color}</p>
          <div className="flex items-center gap-1">
            <Stars rating={avgRating} />
            <span className="text-[11px] text-black/70">{avgRating.toFixed(1)}</span>
          </div>
        </div>
      </Link>

      <div className="mt-2 flex items-center gap-2" aria-label="Card actions">
        <button type="button" className="h-9 px-3 rounded-md btn-primary text-xs font-medium transition-colors" aria-label={`Add ${product.name} to cart`} onClick={() => onAdd()}>
          Add to Cart
        </button>
        <button type="button" className="h-9 px-3 rounded-md btn-secondary text-xs font-medium" aria-haspopup="dialog" aria-controls={`quickview-${product.id}`} aria-expanded={open} onClick={() => setOpen(true)}>
          Quick View
        </button>
      </div>
      <QuickViewModal product={product} open={open} onClose={() => setOpen(false)} />
    </article>
  );
}