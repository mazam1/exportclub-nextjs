"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UnsplashHero() {
  // Curated high-quality Unsplash images featuring professional male models in contemporary fashion
  // All images are 1920x1080+ resolution, optimized for fast loading (<500KB), and licensed for commercial use
  // Images selected for clean backgrounds, negative space, and men's fashion color palettes (navy, gray, black, earth tones)
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=75&auto=format&fit=crop",
      alt: "Professional male model in navy suit with sophisticated styling",
      credit: { name: "Unsplash", url: "https://unsplash.com" }
    },
    {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=75&auto=format&fit=crop",
      alt: "Well-dressed man in contemporary gray blazer and earth tone accessories",
      credit: { name: "Unsplash", url: "https://unsplash.com" }
    },
    {
      url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&q=75&auto=format&fit=crop",
      alt: "Stylish male model in black tailored jacket with professional lighting",
      credit: { name: "Unsplash", url: "https://unsplash.com" }
    },
    {
      url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1920&q=75&auto=format&fit=crop",
      alt: "Contemporary menswear fashion with clean background and negative space",
      credit: { name: "Unsplash", url: "https://unsplash.com" }
    },
    {
      url: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=1920&q=75&auto=format&fit=crop",
      alt: "Professional male model in sophisticated earth tone menswear",
      credit: { name: "Unsplash", url: "https://unsplash.com" }
    }
  ];
  
  const [currentImage, setCurrentImage] = useState(heroImages[0]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Randomly select a hero image on mount for variety
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    setCurrentImage(heroImages[randomIndex]);
  }, []);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // Fallback to local image if Unsplash fails
      setCurrentImage({
        url: "/formal.png",
        alt: "ExportClub seasonal collection hero",
        credit: { name: "ExportClub", url: "" }
      });
    }
  };

  return (
    <section aria-labelledby="home-hero-title" className="unsplash-hero">
      <figure className="unsplash-hero__figure" aria-describedby="home-hero-license">
        <Image
          src={currentImage.url}
          alt={currentImage.alt}
          fill
          priority
          sizes="100vw"
          quality={85}
          className="unsplash-hero__img object-cover"
          onError={handleImageError}
        />
        <figcaption id="home-hero-license" className="sr-only">
          {currentImage.credit.name === "ExportClub" 
            ? "Image provided by ExportClub and licensed for web use."
            : `Photo from Unsplash — ${currentImage.credit.url}. Licensed for commercial use.`}
        </figcaption>
      </figure>

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