import type { Metadata } from "next";
import { site } from "./content";
import { resolveSrc } from "./image";

/**
 * Official canonical production domain.
 * Ensures all canonical tags, sitemaps, JSON-LD schemas, and OpenGraph URLs
 * point directly to the custom domain on Vercel or cPanel.
 */
export const PRIMARY_DOMAIN = "https://leaderinternationalschool.ac.tz";

export const SITE_URL = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  return PRIMARY_DOMAIN;
})();

export function absolute(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  const base = process.env.NODE_ENV === "development" ? SITE_URL : PRIMARY_DOMAIN;
  return `${base}${path.startsWith("/") ? "" : "/"}${path}`;
}

export function buildMetadata(input: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
} = {}): Metadata {
  const description = input.description ?? site.seo.description;
  const canonicalUrl = absolute(input.path ?? "/");
  const image = resolveSrc(input.image ?? site.seo.openGraphImage);
  const pageTitle = input.title ? `${input.title} | ${site.seo.siteName} Zanzibar` : `${site.seo.siteName} — ${site.school.tagline}`;

  return {
    title: input.title ? input.title : { default: pageTitle, template: site.seo.titleTemplate },
    description,
    keywords: site.seo.keywords,
    metadataBase: new URL(PRIMARY_DOMAIN),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_TZ",
      alternateLocale: ["sw_TZ", "en_US", "en_GB"],
      siteName: site.seo.siteName,
      title: pageTitle,
      description,
      url: canonicalUrl,
      images: image ? [{ url: absolute(image), width: 1408, height: 768, alt: `${site.school.name} (LIS) Learners` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: image ? [absolute(image)] : undefined,
    },
    other: {
      "geo.region": "TZ-11",
      "geo.placename": site.location.label,
      "geo.position": `${site.location.lat};${site.location.lng}`,
      ICBM: `${site.location.lat}, ${site.location.lng}`,
    },
  };
}

/**
 * Rich Schema.org markup for Search Engines:
 * Combines School / EducationalOrganization with WebSite schema to explicitly register:
 * - "LIS"
 * - "lis"
 * - "LEADERS INTERNATIONAL SCHOOL"
 * - "LEADERS SCHOOL"
 * - "Leaders School"
 * - "Leaders School Zanzibar"
 * as official alternate names and brand aliases pointing to https://leaderinternationalschool.ac.tz
 */
export function schoolJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["School", "EducationalOrganization"],
    "@id": `${PRIMARY_DOMAIN}/#school`,
    name: site.school.name,
    alternateName: [
      "LIS",
      "lis",
      "LEADERS INTERNATIONAL SCHOOL",
      "LEADERS SCHOOL",
      "Leaders School",
      "Leaders School Zanzibar",
      "LIS Zanzibar",
      "Leaders International School Zanzibar",
      "Leaders Capital School",
    ],
    legalName: site.school.legalName,
    description: site.seo.description,
    foundingDate: String(site.school.established),
    url: PRIMARY_DOMAIN,
    email: site.contact.email,
    telephone: site.contact.phoneDisplay,
    motto: site.school.crestMotto,
    logo: absolute("/logo.png"),
    image: absolute(resolveSrc(site.seo.openGraphImage)),
    priceRange: "TZS",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.location.street ?? "",
      addressLocality: site.location.city ?? "",
      addressRegion: site.location.area ?? "",
      addressCountry: site.location.country ?? "TZ",
      postalCode: site.location.postalHint ?? "",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.location.lat,
      longitude: site.location.lng,
    },
    sameAs: [
      PRIMARY_DOMAIN,
      "https://leaderscapitalschool.dike.co.tz",
      ...site.socials.map((link) => link.href).filter(Boolean),
    ],
    department: [
      {
        "@type": "EducationalOrganization",
        name: "Baby Class & Nursery (KG1 & KG2)",
        url: absolute("/academics#pre-primary"),
        description: "Early childhood care, play-based phonics, and numeracy foundation in Kisakasaka, Zanzibar.",
      },
      {
        "@type": "EducationalOrganization",
        name: "NECTA Primary Wing (Grades 1–6)",
        url: absolute("/academics#necta-primary"),
        description: "Tanzanian national primary curriculum taught to the highest academic depth.",
      },
      {
        "@type": "EducationalOrganization",
        name: "Cambridge International Wing (Years 1–6)",
        url: absolute("/academics#cambridge-primary"),
        description: "Cambridge Assessment International Education Primary stream for global academic readiness.",
      },
      {
        "@type": "EducationalOrganization",
        name: "Other Curriculum, Languages & Character Guidance",
        url: absolute("/academics#languages-values"),
        description: "Arabic, Swahili heritage, English fluency, daily timetabled other curriculum and leadership.",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${PRIMARY_DOMAIN}/#website`,
    url: PRIMARY_DOMAIN,
    name: "Leaders International School",
    alternateName: [
      "LIS",
      "lis",
      "LEADERS INTERNATIONAL SCHOOL",
      "LEADERS SCHOOL",
      "Leaders School",
      "Leaders School Zanzibar",
      "LIS Zanzibar",
    ],
    publisher: {
      "@id": `${PRIMARY_DOMAIN}/#school`,
    },
    inLanguage: ["en-TZ", "sw-TZ"],
  };
}


