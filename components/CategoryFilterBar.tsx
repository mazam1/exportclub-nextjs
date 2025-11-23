"use client";
import { useRouter, useSearchParams } from "next/navigation";

type SortOption = "price-asc" | "price-desc" | "newest";

export default function CategoryFilterBar({ basePath, colors }: { basePath: string; colors: string[] }) {
  const router = useRouter();
  const params = useSearchParams();

  const size = params.get("size") || "";
  const color = params.get("color") || "";
  const priceMin = params.get("min") || "";
  const priceMax = params.get("max") || "";
  const sort: SortOption = (params.get("sort") as SortOption) || "newest";
  const pageSize = params.get("pageSize") || "12";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`${basePath}?${next.toString()}`);
  };

  return (
    <section role="toolbar" aria-label="Category filters and sorting" className="flex flex-wrap items-center gap-4 md:flex-col md:items-stretch md:gap-6">
      <div className="flex items-center gap-2">
        <label htmlFor="size" className="text-sm">Size</label>
        <select
          id="size"
          aria-label="Filter by size"
          value={size}
          onChange={(e) => update("size", e.target.value)}
          className="h-10 min-w-[112px] rounded-md border border-line bg-background px-3 text-sm"
        >
          <option value="">All</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="color" className="text-sm">Color</label>
        <select
          id="color"
          aria-label="Filter by color"
          value={color}
          onChange={(e) => update("color", e.target.value)}
          className="h-10 min-w-[112px] rounded-md border border-line bg-background px-3 text-sm"
        >
          <option value="">All</option>
          {colors.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="min" className="text-sm">Price</label>
        <input
          id="min"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Min"
          defaultValue={priceMin}
          onBlur={(e) => update("min", (e.target as HTMLInputElement).value)}
          className="h-10 w-20 rounded-md border border-line bg-background px-3 text-sm"
        />
        <span aria-hidden>–</span>
        <input
          id="max"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="Max"
          defaultValue={priceMax}
          onBlur={(e) => update("max", (e.target as HTMLInputElement).value)}
          className="h-10 w-20 rounded-md border border-line bg-background px-3 text-sm"
        />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm">Sort</label>
        <select
          id="sort"
          aria-label="Sort products"
          value={sort}
          onChange={(e) => update("sort", e.target.value)}
          className="h-10 rounded-md border border-line bg-background px-3 text-sm"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="pageSize" className="text-sm">Per page</label>
        <select
          id="pageSize"
          aria-label="Products per page"
          value={pageSize}
          onChange={(e) => update("pageSize", e.target.value)}
          className="h-10 rounded-md border border-line bg-background px-3 text-sm"
        >
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </div>
    </section>
  );
}