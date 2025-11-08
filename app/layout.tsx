import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CartProvider } from "@/lib/cart";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ExportClub — Fashion for Every Season",
    template: "%s · ExportClub",
  },
  description:
    "ExportClub is a modern clothing brand offering seasonal collections, premium basics, and statement pieces.",
  metadataBase: new URL("https://www.exportclub.example"),
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    title: "ExportClub — Fashion for Every Season",
    description:
      "Explore new arrivals, timeless essentials, and curated lookbooks.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1520975661595-6453be3b5efb?w=1200&q=80&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "ExportClub hero fashion image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ExportClub — Fashion for Every Season",
    description:
      "Explore new arrivals, timeless essentials, and curated lookbooks.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}> 
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-black focus:text-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-40 bg-background">
          <AnnouncementBar />
          <Header />
        </header>
        <CartProvider>
          <main id="main" className="min-h-[60vh]">{children}</main>
        </CartProvider>
        <footer className="border-t border-black/10 dark:border-white/15">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h2 className="text-base font-semibold">ExportClub</h2>
              <p className="mt-3 text-sm text-black">
                Contemporary fashion crafted for every season.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Shop</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/products?category=women">Women</Link></li>
                <li><Link href="/products?category=men">Men</Link></li>
                <li><Link href="/products?category=accessories">Accessories</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Explore</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/collections">Collections</Link></li>
                <li><Link href="/lookbook">Lookbook</Link></li>
                <li><Link href="/guides">Styling Guides</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 text-xs text-black">
            © {new Date().getFullYear()} ExportClub. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
