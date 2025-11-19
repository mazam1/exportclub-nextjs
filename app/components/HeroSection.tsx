'use client';

import { useState, useEffect } from 'react';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  fallbackImage?: string;
}

export default function HeroSection({ 
  title = "Premium Shipping",
  subtitle = "Experience luxury delivery service tailored for the modern gentleman",
  fallbackImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232c3e50;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%2334495e;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='white' font-family='Arial, sans-serif' font-size='48' font-weight='bold'%3EPremium Fashion%3C/text%3E%3C/svg%3E"
}: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const imageSources = {
    webp: [
      { src: "/images/hero-men-fashion-400.webp", width: 400 },
      { src: "/images/hero-men-fashion-800.webp", width: 800 },
      { src: "/images/hero-men-fashion-1200.webp", width: 1200 },
      { src: "/images/hero-men-fashion.webp", width: 1920 }
    ],
    jpeg: "/images/hero-men-fashion-optimized.jpg"
  };

  useEffect(() => {
    // Test if the primary image is accessible
    const testImage = new Image();
    testImage.src = imageSources.webp[3].src; // Test the main WebP image
    
    testImage.onload = () => {
      setCurrentImage(imageSources.webp[3].src);
      setImageLoaded(true);
    };
    
    testImage.onerror = () => {
      // Try JPEG fallback
      const jpegTest = new Image();
      jpegTest.src = imageSources.jpeg;
      
      jpegTest.onload = () => {
        setCurrentImage(imageSources.jpeg);
        setImageLoaded(true);
      };
      
      jpegTest.onerror = () => {
        setImageError(true);
        setCurrentImage(fallbackImage);
        setImageLoaded(true);
      };
    };
  }, [fallbackImage, imageSources]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setCurrentImage(fallbackImage);
  };

  return (
    <section className="relative w-full h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden bg-gray-900">
      {/* Loading State */}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading premium experience...</p>
          </div>
        </div>
      )}

      {/* Image Container */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {imageError ? (
          // Fallback SVG
          <div 
            className="w-full h-full bg-gray-700 flex items-center justify-center"
            dangerouslySetInnerHTML={{
              __html: decodeURIComponent(fallbackImage.replace('data:image/svg+xml,', ''))
            }}
          />
        ) : (
          <picture>
            <source
              srcSet={`${imageSources.webp[0].src} 400w, ${imageSources.webp[1].src} 800w, ${imageSources.webp[2].src} 1200w, ${imageSources.webp[3].src} 1920w`}
              type="image/webp"
              sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1920px"
            />
            <source
              srcSet={imageSources.jpeg}
              type="image/jpeg"
            />
            <img
              src={currentImage || imageSources.jpeg}
              alt="Premium men's fashion - Stylish gentleman in luxury attire"
              className="w-full h-full object-cover"
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
              decoding="async"
            />
          </picture>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex items-end justify-center h-full pb-8 sm:pb-12">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            {subtitle}
          </p>
          
          {/* Error Indicator */}
          {imageError && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-sm text-red-200">
                ⚠️ Image loading issue - displaying fallback content
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Network Status Indicator */}
      <div className="absolute top-4 right-4 z-20">
        {imageLoaded && !imageError && (
          <div className="bg-green-500/20 backdrop-blur-sm rounded-full p-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        )}
        {imageError && (
          <div className="bg-red-500/20 backdrop-blur-sm rounded-full p-2">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          </div>
        )}
      </div>
    </section>
  );
}