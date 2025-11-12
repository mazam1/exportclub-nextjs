import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';

type UnsplashApiPhoto = {
  id: string;
  width: number;
  height: number;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    html: string;
    download_location: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
};

type UnsplashHeroResponse = {
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
  photographerName?: string;
  photographerLink?: string;
  unsplashLink?: string;
  source: 'unsplash' | 'fallback';
};

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const fetchRandomUnsplashPhoto = unstable_cache(
  async (): Promise<UnsplashHeroResponse> => {
    if (!ACCESS_KEY) {
      // If key is missing, provide a graceful fallback
      return {
        imageUrl: '/banner-image.png',
        alt: 'Fallback hero image',
        width: 1920,
        height: 1080,
        source: 'fallback',
      };
    }

    const headers = {
      Authorization: `Client-ID ${ACCESS_KEY}`,
      'Accept-Version': 'v1',
    };

    try {
      // Request a high-quality, landscape-oriented random photo
      const res = await fetch(
        'https://api.unsplash.com/photos/random?orientation=landscape&content_filter=high',
        { headers, next: { revalidate: 3600 } }
      );

      if (!res.ok) throw new Error(`Unsplash API error: ${res.status}`);
      const photo: UnsplashApiPhoto = await res.json();

      // Track download per Unsplash API requirements
      if (photo?.links?.download_location) {
        // Fire and forget (ignore result)
        fetch(photo.links.download_location, { headers }).catch(() => {});
      }

      // Ensure minimum resolution by requesting transformed raw URL
      const rawUrl = new URL(photo.urls.raw);
      rawUrl.searchParams.set('w', '1920');
      rawUrl.searchParams.set('h', '1080');
      rawUrl.searchParams.set('q', '80'); // quality for performance
      rawUrl.searchParams.set('fm', 'jpg');
      rawUrl.searchParams.set('fit', 'crop'); // ensure 16:9 crop
      rawUrl.searchParams.set('crop', 'entropy'); // smart crop

      const altText = photo.alt_description || photo.description || 'Unsplash photo';

      return {
        imageUrl: rawUrl.toString(),
        alt: altText,
        width: 1920,
        height: 1080,
        photographerName: photo.user?.name,
        photographerLink: photo.user?.links?.html,
        unsplashLink: photo.links?.html,
        source: 'unsplash',
      };
    } catch (error) {
      // Graceful fallback on error
      return {
        imageUrl: '/banner-image.png',
        alt: 'Fallback hero image',
        width: 1920,
        height: 1080,
        source: 'fallback',
      };
    }
  },
  ['unsplash-random-hero'],
  { revalidate: 3600 }
);

export async function GET() {
  const data = await fetchRandomUnsplashPhoto();

  return NextResponse.json(data, {
    headers: {
      // Cache at the edge/CDN for an hour, allow long SWR
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}