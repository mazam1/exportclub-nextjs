import BestSellersSection from "@/components/BestSellersSection";
import MensCategoriesSection from "@/components/MensCategoriesSection";
import ParallaxHero from "@/components/ParallaxHero";
import UnsplashHero from "@/components/UnsplashHero";
import ParallaxHeroSecondary from "@/components/ParallaxHeroSecondary";
import ParallaxHeroTertiary from "@/components/ParallaxHeroTertiary";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
    <div>
      {/* Unsplash-powered Hero */}
      <UnsplashHero />

      {/* Men's Categories — immediately following hero */}
      <MensCategoriesSection />

      {/* Best Sellers */}
      <BestSellersSection />

      {/* Second hero section mirroring the first */}
      <ParallaxHeroSecondary />

      {/* Best Sellers (duplicate section after second hero) */}
      <BestSellersSection />

      {/* Categories section removed per request */}

      
      {/* Additional hero section inserted before Curated Lookbooks */}
      <ParallaxHeroTertiary />

      {/* Customer Reviews Section (replaces Lookbook CTA) */}
      <ReviewsSection />
    </div>
  );
}
