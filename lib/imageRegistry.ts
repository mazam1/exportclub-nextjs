import type { Product } from "@/lib/products";

type ImageInfo = { url: string; alt: string };

export const bestSellerImageMap: Record<string, ImageInfo> = {
  "linen-structured-blazer-women": { url: "/shirt1.png", alt: "Best seller image from Shirts category" },
  "classic-cotton-trench-men": { url: "/trousers.png", alt: "Best seller image from Pants category" },
  "selvedge-straight-denim-men": { url: "/winter.png", alt: "Best seller image from Jackets category" },
  "silk-slip-dress-women": { url: "/formal.png", alt: "Best seller image from Suits category" },
};

export function applyBestSellerImageOverride<T extends Product>(product: T): T {
  const override = bestSellerImageMap[product.slug];
  if (!override) return product;
  return { ...product, images: [{ url: override.url, alt: override.alt }] } as T;
}

export function applyBestSellerImageOverrides<T extends Product>(products: T[]): T[] {
  return products.map(applyBestSellerImageOverride);
}