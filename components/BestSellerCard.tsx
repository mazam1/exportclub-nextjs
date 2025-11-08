"use client";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
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

  const handleAdd = () => {
    const size = product.sizes[0];
    add(product, size, 1);
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
        <div className="mt-2">
          <button
            type="button"
            onClick={handleAdd}
            className="h-8 px-3 rounded-md border border-black text-[12px] font-medium hover:bg-black hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}