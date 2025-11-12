"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
};

export default function CategoryImage({
  src,
  alt,
  fallbackSrc,
  className,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw",
  quality = 65,
  priority = false,
  fill = true,
  width,
  height,
}: Props) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const resolvedFallback = fallbackSrc || "/banner-image.png";

  return (
    <Image
      src={currentSrc}
      alt={alt}
      {...(fill ? { fill: true } : { width, height })}
      className={className}
      sizes={sizes}
      quality={quality}
      priority={priority}
      onError={() => {
        if (currentSrc !== resolvedFallback) {
          setCurrentSrc(resolvedFallback);
        }
      }}
    />
  );
}