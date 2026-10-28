import type { MetadataRoute } from "next";
import { getNewsSlugs } from "@/lib/content";
import { absolute } from "@/lib/seo";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/admissions", priority: 0.95, changeFrequency: "weekly" },
    { path: "/apply", priority: 0.95, changeFrequency: "weekly" },
    { path: "/academics", priority: 0.9, changeFrequency: "weekly" },
    { path: "/about", priority: 0.85, changeFrequency: "weekly" },
    { path: "/resources", priority: 0.85, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.8, changeFrequency: "weekly" },
    { path: "/news", priority: 0.8, changeFrequency: "daily" },
    { path: "/gallery", priority: 0.75, changeFrequency: "weekly" },
    { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  ];

  const statics = pages.map((p) => ({
    url: absolute(p.path),
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const posts = await getNewsSlugs();
  const newsEntries = posts.map((slug) => ({
    url: absolute(`/news/${slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...statics, ...newsEntries];
}
