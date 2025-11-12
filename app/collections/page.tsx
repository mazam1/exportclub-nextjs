"use client";
import CollectionProductCard from "@/components/CollectionProductCard";
import { filterProducts } from "@/lib/products";

// Collections: show men's products in a fixed 4x4 grid

export default function CollectionsPage() {
  const menItems = filterProducts({ category: "men" });
  const gridItems = Array.from({ length: 16 }, (_, i) => menItems[i % menItems.length]);

  return (
    <div className="collections-section px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-semibold">Collections</h1>
      <div className="mt-8 grid grid-cols-4 gap-6">
        {gridItems.map((p, idx) => (
          <CollectionProductCard key={`${p.id}-${idx}`} product={p} />
        ))}
      </div>
    </div>
  );
}