import { filterProducts } from "@/lib/products";
import type { Category, Size } from "@/lib/products";
import { Suspense, use } from "react";
import CollectionProductCard from "@/components/CollectionProductCard";
import FilterBar from "@/components/FilterBar";

function FilterBarSkeleton() {
  return (
    <section aria-label="Loading filters" className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="h-4 w-20 bg-primary/10 rounded" aria-hidden></div>
        <div className="h-10 w-40 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-16 bg-primary/10 rounded" aria-hidden></div>
        <div className="h-10 w-32 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-16 bg-primary/10 rounded" aria-hidden></div>
        <div className="h-10 w-56 rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>
      </div>
    </section>
  );
}

export const metadata = {
  title: "Shop Products",
  description: "Browse ExportClub clothing by category, size, and style.",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; size?: string; q?: string }>;
}) {
  const sp = use(searchParams ?? Promise.resolve({} as { category?: string; size?: string; q?: string }));
  const category = (sp?.category as Category) || undefined;
  const size = (sp?.size as Size) || undefined;
  const q = sp?.q || undefined;
  const items = filterProducts({ category, size, q });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold">Accessories</h1>
      <div className="mt-6">
        <Suspense fallback={<FilterBarSkeleton />}>
          <FilterBar />
        </Suspense>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" aria-label="Product grid">
        {items.map((p) => (
          <CollectionProductCard key={p.id} product={p} />
        ))}
      </div>
      {items.length === 0 && (
        <p className="mt-8 text-sm text-tertiary">No products found.</p>
      )}
    </div>
  );
}