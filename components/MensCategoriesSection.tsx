import Link from "next/link";
import CategoryImage from "./CategoryImage";

type CategoryItem = {
  name: string;
  img: string;
  alt: string;
  fallbackImg?: string;
  href?: string;
};

const categories: CategoryItem[] = [
  {
    name: "Shirts",
    // Use local optimized asset; Next/Image will serve WebP where supported
    img: "/shirt1.png",
    alt: "White short-sleeve shirt with palm tree embroidery on pocket, men’s shirts category",
    href: "/shirts",
  },
  {
    name: "Pants",
    // Use local optimized asset; Next/Image will serve WebP/JPEG where supported
    img: "/trousers.png",
    alt: "Beige wide-leg pants worn by model standing, men’s pants category",
    href: "/pants",
  },
  {
    name: "Jackets",
    img: "/winter.png",
    alt: "Charcoal hoodie with bandana patchwork pattern, men’s jackets category",
    fallbackImg: "https://images.unsplash.com/photo-1556228724-4b1f5f84b8a4?w=1200&q=80&auto=format&fit=crop",
    href: "/jackets",
  },
  {
    name: "Suits",
    img: "https://images.unsplash.com/photo-1520975916081-6f7f2b1db3f1?w=1200&q=80&auto=format&fit=crop",
    alt: "Men’s suits category image",
    fallbackImg: "/formal.png",
    href: "/suits",
  },
  {
    name: "Knitwear",
    img: "https://images.unsplash.com/photo-1520975942406-3797cc7bd312?w=1200&q=80&auto=format&fit=crop",
    alt: "Men’s knitwear category image",
    fallbackImg: "/shirt9.png",
    href: "/knitwear",
  },
  {
    name: "Denim",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&q=80&auto=format&fit=crop",
    alt: "Men’s denim category image",
    fallbackImg: "/trousers.png",
    href: "/denim",
  },
  {
    name: "Footwear",
    img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=1200&q=80&auto=format&fit=crop",
    alt: "Men’s footwear category image",
    fallbackImg: "/shirt1.png",
    href: "/footwear",
  },
  {
    name: "Accessories",
    img: "https://images.unsplash.com/photo-1512499617640-c2f9990986d3?w=1200&q=80&auto=format&fit=crop",
    alt: "Accessories category image",
    fallbackImg: "/ec-logo.png",
    href: "/accessories",
  },
];

export default function MensCategoriesSection() {
  return (
    <section aria-label="Shop men's categories" className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-medium tracking-wide uppercase">Men&apos;s Categories</h2>
        </div>
        {/* Grid: single row on desktop (≥1024px). Circles keep aspect-square for consistency */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((c) => (
            <Link
              key={c.name}
              href={c.href || "/products?category=men"}
              className="group relative overflow-hidden rounded-full border border-line w-full aspect-square shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <CategoryImage
                src={c.img}
                fallbackSrc={c.fallbackImg}
                alt={c.alt || c.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                quality={65}
                priority={false}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors rounded-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full border border-line bg-secondary/85 px-3 py-1 text-[11px] font-medium text-tertiary shadow-sm">
                  {c.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}