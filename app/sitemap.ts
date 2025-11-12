import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.exportclub.example";
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/products`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/collections`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/lookbook`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/guides`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/shirts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/pants`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/jackets`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/suits`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/knitwear`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/denim`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/footwear`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/accessories`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}