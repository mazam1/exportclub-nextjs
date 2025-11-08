"use client";
import Image from "next/image";
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
    "/hero-mens.jpg" // place your image at exportclub1/public/hero-mens.jpg
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
              if (prev === "/hero-mens.jpg") {
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

      {/* Parallax image layers */}
      <div className="hero-layers" aria-hidden="true">
        <div className="hero-layer" data-speed="0.6">
          <Image src="/globe.svg" alt="" width={320} height={320} className="hero-img" priority />
        </div>
        <div className="hero-layer" data-speed="0.8">
          <Image src="/window.svg" alt="" width={360} height={360} className="hero-img" priority />
        </div>
        <div className="hero-layer" data-speed="1.0">
          <Image src="/next.svg" alt="" width={280} height={280} className="hero-img" priority />
        </div>
      </div>

      {/* Overlay content */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center">
        <div className="bg-background/80 backdrop-blur px-6 py-5 rounded-md w-fit text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold">Spring/Summer Collection</h1>
          <p className="mt-2 max-w-lg text-sm text-black">
            Elevated essentials and statement silhouettes crafted for warm days and cool nights.
          </p>
          <div className="mt-4 flex gap-3 justify-center">
            <Link href="/collections" className="h-11 rounded-md border border-black px-6 text-sm font-medium">
              Explore Collections
            </Link>
            <Link href="/products" className="h-11 rounded-md border border-line px-6 text-sm hover:bg-muted">
              Shop New Arrivals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}