import { FeatureStrip } from "@/components/sections/FeatureStrip";
import { GalleryPreview } from "@/components/sections/GalleryPreview";
import { Hero } from "@/components/sections/Hero";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { ProgramsPreview } from "@/components/sections/ProgramsPreview";
import { StatsBand } from "@/components/sections/StatsBand";
import { Testimonials } from "@/components/client/Testimonials";
import { WhyUs } from "@/components/sections/WhyUs";
import { CtaBand } from "@/components/sections/CtaBand";
import { UpcomingBand } from "@/components/sections/UpcomingBand";
import { getFeaturedNews, getGallery, site } from "@/lib/content";

export default async function HomePage() {
  const [news, gallery] = await Promise.all([getFeaturedNews(), getGallery()]);
  return (
    <>
      <Hero site={site} />
      <FeatureStrip site={site} />
      <ProgramsPreview />
      <WhyUs site={site} />
      <StatsBand site={site} />
      <NewsPreview items={news} />
      <GalleryPreview gallery={gallery} />
      <UpcomingBand />
      <Testimonials items={site.testimonials} />
      <CtaBand site={site} />
    </>
  );
}
