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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
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
                  if (!interOk) {
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
        <Script id="sale-bg-toggle" strategy="afterInteractive">
          {`
            (function(){
              try {
                const params = new URLSearchParams(window.location.search);
                const mode = params.get('sale_bg');
                const root = document.documentElement;
                if (mode === 'before') {
                  root.style.setProperty('--sale-tile-gradient-start', '#f6f9f3');
                  root.style.setProperty('--sale-tile-gradient-end', '#edf4e8');
                } else {
                  const muted = getComputedStyle(root).getPropertyValue('--muted').trim() || '#fafafa';
                  const secondary = getComputedStyle(root).getPropertyValue('--secondary').trim() || '#ffffff';
                  root.style.setProperty('--sale-tile-gradient-start', muted);
                  root.style.setProperty('--sale-tile-gradient-end', secondary);
                }
              } catch (err) {
                console.warn('[sale-bg] toggle failed:', err);
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
        <header className="sticky top-0 z-40 bg-background text-tertiary relative">
          <Header />
        </header>
        <CartProvider>
          <main id="main" className="min-h-[60vh] fade-in">{children}</main>
        </CartProvider>
        <footer role="contentinfo" className="site-footer relative text-black border-t border-line">
          <div className="relative mx-auto max-w-[1581px] px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <section aria-label="Brand">
              <div className="flex items-center gap-3 flex-nowrap">
                <Image src="/logo.png" alt="exportclub logo" width={40} height={40} className="h-10 w-10 object-contain shrink-0" />
              </div>
              <span className="mt-2 block text-[10px] font-medium tracking-wider">EST. 1971</span>
              <p className="mt-6 text-[15px] leading-7">
                exportclub is a menswear brand, designed entirely in-house, stand-alone Pakistan’s no. 1 Shirt Brand. From timeless tailoring to premium formal shirts, we present a considered edit of quality, wearable clothes, and accessories bearing the exportclub name.
              </p>
              <div className="mt-6 flex items-center gap-5" aria-label="Social links">
                <Link href="#" aria-label="Instagram" className="inline-flex">
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
                  </svg>
                </Link>
                <Link href="#" aria-label="Facebook" className="inline-flex">
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
                  </svg>
                </Link>
                <Link href="#" aria-label="YouTube" className="inline-flex">
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="6" width="20" height="12" rx="3" fill="currentColor" />
                  </svg>
                </Link>
                <Link href="#" aria-label="TikTok" className="inline-flex">
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
                  </svg>
                </Link>
              </div>
            </section>

            <nav aria-labelledby="footer-info">
              <h3 id="footer-info" className="text-lg font-semibold">Information</h3>
              <ul className="mt-4 space-y-3 text-[15px]" role="list">
                <li><Link href="/about" className="hover:underline">About us</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                <li><Link href="/guides" className="hover:underline">How to order</Link></li>
                <li><Link href="/guides" className="hover:underline">Size Guide</Link></li>
                <li><Link href="/returns" className="hover:underline">Returns & Exchange Policy</Link></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
              </ul>
            </nav>

            <nav aria-labelledby="footer-customer">
              <h3 id="footer-customer" className="text-lg font-semibold">Customer Services</h3>
              <ul className="mt-4 space-y-3 text-[15px]" role="list">
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="/shipping" className="hover:underline">Shipping Policy</Link></li>
                <li><a href="#" className="hover:underline">Payment Options</a></li>
                <li><Link href="/faq" className="hover:underline">FAQ’s</Link></li>
                <li><a href="#" className="hover:underline">Made To Measure</a></li>
                <li><a href="#" className="hover:underline">Made To Measure Stores</a></li>
                <li><a href="#" className="hover:underline">Track Your Order</a></li>
                <li><a href="#" className="hover:underline">Loyalty Card</a></li>
                <li><a href="#" className="hover:underline">Feedback</a></li>
              </ul>
            </nav>

            <section aria-labelledby="footer-store">
              <h3 id="footer-store" className="text-lg font-semibold">Store Information</h3>
              <ul className="mt-4 space-y-3 text-[15px]" role="list">
                <li className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.5 2.9 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.1-.2 1 .4 2 .6 3.1.6.6 0 1 .4 1 .9v3.6c0 .5-.4.9-.9 1C17.5 21 11 14.5 9.7 10.2c-.1-.5.1-1 .6-1.1l3.6-1c.5-.2.9.1.9.7 0 1.1-.2 2.1-.6 3.1-.2.3-.1.8.2 1.1l-2.2 2.2" fill="currentColor"/></svg><span>+92 42 111 789 456</span></li>
                <li className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12a7 7 0 1014 0 7 7 0 10-14 0zm9.8-2.2l-1.6 4.4-2.7-2.7 4.3-1.7z" fill="currentColor"/></svg><span>+92 345 4037778</span></li>
                <li className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4z" fill="currentColor"/></svg><span>@exportclub.pk</span></li>
                <li className="flex items-center gap-2"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="currentColor"/></svg><span>Mon-Sat: (10:00AM To 06:00PM)</span></li>
              </ul>
              <div className="mt-4 flex items-center gap-3">
                <a href="#" className="btn-secondary px-3 py-2 rounded">Find our Stores</a>
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google play" width="150" height="45" />
              </div>
            </section>
          </div>
        </footer>
      </body>
    </html>
  );
}
