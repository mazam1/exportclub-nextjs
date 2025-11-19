"use client";
import Link from "next/link";

export default function TrustBadges() {
  const items = [
    {
      key: "shipping",
      label: "Free Shipping",
      href: "/shipping",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="text-black/70">
          <path d="M3 7h10v7H3z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 9h5l3 3v2h-8" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="6" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="17" cy="18" r="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
      accent: true,
    },
    {
      key: "payments",
      label: "Secure Payments",
      href: "/checkout",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="text-black/70">
          <rect x="3" y="10" width="18" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 10V8a5 5 0 0110 0v2" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      key: "quality",
      label: "Premium Quality",
      href: "/about",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" className="text-black/70">
          <circle cx="12" cy="7" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 11l-2 8 6-3 6 3-2-8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
  ];

  return (
    <section aria-label="Store benefits" className="px-4 sm:px-6 lg:px-8 py-8 border-t border-line">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0 w-full">
          {items.map((item, idx) => (
            <div
              key={item.key}
              className={
                "flex-1 flex items-center justify-center" +
                (idx < items.length - 1 ? " sm:border-r border-line" : "")
              }
            >
              <Link
                href={item.href}
                className="group inline-flex items-center gap-3 px-4 sm:px-6 py-4 sm:py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
                aria-label={item.label}
              >
                <span className="shrink-0" aria-hidden>
                  {item.icon}
                </span>
                <span className={"text-sm sm:text-base font-medium " + (item.accent ? "text-accent" : "text-tertiary")}>{item.label}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}