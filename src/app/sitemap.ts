import type { MetadataRoute } from "next";
import { getNews } from "@/lib/content";
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

  const posts = await getNews();
  const newsEntries = posts.map((post) => {
    const parsedDate = post.date ? new Date(post.date) : now;
    const lastModified = Number.isNaN(parsedDate.getTime()) ? now : parsedDate;
    return {
      url: absolute(`/news/${post.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    };
  });

  return [...statics, ...newsEntries];
}
