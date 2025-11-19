"use client";
import CategoryImage from "@/components/CategoryImage";
import Link from "next/link";
import { useState } from "react";
import type { Product, Size } from "@/lib/products";
import { useCart } from "@/lib/cart";
import QuickViewModal from "@/components/QuickViewModal";

export default function BestSellerCard({
  product,
  badge,
  discountedPrice,
  square,
}: {
  product: Product;
  badge?: "BEST SELLER" | "SALE";
  discountedPrice?: number;
  square?: boolean;
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
    <article className="group h-full">
      <Link href={`/products/${product.slug}`} className="block">
        <div className={`relative ${square ? "aspect-square" : "aspect-[4/3]"} overflow-hidden rounded-md border border-line bg-background shadow-sm transition-shadow duration-300 group-hover:shadow-md`}>
          {badge && (
            <span className="absolute left-2 top-2 text-[10px] leading-none px-2 py-1 rounded-full border border-[#d9d9d9] bg-white/80 text-black">
              {badge}
            </span>
          )}
          <CategoryImage
            src={hero.url}
            alt={hero.alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            quality={75}
            priority={false}
            fill
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
          <button type="button" className="h-8 px-3 rounded-md btn-secondary text-[12px] font-medium" aria-haspopup="dialog" aria-controls={`quickview-${product.id}`} aria-expanded={open} onClick={() => setOpen(true)}>
            Quick View
          </button>
        </div>
      </div>
      <QuickViewModal product={product} open={open} onClose={() => setOpen(false)} />
    </article>
  );
}