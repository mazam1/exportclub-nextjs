import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
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
          <main id="main" className="min-h-[60vh] fade-in">{children}</main>
        </CartProvider>
        <footer role="contentinfo" className="site-footer relative text-secondary border-t border-line">
          <div className="absolute inset-0 pointer-events-none opacity-[0.35]" aria-hidden>
            <div className="h-full w-full bg-[radial-gradient(800px_circle_at_10%_0%,rgba(255,255,255,0.04),transparent_60%)]" />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <section aria-labelledby="footer-company">
              <h2 id="footer-company" className="text-base font-semibold">ExportClub</h2>
              <div className="mt-4 flex items-start gap-3">
                <Image src="/logo.png" alt="ExportClub logo" width={40} height={40} className="h-10 w-10 object-contain" />
                <p className="text-sm leading-6 text-secondary/90">
                  Contemporary menswear crafted for every season. Essentials, tailoring, and footwear with enduring style.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-4" aria-label="Social links">
                <Link href="https://instagram.com" aria-label="Instagram" className="p-2 rounded hover:bg-white/10 focus:bg-white/10 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="header-icon text-secondary">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1.5" />
                  </svg>
                </Link>
                <Link href="https://facebook.com" aria-label="Facebook" className="p-2 rounded hover:bg-white/10 focus:bg-white/10 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="header-icon text-secondary">
                    <path d="M18 3h-3a5 5 0 00-5 5v3H7v4h3v6h4v-6h3l1-4h-4V8a1 1 0 011-1h3z" />
                  </svg>
                </Link>
                <Link href="https://twitter.com" aria-label="Twitter" className="p-2 rounded hover:bg-white/10 focus:bg-white/10 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="header-icon text-secondary">
                    <path d="M23 4a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0016 3a4.5 4.5 0 00-4.5 4.5c0 .35.04.69.11 1A12.8 12.8 0 013 4s-4 9 5 13a13.8 13.8 0 01-8 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 4z" />
                  </svg>
                </Link>
              </div>
            </section>

            <nav aria-labelledby="footer-quick" className="sm:mt-0 mt-6">
              <h3 id="footer-quick" className="text-sm font-medium">Quick Links</h3>
              <ul className="mt-4 space-y-2 text-sm" role="list">
                <li><Link className="hover:underline hover:underline-offset-4" href="/">Home</Link></li>
                <li><Link className="hover:underline hover:underline-offset-4" href="/products">Shop</Link></li>
                <li><Link className="hover:underline hover:underline-offset-4" href="/about">About</Link></li>
                <li><Link className="hover:underline hover:underline-offset-4" href="/contact">Contact</Link></li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-service" className="sm:mt-0 mt-6">
              <h3 id="footer-service" className="text-sm font-medium">Customer Service</h3>
              <ul className="mt-4 space-y-2 text-sm" role="list">
                <li><Link className="hover:underline hover:underline-offset-4" href="/shipping">Shipping</Link></li>
                <li><Link className="hover:underline hover:underline-offset-4" href="/returns">Returns</Link></li>
                <li><Link className="hover:underline hover:underline-offset-4" href="/faq">FAQ</Link></li>
              </ul>
            </nav>

            <section aria-labelledby="footer-newsletter" className="sm:mt-0 mt-6">
              <h3 id="footer-newsletter" className="text-sm font-medium">Newsletter</h3>
              <form className="mt-4" aria-label="Subscribe to newsletter" action="#" method="post">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <div className="flex max-w-md items-center gap-2">
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="w-full rounded-md border border-line bg-white/10 text-secondary placeholder:text-secondary/70 px-3 py-2"
                    aria-describedby="newsletter-help"
                  />
                  <button type="submit" className="btn-secondary px-4 py-2 rounded-md">
                    Subscribe
                  </button>
                </div>
                <p id="newsletter-help" className="mt-2 text-xs text-secondary/70">
                  By subscribing, you agree to our <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
                </p>
              </form>
            </section>
          </div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-xs text-secondary/80 flex items-center justify-between">
            <p>© {new Date().getFullYear()} ExportClub. All rights reserved.</p>
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/terms" className="hover:underline hover:underline-offset-4">Terms</Link>
              <Link href="/privacy" className="hover:underline hover:underline-offset-4">Privacy</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
