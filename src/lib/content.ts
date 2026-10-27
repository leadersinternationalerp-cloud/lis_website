/**
 * The content API used by every page.
 * Reads /content/*.json, and lets a connected CMS override the media collections.
 */
import localSite from "../../content/site.json";
import localAbout from "../../content/about.json";
import localAcademics from "../../content/academics.json";
import localAdmissions from "../../content/admissions.json";
import localContact from "../../content/contact.json";
import localFaq from "../../content/faq.json";
import localNews from "../../content/news.json";
import localGallery from "../../content/gallery.json";
import localResources from "../../content/resources.json";
import { cms } from "./cms";
import type { Gallery, NewsItem, Resources, SiteConfig } from "./types";

export const site = localSite as unknown as SiteConfig;
export const about = localAbout as AboutContent;
export const academics = localAcademics as AcademicsContent;
export const admissions = localAdmissions as AdmissionsContent;
export const contact = localContact as ContactContent;
export const faq = localFaq as FaqContent;
const newsItems = (localNews as { items: NewsItem[] }).items;
const gallery = localGallery as unknown as Gallery;
export const resources = localResources as unknown as Resources;

export type AboutContent = typeof localAbout;
export type AcademicsContent = typeof localAcademics;
export type AdmissionsContent = typeof localAdmissions;
export type ContactContent = typeof localContact;
export type FaqContent = typeof localFaq;

const byDateDesc = (a: NewsItem, b: NewsItem) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);

export async function getNews(limit?: number): Promise<NewsItem[]> {
  const remote = await cms.news();
  const items = (remote?.length ? remote : newsItems).slice().sort(byDateDesc);
  return limit ? items.slice(0, limit) : items;
}

export async function getFeaturedNews(): Promise<NewsItem[]> {
  const items = await getNews();
  const featured = items.filter((i) => i.featured);
  return (featured.length ? featured : items).slice(0, 3);
}

export async function getNewsSlugs() {
  return (await getNews()).map((i) => i.slug);
}

export async function getNewsPost(slug: string): Promise<NewsItem | null> {
  const remote = await cms.post(slug);
  if (remote) return remote;
  return newsItems.find((i) => i.slug === slug) ?? null;
}

export async function getNewsSiblings(slug: string) {
  const items = await getNews();
  const index = items.findIndex((i) => i.slug === slug);
  if (index === -1) return { prev: null as NewsItem | null, next: null as NewsItem | null };
  return {
    prev: index > 0 ? items[index - 1] : null,
    next: index < items.length - 1 ? items[index + 1] : null,
  };
}

export async function getGallery(): Promise<Gallery> {
  const photos = await cms.photos();
  return photos?.length ? { ...gallery, photos, count: photos.length } : gallery;
}

export async function getResources(): Promise<Resources> {
  const docs = await cms.resources();
  return docs?.length ? { ...resources, documents: docs } : resources;
}

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function isoFrom(text: string) {
  const m = /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/.exec(text);
  if (!m) return "";
  const mi = MONTHS.findIndex((name) => m[2].toLowerCase().startsWith(name));
  if (mi < 0) return "";
  return `${m[3]}-${String(mi + 1).padStart(2, "0")}-${m[1].padStart(2, "0")}`;
}

/** Upcoming dates, merged from the academic calendar and the admissions key dates. */
export function getUpcoming(count = 4) {
  const items = [
    ...(resources.keyDates ?? []),
    ...(admissions.calendar ?? []).map((c) => ({ date: isoFrom(c.date), label: c.label, kind: "Admissions" })),
  ].filter((i) => Boolean(i.date));
  return items.sort((a, b) => (a.date < b.date ? -1 : 1)).slice(0, count);
}
