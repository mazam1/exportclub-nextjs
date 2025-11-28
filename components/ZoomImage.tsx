"use client";
import Image from "next/image";
import { useState } from "react";

export default function ZoomImage({ src, alt, width, height, zoom = 1.8 }: { src: string; alt: string; width: number; height: number; zoom?: number }) {
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  return (
    <div
      className="relative h-full w-full cursor-zoom-in"
      onPointerEnter={() => setActive(true)}
      onPointerLeave={() => setActive(false)}
      onPointerMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setOrigin({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-full w-full object-cover will-change-transform"
        style={{ transform: `scale(${active ? zoom : 1})`, transformOrigin: `${origin.x}px ${origin.y}px`, transition: active ? "transform 50ms linear" : "transform 200ms ease" }}
        priority
      />
    </div>
  );
}

