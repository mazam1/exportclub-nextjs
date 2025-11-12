import BestSellersSection from "@/components/BestSellersSection";
import MensCategoriesSection from "@/components/MensCategoriesSection";
import UnsplashHero from "@/components/UnsplashHero";
import ReviewsSection from "@/components/ReviewsSection";
import MensStatsSection from "@/components/MensStatsSection";
import BestSellerCard from "@/components/BestSellerCard";
import ViewAllButton from "@/components/ViewAllButton";
import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";

export default function Home() {
  const all = getAllProducts();
  const menAll = all.filter((p) => p.category === "men" || p.category === "unisex");
  const newArrivals = menAll.slice().sort((a, b) => b.id.localeCompare(a.id)).slice(0, 8);
  const essentialTags = ["basics", "tee", "denim", "jeans", "coat", "trench"];
  const essentials = menAll.filter((p) => p.tags.some((t) => essentialTags.includes(t))).slice(0, 8);

  return (
    <div>
      {/* Unsplash-powered Hero */}
      <UnsplashHero />

      {/* Men's Categories — immediately following hero */}
      <MensCategoriesSection />

      {/* Best Sellers */}
      <BestSellersSection title="Featured Product" />
      
      {/* Best Sellers (duplicate section after second hero) */}
      <BestSellersSection />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="new-arrivals-title">
        <div className="flex items-center justify-between">
          <h2 id="new-arrivals-title" className="text-2xl font-semibold">New Arrivals</h2>
          <Suspense
            fallback={
              <span
                className="inline-flex h-8 w-[96px] items-center justify-center rounded-full btn-secondary px-4 text-center text-[12px] font-medium whitespace-nowrap"
                aria-hidden="true"
              >
                Loading
              </span>
            }
          >
            <ViewAllButton
              href="/products?category=men"
              ariaLabel="View all new arrivals"
              analyticsName="new_arrivals"
            />
          </Suspense>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((p) => (
            <BestSellerCard key={p.id} product={p} />
          ))}
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10" aria-labelledby="essentials-title">
        <div className="flex items-center justify-between">
          <h2 id="essentials-title" className="text-2xl font-semibold">Essentials</h2>
          <Suspense
            fallback={
              <span
                className="inline-flex h-8 w-[96px] items-center justify-center rounded-full btn-secondary px-4 text-center text-[12px] font-medium whitespace-nowrap"
                aria-hidden="true"
              >
                Loading
              </span>
            }
          >
            <ViewAllButton
              href="/products?category=men&q=basics"
              ariaLabel="View all essentials"
              analyticsName="essentials"
            />
          </Suspense>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {essentials.map((p) => (
            <BestSellerCard key={`ess-${p.id}`} product={p} />
          ))}
        </div>
      </section>

      {/* Categories section removed per request */}

      
      {/* Men’s Metrics — placed immediately before reviews section */}
      <MensStatsSection />
      
      {/* Customer Reviews Section (replaces Lookbook CTA) */}
      <ReviewsSection />
    </div>
  );
}
