import { filterProducts } from "@/lib/products";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";

function FilterBarSkeleton() {
  return (
    <section aria-label="Loading filters" className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <div className="h-4 w-20 bg-black/10 rounded" aria-hidden></div>
        <div className="h-10 w-40 rounded-md border border-line bg-black/5 animate-pulse" aria-hidden></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-16 bg-black/10 rounded" aria-hidden></div>
        <div className="h-10 w-32 rounded-md border border-line bg-black/5 animate-pulse" aria-hidden></div>
      </div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-16 bg-black/10 rounded" aria-hidden></div>
        <div className="h-10 w-56 rounded-md border border-line bg-black/5 animate-pulse" aria-hidden></div>
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
  searchParams?: { category?: string; size?: string; q?: string };
}) {
  const category = (searchParams?.category as any) || undefined;
  const size = (searchParams?.size as any) || undefined;
  const q = searchParams?.q || undefined;
  const items = filterProducts({ category, size, q });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold">Shop</h1>
      <div className="mt-6">
        <Suspense fallback={<FilterBarSkeleton />}>
          <FilterBar />
        </Suspense>
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {items.length === 0 && (
        <p className="mt-8 text-sm text-black">No products found.</p>
      )}
    </div>
  );
}