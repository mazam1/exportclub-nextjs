export type ReviewImage = {
  url: string;
  alt?: string;
};

export type Review = {
  id: string;
  customerName: string;
  role?: string;
  location?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  content: string;
  product?: string;
  priceDisplay?: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
  images?: ReviewImage[];
  avatarInitial?: string;
  badge?: number;
};

export const reviews: Review[] = [
  {
    id: "r-101",
    customerName: "Amir Rahman",
    role: "Planning Consultant",
    location: "Dubai, UAE",
    rating: 5,
    title: "Tailored suit that fits perfectly",
    content:
      "The wool suit has a clean silhouette and the trousers required no alterations. Wore it to a client meeting and felt confident all day.",
    product: "Tailored Wool Suit — Navy",
    priceDisplay: "USD 650",
    date: "2024-11-02",
    verified: true,
    helpfulCount: 18,
    avatarInitial: "A",
    badge: 99,
  },
  {
    id: "r-102",
    customerName: "Priya Sharma",
    role: "Marketing Specialist",
    location: "Mumbai, India",
    rating: 4,
    title: "Premium shirt for long days",
    content:
      "The Egyptian cotton dress shirt stays crisp and breathes well. Paired easily with different ties across a three-day conference.",
    product: "Egyptian Cotton Dress Shirt",
    priceDisplay: "USD 89",
    date: "2024-10-18",
    verified: true,
    helpfulCount: 26,
    avatarInitial: "P",
    badge: 99,
  },
  {
    id: "r-103",
    customerName: "Michael Johnson",
    role: "Apparel Designer",
    location: "Los Angeles, USA",
    rating: 5,
    title: "Overcoat with excellent drape",
    content:
      "Cashmere blend overcoat sits beautifully on the shoulders. Warm without bulk and the lining feels premium.",
    product: "Cashmere Blend Overcoat",
    priceDisplay: "USD 480",
    date: "2024-09-27",
    verified: true,
    helpfulCount: 34,
    avatarInitial: "M",
    badge: 99,
  },
  {
    id: "r-104",
    customerName: "Omar Haddad",
    role: "Teacher",
    location: "Abu Dhabi, UAE",
    rating: 4,
    title: "Belt that holds its shape",
    content:
      "Full‑grain leather belt with a sturdy buckle. Color matches my dress shoes perfectly and has worn in nicely after a week.",
    product: "Classic Leather Belt",
    priceDisplay: "USD 59",
    date: "2024-08-30",
    verified: true,
    helpfulCount: 17,
    avatarInitial: "O",
    badge: 99,
  },
  {
    id: "r-105",
    customerName: "Raj Patel",
    role: "IT Consultant",
    location: "London, UK",
    rating: 5,
    title: "Sweater that layers cleanly",
    content:
      "Merino wool sweater is soft and lightweight. Works under a blazer without bulk and keeps shape after washing.",
    product: "Merino Wool Crewneck",
    priceDisplay: "USD 129",
    date: "2024-10-10",
    verified: true,
    helpfulCount: 29,
    avatarInitial: "R",
    badge: 99,
  },
  {
    id: "r-106",
    customerName: "Elena Petrov",
    role: "Graphic Designer",
    location: "Berlin, Germany",
    rating: 3,
    title: "Good shirt, slightly snug",
    content:
      "Slim‑fit Oxford has great fabric and construction, but I recommend sizing up if you prefer a relaxed fit.",
    product: "Slim Fit Cotton Oxford",
    priceDisplay: "USD 69",
    date: "2024-09-05",
    verified: true,
    helpfulCount: 12,
    avatarInitial: "E",
    badge: 99,
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