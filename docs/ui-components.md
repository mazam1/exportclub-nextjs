# UI Components Documentation

## ViewAllButton

- Purpose: Consistent "View All" CTA with a11y, loading, and analytics.
- Import: `import ViewAllButton from "@/components/ViewAllButton";`
- Props:
  - `href`: target page, e.g. `/featured`, `/best-sellers`.
  - `ariaLabel`: accessible label, e.g. `"View all featured products"`.
  - `analyticsName`: event section key, e.g. `"featured"`, `"best_sellers"`.
  - `className` (optional): extend base styles.
- Behavior:
  - Preserves current URL query params during navigation.
  - Emits `view_all_click` via `lib/analytics.trackEvent`.
  - Shows inline spinner and sets `aria-busy="true"` while navigating.
- Styling:
  - Uses `btn-secondary` with hover and active states defined in `app/globals.css`.

## Pages

- `/featured`: Curated featured products with optional `?sort=`.
- `/best-sellers`: Curated top-selling products with optional `?sort=`.

## Testing

- Run: `npm run test`.
- Covers query-preservation via `buildTargetUrl` helper.