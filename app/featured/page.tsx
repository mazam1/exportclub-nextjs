import BestSellerCard from "@/components/BestSellerCard";
import { getAllProducts, type Product } from "@/lib/products";
import { applyBestSellerImageOverride } from "@/lib/imageRegistry";

export const metadata = {
  title: "Featured Products",
  description: "Curated featured items across categories.",
};

type SortOption = "price-asc" | "price-desc" | "newest";

type FeaturedItem = { product: Product; badge: "BEST SELLER" | "SALE"; discountedPrice?: number };

export default function FeaturedPage({
  searchParams,
}: {
  searchParams?: { sort?: SortOption };
}) {
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

  let featured: FeaturedItem[] = picks
    .map((p) => {
      const product = items.find((i) => i.slug === p.slug);
      if (!product) return null;
      const overriddenName = nameOverrides[p.slug];
      const productWithOverride = overriddenName ? { ...product, name: overriddenName } : product;
      const finalProduct = applyBestSellerImageOverride(productWithOverride);
      const discountedPrice = p.discount ? Math.round(product.price * p.discount) : undefined;
      return { product: finalProduct, badge: p.badge, discountedPrice } as FeaturedItem;
    })
    .filter((v): v is FeaturedItem => Boolean(v));

  const sort: SortOption = (searchParams?.sort as SortOption) || "newest";
  featured = featured.slice().sort((a, b) => {
    if (sort === "price-asc") return a.product.price - b.product.price;
    if (sort === "price-desc") return b.product.price - a.product.price;
    return b.product.id.localeCompare(a.product.id);
  });

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="featured-title">
      <h1 id="featured-title" className="product-section-heading">Featured Products</h1>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.map(({ product, badge, discountedPrice }) => (
          <BestSellerCard key={product.id} product={product} badge={badge} discountedPrice={discountedPrice} />
        ))}
      </div>
    </section>
  );
}