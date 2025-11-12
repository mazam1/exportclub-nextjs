"use client";
import Image from "next/image";
import CategoryImage from "./CategoryImage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function clamp(n: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, n));
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function ParallaxHero() {
  const rootRef = useRef<HTMLElement | null>(null);
  const layersRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<boolean>(false);
  const thresholdRef = useRef<number>(600);
  const [bgSrc, setBgSrc] = useState<string>(
    "/banner-image.png" // use existing local asset to avoid 404s
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const supportsTransform = typeof CSS !== "undefined" && CSS.supports("transform", "translate3d(0,0,0)");
    const reducedMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    layersRef.current = Array.from(root.querySelectorAll<HTMLElement>(".hero-layer"));

    const updateThreshold = () => {
      const rect = root.getBoundingClientRect();
      thresholdRef.current = Math.max(300, rect.height * 0.8);
    };
    updateThreshold();

    if (reducedMotion) {
      layersRef.current.forEach((el) => {
        el.style.transform = "none";
        el.style.opacity = "1";
      });
      return;
    }

    let latestScrollY = window.scrollY;
    const onScroll = () => {
      latestScrollY = window.scrollY;
      if (!pendingRef.current) {
        pendingRef.current = true;
        rafRef.current = requestAnimationFrame(() => {
          pendingRef.current = false;
          const threshold = thresholdRef.current;
          const heroTop = (root as HTMLElement).offsetTop;
          const rawProgress = clamp((latestScrollY - heroTop) / threshold, 0, 1);
          const eased = easeOutCubic(rawProgress);

          layersRef.current.forEach((el) => {
            const speedAttr = el.getAttribute("data-speed");
            const speed = speedAttr ? parseFloat(speedAttr) : 1;
            const layerProgress = clamp(eased * speed, 0, 1);
            const opacity = 1 - layerProgress;
            if (supportsTransform) {
              const scale = 1 - 0.5 * layerProgress; // shrink to 0.5 at full progress
              const translateY = -12 * layerProgress; // subtle inward move
              el.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
            }
            el.style.opacity = String(opacity);
          });
        });
      }
    };

    const passiveOpts: AddEventListenerOptions = { passive: true };
    window.addEventListener("scroll", onScroll, passiveOpts);
    window.addEventListener("resize", updateThreshold, passiveOpts);

    // initialize fully visible state
    layersRef.current.forEach((el) => {
      el.style.transform = "translate3d(0,0,0) scale(1)";
      el.style.opacity = "1";
      el.style.willChange = "transform, opacity";
    });

    // run once to sync if user is not at top
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateThreshold);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={rootRef} className="parallax-hero" aria-label="Featured collection">
      {/* Background hero image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgSrc}
          alt="Menswear hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          onError={() => {
            // Fallback chain: local -> Unsplash A -> Unsplash B -> local svg
            setBgSrc((prev) => {
              if (prev === "/banner-image.png") {
                return "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1600&q=80&auto=format&fit=crop";
              }
              if (prev.includes("0648a3ef77b2")) {
                return "https://images.unsplash.com/photo-1495121605193-b116b5b09d0d?w=1600&q=80&auto=format&fit=crop";
              }
              return "/file.svg";
            });
          }}
        />
      </div>
      <div className="hero-background" />

      {/* Parallax image layers (replacing specified item with Unsplash image) */}
      <div className="hero-layers" aria-hidden="true">
        <div className="hero-layer" data-speed="0.6">
          <CategoryImage
            src="https://source.unsplash.com/7RIMS-NMsbc?w=1280&q=80&auto=format&fit=crop"
            fallbackSrc="/banner-image.png"
            alt="White button-up shirt on wooden table"
            width={320}
            height={180}
            className="hero-img"
            sizes="(max-width: 1024px) 40vw, 320px"
            quality={70}
            priority={false}
            fill={false}
          />
        </div>
        <div className="hero-layer" data-speed="0.8">
          <CategoryImage
            src="https://source.unsplash.com/7RIMS-NMsbc?w=1280&q=80&auto=format&fit=crop"
            fallbackSrc="/banner-image.png"
            alt="White button-up shirt on wooden table"
            width={360}
            height={202}
            className="hero-img"
            sizes="(max-width: 1024px) 40vw, 360px"
            quality={70}
            priority={false}
            fill={false}
          />
        </div>
        <div className="hero-layer" data-speed="1.0">
          <CategoryImage
            src="https://source.unsplash.com/7RIMS-NMsbc?w=1280&q=80&auto=format&fit=crop"
            fallbackSrc="/banner-image.png"
            alt="White button-up shirt on wooden table"
            width={280}
            height={158}
            className="hero-img"
            sizes="(max-width: 1024px) 40vw, 280px"
            quality={70}
            priority={false}
            fill={false}
          />
        </div>
      </div>

      {/* Overlay content removed: Spring/Summer Collection subsection */}
    </section>
  );
}