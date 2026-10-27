import type { NextConfig } from "next";

/**
 * Leaders International School — marketing site
 * Docs: https://nextjs.org/docs/app/api-reference/config/next-config-js
 */
const nextConfig: NextConfig = {
  // Tailwind v4 through Turbopack (the create-next-app --tailwind setup).
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  // Content-driven hrefs come from JSON / the CMS, so route-name typing is disabled.
  typedRoutes: false,
  // Sanity is only used by the Studio CLI; the site reads content through @sanity/client.
  serverExternalPackages: ["sanity", "@sanity/client"],
  images: {
    // Local files in /public are used everywhere so the site works with no external services.
    // When Sanity is connected, images are served from the Sanity CDN (see src/lib/image.ts).
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/webp"],
  },
};

export default nextConfig;
