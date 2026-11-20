import type { Metadata } from "next";
import { academics, contact, faq, site } from "./content";
import { resolveSrc } from "./image";
import type { NewsItem } from "./types";

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
  type?: "website" | "article";
  publishedTime?: string;
  section?: string;
} = {}): Metadata {
  const description = input.description ?? site.seo.description;
  const canonicalUrl = absolute(input.path ?? "/");
  const image = resolveSrc(input.image ?? site.seo.openGraphImage);
  const pageTitle = input.title
    ? `${input.title} | ${site.seo.siteName} Zanzibar`
    : "Leaders International School (LIS) — Leaders School Zanzibar | NECTA & Cambridge";
  const ogType = input.type ?? "website";

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
      type: ogType,
      locale: "en_TZ",
      alternateLocale: ["sw_TZ", "en_US", "en_GB"],
      siteName: site.seo.siteName,
      title: pageTitle,
      description,
      url: canonicalUrl,
      images: image ? [{ url: absolute(image), width: 1408, height: 768, alt: `${site.school.name} (LIS) Learners` }] : undefined,
      ...(ogType === "article"
        ? {
            publishedTime: input.publishedTime,
            section: input.section,
            authors: [site.school.name],
          }
        : {}),
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
 * Safely serializes JSON-LD payloads for inline `<script type="application/ld+json">` tags,
 * escaping `<` as `\u003c` per Next.js official JSON-LD guidelines.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
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
    logo: {
      "@type": "ImageObject",
      "@id": `${PRIMARY_DOMAIN}/#logo`,
      url: absolute("/logo.png"),
      contentUrl: absolute("/logo.png"),
      width: 512,
      height: 512,
      caption: site.school.name,
    },
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
      ...site.socials
        .map((link) => link.href)
        .filter((href) => {
          if (!href) return false;
          try {
            const url = new URL(href);
            return url.pathname.replace(/\//g, "").length > 0;
          } catch {
            return false;
          }
        }),
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
    url: `${PRIMARY_DOMAIN}/`,
    name: site.seo.siteName,
    alternateName: [
      "Leaders International School",
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

/**
 * Generates Schema.org BreadcrumbList JSON-LD for structured navigation trails in search results.
 */
export function breadcrumbJsonLd(crumbs: { label: string; href?: string }[]) {
  const items = [{ label: "Home", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absolute(crumb.href) } : {}),
    })),
  };
}

/**
 * Generates Schema.org FAQPage JSON-LD from FAQ groups.
 */
export function faqPageJsonLd() {
  const questions = faq.groups.flatMap((group) => group.items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absolute("/faq")}#faq`,
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

/**
 * Generates Schema.org NewsArticle JSON-LD for school news & announcements.
 */
export function newsArticleJsonLd(item: NewsItem, articleBody?: string) {
  const url = absolute(`/news/${item.slug}`);
  const imageUrl = absolute(resolveSrc(item.image ?? site.seo.openGraphImage));
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: item.title,
    description: item.excerpt,
    image: [imageUrl],
    datePublished: item.date,
    dateModified: item.date,
    articleSection: item.category,
    ...(articleBody ? { articleBody } : {}),
    inLanguage: "en-TZ",
    author: {
      "@type": "EducationalOrganization",
      "@id": `${PRIMARY_DOMAIN}/#school`,
      name: site.school.name,
      url: PRIMARY_DOMAIN,
    },
    publisher: {
      "@type": "EducationalOrganization",
      "@id": `${PRIMARY_DOMAIN}/#school`,
      name: site.school.name,
      logo: {
        "@type": "ImageObject",
        url: absolute("/logo.png"),
      },
    },
  };
}

/**
 * Generates Schema.org ItemList of Course entities for LIS Academic wings.
 */
export function coursesJsonLd() {
  const ageMap: Record<string, string> = {
    "pre-primary": "2.5-5",
    "necta-primary": "6-12",
    "cambridge-primary": "5-11",
    "languages-values": "2.5-12",
  };

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${absolute("/academics")}#courses`,
    name: `${site.school.name} Academic Programmes`,
    description: academics.intro,
    itemListElement: academics.levels.map((level, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Course",
        "@id": `${absolute("/academics")}#${level.id}`,
        url: `${absolute("/academics")}#${level.id}`,
        name: `${level.name} (${level.ages})`,
        description: level.summary,
        image: absolute(resolveSrc(level.image)),
        typicalAgeRange: ageMap[level.id] ?? "3-12",
        inLanguage: ["en", "sw", "ar"],
        teaches: level.subjects,
        provider: {
          "@type": "School",
          "@id": `${PRIMARY_DOMAIN}/#school`,
          name: site.school.name,
          sameAs: PRIMARY_DOMAIN,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "onsite",
          inLanguage: ["en", "sw", "ar"],
          location: {
            "@type": "Place",
            name: `${site.school.name} — ${site.location.label}`,
            address: {
              "@type": "PostalAddress",
              streetAddress: site.location.street ?? "",
              addressLocality: site.location.city ?? "",
              addressRegion: site.location.area ?? "",
              addressCountry: site.location.country ?? "TZ",
            },
          },
        },
      },
    })),
  };
}

/**
 * Generates Schema.org JobPosting objects for active teacher & staff recruitment on /contact.
 */
export function jobPostingsJsonLd() {
  const roles = [
    {
      id: "cambridge-wing-teachers",
      title: "Cambridge Wing Primary Teachers (English, Art & Design, Mathematics/Science, Humanities, PE/Global Perspectives)",
      occupationalCategory: "25-2021.00",
    },
    {
      id: "general-wing-teachers",
      title: "Primary & Pre-Primary School Teachers (All Subjects — NECTA & Nursery)",
      occupationalCategory: "25-2021.00",
    },
    {
      id: "school-accountant",
      title: "School Accountant",
      occupationalCategory: "13-2011.00",
    },
    {
      id: "school-receptionist",
      title: "Front Desk Receptionist & Administrative Assistant",
      occupationalCategory: "43-4171.00",
    },
    {
      id: "media-it-officer",
      title: "Media & IT Officer",
      occupationalCategory: "15-1232.00",
    },
  ];

  return roles.map((role, index) => {
    const rawOpening = contact.careers.openings[index] ?? role.title;
    return {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      "@id": `${absolute("/contact")}#job-${role.id}`,
      title: role.title,
      description: `${rawOpening}. ${contact.careers.text} Requirements: ${contact.careers.requirements.join(", ")}. Apply by sending your CV and academic certificates to ${contact.careers.email} or ${contact.careers.altEmail}.`,
      datePosted: "2026-11-01",
      validThrough: "2026-12-04T23:59:59+03:00",
      employmentType: "FULL_TIME",
      directApply: true,
      occupationalCategory: role.occupationalCategory,
      hiringOrganization: {
        "@type": "EducationalOrganization",
        "@id": `${PRIMARY_DOMAIN}/#school`,
        name: site.school.name,
        sameAs: PRIMARY_DOMAIN,
        logo: absolute("/logo.png"),
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.location.street ?? "Kisakasaka, near Kombeni",
          addressLocality: site.location.city ?? "Zanzibar Urban/West",
          addressRegion: site.location.area ?? "Wilaya Magharibi 'B'",
          postalCode: site.location.postalHint ?? "P.O. Box 1455, Zanzibar",
          addressCountry: "TZ",
        },
      },
    };
  });
}


