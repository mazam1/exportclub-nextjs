"use client";
import Link from "next/link";
import Image from "next/image";

export default function UnsplashHero() {
  const unsplashSrc =
    "https://images.unsplash.com/photo-1706790608890-51f511587a8c?fm=webp&fit=crop&w=1920&h=1080&q=35&ixlib=rb-4.1.0";

  return (
    <section aria-labelledby="home-hero-title" className="unsplash-hero">
      <div className="absolute inset-0 z-0">
        <Image
          src={unsplashSrc}
          alt="Minimalist dark paper texture suitable for men's fashion hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          quality={30}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
      </div>

      <div className="unsplash-hero__overlay">
        <div className="unsplash-hero__headline">
          <h1 id="home-hero-title" className="unsplash-hero__title">
            Elevate Your Style
          </h1>
          <p className="unsplash-hero__subtitle">
            Discover curated looks and timeless essentials for the modern gentleman
          </p>
          <Link 
            href="/products" 
            className="inline-flex h-12 px-8 rounded-md btn-primary items-center justify-center mt-6 text-base font-medium transition-all duration-200 hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}