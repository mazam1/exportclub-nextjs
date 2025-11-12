"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type HeroData = {
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
  photographerName?: string;
  photographerLink?: string;
  unsplashLink?: string;
  source: "unsplash" | "fallback";
};

export default function UnsplashHero() {
  const [data, setData] = useState<HeroData | null>(null);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let didCancel = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // Lazily fetch hero image when in view
          fetch("/api/unsplash")
            .then((res) => res.json())
            .then((json: HeroData) => {
              if (!didCancel) setData(json);
            })
            .catch(() => {
              if (!didCancel)
                setData({
                  imageUrl: "/banner-image.png",
                  alt: "Fallback hero image",
                  width: 1920,
                  height: 1080,
                  source: "fallback",
                });
            });
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);

    return () => {
      didCancel = true;
      observer.disconnect();
    };
  }, []);

  const imageUrl = hasError || !data ? "/banner-image.png" : data.imageUrl;
  const altText = data?.alt || "Hero image";
  const showAttribution = !!data && data.source === "unsplash";

  return (
    <section
      ref={containerRef}
      aria-label="Featured hero image"
      className="unsplash-hero"
    >
      <figure className="unsplash-hero__figure">
        {/* Background image */}
        <div className="unsplash-hero__image">
          {/* Using Next Image for optimization and lazy loading */}
          <Image
            src={imageUrl}
            alt={altText}
            fill
            sizes="100vw"
            onError={() => setHasError(true)}
            className="unsplash-hero__img"
            priority={false}
          />
        </div>

        {/* Overlay content slot (optional) */}
        <div className="unsplash-hero__overlay">
          <div className="unsplash-hero__headline">
            <h1 className="unsplash-hero__title">ExportClub</h1>
            <p className="unsplash-hero__subtitle">Discover curated looks and timeless essentials.</p>
          </div>
        </div>

        {/* Attribution required by Unsplash terms */}
        {showAttribution && (
          <figcaption className="unsplash-hero__attribution">
            <span>
              Photo by {" "}
              <a
                href={data?.photographerLink || "https://unsplash.com/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Photographer profile on Unsplash"
              >
                {data?.photographerName || "Unsplash photographer"}
              </a>{" "}
              on {" "}
              <a
                href={data?.unsplashLink || "https://unsplash.com/"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View photo on Unsplash"
              >
                Unsplash
              </a>
            </span>
          </figcaption>
        )}
      </figure>
    </section>
  );
}