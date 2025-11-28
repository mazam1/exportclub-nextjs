import Image from "next/image";
import { Suspense } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryFilterBar from "@/components/CategoryFilterBar";
import CollectionProductCard from "@/components/CollectionProductCard";
import { products, Size } from "@/lib/products";

type Search = {
  size?: string;
  color?: string;
  min?: string;
  max?: string;
  sort?: "price-asc" | "price-desc" | "newest";
  page?: string;
  pageSize?: string;
};

function matchesAny(value: string, needles: string[]) {
  const v = value.toLowerCase();
  return needles.some((n) => v.includes(n.toLowerCase()));
}

function filterByCategorySynonyms(slug: string, synonyms: string[]) {
  const out = products.filter((p) => {
    if (slug === "accessories") return p.category === "accessories";
    const nameHit = matchesAny(p.name, synonyms);
    const descHit = matchesAny(p.description, synonyms);
    const tagHit = p.tags.some((t) => synonyms.map((s) => s.toLowerCase()).includes(t.toLowerCase()));
    return nameHit || descHit || tagHit;
  });
  return out;
}

function uniqueColors(items: ReturnType<typeof filterByCategorySynonyms>) {
  const set = new Set<string>();
  items.forEach((p) => set.add(p.color));
  return Array.from(set);
}

export default async function CategoryPage({
  title,
  slug,
  banner,
  synonyms,
  searchParams,
}: {
  title: string;
  slug: string;
  banner: { src: string; alt: string };
  synonyms: string[];
  searchParams?: Search | Promise<Search>;
}) {
  const awaitedSearchParams = searchParams ? await searchParams : {};
  const size = awaitedSearchParams?.size || undefined;
  const color = awaitedSearchParams?.color || undefined;
  const priceMin = awaitedSearchParams?.min ? Number(awaitedSearchParams.min) : undefined;
  const priceMax = awaitedSearchParams?.max ? Number(awaitedSearchParams.max) : undefined;
  const sort = awaitedSearchParams?.sort || "newest";
  const pageSize = awaitedSearchParams?.pageSize ? Number(awaitedSearchParams.pageSize) : 12;
  const page = awaitedSearchParams?.page ? Math.max(1, Number(awaitedSearchParams.page)) : 1;

  const baseItems = filterByCategorySynonyms(slug, synonyms);

  let items = baseItems.filter((p) => {
    const bySize = size ? p.sizes.includes(size as Size) : true;
    const byColor = color ? p.color.toLowerCase() === (color as string).toLowerCase() : true;
    const byPriceMin = typeof priceMin === "number" ? p.price >= priceMin : true;
    const byPriceMax = typeof priceMax === "number" ? p.price <= priceMax : true;
    return bySize && byColor && byPriceMin && byPriceMax;
  });

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

  const colors = uniqueColors(baseItems);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <div className="mt-6">
        <div className="aspect-[4/1] overflow-hidden rounded-md border border-line">
          <Image src={banner.src} alt={banner.alt} width={1600} height={400} className="h-full w-full object-cover" />
        </div>
      </div>
      <h1 className="mt-6 text-2xl font-semibold">{title}</h1>
      <div className="mt-6">
        <Suspense fallback={<div className="h-10 w-full rounded-md border border-line bg-[rgba(196,154,54,0.08)] animate-pulse" aria-hidden></div>}>
          <CategoryFilterBar basePath={`/${slug}`} colors={colors} />
        </Suspense>
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
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
              href={`?${new URLSearchParams({ ...awaitedSearchParams, page: String(current - 1) }).toString()}`}
              className="h-10 px-4 rounded-md btn-secondary text-sm font-medium"
            >
              Previous
            </a>
          )}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`?${new URLSearchParams({ ...awaitedSearchParams, page: String(p) }).toString()}`}
              aria-current={p === current ? "page" : undefined}
              className={`h-10 min-w-[40px] grid place-items-center rounded-md border text-sm font-medium ${p === current ? "border-primary bg-primary text-text-on-primary" : "border-line hover:bg-[rgba(196,154,54,0.08)]"}`}
            >
              {p}
            </a>
          ))}
          {current < totalPages && (
            <a
              href={`?${new URLSearchParams({ ...awaitedSearchParams, page: String(current + 1) }).toString()}`}
              className="h-10 px-4 rounded-md btn-secondary text-sm font-medium"
            >
              Next
            </a>
          )}
        </nav>
      )}
    </div>
  );
}