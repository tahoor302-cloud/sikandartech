import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
    imageSizes: [96, 160, 256, 384, 512],
    remotePatterns: [
      // Add your CDN / commerce backend image host here, e.g.
      // { protocol: "https", hostname: "cdn.supermimic.net" },
    ],
  },
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
