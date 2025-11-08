"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between border-b border-black/10">
      {/* Brand */}
      <Link href="/" className="flex items-center gap-2" aria-label="ExportClub home">
        <span className="text-[14px] leading-none font-medium text-black tracking-normal">ExportClub</span>
      </Link>

      {/* Right actions */}
      <div className="flex items-center">
        {/* Icons group */}
        <div className="flex items-center gap-3">
        <Link href="/products" aria-label="Search" className="p-1 hover:opacity-80">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </Link>
        <Link href="/products" aria-label="Wishlist" className="p-1 hover:opacity-80">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black">
            <path d="M20.8 11.1c0 5.4-8.8 9.9-8.8 9.9S3.2 16.5 3.2 11.1c0-2.7 2.2-4.9 4.9-4.9 1.8 0 3.4.9 4.4 2.2 1-1.3 2.6-2.2 4.4-2.2 2.7 0 4.9 2.2 4.9 4.9z" />
          </svg>
        </Link>
        <Link href="/lookbook" aria-label="Ideas" className="p-1 hover:opacity-80">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black">
            <path d="M9 18h6" />
            <path d="M12 2a7 7 0 00-7 7c0 2.8 1.8 4.1 3 5 .6.5 1 1.2 1 2h6c0-.8.4-1.5 1-2 1.2-.9 3-2.2 3-5a7 7 0 00-7-7z" />
          </svg>
        </Link>
        </div>

        {/* Pills */}
        <div className="flex items-center gap-4 ml-5">
        <Link
          href="/privacy"
          className="h-8 px-4 rounded-full border border-[#d9d9d9] text-[12px] font-medium text-black hover:bg-black/5"
        >
          LOG IN
        </Link>
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="h-8 px-4 rounded-full border border-[#d9d9d9] text-[12px] font-medium text-black hover:bg-black/5"
        >
          MENU
        </button>
        </div>
      </div>

      {/* Overlay menu with existing navigation links */}
      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 bg-black/20"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-4 top-14 sm:right-6 lg:right-8 w-64 rounded-md border border-line bg-background shadow-sm">
            <nav className="p-3 text-sm">
              <ul className="space-y-2">
                <li><Link href="/collections" onClick={() => setOpen(false)}>Collections</Link></li>
                <li><Link href="/products?category=women" onClick={() => setOpen(false)}>Women</Link></li>
                <li><Link href="/products?category=men" onClick={() => setOpen(false)}>Men</Link></li>
                <li><Link href="/products?category=accessories" onClick={() => setOpen(false)}>Accessories</Link></li>
                <li><Link href="/lookbook" onClick={() => setOpen(false)}>Lookbook</Link></li>
                <li><Link href="/guides" onClick={() => setOpen(false)}>Guides</Link></li>
                <li><Link href="/cart" onClick={() => setOpen(false)} aria-label="Cart">Cart</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}