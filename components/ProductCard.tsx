"use client";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const hero = product.images[0];
  return (
    <article className="group" itemScope itemType="https://schema.org/Product" aria-label={`${product.name} card`}>
      <Link href={`/products/${product.slug}`} className="block" aria-label={`View ${product.name} details`}>
        <div className="aspect-[4/5] overflow-hidden rounded-md border border-line shadow-sm transition-shadow duration-300 group-hover:shadow-md">
          <Image
            src={hero.url}
            alt={hero.alt}
            width={800}
            height={1000}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.08]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <h3 className="text-sm font-medium" itemProp="name">{product.name}</h3>
          <span className="text-sm font-medium" itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content={product.currency} />
            <span itemProp="price">{product.currency} {product.price}</span>
          </span>
        </div>
        <p className="text-xs text-tertiary">{product.category}</p>
      </Link>
    </article>
  );
}
