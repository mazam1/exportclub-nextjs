import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";
import { CartProvider } from "@/lib/cart";
import Header from "@/components/Header";

// Fonts are loaded at runtime via <link> tags to avoid build-time network failures.
// CSS variables provide resilient fallbacks in globals.css.

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
      "Explore timeless essentials and curated lookbooks.",
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
      "Explore timeless essentials and curated lookbooks.",
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
      <head>
        {/* Preconnect and runtime font loading to prevent build-time fetch errors */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playfair+Display:wght@400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}> 
        <Script id="font-monitor" strategy="afterInteractive">
          {`
            (function(){
              const log = console;
              const check = () => {
                try {
                  const interOk = document.fonts && document.fonts.check('1rem "Inter"');
                  const playfairOk = document.fonts && document.fonts.check('1rem "Playfair Display"');
                  if (!interOk || !playfairOk) {
                    log.warn('[fonts] Google fonts not fully loaded; using system fallbacks.');
                  }
                } catch (err) {
                  log.error('[fonts] FontFace check failed:', err);
                }
              };
              if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(check).catch(function(err){
                  log.error('[fonts] fonts.ready error:', err);
                });
                setTimeout(() => {
                  if (document.fonts && document.fonts.status !== 'loaded') {
                    log.warn('[fonts] Font loading timed out; falling back.');
                  }
                }, 3000);
              } else {
                // Browser fallback: still have resilient font stacks in CSS variables
                setTimeout(check, 1000);
              }
            })();
          `}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-tertiary focus:text-secondary focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <header className="sticky top-0 z-40 bg-[#f5f7fa] text-tertiary">
          <Header />
        </header>
        <CartProvider>
          <main id="main" className="min-h-[60vh]">{children}</main>
        </CartProvider>
        <footer className="bg-tertiary text-secondary site-footer">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h2 className="text-base font-semibold">ExportClub</h2>
              <p className="mt-3 text-sm text-secondary">
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
                <li><Link href="/lookbooks">Lookbooks</Link></li>
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8 text-xs text-secondary">
            © {new Date().getFullYear()} ExportClub. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
