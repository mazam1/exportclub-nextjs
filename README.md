This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Homepage

The homepage no longer includes a hero image. Content begins with categories and featured products, ensuring a clean layout and faster initial render.

## Style Guide

- Global spacing and typography follow variables in `app/globals.css`.
- Sections use container widths tuned for large screens while remaining responsive.
- Header layout: the `Header` uses a three‑column grid `grid-cols-[1fr_auto_1fr]` so the brand logo sits at the exact horizontal center regardless of the left/right content widths. The hamburger menu is positioned in the left column; search, wishlist, profile, and cart actions sit in the right column. The header height is `h-[80px]` on mobile and `h-[100px]` from `sm` and up.
- Header transitions: interactive elements use `transition-transform` and `transition-opacity` for smooth position and visibility changes. The hamburger icon rotates slightly on open/close for user feedback.
- Media queries: the centered logo and column structure are preserved at all breakpoints via the grid template; spacing scales with `px-4 sm:px-6 lg:px-8` and logo sizes `h-16 sm:h-20 lg:h-24` for balanced visuals across devices.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Troubleshooting

### Build error: `useSearchParams()` missing Suspense boundary

- Symptom: `useSearchParams() should be wrapped in a suspense boundary at page "/products"` during `next build`.
- Root cause: A Client Component (`FilterBar`) uses `useSearchParams` and must be rendered inside a React `<Suspense>` boundary when used from an App Router page.
- Fix: Import `Suspense` in `app/products/page.tsx` and wrap `FilterBar`.

```tsx
import { Suspense } from "react";
// ...
<Suspense fallback={null}>
  <FilterBar />
</Suspense>
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
