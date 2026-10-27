import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/sections/PageHero";
import { NewsFilter } from "@/components/client/NewsFilter";
import { CtaBand } from "@/components/sections/CtaBand";
import { getNews, site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "News & events",
  description: "Announcements, results and stories from Leaders International School, Zanzibar.",
  path: "/news",
});

export default async function NewsPage() {
  const items = await getNews();
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News & events"
        intro="Everything the school office publishes: results, celebrations, notices and the odd record broken on the sports field."
        image={items[0]?.image}
        crumbs={[{ label: "News & events" }]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <a href="#latest" className="btn btn-outline !py-2 !text-[.85rem]"><Icon name="chevron-down" size={15} /> Latest</a>
            <Link href="/gallery" className="btn btn-outline !py-2 !text-[.85rem]">Photo gallery</Link>
            <Link href="/resources#calendar" className="btn btn-outline !py-2 !text-[.85rem]">Calendar</Link>
          </div>
        }
      />
      <section id="latest" className="scroll-mt-28 py-14 lg:py-16">
        <div className="shell">
          <NewsFilter items={items} />
        </div>
      </section>
      <CtaBand site={site} />
    </>
  );
}
