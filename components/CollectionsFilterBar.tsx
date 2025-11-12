"use client";
import { useRouter, useSearchParams } from "next/navigation";

type SortOption = "price-asc" | "price-desc" | "newest";

const subcategories = [
  { label: "All", value: "" },
  { label: "Shirts", value: "shirts" },
  { label: "Pants", value: "pants" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Denim", value: "denim" },
  { label: "Accessories", value: "accessories" },
];

export default function CollectionsFilterBar() {
  const router = useRouter();
  const params = useSearchParams();

  const subcat = params.get("subcat") || "";
  const sort = (params.get("sort") as SortOption) || "price-asc";
  const q = params.get("q") || "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/collections?${next.toString()}`);
  };

  return (
    <section role="toolbar" aria-label="Collections filters and sort" className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="subcat" className="text-sm">Category</label>
        <select
          id="subcat"
          aria-label="Filter by category"
          value={subcat}
          onChange={(e) => update("subcat", e.target.value)}
          className="h-10 rounded-md border border-line bg-white px-3 text-sm"
        >
          {subcategories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm">Sort</label>
        <select
          id="sort"
          aria-label="Sort products"
          value={sort}
          onChange={(e) => update("sort", e.target.value)}
          className="h-10 rounded-md border border-line bg-white px-3 text-sm"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="search" className="text-sm">Search</label>
        <input
          id="search"
          type="search"
          placeholder="Search products"
          aria-label="Search products"
          defaultValue={q}
          onKeyDown={(e) => {
            if (e.key === "Enter") update("q", (e.target as HTMLInputElement).value);
          }}
          className="h-10 w-56 rounded-md border border-line bg-white px-3 text-sm"
        />
      </div>
    </section>
  );
}