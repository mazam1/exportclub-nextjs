import BestSellerCard from "@/components/BestSellerCard";
import { getAllProducts, type Product } from "@/lib/products";
import { applyBestSellerImageOverrides } from "@/lib/imageRegistry";

export const metadata = {
  title: "Essentials",
  description: "Timeless basics and everyday staples.",
};

type SortOption = "price-asc" | "price-desc" | "newest";
type EssentialItem = { product: Product };

export default function EssentialsPage({
  searchParams,
}: {
  searchParams?: { sort?: SortOption };
}) {
  const items = getAllProducts();
  const menAll = items.filter((p) => p.category === "men" || p.category === "unisex");
  const essentialTags = ["basics", "tee", "denim", "jeans", "coat", "trench"];
  let essentials: EssentialItem[] = applyBestSellerImageOverrides(
    menAll.filter((p) => p.tags.some((t) => essentialTags.includes(t)))
  ).map((p) => ({ product: p }));

  const sort: SortOption = (searchParams?.sort as SortOption) || "newest";
  essentials = essentials.slice().sort((a, b) => {
    if (sort === "price-asc") return a.product.price - b.product.price;
    if (sort === "price-desc") return b.product.price - a.product.price;
    return b.product.id.localeCompare(a.product.id);
  });

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="essentials-title">
      <h1 id="essentials-title" className="text-2xl font-semibold">Essentials</h1>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {essentials.map(({ product }) => (
          <BestSellerCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}