/**
 * One place that decides how an image reference becomes a usable URL.
 * - "/media/x.jpg"      -> served from /public (works offline, and in the sandboxed preview)
 * - "https://cdn…"      -> Sanity CDN or any absolute URL, optionally resized
 */

export function resolveSrc(ref?: string | null) {
  if (!ref) return "";
  const trimmed = ref.trim();
  if (trimmed.startsWith("/") || trimmed.startsWith("http")) return trimmed;
  // Sanity asset reference like "image-<id>-1408x768-jpg"
  const m = /^image-([a-f0-9]+)-(\d+)x(\d+)-(\w+)$/.exec(trimmed);
  if (m) {
    const project = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
    return `https://cdn.sanity.io/images/${project}/${dataset}/${m[1]}-${m[2]}x${m[3]}.${m[4].toLowerCase()}`;
  }
  return trimmed;
}

/** Adds Sanity CDN resizing for CDN images; leaves /public files untouched. */
export function withFit(ref: string | undefined, width: number, quality = 80) {
  const src = resolveSrc(ref);
  if (!src || !src.includes("cdn.sanity.io")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("fit", "max");
  url.searchParams.set("q", String(quality));
  url.searchParams.set("auto", "format");
  return url.toString();
}

export const isLocal = (src: string) => src.startsWith("/");
