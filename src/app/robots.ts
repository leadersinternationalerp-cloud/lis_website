import type { MetadataRoute } from "next";
import { PRIMARY_DOMAIN } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: ["Googlebot", "Bingbot", "Applebot", "Slurp", "DuckDuckBot"],
        allow: "/",
      },
    ],
    sitemap: `${PRIMARY_DOMAIN}/sitemap.xml`,
    host: PRIMARY_DOMAIN,
  };
}
