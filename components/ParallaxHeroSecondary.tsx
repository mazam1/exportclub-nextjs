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

export default function ParallaxHeroSecondary() {
  const rootRef = useRef<HTMLElement | null>(null);
  const layersRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<boolean>(false);
  const thresholdRef = useRef<number>(600);
  const inViewRef = useRef<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [bgSrc, setBgSrc] = useState<string>(
    "/hero-mens.jpg" // same initial background to mirror the first hero
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
      if (!pendingRef.current && inViewRef.current) {
        pendingRef.current = true;
        rafRef.current = requestAnimationFrame(() => {
          pendingRef.current = false;
          const threshold = thresholdRef.current;
          const heroTop = (root as HTMLElement).offsetTop;
          const rawProgress = clamp((latestScrollY - heroTop) / threshold, 0, 1);
          const eased = easeOutCubic(rawProgress);
          setProgress(eased);

          // Mirror timing/easing and movement behavior from the first hero:
          // shrink and subtly translate to convey inward motion toward center
          const rect = root.getBoundingClientRect();
          const maxShift = Math.max(24, Math.min(72, rect.width * 0.05)); // responsive horizontal shift

          layersRef.current.forEach((el, index) => {
            const speedAttr = el.getAttribute("data-speed");
            const speed = speedAttr ? parseFloat(speedAttr) : 1;
            const layerProgress = clamp(eased * speed, 0, 1);
            const opacity = 1 - layerProgress;
            // Determine horizontal direction relative to center index for symmetric inward movement
            const centerIndex = (layersRef.current.length - 1) / 2; // works for odd or even counts
            const isLeft = index < centerIndex;
            const isRight = index > centerIndex;
            const dir = isLeft ? 1 : isRight ? -1 : 0; // left moves right (+), right moves left (-), center stays

            if (supportsTransform) {
              const translateX = dir * maxShift * layerProgress;
              const scale = 1 - 0.15 * layerProgress; // subtle shrink only
              el.style.transform = `translate3d(${translateX}px, 0, 0) scale(${scale})`;
            }
            el.style.opacity = String(opacity);
            el.style.willChange = "transform, opacity";
          });
        });
      }
    };

    const passiveOpts: AddEventListenerOptions = { passive: true };
    window.addEventListener("scroll", onScroll, passiveOpts);
    window.addEventListener("resize", updateThreshold, passiveOpts);

    // IntersectionObserver: only animate when the hero is in view
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        inViewRef.current = entry.isIntersecting;
        if (inViewRef.current) {
          onScroll();
        }
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(root);

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
      io.disconnect();
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

      {/* Overlay content removed: Spring/Summer Collection subsection */}

      {/* Visual progress indicator for scroll animation */}
      <div className="hero-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Hero animation progress">
        <div className="hero-progress-inner" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      {/* No-JS fallback: ensure images remain visible and accessible */}
      <noscript>
        <style>{`.hero-layer { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
    </section>
  );
}