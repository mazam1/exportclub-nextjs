import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import BestSellerCard from "@/components/BestSellerCard";

export default function BestSellersSection() {
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
  const featured = picks
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
      return { product: finalProduct, badge: p.badge, discountedPrice };
    })
    .filter(Boolean) as { product: any; badge: any; discountedPrice?: number }[];

  return (
    <section className="best-sellers-section px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-medium tracking-wide uppercase">Best Sellers</h2>
        <Link
          href="/products"
          className="h-8 px-4 rounded-full border border-[#d9d9d9] text-[12px] font-medium text-black hover:bg-black/5"
        >
          View All
        </Link>
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
    </section>
  );
}