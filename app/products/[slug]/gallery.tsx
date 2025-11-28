"use client";
import Image from "next/image";
import ZoomImage from "@/components/ZoomImage";
import { useState } from "react";

type Img = { url: string; alt: string };

export default function ProductGallery({ images }: { images: Img[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = images[activeIdx] || images[0];
  return (
    <div>
      <div className="aspect-[4/5] overflow-hidden rounded-md border border-line">
        <ZoomImage src={active.url} alt={active.alt} width={1000} height={1250} />
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`rounded-md border ${activeIdx === idx ? "border-primary" : "border-line"} overflow-hidden`}
              aria-label={`View image ${idx + 1}`}
            >
              <Image src={img.url} alt={img.alt} width={400} height={500} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

