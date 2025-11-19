import { filterProducts } from "@/lib/products";
import CollectionProductCard from "@/components/CollectionProductCard";

export const metadata = {
  title: "Accessories",
  description: "Premium accessories collection.",
};

export default function AccessoriesPage() {
  const items = filterProducts({ category: "accessories" }).filter(
    (p) => p.slug !== "card-holder-accessory" && p.slug !== "key-ring-accessory"
  );
  const gridItems = items.slice(0, 24);
  return (
    <section className="mx-auto w-full max-w-[1480px] lg:w-[1480px] px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="accessories-title">
      <h1 id="accessories-title" className="product-section-heading">Accessories</h1>
      <p className="mt-2 text-sm text-black">Refined essentials to complete every look.</p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" aria-label="Accessories grid">
        {gridItems.map((p) => (
          <CollectionProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}