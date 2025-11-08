"use client";
import Image from "next/image";
import { useState } from "react";

const seasons = ["Spring", "Summer", "Autumn", "Winter"] as const;

export default function CollectionsPage() {
  const [active, setActive] = useState<(typeof seasons)[number]>("Spring");
  const heroImg = {
    Spring: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1600&q=80&auto=format&fit=crop",
    Summer: "https://images.unsplash.com/photo-1503342452485-86ff0a3b82bb?w=1600&q=80&auto=format&fit=crop",
    Autumn: "https://images.unsplash.com/photo-1495121605193-b116b5b09d0d?w=1600&q=80&auto=format&fit=crop",
    Winter: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1600&q=80&auto=format&fit=crop",
  }[active];

  return (
    <div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-semibold">Collections</h1>
        <div className="mt-6 flex flex-wrap gap-3" role="tablist" aria-label="Seasonal collections">
          {seasons.map((s) => (
            <button
              key={s}
              role="tab"
              aria-selected={active === s}
              onClick={() => setActive(s)}
              className={`h-10 rounded-md border border-line px-4 text-sm ${active === s ? "bg-muted" : ""}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="aspect-[16/6] overflow-hidden rounded-md border border-line">
          <Image src={heroImg} alt={`${active} collection`} width={1600} height={600} className="h-full w-full object-cover" />
        </div>
        <p className="mt-4 text-sm text-black">
          Discover curated edits for the {active} season.
        </p>
      </section>
    </div>
  );
}