import { Suspense } from "react";
import CollectionProductCard from "@/components/CollectionProductCard";
import CategoryFilterBar from "@/components/CategoryFilterBar";
import { filterProducts } from "@/lib/products";
import type { Size } from "@/lib/products";

type Search = {
  size?: string;
  color?: string;
  min?: string;
  max?: string;
  sort?: "price-asc" | "price-desc" | "newest";
  page?: string;
  pageSize?: string;
};

export default function CollectionsPage({ searchParams }: { searchParams?: Search }) {
  const size = (searchParams?.size as Size) || undefined;
  const color = searchParams?.color || undefined;
  const priceMin = searchParams?.min ? Number(searchParams.min) : undefined;
  const priceMax = searchParams?.max ? Number(searchParams.max) : undefined;
  const sort = (searchParams?.sort as Search["sort"]) || "newest";
  const pageSize = searchParams?.pageSize ? Number(searchParams.pageSize) : 12;
  const page = searchParams?.page ? Math.max(1, Number(searchParams.page)) : 1;

  let items = filterProducts({ category: "men", size, color, priceMin, priceMax });
  items = items.slice().sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    return b.id.localeCompare(a.id);
  });

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, totalPages);
  const start = (current - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = items.slice(start, end);

  const colors = Array.from(new Set(items.map((p) => p.color)));

  return (
    <div className="mx-auto w-full max-w-[1480px] lg:w-[1480px] px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold">Collections</h1>
      <div className="mt-6 md:mt-8 md:grid md:grid-cols-[280px_1fr] md:gap-8">
        <aside>
          <Suspense fallback={<div className="h-10 w-full rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>}>
            <CategoryFilterBar basePath="/collections" colors={colors} />
          </Suspense>
        </aside>
        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {pageItems.map((p, idx) => (
              <CollectionProductCard key={`${p.id}-${idx}-${start}`} product={p} />
            ))}
          </div>
          {pageItems.length === 0 && (
            <p className="mt-8 text-sm text-tertiary">No products found.</p>
          )}
          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
              {current > 1 && (
                <a
                  href={`?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams || {})), page: String(current - 1) }).toString()}`}
                  className="h-10 px-4 rounded-md btn-secondary text-sm font-medium"
                >
                  Previous
                </a>
              )}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <a
                  key={p}
                  href={`?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams || {})), page: String(p) }).toString()}`}
                  aria-current={p === current ? "page" : undefined}
                  className={`h-10 min-w-[40px] grid place-items-center rounded-md border text-sm font-medium ${p === current ? "border-primary bg-primary text-text-on-primary" : "border-line hover:bg-[rgba(196,154,54,0.08)]"}`}
                >
                  {p}
                </a>
              ))}
              {current < totalPages && (
                <a
                  href={`?${new URLSearchParams({ ...Object.fromEntries(Object.entries(searchParams || {})), page: String(current + 1) }).toString()}`}
                  className="h-10 px-4 rounded-md btn-secondary text-sm font-medium"
                >
                  Next
                </a>
              )}
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}