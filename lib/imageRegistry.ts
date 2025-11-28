import type { Product } from "@/lib/products";

type ImageInfo = { url: string; alt: string };

export const bestSellerImageMap: Record<string, ImageInfo> = {
  "tailored-wool-suit-jacket": {
    url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=1200&q=80&auto=format&fit=crop",
    alt: "Man wearing the Tailored Wool Suit Jacket in a modern apartment",
  },
  "classic-cotton-trench-men": { url: "/trousers.png", alt: "Best seller image from Pants category" },
  "selvedge-straight-denim-men": { url: "/winter.png", alt: "Best seller image from Jackets category" },
  "silk-blend-lounge-shirt": { url: "/formal.png", alt: "Best seller image from Suits category" },
};

export function applyBestSellerImageOverride<T extends Product>(product: T): T {
  const override = bestSellerImageMap[product.slug];
  if (!override) return product;
  return { ...product, images: [{ url: override.url, alt: override.alt }] } as T;
}

export function applyBestSellerImageOverrides<T extends Product>(products: T[]): T[] {
  return products.map(applyBestSellerImageOverride);
}