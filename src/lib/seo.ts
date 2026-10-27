import type { Metadata } from "next";
import { site } from "./content";

import { resolveSrc } from "./image";

/** Vercel tells us the deployed host at build time, so the sitemap is correct even
 *  before NEXT_PUBLIC_SITE_URL is set; override it when you have a real domain. */
export const SITE_URL = (() => {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);
  return (fromEnv ?? "http://localhost:3000").replace(/\/$/, "");
})();

export function absolute(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function buildMetadata(input: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
} = {}): Metadata {
  const description = input.description ?? site.seo.description;
  const title = input.title ? `${input.title}` : site.seo.siteName;
  const image = resolveSrc(input.image ?? site.seo.openGraphImage);
  return {
    title: input.title ? { absolute: title } : { default: site.seo.siteName, template: site.seo.titleTemplate },
    description,
    keywords: site.seo.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: input.path ?? "/" },
    openGraph: {
      type: "website",
      siteName: site.seo.siteName,
      title,
      description,
      url: absolute(input.path ?? "/"),
      images: image ? [{ url: absolute(image), width: 1408, height: 768, alt: site.school.name }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
    other: { "geo.region": "TZ-11", "geo.placename": site.location.label },
  };
}

export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    name: site.school.name,
    alternateName: site.school.shortName,
    description: site.seo.description,
    foundingDate: String(site.school.established),
    url: absolute("/"),
    email: site.contact.email,
    telephone: site.contact.phoneDisplay,
    motto: site.school.crestMotto,
    image: absolute(resolveSrc(site.seo.openGraphImage)),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.street ?? "",
      addressLocality: site.location.city ?? "",
      addressRegion: site.location.area ?? "",
      addressCountry: site.location.country ?? "TZ",
      postalCode: site.location.postalHint ?? "",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.location.lat, longitude: site.location.lng },
    sameAs: site.socials.map((link) => link.href),
    department: [
      { "@type": "EducationalOrganization", name: "Baby Class & Nursery (KG1 & KG2)", url: absolute("/academics#pre-primary") },
      { "@type": "EducationalOrganization", name: "NECTA Primary Wing (Grades 1–6)", url: absolute("/academics#necta-primary") },
      { "@type": "EducationalOrganization", name: "Cambridge International Wing (Years 1–6)", url: absolute("/academics#cambridge-primary") },
      { "@type": "EducationalOrganization", name: "Madrasa, Languages & Leadership", url: absolute("/academics#languages-values") },
    ],
  };
}

