import Link from "next/link";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import { cx, formatDate } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

export function NewsCard({ item, size = "row", showDate = true }: { item: NewsItem; size?: "row" | "stack" | "wide"; showDate?: boolean }) {
  if (size === "wide") {
    return (
      <Link href={`/news/${item.slug}`} className="group card grid overflow-hidden !rounded-3xl sm:grid-cols-[1.05fr_1fr]">
        <div className="relative min-h-[220px] overflow-hidden">
          <Img src={item.image} alt={item.imageAlt ?? item.title} cdnWidth={900} className="transition-transform duration-[900ms] group-hover:scale-[1.05]" sizes="(max-width: 640px) 100vw, 45vw" />
          <span className="absolute left-4 top-4 rounded-full bg-navy-900/85 px-3 py-1 font-display text-[.66rem] font-bold uppercase tracking-[.16em] text-gold-300 backdrop-blur">{item.category}</span>
        </div>
        <div className="flex flex-col justify-center gap-3 p-6 lg:p-8">
          {showDate ? <time className="text-[.78rem] font-semibold uppercase tracking-[.14em] text-navy-400">{formatDate(item.date)}</time> : null}
          <h3 className="font-display text-[1.3rem] font-bold leading-snug text-navy-900 transition group-hover:text-navy-600 lg:text-[1.45rem]">{item.title}</h3>
          <p className="text-[.95rem] leading-relaxed text-slate-body">{item.excerpt}</p>
          <span className="mt-1 inline-flex items-center gap-2 font-display text-[.86rem] font-semibold text-navy-700">
            Read the story <Icon name="arrow-right" size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    );
  }
  const stacked = size === "stack";
  return (
    <Link href={`/news/${item.slug}`} className={cx("group card flex gap-4 overflow-hidden p-4", stacked && "flex-col")}>
      <div className={cx("relative overflow-hidden rounded-xl", stacked ? "h-40 w-full" : "h-24 w-28 shrink-0")}>
        <Img src={item.image} alt={item.imageAlt ?? item.title} cdnWidth={420} className="transition-transform duration-700 group-hover:scale-110" sizes="160px" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[.72rem] font-semibold uppercase tracking-[.14em] text-navy-400">
          {showDate ? <time>{formatDate(item.date)}</time> : null}
          <span className="h-1 w-1 rounded-full bg-gold-500" />
          <span className="text-navy-600">{item.category}</span>
        </div>
        <h3 className="mt-1.5 font-display text-[1.02rem] font-bold leading-snug text-navy-900 transition group-hover:text-navy-600">{item.title}</h3>
        <p className={cx("mt-1.5 text-[.88rem] leading-relaxed text-slate-body", stacked ? "" : "line-clamp-2")}>{item.excerpt}</p>
      </div>
    </Link>
  );
}
