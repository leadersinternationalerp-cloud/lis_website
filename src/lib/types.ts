/**
 * Content model for the whole site.
 * Everything here is satisfied by the JSON files in /content, and — when a CMS is
 * connected — by the mapped Sanity documents in src/lib/cms.ts.
 */

export type Link = { label: string; href: string; description?: string };
export type Button = { label: string; href: string; variant?: "gold" | "outline" | "navy" | "ghost" };

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "image"; src: string; alt?: string; caption?: string };

export type SiteConfig = {
  school: {
    name: string;
    shortName: string;
    wordmark: { line1: string; line2: string; line3: string };
    tagline: string;
    crestMotto: string;
    established: number;
    accreditation: string;
    legalName: string;
  };
  seo: {
    siteName: string;
    titleTemplate: string;
    description: string;
    keywords?: string[];
    openGraphImage?: string;
  };
  location: {
    label: string; street?: string; area?: string; city?: string; country?: string;
    postalHint?: string; lat?: number; lng?: number; googleMapsUrl?: string; osmMapUrl?: string;
  };
  contact: {
    email: string; admissionsEmail?: string; phoneDisplay: string; phoneHref: string;
    phoneAltDisplay?: string; phoneAltHref?: string; whatsappHref?: string;
    officeHours?: { days: string; hours: string }[]; termOfficeNote?: string;
  };
  socials: { platform: string; label: string; href: string }[];
  portal: { label: string; href: string; note?: string };
  notice?: { enabled?: boolean; text: string; href?: string; linkLabel?: string };
  nav: { label: string; href: string; children?: Link[] }[];
  hero: {
    eyebrow: string; title: string; highlight?: string; lead: string;
    image: string; imageAlt?: string; buttons: Button[];
    badges?: { icon: string; text: string }[];
  };
  features: { icon: string; title: string; text: string; href?: string }[];
  stats: { value: string; suffix?: string; label: string; note?: string }[];
  whyUs: {
    title: string; intro?: string; image?: string;
    points: { icon?: string; title: string; text: string }[];
  };
  testimonialTitle?: string;
  testimonials: { quote: string; name: string; role?: string }[];
  cta: {
    title: string; text: string; primary: Button; secondary?: Button;
    phone?: string; phoneHref?: string;
  };
  footer: {
    blurb: string;
    columns: { title: string; links: Link[] }[];
    downloadNote?: string; credits?: string;
  };
  quickLinks?: { label: string; href: string; icon?: string }[];
};

export type NewsItem = {
  slug: string; title: string; category: string; date: string;
  excerpt: string; image?: string; imageAlt?: string; featured?: boolean;
  body?: Block[];
};

export type GalleryAlbum = { id: string; label: string };
export type Photo = { src: string; album?: string; title?: string; caption?: string };
export type Gallery = {
  title: string; intro?: string; albums: GalleryAlbum[]; photos: Photo[]; count?: number;
  video?: { enabled?: boolean; title: string; text?: string; thumbnail?: string; href?: string };
};

export type ResourceDoc = {
  title: string; category: string; type: string; size?: string; href: string;
  updated?: string; description?: string;
};
export type TermDate = { term: string; dates: string; note?: string };
export type KeyDate = { date: string; label: string; kind?: string };
export type UniformItem = { name: string; detail: string };
export type UniformBlock = {
  title: string; intro?: string; items: UniformItem[]; buy?: string; note?: string;
  swatches?: { label: string; hex: string; text?: string }[];
};
export type Resources = {
  title: string; intro?: string; documents: ResourceDoc[]; categories: string[];
  downloadsNote?: string; termDates?: TermDate[]; keyDates?: KeyDate[]; calendarNote?: string;
  uniform?: UniformBlock;
};
