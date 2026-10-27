"use client";
import { useMemo, useState } from "react";
import { NewsCard } from "@/components/sections/NewsCard";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";
import type { NewsItem } from "@/lib/types";

export function NewsFilter({ items }: { items: NewsItem[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.category)))], [items]);
  const [active, setActive] = useState("All");
  const [year, setYear] = useState<string>("All");
  const years = useMemo(() => ["All", ...Array.from(new Set(items.map((i) => i.date.slice(0, 4))))], [items]);

  const list = items.filter((i) => (active === "All" || i.category === active) && (year === "All" || i.date.startsWith(year)));

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-hairline pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setActive(c)} aria-pressed={active === c}
                    className={cx("rounded-full border px-3.5 py-1.5 font-display text-[.84rem] font-semibold transition", active === c ? "border-navy-800 bg-navy-800 text-white" : "border-hairline bg-white text-navy-700 hover:bg-navy-50")}>
              {c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-[.82rem] font-semibold text-navy-600">
          <Icon name="calendar" size={15} /> Year
          <select value={year} onChange={(e) => setYear(e.target.value)} className="rounded-full border border-hairline bg-white px-3 py-1.5 text-[.84rem] font-semibold text-navy-800">
            {years.map((y) => <option key={y}>{y}</option>)}
          </select>
        </label>
      </div>
      <p className="mt-4 text-[.85rem] text-slate-body">Showing {list.length} of {items.length} stories.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {list.map((item, i) => (
          <div key={item.slug} className={i === 0 && active === "All" && year === "All" ? "md:col-span-2 xl:col-span-2" : ""}>
            <NewsCard item={item} size={i === 0 && active === "All" && year === "All" ? "wide" : "stack"} />
          </div>
        ))}
      </div>
      {list.length === 0 ? <p className="mt-8 rounded-2xl border border-dashed border-navy-200 bg-navy-50 p-8 text-center text-navy-700">No stories in this category yet.</p> : null}
    </div>
  );
}
