export type User = {
  id: string;
  handle: string;
  fullName: string;
  avatar?: string;
  joinDate: string;
  bio?: string;
  contact?: { email?: string; phone?: string };
  social?: { twitter?: string; instagram?: string; website?: string };
  location?: string;
  privacy: { publicProfile: boolean; showEmail: boolean; showPhone: boolean; showLocation: boolean };
  stats: { posts: number; followers: number; following: number };
};

export type Post = { id: string; content: string; date: string };
export type Media = { id: string; url: string; alt: string };
export type Achievement = { id: string; title: string; icon?: string };

const users: Record<string, User> = {
  exportfan: {
    id: "u-001",
    handle: "exportfan",
    fullName: "Export Club Fan",
    avatar: "/logo.png",
    joinDate: "2024-02-12",
    bio: "Exploring seasonal collections and timeless essentials.",
    contact: { email: "fan@example.com" },
    social: { twitter: "exportfan", instagram: "exportfan", website: "https://www.exportclub.example" },
    location: "Dubai, UAE",
    privacy: { publicProfile: true, showEmail: false, showPhone: false, showLocation: true },
    stats: { posts: 6, followers: 128, following: 42 },
  },
  priya: {
    id: "u-002",
    handle: "priya",
    fullName: "Priya Sharma",
    avatar: "/shirt1.png",
    joinDate: "2024-10-18",
    bio: "Marketing specialist and style enthusiast.",
    contact: { email: "priya@example.com" },
    social: { instagram: "priyastyles" },
    location: "Mumbai, India",
    privacy: { publicProfile: true, showEmail: false, showPhone: false, showLocation: true },
    stats: { posts: 4, followers: 256, following: 88 },
  },
  emily: {
    id: "u-003",
    handle: "emily",
    fullName: "Emily Fischer",
    avatar: "/formal.png",
    joinDate: "2024-09-05",
    bio: "Graphic designer curating minimalist looks.",
    contact: { email: "emily@example.com" },
    social: { twitter: "emilydraws" },
    location: "Berlin, Germany",
    privacy: { publicProfile: false, showEmail: false, showPhone: false, showLocation: false },
    stats: { posts: 2, followers: 86, following: 31 },
  },
};

const postsByUser: Record<string, Post[]> = {
  exportfan: [
    { id: "p-101", content: "New linen blazer from the Spring collection.", date: "2025-03-12" },
    { id: "p-102", content: "Layered looks for cooler evenings.", date: "2025-04-03" },
    { id: "p-103", content: "Tailored suit for client meetings.", date: "2025-05-20" },
  ],
  priya: [
    { id: "p-201", content: "Conference outfits across three days.", date: "2024-10-20" },
  ],
  emily: [
    { id: "p-301", content: "Minimalist monochrome edit.", date: "2024-09-07" },
  ],
};

const mediaByUser: Record<string, Media[]> = {
  exportfan: [
    { id: "m-101", url: "/formal.png", alt: "Suit" },
    { id: "m-102", url: "/trousers.png", alt: "Trousers" },
    { id: "m-103", url: "/winter.png", alt: "Winter look" },
  ],
  priya: [
    { id: "m-201", url: "/shirt1.png", alt: "Shirt" },
  ],
  emily: [
    { id: "m-301", url: "/ec-logo.png", alt: "Banner" },
  ],
};

const pinnedByUser: Record<string, string[]> = {
  exportfan: ["Structured Linen Blazer", "Selvedge Straight Denim"],
  priya: ["Egyptian Cotton Dress Shirt"],
  emily: ["Slim Fit Cotton Oxford"],
};

const achievementsByUser: Record<string, Achievement[]> = {
  exportfan: [
    { id: "a-101", title: "Early Adopter" },
    { id: "a-102", title: "Style Curator" },
  ],
  priya: [{ id: "a-201", title: "Community Builder" }],
  emily: [{ id: "a-301", title: "Minimalist" }],
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCurrentUser(): Promise<User> {
  await delay(300);
  return users.exportfan;
}

export async function getUserByHandle(handle: string): Promise<User | null> {
  await delay(300);
  return users[handle] || null;
}

export async function getUserContent(handle: string): Promise<{ posts: Post[]; media: Media[]; pinned: string[]; achievements: Achievement[] }> {
  await delay(300);
  return {
    posts: postsByUser[handle] || [],
    media: mediaByUser[handle] || [],
    pinned: pinnedByUser[handle] || [],
    achievements: achievementsByUser[handle] || [],
  };
}