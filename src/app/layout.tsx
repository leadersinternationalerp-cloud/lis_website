import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import { schoolJsonLd, SITE_URL, absolute } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: { default: `${site.seo.siteName} — ${site.school.tagline}`, template: site.seo.titleTemplate },
  description: site.seo.description,
  keywords: site.seo.keywords,
  applicationName: site.school.name,
  authors: [{ name: site.school.name }],
  icons: { icon: "/crest.svg", apple: "/crest.svg" },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    siteName: site.seo.siteName,
    title: `${site.seo.siteName} — ${site.school.tagline}`,
    description: site.seo.description,
    images: site.seo.openGraphImage ? [{ url: absolute(site.seo.openGraphImage), width: 1408, height: 768, alt: site.school.name }] : undefined,
  },
  twitter: { card: "summary_large_image" },
  other: { "geo.region": "TZ-11", "geo.placename": site.location.label },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schoolJsonLd()) }}
        />
      </body>
    </html>
  );
}
