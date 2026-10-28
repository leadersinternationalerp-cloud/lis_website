import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { cms } from "@/lib/cms";
import { site } from "@/lib/content";
import { setSlotOverrides } from "@/lib/image";

/**
 * Revalidate so CMS edits appear without a redeploy (ignored when no CMS is set,
 * because /content JSON is baked in at build time).
 */
export const revalidate = 300;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const slots = await cms.photoSlots();
  setSlotOverrides(slots);

  return (
    <div className="flex min-h-dvh flex-col">
      <Header site={site} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer site={site} />
    </div>
  );
}
