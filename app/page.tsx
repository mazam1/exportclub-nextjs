import BestSellersSection from "@/components/BestSellersSection";
import ParallaxHero from "@/components/ParallaxHero";
import ParallaxHeroSecondary from "@/components/ParallaxHeroSecondary";
import ParallaxHeroTertiary from "@/components/ParallaxHeroTertiary";
import ReviewsSection from "@/components/ReviewsSection";

export default function Home() {
  return (
    <div>
      {/* Parallax Hero */}
      <ParallaxHero />

      {/* Best Sellers (inserted immediately after hero to match screenshot) */}
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
