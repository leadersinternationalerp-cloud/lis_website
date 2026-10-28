/**
 * Optional headless-CMS layer (Sanity).
 *
 * The site is fully functional with NO CMS: content is read from /content/*.json.
 * Set NEXT_PUBLIC_SANITY_PROJECT_ID (see .env.example) and the matching document
 * types are read from Sanity instead, with the JSON files acting as the fallback
 * whenever a query fails or a type is empty — a half-configured CMS can never
 * take the website down.
 */
import { createClient } from "@sanity/client";
import type { Block, Gallery, NewsItem, ResourceDoc } from "./types";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "x9pcz7mh";
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const sanityApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-02-19";

export const cmsEnabled = /^[a-z0-9-]+$/i.test(sanityProjectId.trim()) && sanityProjectId.trim().length >= 6;

const client = cmsEnabled
  ? createClient({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      apiVersion: sanityApiVersion,
      useCdn: true,
    })
  : null;

/** Never let a CMS problem break a page. */
async function safe<T>(run: () => Promise<T>, label: string): Promise<T | null> {
  if (!client) return null;
  try {
    return (await run()) ?? null;
  } catch (error) {
    console.warn(`[cms] "${label}" failed — falling back to /content files.`, (error as Error).message);
    return null;
  }
}

const NEWS_QUERY = `*[_type == "news"] | order(date desc) {
  "slug": coalesce(slug.current, _id),
  title,
  "category": coalesce(category, "News"),
  date,
  "excerpt": coalesce(excerpt, title),
  "image": image.asset->url,
  "imageAlt": image.alt,
  featured,
  body
}`;

const PHOTO_QUERY = `*[_type == "photo"] | order(order asc, _createdAt desc) {
  "src": image.asset->url,
  title,
  caption,
  album,
  slot
}`;

const RESOURCE_QUERY = `*[_type == "resource"] | order(category asc, title asc) {
  title,
  "category": coalesce(category, "Documents"),
  "type": coalesce(type, "file"),
  size,
  "href": file.asset->url,
  updated,
  description
}`;

/** Best-effort portable text -> our simple block model, so one renderer serves both sources. */
export function portableToBlocks(nodes: unknown): Block[] | null {
  if (!Array.isArray(nodes)) return null;
  const out: Block[] = [];
  for (const raw of nodes) {
    const node = raw as { style?: string; children?: { text?: string }[] };
    if (!node || !Array.isArray(node.children)) continue;
    const text = node.children.map((c) => c?.text ?? "").join("").trim();
    if (!text) continue;
    const style = node.style ?? "normal";
    if (/^h2/i.test(style)) out.push({ type: "h2", text });
    else if (/^h3/i.test(style)) out.push({ type: "h3", text });
    else if (style === "blockquote") out.push({ type: "quote", text });
    else out.push({ type: "p", text });
  }
  return out.length ? out : null;
}

type Loose = Record<string, unknown>;
const str = (v: unknown) => (v === undefined || v === null ? "" : String(v));

export const cms = {
  enabled: cmsEnabled,

  async news(): Promise<NewsItem[] | null> {
    const rows = await safe(() => client!.fetch<Loose[]>(NEWS_QUERY), "news");
    if (!rows?.length) return null;
    return rows.map((r) => ({
      slug: str(r.slug),
      title: str(r.title) || "Untitled",
      category: str(r.category) || "News",
      date: str(r.date),
      excerpt: str(r.excerpt),
      image: str(r.image),
      imageAlt: r.imageAlt ? str(r.imageAlt) : undefined,
      featured: Boolean(r.featured),
      body: [],
    }));
  },

  async post(slug: string): Promise<NewsItem | null> {
    const row = await safe(
      () =>
        client!.fetch<Loose | null>(
          `*[_type == "news" && (slug.current == $slug || _id == $slug)][0]{
            "slug": coalesce(slug.current, _id), title,
            "category": coalesce(category, "News"), date,
            "excerpt": coalesce(excerpt, title),
            "image": image.asset->url, "imageAlt": image.alt,
            featured, body
          }`,
          { slug },
        ),
      "post",
    );
    if (!row) return null;
    return {
      slug,
      title: str(row.title) || "Untitled",
      category: str(row.category) || "News",
      date: str(row.date),
      excerpt: str(row.excerpt),
      image: str(row.image),
      imageAlt: row.imageAlt ? str(row.imageAlt) : undefined,
      featured: Boolean(row.featured),
      body: portableToBlocks(row.body) ?? [],
    };
  },

  async photos(): Promise<Gallery["photos"] | null> {
    const rows = await safe(() => client!.fetch<Loose[]>(PHOTO_QUERY), "photos");
    if (!rows?.length) return null;
    return rows
      .filter((r) => str(r.src))
      .map((r) => ({ src: str(r.src), title: r.title ? str(r.title) : undefined, caption: r.caption ? str(r.caption) : undefined, album: r.album ? str(r.album) : undefined }));
  },

  async photoSlots(): Promise<Record<string, string>> {
    const rows = await safe(() => client!.fetch<Loose[]>(PHOTO_QUERY), "photoSlots");
    const map: Record<string, string> = {};
    if (!rows?.length) return map;
    for (const r of rows) {
      const slot = str(r.slot).trim();
      const src = str(r.src).trim();
      if (slot && src && !map[slot]) {
        map[slot] = src;
      }
    }
    return map;
  },

  async resources(): Promise<ResourceDoc[] | null> {
    const rows = await safe(() => client!.fetch<Loose[]>(RESOURCE_QUERY), "resources");
    if (!rows?.length) return null;
    return rows
      .map((r) => ({
        title: str(r.title),
        category: str(r.category) || "Documents",
        type: str(r.type) || "file",
        size: r.size ? str(r.size) : undefined,
        href: str(r.href),
        updated: r.updated ? str(r.updated) : undefined,
        description: r.description ? str(r.description) : undefined,
      }))
      .filter((d) => d.href && d.title);
  },

  /** True when the site may write application/enquiry documents to Sanity. */
  get writeEnabled() {
    return cmsEnabled && Boolean(process.env.SANITY_API_WRITE_TOKEN);
  },

  /** Create a document (application / enquiry) in the dataset. Returns the new _id. */
  async create(type: string, payload: Record<string, unknown>) {
    if (!client || !this.writeEnabled) return null;
    const id = `${type}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
    const token = process.env.SANITY_API_WRITE_TOKEN;
    const request = (client as unknown as {
      request: (options: {
        method: string;
        path: string;
        body: unknown;
        token?: string;
        tag?: string;
        allowTransparency?: boolean;
      }) => Promise<unknown>;
    }).request;
    await request({
      method: "POST",
      path: `/data/mutate/${sanityDataset}`,
      body: { mutations: [{ create: { _type: type, _id: id, ...payload } }] },
      token,
      tag: "lis.website.submit",
    });
    return id;
  },
};
