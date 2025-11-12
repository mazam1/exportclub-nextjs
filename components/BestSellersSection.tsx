import Link from "next/link";
import { Suspense } from "react";
import { getAllProducts, type Product } from "@/lib/products";
import BestSellerCard from "@/components/BestSellerCard";
import ViewAllButton from "@/components/ViewAllButton";

export default function BestSellersSection({ title = "Best Sellers" }: { title?: string }) {
  const items = getAllProducts();
  const picks = [
    { slug: "linen-structured-blazer-women", badge: "BEST SELLER" as const },
    { slug: "classic-cotton-trench-men", badge: "SALE" as const, discount: 0.85 },
    { slug: "selvedge-straight-denim-men", badge: "BEST SELLER" as const },
    { slug: "silk-slip-dress-women", badge: "SALE" as const, discount: 0.8 },
  ];
  const nameOverrides: Record<string, string> = {
    "linen-structured-blazer-women": "Tailored Wool Suit Jacket",
    "classic-cotton-trench-men": "Heritage Cotton Overcoat",
    "selvedge-straight-denim-men": "Raw Selvedge Denim Jeans",
    "silk-slip-dress-women": "Silk-Blend Lounge Shirt",
  };
  // Use local images that mirror the first four boxes shown in the Categories section
  const imageOverrides: Record<string, { url: string; alt: string }> = {
    "linen-structured-blazer-women": { url: "/shirt1.png", alt: "Best seller image from Shirts category" },
    "classic-cotton-trench-men": { url: "/trousers.png", alt: "Best seller image from Pants category" },
    "selvedge-straight-denim-men": { url: "/winter.png", alt: "Best seller image from Jackets category" },
    "silk-slip-dress-women": { url: "/formal.png", alt: "Best seller image from Suits category" },
  };
  type FeaturedItem = { product: Product; badge: "BEST SELLER" | "SALE"; discountedPrice?: number };

  const featured: FeaturedItem[] = picks
    .map((p) => {
      const product = items.find((i) => i.slug === p.slug);
      if (!product) return null;
      const overriddenName = nameOverrides[p.slug];
      const productWithOverride = overriddenName ? { ...product, name: overriddenName } : product;
      const overriddenImage = imageOverrides[p.slug];
      const finalProduct = overriddenImage
        ? { ...productWithOverride, images: [{ url: overriddenImage.url, alt: overriddenImage.alt }] }
        : productWithOverride;
      const discountedPrice = p.discount ? Math.round(product.price * p.discount) : undefined;
      return { product: finalProduct, badge: p.badge, discountedPrice } as FeaturedItem;
    })
    .filter((v): v is FeaturedItem => Boolean(v));

  return (
    <section className="best-sellers-section px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="best-sellers-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <h2 id="best-sellers-title" className="text-xs font-medium tracking-wide uppercase">{title}</h2>
          <Suspense
            fallback={
              <span
                className="inline-flex h-8 w-[96px] items-center justify-center rounded-full btn-secondary px-4 text-center text-[12px] font-medium whitespace-nowrap"
                aria-hidden="true"
              >
                Loading
              </span>
            }
          >
            <ViewAllButton
              href={title.toLowerCase().includes("featured") ? "/featured" : "/best-sellers"}
              ariaLabel={`View all ${title.toLowerCase()}`}
              analyticsName={title.toLowerCase().includes("featured") ? "featured" : "best_sellers"}
            />
          </Suspense>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(({ product, badge, discountedPrice }) => (
            <BestSellerCard
              key={product.id}
              product={product}
              badge={badge}
              discountedPrice={discountedPrice}
            />
          ))}
        </div>
      </div>
    </section>
  );
}