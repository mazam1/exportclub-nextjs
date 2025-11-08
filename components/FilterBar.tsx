"use client";
import { useRouter, useSearchParams } from "next/navigation";

const categories = [
  { label: "All", value: "" },
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Accessories", value: "accessories" },
  { label: "Unisex", value: "unisex" },
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function FilterBar() {
  const router = useRouter();
  const params = useSearchParams();

  const category = params.get("category") || "";
  const size = params.get("size") || "";
  const q = params.get("q") || "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/products?${next.toString()}`);
  };

  return (
    <section aria-label="Filters" className="flex flex-wrap items-center gap-4">
      <label className="text-sm" htmlFor="category">Category</label>
      <select
        id="category"
        value={category}
        onChange={(e) => update("category", e.target.value)}
        className="h-10 rounded-md border border-line bg-background px-3 text-sm"
      >
        {categories.map((c) => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>

      <label className="text-sm" htmlFor="size">Size</label>
      <select
        id="size"
        value={size}
        onChange={(e) => update("size", e.target.value)}
        className="h-10 rounded-md border border-line bg-background px-3 text-sm"
      >
        <option value="">All</option>
        {sizes.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <label className="text-sm" htmlFor="search">Search</label>
      <input
        id="search"
        type="search"
        value={q}
        onChange={(e) => update("q", e.target.value)}
        placeholder="Search items"
        className="h-10 w-56 rounded-md border border-line bg-background px-3 text-sm"
        aria-label="Search products"
      />
    </section>
  );
}