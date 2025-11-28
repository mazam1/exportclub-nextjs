"use client";
import Image from "next/image";

export default function MensSaleSection() {
  const tiles = [
    { key: "kids", label: "KIDS", img: "/shirt1.png", col: 1, row: 1, tall: true },
    { key: "ready", label: "READY TO WEAR", img: "/trousers.png", col: 2, row: 1, tall: true },
    { key: "salt", label: "SALT BY IDEAS", img: "/winter.png", col: 3, row: 1, spanCol: 2, spanRow: 2 },
    { key: "w-unstitched", label: "WOMEN'S UNSTITCHED", img: "/shirt1.png", col: 5, row: 1, tall: true, spanRow: 2 },
    { key: "men-eastern", label: "MEN EASTERN", img: "/formal.png", col: 6, row: 1, tall: true },
  ];

  return (
    <section aria-labelledby="mens-sale-title" className="mens-sale-section px-4 sm:px-6 lg:px-8 py-10">
      <div className="border-t border-line pt-4">
        <h2 id="mens-sale-title" className="product-section-heading text-center">Sale</h2>
      </div>
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-5 gap-y-5">
        {tiles.map((t) => (
          <article
            key={t.key}
            className={
              "relative overflow-hidden rounded-[18px] border border-line shadow-[0_4px_12px_rgba(0,0,0,0.12)] sale-tile " +
              (t.tall ? "aspect-[3/5]" : "aspect-[4/3]") +
              " lg:col-start-" + t.col +
              " lg:row-start-" + t.row +
              (t.spanCol ? " lg:col-span-" + t.spanCol : "") +
              (t.spanRow ? " lg:row-span-" + t.spanRow : "")
            }
          >
            <div className="absolute inset-0 flex items-center justify-center p-3">
              <Image
                src={t.img}
                alt={t.label}
                width={800}
                height={800}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[12px] leading-[14px] font-semibold uppercase tracking-wide text-text-on-secondary bg-white/90 px-3 py-1 rounded-full shadow-sm">{t.label}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}