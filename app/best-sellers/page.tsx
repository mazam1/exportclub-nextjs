import BestSellerCard from "@/components/BestSellerCard";
import { getAllProducts, type Product } from "@/lib/products";
import { applyBestSellerImageOverride } from "@/lib/imageRegistry";

export const metadata = {
  title: "Best Sellers",
  description: "Top-selling items with curated picks.",
};

type SortOption = "price-asc" | "price-desc" | "newest";
type FeaturedItem = { product: Product; badge: "BEST SELLER" | "SALE"; discountedPrice?: number };

export default function BestSellersPage({
  searchParams,
}: {
  searchParams?: { sort?: SortOption };
}) {
  const items = getAllProducts();
  const picks = [
    { slug: "linen-structured-blazer-women", badge: "BEST SELLER" as const },
    { slug: "selvedge-straight-denim-men", badge: "BEST SELLER" as const },
    { slug: "premium-supima-tee-unisex", badge: "BEST SELLER" as const },
    { slug: "cashmere-scarf-accessory", badge: "BEST SELLER" as const },
  ];

  let featured: FeaturedItem[] = picks
    .map((p) => {
      const product = items.find((i) => i.slug === p.slug);
      if (!product) return null;
      const finalProduct = applyBestSellerImageOverride(product);
      return { product: finalProduct, badge: p.badge } as FeaturedItem;
    })
    .filter((v): v is FeaturedItem => Boolean(v));

  const sort: SortOption = (searchParams?.sort as SortOption) || "newest";
  featured = featured.slice().sort((a, b) => {
    if (sort === "price-asc") return a.product.price - b.product.price;
    if (sort === "price-desc") return b.product.price - a.product.price;
    return b.product.id.localeCompare(a.product.id);
  });

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="best-sellers-title">
      <h1 id="best-sellers-title" className="product-section-heading">Best Sellers</h1>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.map(({ product, badge, discountedPrice }) => (
          <BestSellerCard key={product.id} product={product} badge={badge} discountedPrice={discountedPrice} />
        ))}
      </div>
    </section>
  );
}