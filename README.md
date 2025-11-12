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

## Unsplash Hero Setup

This project includes a responsive homepage hero that fetches random high-quality images from Unsplash with caching and proper attribution.

- Create a free developer account and application at https://unsplash.com/developers.
- Add your Access Key to a local env file:

```
# .env.local
UNSPLASH_ACCESS_KEY=your_access_key_here
```

- The API route `app/api/unsplash/route.ts` fetches a random landscape image, ensures minimum 1920×1080 sizing via Unsplash `raw` image parameters, and caches the result for 1 hour (`s-maxage=3600`).
- The `UnsplashHero` component (in `components/UnsplashHero.tsx`) lazy-loads the image, provides a fallback placeholder on error, sets alt text for accessibility, and shows attribution.
- Image domains for Unsplash are enabled in `next.config.ts` (`images.unsplash.com` and `plus.unsplash.com`).

### Attribution (required by Unsplash API terms)

The hero displays “Photo by [Photographer] on Unsplash” with links to the photographer profile and the photo on Unsplash. The API route also triggers the `download_location` tracking call per Unsplash requirements.

### Notes on Performance

- Uses `next/image` for automatic optimization and responsive sizing (`sizes="100vw"`).
- Requests JPEG with `q=80`, `fit=crop`, and smart `entropy` crop to suit a 16:9 hero while maintaining visual quality.
- Server-side caching prevents unnecessary API calls; client-side lazy fetching avoids work until the hero is in view.

## Style Guide

### Homepage Hero Height

- The first homepage hero (`.unsplash-hero`) must be exactly 431.89px tall.
- CSS enforces `min-height: 431.89px` and `height: 431.89px` to maintain consistency across devices.
- Overlay spacing scales proportionally with viewport using `clamp()` for `padding-block` and `padding-inline`.
- Keep `object-fit: cover` on the image to avoid content clipping while filling the container.
- When adding new hero variants, inherit the height rules or explicitly document deviations.

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
