export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export type Category = "women" | "men" | "accessories" | "unisex";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: Category;
  season: "Spring" | "Summer" | "Autumn" | "Winter";
  sizes: Size[];
  color: string;
  material: string;
  fit: "Relaxed" | "Regular" | "Slim" | "Oversized";
  care: string;
  images: { url: string; alt: string }[];
  tags: string[];
  stock: number;
};

export const products: Product[] = [
  {
    id: "ec-w-blazer-01",
    slug: "linen-structured-blazer-women",
    name: "Structured Linen Blazer",
    description:
      "Tailored linen blazer with a softly padded shoulder and minimal lapel for an elevated silhouette.",
    price: 189,
    currency: "USD",
    category: "women",
    season: "Spring",
    sizes: ["XS", "S", "M", "L", "XL"],
    color: "Ivory",
    material: "55% Linen, 45% Cotton",
    fit: "Regular",
    care: "Dry clean only",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519415943484-9fa18778fcd1?w=1200&q=80&auto=format&fit=crop",
        alt: "Woman wearing linen blazer",
      },
      {
        url: "https://images.unsplash.com/photo-1515734674582-29010bb37906?w=1200&q=80&auto=format&fit=crop",
        alt: "Blazer details",
      },
    ],
    tags: ["blazer", "linen", "tailored"],
    stock: 24,
  },
  {
    id: "ec-m-trench-01",
    slug: "classic-cotton-trench-men",
    name: "Classic Cotton Trench",
    description:
      "Water-resistant trench with a belt and storm flap, finished with tonal buttons.",
    price: 229,
    currency: "USD",
    category: "men",
    season: "Autumn",
    sizes: ["S", "M", "L", "XL", "XXL"],
    color: "Khaki",
    material: "100% Cotton",
    fit: "Regular",
    care: "Machine wash cold",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&auto=format&fit=crop",
        alt: "Man wearing trench coat",
      },
      {
        url: "https://images.unsplash.com/photo-1520974735194-0a2a20f98b6f?w=1200&q=80&auto=format&fit=crop",
        alt: "Trench coat details",
      },
    ],
    tags: ["coat", "trench", "outerwear"],
    stock: 15,
  },
  {
    id: "ec-u-tee-01",
    slug: "premium-supima-tee-unisex",
    name: "Premium Supima Tee",
    description: "Ultra-soft Supima cotton tee with a classic crew neckline.",
    price: 39,
    currency: "USD",
    category: "unisex",
    season: "Summer",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "Charcoal",
    material: "100% Supima Cotton",
    fit: "Regular",
    care: "Machine wash cold",
    images: [
      {
        url: "https://images.unsplash.com/photo-1518806118471-f28b20a1d79d?w=1200&q=80&auto=format&fit=crop",
        alt: "Folded cotton tees",
      },
    ],
    tags: ["tee", "cotton", "basics"],
    stock: 100,
  },
  {
    id: "ec-w-dress-01",
    slug: "silk-slip-dress-women",
    name: "Silk Slip Dress",
    description: "Bias-cut silk slip dress with adjustable straps and subtle sheen.",
    price: 179,
    currency: "USD",
    category: "women",
    season: "Summer",
    sizes: ["XS", "S", "M", "L"],
    color: "Black",
    material: "100% Silk",
    fit: "Slim",
    care: "Dry clean only",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741491295-294b0a9f2511?w=1200&q=80&auto=format&fit=crop",
        alt: "Silk slip dress on hanger",
      },
    ],
    tags: ["dress", "silk", "evening"],
    stock: 12,
  },
  {
    id: "ec-m-denim-01",
    slug: "selvedge-straight-denim-men",
    name: "Selvedge Straight Denim",
    description: "Japanese selvedge denim with a straight leg and mid rise.",
    price: 149,
    currency: "USD",
    category: "men",
    season: "Winter",
    sizes: ["S", "M", "L", "XL"],
    color: "Indigo",
    material: "100% Cotton",
    fit: "Regular",
    care: "Machine wash cold",
    images: [
      {
        url: "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=1200&q=80&auto=format&fit=crop",
        alt: "Stacked denim jeans",
      },
    ],
    tags: ["denim", "jeans"],
    stock: 40,
  },
  {
    id: "ec-a-scarf-01",
    slug: "cashmere-scarf-accessory",
    name: "Cashmere Scarf",
    description: "Pure cashmere scarf with fringed edges.",
    price: 99,
    currency: "USD",
    category: "accessories",
    season: "Winter",
    sizes: ["S", "M", "L"],
    color: "Camel",
    material: "100% Cashmere",
    fit: "Regular",
    care: "Dry clean only",
    images: [
      {
        url: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=1200&q=80&auto=format&fit=crop",
        alt: "Cashmere scarf on table",
      },
    ],
    tags: ["scarf", "cashmere"],
    stock: 60,
  },
];

export function getAllProducts() {
  return products;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) || null;
}

export function filterProducts({
  category,
  size,
  q,
}: {
  category?: Category;
  size?: Size;
  q?: string;
}) {
  return products.filter((p) => {
    const byCat = category ? p.category === category : true;
    const bySize = size ? p.sizes.includes(size) : true;
    const byQuery = q
      ? (p.name + " " + p.description + " " + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase())
      : true;
    return byCat && bySize && byQuery;
  });
}