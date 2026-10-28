import type { NextConfig } from "next";

const isCpanelStatic = process.env.CPANEL_STATIC === "1";

/**
 * Leaders International School — marketing site
 * Supports both:
 *   1. Standard / cPanel Node.js server build (`npm run build`)
 *   2. Static HTML export for cPanel `public_html` (`npm run build:cpanel`)
 */
const nextConfig: NextConfig = {
  ...(isCpanelStatic
    ? {
        output: "export",
        trailingSlash: true,
      }
    : {
        async redirects() {
          return [
            {
              source: "/:path*",
              has: [{ type: "host", value: "www.leaderinternationalschool.ac.tz" }],
              destination: "https://leaderinternationalschool.ac.tz/:path*",
              permanent: true,
            },
          ];
        },
        async headers() {
          return [
            {
              source: "/(.*)",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
              ],
            },
          ];
        },
      }),
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
    unoptimized: isCpanelStatic,
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
