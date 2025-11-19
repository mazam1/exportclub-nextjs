const nextConfig = {
  turbopack: {
    // Ensure Turbopack uses this project as the workspace root
    root: __dirname,
  },
  images: {
    // Prefer modern WebP output for optimized delivery
    formats: ["image/webp"],
    qualities: [30, 35, 65, 75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
    ],
  },
};

export default nextConfig;
