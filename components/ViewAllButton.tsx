"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

export default function ViewAllButton({
  href,
  ariaLabel,
  analyticsName,
  className = "",
}: {
  href: string;
  ariaLabel: string;
  analyticsName: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dest = useMemo(() => {
    return buildTargetUrl(href, new URLSearchParams(params.toString()));
  }, [href, params]);

  

  const handleClick = () => {
    setError(null);
    setLoading(true);
    trackEvent("view_all_click", {
      section: analyticsName,
      category: analyticsName,
      from: pathname,
      to: dest,
      query: params.toString(),
    });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setError("Failed to load. Try again.");
      setLoading(false);
      trackEvent("view_all_click_error", { section: analyticsName, from: pathname, to: dest });
    }, 8000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Link
      href={dest}
      prefetch
      aria-label={ariaLabel}
      aria-busy={loading ? "true" : "false"}
      className={`inline-flex h-8 w-[96px] items-center justify-center rounded-full btn-secondary px-4 text-center text-[12px] font-medium whitespace-nowrap transition-colors ${className}`}
      onClick={handleClick}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            className="animate-spin"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" opacity="0.9" />
          </svg>
          Loading
        </span>
      ) : (
        error ? (
          <span role="alert" aria-live="polite">Try Again</span>
        ) : (
          "View All"
        )
      )}
    </Link>
  );
}

export function buildTargetUrl(href: string, params: URLSearchParams) {
  const base = "https://example.local";
  const url = new URL(href, base);
  const merged = new URLSearchParams(url.search);
  for (const [key, value] of params.entries()) {
    if (!merged.has(key)) merged.set(key, value);
  }
  const qs = merged.toString();
  return qs ? `${url.pathname}?${qs}` : url.pathname;
}