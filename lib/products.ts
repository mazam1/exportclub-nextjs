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
    id: "ec-m-shirt-01",
    slug: "cotton-oxford-shirt-men",
    name: "Essential Cotton Oxford Shirt",
    description:
      "A timeless Oxford shirt crafted from premium 100% organic cotton for everyday comfort and lasting durability. The fabric is woven with a subtle basket texture that softens beautifully with wear while maintaining a crisp, clean finish. Cut in a regular fit with a classic button‑down collar, reinforced placket, and a neatly stitched chest pocket, it layers effortlessly beneath blazers or stands confidently on its own with denim. Thoughtful details include sturdy, heat‑sealed buttons, fine double‑needle seams, and a curved hem designed to be worn tucked or untucked depending on the occasion. Breathable, resilient, and easy to care for, this wardrobe essential transitions seamlessly from office to weekend without sacrificing comfort. Pair it with chinos for a polished silhouette, roll the sleeves for a relaxed approach, or style it under knitwear when temperatures drop. Available in versatile, core colorways that complement any wardrobe, this foundational piece balances form and function with understated, enduring style that never feels out of place.",
    price: 89,
    currency: "USD",
    category: "men",
    season: "Spring",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    color: "White",
    material: "100% Organic Cotton",
    fit: "Regular",
    care: "Machine wash cold",
    images: [
      {
        url: "https://images.unsplash.com/photo-1520975922219-6a2ca67b00c3?w=1500&q=80&auto=format&fit=crop",
        alt: "Man wearing white cotton Oxford shirt",
      },
      {
        url: "https://images.unsplash.com/photo-1520974918761-bfe3ce0507a0?w=1500&q=80&auto=format&fit=crop",
        alt: "Oxford shirt fabric and button details",
      },
    ],
    tags: ["basics", "shirt", "oxford", "cotton", "top"],
    stock: 75,
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
  {
    id: "ec-a-belt-01",
    slug: "leather-belt-accessory",
    name: "Full-Grain Leather Belt",
    description: "Handcrafted leather belt with matte buckle.",
    price: 79,
    currency: "USD",
    category: "accessories",
    season: "Autumn",
    sizes: ["S", "M", "L", "XL"],
    color: "Chestnut",
    material: "100% Leather",
    fit: "Regular",
    care: "Wipe clean",
    images: [
      { url: "/formal.png", alt: "Leather belt" },
    ],
    tags: ["belt", "leather"],
    stock: 50,
  },
  {
    id: "ec-a-beanie-01",
    slug: "wool-beanie-accessory",
    name: "Merino Wool Beanie",
    description: "Soft ribbed beanie for cold days.",
    price: 49,
    currency: "USD",
    category: "accessories",
    season: "Winter",
    sizes: ["S", "M", "L"],
    color: "Charcoal",
    material: "100% Merino Wool",
    fit: "Regular",
    care: "Hand wash",
    images: [
      { url: "/winter.png", alt: "Ribbed wool beanie" },
    ],
    tags: ["beanie", "wool"],
    stock: 80,
  },
  {
    id: "ec-a-gloves-01",
    slug: "leather-gloves-accessory",
    name: "Leather Driving Gloves",
    description: "Perforated leather gloves with snap closure.",
    price: 89,
    currency: "USD",
    category: "accessories",
    season: "Winter",
    sizes: ["S", "M", "L"],
    color: "Black",
    material: "100% Leather",
    fit: "Slim",
    care: "Wipe clean",
    images: [
      { url: "/banner-image.png", alt: "Black leather gloves" },
    ],
    tags: ["gloves", "leather"],
    stock: 40,
  },
  {
    id: "ec-a-tie-01",
    slug: "silk-tie-accessory",
    name: "Classic Silk Tie",
    description: "100% silk tie with subtle sheen.",
    price: 69,
    currency: "USD",
    category: "accessories",
    season: "Spring",
    sizes: ["M"],
    color: "Navy",
    material: "100% Silk",
    fit: "Regular",
    care: "Dry clean only",
    images: [
      { url: "/shirt1.png", alt: "Silk tie" },
    ],
    tags: ["tie", "silk"],
    stock: 120,
  },
  {
    id: "ec-a-square-01",
    slug: "pocket-square-accessory",
    name: "Silk Pocket Square",
    description: "Hand-rolled pocket square with contrast edge.",
    price: 39,
    currency: "USD",
    category: "accessories",
    season: "Summer",
    sizes: ["M"],
    color: "Ivory",
    material: "100% Silk",
    fit: "Regular",
    care: "Dry clean only",
    images: [
      { url: "/shirt9.png", alt: "Silk pocket square" },
    ],
    tags: ["pocket square", "silk"],
    stock: 100,
  },
  {
    id: "ec-a-sunglasses-01",
    slug: "sunglasses-accessory",
    name: "Acetate Sunglasses",
    description: "UV400 lenses with square frame.",
    price: 129,
    currency: "USD",
    category: "accessories",
    season: "Summer",
    sizes: ["M"],
    color: "Tortoise",
    material: "Acetate",
    fit: "Regular",
    care: "Wipe clean",
    images: [
      { url: "/trousers.png", alt: "Sunglasses" },
    ],
    tags: ["sunglasses", "acetate"],
    stock: 70,
  },
  {
    id: "ec-a-tote-01",
    slug: "canvas-tote-accessory",
    name: "Canvas Tote Bag",
    description: "Heavyweight canvas tote with inner pocket.",
    price: 59,
    currency: "USD",
    category: "accessories",
    season: "Spring",
    sizes: ["L"],
    color: "Natural",
    material: "Cotton Canvas",
    fit: "Regular",
    care: "Machine wash cold",
    images: [
      { url: "/formal.png", alt: "Canvas tote bag" },
    ],
    tags: ["tote", "bag"],
    stock: 110,
  },
  {
    id: "ec-a-wallet-01",
    slug: "leather-wallet-accessory",
    name: "Slim Leather Wallet",
    description: "Six-card slim wallet with cash slot.",
    price: 99,
    currency: "USD",
    category: "accessories",
    season: "Autumn",
    sizes: ["M"],
    color: "Black",
    material: "100% Leather",
    fit: "Regular",
    care: "Wipe clean",
    images: [
      { url: "/winter.png", alt: "Leather wallet" },
    ],
    tags: ["wallet", "leather"],
    stock: 90,
  },
  {
    id: "ec-a-tiebar-01",
    slug: "tie-bar-accessory",
    name: "Brushed Steel Tie Bar",
    description: "Minimal tie bar in brushed finish.",
    price: 29,
    currency: "USD",
    category: "accessories",
    season: "Spring",
    sizes: ["M"],
    color: "Steel",
    material: "Stainless Steel",
    fit: "Regular",
    care: "Wipe clean",
    images: [
      { url: "/banner-image.png", alt: "Tie bar" },
    ],
    tags: ["tie bar", "steel"],
    stock: 150,
  },
  {
    id: "ec-a-cufflinks-01",
    slug: "cufflinks-accessory",
    name: "Classic Cufflinks",
    description: "Timeless round cufflinks with polished finish.",
    price: 59,
    currency: "USD",
    category: "accessories",
    season: "Winter",
    sizes: ["M"],
    color: "Silver",
    material: "Brass",
    fit: "Regular",
    care: "Wipe clean",
    images: [
      { url: "/shirt1.png", alt: "Classic cufflinks" },
    ],
    tags: ["cufflinks", "formal"],
    stock: 100,
  },
  {
    id: "ec-a-strap-01",
    slug: "watch-strap-accessory",
    name: "Leather Watch Strap",
    description: "18mm quick-release leather strap.",
    price: 49,
    currency: "USD",
    category: "accessories",
    season: "Summer",
    sizes: ["S", "M", "L"],
    color: "Tan",
    material: "Leather",
    fit: "Regular",
    care: "Wipe clean",
    images: [
      { url: "/shirt9.png", alt: "Leather watch strap" },
    ],
    tags: ["watch", "strap"],
    stock: 120,
  },
  {
    id: "ec-a-socks-01",
    slug: "dress-socks-pack-accessory",
    name: "Dress Socks 3-Pack",
    description: "Combed cotton socks with reinforced toe and heel.",
    price: 35,
    currency: "USD",
    category: "accessories",
    season: "Autumn",
    sizes: ["M", "L"],
    color: "Assorted",
    material: "Cotton",
    fit: "Regular",
    care: "Machine wash cold",
    images: [
      { url: "/trousers.png", alt: "Dress socks pack" },
    ],
    tags: ["socks", "pack"],
    stock: 200,
  },
  {
    id: "ec-a-cap-01",
    slug: "baseball-cap-accessory",
    name: "Cotton Baseball Cap",
    description: "Six-panel cap with adjustable strap.",
    price: 39,
    currency: "USD",
    category: "accessories",
    season: "Summer",
    sizes: ["M"],
    color: "Olive",
    material: "Cotton",
    fit: "Regular",
    care: "Hand wash",
    images: [
      { url: "/formal.png", alt: "Cotton baseball cap" },
    ],
    tags: ["cap", "cotton"],
    stock: 140,
  },
  {
    id: "ec-a-umbrella-01",
    slug: "compact-umbrella-accessory",
    name: "Compact Travel Umbrella",
    description: "Wind-resistant umbrella with auto-open.",
    price: 55,
    currency: "USD",
    category: "accessories",
    season: "Winter",
    sizes: ["M"],
    color: "Black",
    material: "Polyester",
    fit: "Regular",
    care: "Wipe clean",
    images: [
      { url: "/winter.png", alt: "Compact umbrella" },
    ],
    tags: ["umbrella", "travel"],
    stock: 100,
  },
  {
    id: "ec-a-duffel-01",
    slug: "travel-duffel-accessory",
    name: "Weekender Duffel",
    description: "Durable duffel with leather trims.",
    price: 189,
    currency: "USD",
    category: "accessories",
    season: "Spring",
    sizes: ["L"],
    color: "Sand",
    material: "Canvas and Leather",
    fit: "Regular",
    care: "Wipe clean",
    images: [
      { url: "/banner-image.png", alt: "Travel duffel bag" },
    ],
    tags: ["duffel", "bag"],
    stock: 30,
  },
  {
    id: "ec-a-cardholder-01",
    slug: "card-holder-accessory",
    name: "Leather Card Holder",
    description: "Slim card holder with central pocket.",
    price: 79,
    currency: "USD",
    category: "accessories",
    season: "Autumn",
    sizes: ["M"],
    color: "Burgundy",
    material: "Leather",
    fit: "Regular",
    care: "Wipe clean",
    images: [
      { url: "/shirt1.png", alt: "Leather card holder" },
    ],
    tags: ["card holder", "leather"],
    stock: 110,
  },
  {
    id: "ec-a-keyring-01",
    slug: "key-ring-accessory",
    name: "Leather Key Ring",
    description: "Loop key ring with metal clasp.",
    price: 25,
    currency: "USD",
    category: "accessories",
    season: "Summer",
    sizes: ["M"],
    color: "Brown",
    material: "Leather and Steel",
    fit: "Regular",
    care: "Wipe clean",
    images: [
      { url: "/shirt9.png", alt: "Leather key ring" },
    ],
    tags: ["key ring", "leather"],
    stock: 160,
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
  color,
  priceMin,
  priceMax,
  q,
}: {
  category?: Category;
  size?: Size;
  color?: string;
  priceMin?: number;
  priceMax?: number;
  q?: string;
}) {
  return products.filter((p) => {
    const byCat = category ? p.category === category : true;
    const bySize = size ? p.sizes.includes(size) : true;
    const byColor = color ? p.color.toLowerCase() === color.toLowerCase() : true;
    const byPriceMin = typeof priceMin === "number" ? p.price >= priceMin : true;
    const byPriceMax = typeof priceMax === "number" ? p.price <= priceMax : true;
    const byQuery = q
      ? (p.name + " " + p.description + " " + p.tags.join(" ")).toLowerCase().includes(q.toLowerCase())
      : true;
    return byCat && bySize && byColor && byPriceMin && byPriceMax && byQuery;
  });
}
