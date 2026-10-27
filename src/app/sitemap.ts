import type { MetadataRoute } from "next";
import { getNewsSlugs } from "@/lib/content";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const statics = [
    "/", "/about", "/academics", "/admissions", "/apply", "/news", "/gallery", "/resources", "/faq", "/contact",
  ].map((path) => ({ url: absolute(path), lastModified: now, changeFrequency: "monthly" as const, priority: path === "/" ? 1 : 0.7 }));
  const posts = await getNewsSlugs();
  return [
    ...statics,
    ...posts.map((slug) => ({ url: absolute(`/news/${slug}`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.5 })),
  ];
}
