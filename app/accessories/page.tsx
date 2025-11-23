import { Suspense } from "react";
import { filterProducts } from "@/lib/products";
import type { Size } from "@/lib/products";
import CollectionProductCard from "@/components/CollectionProductCard";
import CategoryFilterBar from "@/components/CategoryFilterBar";

export const metadata = {
  title: "Accessories",
  description: "Premium accessories collection.",
};

type Search = {
  size?: string;
  color?: string;
  min?: string;
  max?: string;
  sort?: "price-asc" | "price-desc" | "newest";
  page?: string;
  pageSize?: string;
};

export default function AccessoriesPage({ searchParams }: { searchParams?: Search }) {
  const size = (searchParams?.size as Size) || undefined;
  const color = searchParams?.color || undefined;
  const priceMin = searchParams?.min ? Number(searchParams.min) : undefined;
  const priceMax = searchParams?.max ? Number(searchParams.max) : undefined;
  const sort = (searchParams?.sort as Search["sort"]) || "newest";
  const pageSize = searchParams?.pageSize ? Number(searchParams.pageSize) : 12;
  const page = searchParams?.page ? Math.max(1, Number(searchParams.page)) : 1;

  let items = filterProducts({ category: "accessories", size, color, priceMin, priceMax }).filter(
    (p) => p.slug !== "card-holder-accessory" && p.slug !== "key-ring-accessory"
  );
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
    <section className="mx-auto w-full max-w-[1480px] lg:w-[1480px] px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="accessories-title">
      <h1 id="accessories-title" className="product-section-heading">Accessories</h1>
      <div className="mt-6 md:mt-8 md:grid md:grid-cols-[280px_1fr] md:gap-8">
        <aside className="md:min-h-[400px]">
          <Suspense fallback={<div className="h-10 w-full rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>}>
            <CategoryFilterBar basePath="/accessories" colors={colors} />
          </Suspense>
        </aside>
        <section>
          <p className="text-sm text-black">Refined essentials to complete every look.</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" aria-label="Accessories grid">
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
    </section>
  );
}