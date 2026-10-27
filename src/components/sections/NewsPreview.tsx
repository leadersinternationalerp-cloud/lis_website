import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { NewsCard } from "./NewsCard";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import type { NewsItem } from "@/lib/types";

export function NewsPreview({ items }: { items: NewsItem[] }) {
  if (!items.length) return null;
  const [lead, ...rest] = items;
  return (
    <section className="py-16 lg:py-20">
      <div className="shell">
        <SectionHead
          eyebrow="Latest news & updates"
          title="What is happening at LIS"
          action={
            <Link href="/news" className="btn btn-quiet group">
              All news <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <div className="mt-9 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal><NewsCard item={lead} size="wide" /></Reveal>
          <div className="grid gap-4 self-start">
            {rest.slice(0, 3).map((item, i) => (
              <Reveal key={item.slug} delay={i * 90}><NewsCard item={item} /></Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
