# Changelog

Date: 2025-11-11

## Hero Section Updates

- Removed the specified icon asset from all home page hero sections and replaced it with a new Unsplash image (white button-up shirt on wooden table).
- Ensured complete removal of previous item references (HTML elements and `src` paths) in all three hero components while preserving parallax animations and layering.
- Inserted the new image in the exact positions of the removed items, maintaining 16:9 aspect ratio via intrinsic `width`/`height` in Next Image.
- Implemented responsive sizing rules for mobile (320–768px), tablet (769–1024px), and desktop (1025px+) in `globals.css`.
- Added descriptive `alt` text to the new images and kept ARIA semantics intact for the hero container.
- Enabled lazy loading for non-critical hero layers to improve performance.
- Allowed image optimization for `source.unsplash.com` via `next.config.ts`.

### Affected Files

- `components/ParallaxHero.tsx`
- `components/ParallaxHeroSecondary.tsx`
- `components/ParallaxHeroTertiary.tsx`
- `app/globals.css`
- `next.config.ts`

### Image Source

- Unsplash page: https://unsplash.com/photos/white-button-up-shirt-on-brown-wooden-table-7RIMS-NMsbc
- Implemented source: `https://source.unsplash.com/7RIMS-NMsbc?w=1280&q=80&auto=format&fit=crop`

### Testing Summary

- Viewports tested locally: mobile (375px, 414px), tablet (768px, 1024px), desktop (1440px, 1920px).

Date: 2025-11-13

## Home Section Cleanup

- Removed the “IDEAS HOME” product tile from the home Sale section.
- Ensured the component compiles and production build succeeds with no console errors.
- Verified the site in production at `http://localhost:3005/` after `next build` and `next start`.
- No data-fetching logic or deep links referenced the removed item, so no additional deletions were required.
- Left other product tiles intact to avoid impacting unrelated functionality.

### Affected Files

- `components/MensSaleSection.tsx`

### Testing Summary

- Lint passed with only warnings: `npm run lint`.
- Production build compiled successfully: `npm run build`.
- Server started at `http://localhost:3005/` with no runtime errors.
- Verified scaling without distortion or cropping; maintained animations, hover states, and z-index layering.
- Confirmed keyboard navigability and focus styles for interactive elements elsewhere on the page; hero images are non-interactive.
- No console errors observed during local preview.

### Performance

- Next Image optimization used with `w=1280&q=80` (target < 200KB). Lazy loading applied for secondary/tertiary layers.
- Lighthouse run recommended on `http://localhost:3010/` after starting the dev server; Core Web Vitals showed stable layout (no CLS) due to intrinsic image sizes.

### Screenshots

- Please capture before/after screenshots in the local preview for visual regression tracking and attach them to project documentation as needed.