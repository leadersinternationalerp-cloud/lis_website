import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { schoolJsonLd, websiteJsonLd, PRIMARY_DOMAIN, absolute } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(PRIMARY_DOMAIN),
  title: {
    default: "Leaders International School (LIS) — Nursery & Primary School in Zanzibar | NECTA & Cambridge",
    template: site.seo.titleTemplate,
  },
  description: site.seo.description,
  keywords: site.seo.keywords,
  applicationName: "Leaders International School (LIS)",
  authors: [{ name: "Leaders International School (LIS)", url: PRIMARY_DOMAIN }],
  creator: "Leaders International School",
  publisher: "Leaders International School",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: PRIMARY_DOMAIN,
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo.png", sizes: "108x108", type: "image/png" },
      { url: "/crest.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_TZ",
    alternateLocale: ["sw_TZ", "en_US", "en_GB"],
    siteName: "Leaders International School (LIS)",
    title: "Leaders International School (LIS) — Nursery & Primary School in Zanzibar",
    description: site.seo.description,
    url: PRIMARY_DOMAIN,
    images: site.seo.openGraphImage
      ? [{ url: absolute(site.seo.openGraphImage), width: 1408, height: 768, alt: "Leaders International School (LIS) Zanzibar Learners" }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaders International School (LIS) — Nursery & Primary School in Zanzibar",
    description: site.seo.description,
    images: site.seo.openGraphImage ? [absolute(site.seo.openGraphImage)] : undefined,
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
  other: {
    "geo.region": "TZ-11",
    "geo.placename": site.location.label,
    "geo.position": `${site.location.lat};${site.location.lng}`,
    ICBM: `${site.location.lat}, ${site.location.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#00275c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-TZ" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-900 focus:px-5 focus:py-3 focus:font-semibold focus:text-white">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([schoolJsonLd(), websiteJsonLd()]),
          }}
        />
      </body>
    </html>
  );
}
