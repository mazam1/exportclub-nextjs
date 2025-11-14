# Shared Image Strategy

This document describes the shared image reference used across Best Sellers, New Arrivals, and Essentials to ensure consistent image assets, dimensions, and performance.

## Overview

- A central registry maps product `slug` values to local images under `public/`.
- UI components call helper functions to apply overrides when rendering lists.
- Fallback behavior swaps to `/banner-image.png` if an image fails to load.

## Registry

- Location: `lib/imageRegistry.ts`
- Exports:
  - `bestSellerImageMap`: mapping of `slug -> { url, alt }`
  - `applyBestSellerImageOverride(product)` and `applyBestSellerImageOverrides(products)`

## Usage

- Best Sellers section imports `applyBestSellerImageOverride` to use shared images.
- Home page applies `applyBestSellerImageOverrides` to both New Arrivals and Essentials before rendering.
- Product cards use `CategoryImage` for consistent sizing, quality, and fallback.

## Caching & Performance

- All shared images are served from `public/` and rendered via `next/image`, enabling HTTP caching and optimized delivery.
- `CategoryImage` sets an explicit `quality` and keeps images lazy‑loaded to reduce bandwidth.
- Prefer reusing the same assets across sections to maximize cache hits.

## Update Procedure

1. Add or update entries in `bestSellerImageMap` for any new Best Seller slugs.
2. Ensure the image file exists under `public/` and has descriptive `alt` text.
3. Confirm the product appears in New Arrivals or Essentials; overrides will be applied automatically.
4. Verify on `http://localhost:3000/` that all sections show the same asset for the product.

## Monitoring

- Run Lighthouse on the home page to check image performance, caching, and LCP.
- Review browser DevTools network panel to confirm `Cache‑Control` and cache hits on repeated renders.