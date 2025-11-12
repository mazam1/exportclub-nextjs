"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);

  // Close on Escape and focus the panel when opened for accessibility
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      panelRef.current?.focus();
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  }
  function handleTouchMove(e: React.TouchEvent) {
    touchCurrentX.current = e.touches[0].clientX;
  }
  function handleTouchEnd() {
    if (touchStartX.current != null && touchCurrentX.current != null) {
      const delta = touchCurrentX.current - touchStartX.current;
      if (delta < -50) {
        setOpen(false);
      }
    }
    touchStartX.current = null;
    touchCurrentX.current = null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between text-tertiary">
      {/* Brand logo left-aligned */}
      <Link href="/" aria-label="ExportClub home" className="flex items-center">
        <Image
          src="/logo.png"
          alt="ExportClub logo"
          priority
          className="h-6 w-auto sm:h-7 lg:h-8 object-contain"
          width={64}
          height={64}
        />
      </Link>

      {/* Right actions */}
      <div className="flex items-center gap-4">
        {/* Icons group (search, wishlist, login, hamburger) */}
        <div className="flex items-center gap-4">
          <Link href="/products" aria-label="Search" className="p-2 hover:opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="header-icon">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </Link>
          <Link href="/products" aria-label="Wishlist" className="p-2 hover:opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="header-icon">
              <path d="M20.8 11.1c0 5.4-8.8 9.9-8.8 9.9S3.2 16.5 3.2 11.1c0-2.7 2.2-4.9 4.9-4.9 1.8 0 3.4.9 4.4 2.2 1-1.3 2.6-2.2 4.4-2.2 2.7 0 4.9 2.2 4.9 4.9z" />
            </svg>
          </Link>

          <Link href="/profile" aria-label="Profile" className="p-2 hover:opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="header-icon">
              <circle cx="12" cy="7" r="4" />
              <path d="M4 20a8 8 0 0116 0" />
            </svg>
          </Link>

          <Link href="/cart" aria-label="View shopping cart" className="p-2 hover:opacity-80">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="header-icon">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M3 4h2l2 12h11l2-8H6" />
            </svg>
          </Link>

          {/* Hamburger menu toggle */}
          <button
            type="button"
            aria-haspopup="menu"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="p-2 hover:opacity-80"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="header-icon">
              <path d="M3 6h18" />
              <path d="M3 12h18" />
              <path d="M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Left-aligned sliding drawer with semi-transparent overlay */}
      <div
        className="fixed inset-0 z-50 pointer-events-none"
        aria-hidden={!open}
      >
        {/* Overlay: only interactive when open */}
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 transition-opacity duration-300 ${open ? "bg-black/40 opacity-100 pointer-events-auto" : "opacity-0"}`}
        />
        {/* Panel */}
        <div
          id="mobile-menu"
          role={open ? "dialog" : undefined}
          aria-modal={open ? true : undefined}
          aria-label="Main menu"
          ref={panelRef}
          tabIndex={-1}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`absolute top-0 left-0 h-full w-[80vw] max-w-[480px] bg-background border-r border-line shadow-xl transform transition-transform duration-300 ease-out ${open ? "translate-x-0 pointer-events-auto" : "-translate-x-full"}`}
        >
          <nav className="px-4 pt-4 pb-6 text-base">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Menu</span>
              <button
                type="button"
                className="p-2"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="header-icon">
                  <path d="M6 6l12 12" />
                  <path d="M18 6l-12 12" />
                </svg>
              </button>
            </div>
            <ul className="mt-4 space-y-3">
              <li><Link href="/collections" onClick={() => setOpen(false)}>Collections</Link></li>
              <li><Link href="/mens" onClick={() => setOpen(false)}>Men</Link></li>
              <li><Link href="/products?category=accessories" onClick={() => setOpen(false)}>Accessories</Link></li>
              <li><Link href="/lookbooks" onClick={() => setOpen(false)}>Lookbooks</Link></li>
              <li><Link href="/guides" onClick={() => setOpen(false)}>Guides</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}