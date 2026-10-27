"use client";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx, formatDate } from "@/lib/utils";
import type { ResourceDoc } from "@/lib/types";

export function ResourceBrowser({ documents, categories }: { documents: ResourceDoc[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return documents.filter((d) => {
      const inCategory = category === "All" || d.category === category;
      const inQuery = !q || `${d.title} ${d.description ?? ""} ${d.category}`.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [category, documents, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 border border-hairline bg-white p-4 shadow-soft lg:flex-row lg:items-center lg:justify-between lg:p-5">
        <label className="field flex-1 lg:max-w-md">
          <span className="sr-only">Search documents</span>
          <span className="relative">
            <Icon name="search" size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search documents — fees, calendar, uniform…" className="!pl-10" />
          </span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button key={c} type="button" onClick={() => setCategory(c)} aria-pressed={category === c}
                    className={cx("rounded-full border px-3 py-1.5 text-[.82rem] font-semibold transition", category === c ? "border-navy-800 bg-navy-800 text-white" : "border-hairline bg-white text-navy-700 hover:bg-navy-50")}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <ul className="mt-6 grid gap-3">
        {list.map((d) => (
          <li key={d.href + d.title}>
            <a href={d.href} download className="card group flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700 transition group-hover:bg-navy-800 group-hover:text-gold-300">
                <Icon name={d.type === "pdf" ? "file" : d.type === "sheet" ? "receipt" : "download"} size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-[1.04rem] font-bold text-navy-900 group-hover:underline">{d.title}</span>
                  <span className="rounded-full bg-gold-100 px-2 py-0.5 font-display text-[.65rem] font-bold uppercase tracking-[.12em] text-gold-700">{d.type}</span>
                  <span className="rounded-full bg-navy-50 px-2 py-0.5 text-[.68rem] font-semibold uppercase tracking-[.1em] text-navy-500">{d.category}</span>
                </span>
                {d.description ? <span className="mt-1.5 block text-[.9rem] leading-relaxed text-slate-body">{d.description}</span> : null}
                <span className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[.78rem] text-navy-400">
                  {d.size ? <span>{d.size}</span> : null}
                  {d.updated ? <span>Updated {formatDate(d.updated)}</span> : null}
                </span>
              </span>
              <span className="btn btn-quiet group-hover:!bg-navy-800 group-hover:!text-white !py-2.5 !text-[.85rem]">
                <Icon name="download" size={15} /> Download
              </span>
            </a>
          </li>
        ))}
      </ul>

      {list.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-navy-200 bg-navy-50 p-8 text-center text-navy-700">
          Nothing matches “{query}”. <button type="button" className="font-semibold underline" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button>
        </p>
      ) : null}
    </div>
  );
}
