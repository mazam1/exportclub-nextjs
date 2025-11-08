import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import BestSellersSection from "@/components/BestSellersSection";
import ParallaxHero from "@/components/ParallaxHero";
import ParallaxHeroSecondary from "@/components/ParallaxHeroSecondary";

export default function Home() {
  const items = getAllProducts();
  const featured = items.slice(0, 8);
  return (
    <div>
      {/* Parallax Hero */}
      <ParallaxHero />

      {/* Best Sellers (inserted immediately after hero to match screenshot) */}
      <BestSellersSection />

      {/* Second hero section mirroring the first */}
      <ParallaxHeroSecondary />

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              label: "Women",
              href: "/products?category=women",
              img: "https://images.unsplash.com/photo-1503342452485-86ff0a3b82bb?w=900&q=80&auto=format&fit=crop",
            },
            {
              label: "Men",
              href: "/products?category=men",
              img: "https://images.unsplash.com/photo-1520974726733-8b1f1d2bfa6f?w=900&q=80&auto=format&fit=crop",
            },
            {
              label: "Accessories",
              href: "/products?category=accessories",
              img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&auto=format&fit=crop",
            },
          ].map((c) => (
            <Link key={c.label} href={c.href} className="group block">
              <div className="aspect-[4/3] overflow-hidden rounded-md border border-line">
                <Image
                  src={c.img}
                  alt={`${c.label} category image`}
                  width={900}
                  height={675}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <h2 className="text-lg font-medium">{c.label}</h2>
                <span aria-hidden className="text-sm">Shop →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold">New Arrivals</h2>
          <Link href="/products" className="text-sm hover:underline">View all</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Lookbook CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-md border border-line p-6 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-semibold">Curated Lookbooks</h2>
            <p className="mt-2 text-sm text-black">
              Discover styling inspiration and seasonal edits from our team.
            </p>
          </div>
          <Link href="/lookbook" className="h-11 rounded-md border border-black px-6 text-sm font-medium">
            Explore Lookbooks
          </Link>
        </div>
      </section>
    </div>
  );
}
