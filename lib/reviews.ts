export type ReviewImage = {
  url: string;
  alt?: string;
};

export type Review = {
  id: string;
  customerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  content: string;
  date: string; // ISO string
  verified: boolean;
  helpfulCount: number;
  images?: ReviewImage[];
};

export const reviews: Review[] = [
  {
    id: "r-001",
    customerName: "Ayesha Khan",
    rating: 5,
    title: "Beautiful fabric and fit",
    content:
      "The stitching and fabric quality are excellent. Wore it for a family dinner and received so many compliments.",
    date: "2024-08-12",
    verified: true,
    helpfulCount: 24,
    images: [
      {
        url: "https://images.unsplash.com/photo-1511353183999-cb35f7f1d5c0?w=800&q=80&auto=format&fit=crop",
        alt: "Customer wearing outfit",
      },
    ],
  },
  {
    id: "r-003",
    customerName: "Fatima I.",
    rating: 5,
    title: "Elegant and comfortable",
    content:
      "Loved the drape and silhouette. Perfect for summer events.",
    date: "2024-09-03",
    verified: true,
    helpfulCount: 31,
    images: [
      {
        url: "https://images.unsplash.com/photo-1520975661595-6453be3b5efb?w=800&q=80&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "r-005",
    customerName: "Sana Malik",
    rating: 5,
    title: "Just like designer brands",
    content:
      "Honestly rivals international brands. The packaging was excellent too!",
    date: "2024-10-02",
    verified: true,
    helpfulCount: 40,
  },
  {
    id: "r-010",
    customerName: "Nimra",
    rating: 5,
    title: "Highly recommend",
    content:
      "Great fit right out of the box. Will buy again.",
    date: "2024-08-25",
    verified: true,
    helpfulCount: 22,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519340333755-930d1961d3b9?w=800&q=80&auto=format&fit=crop",
      },
    ],
  },
];

export function getAverageRating(items: Review[] = reviews) {
  if (!items.length) return 0;
  const sum = items.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / items.length) * 10) / 10; // one decimal
}

export function getRatingBreakdown(items: Review[] = reviews) {
  const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  items.forEach((r) => counts[r.rating]++);
  return counts;
}