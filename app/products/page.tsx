import { Suspense } from "react";
import { filterProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";

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
        <Suspense fallback={<div className="h-10 bg-gray-200 rounded-md animate-pulse" />}>
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