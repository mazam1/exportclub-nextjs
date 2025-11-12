"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

  const dest = useMemo(() => {
    const qs = params.toString();
    if (!qs) return href;
    return `${href}?${qs}`;
  }, [href, params]);

  

  const handleClick = () => {
    setLoading(true);
    trackEvent("view_all_click", {
      section: analyticsName,
      from: pathname,
      to: dest,
      query: params.toString(),
    });
  };

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
        "View All"
      )}
    </Link>
  );
}

export function buildTargetUrl(href: string, params: URLSearchParams) {
  const qs = params.toString();
  return qs ? `${href}?${qs}` : href;
}