"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cx, initials } from "@/lib/utils";

export function Testimonials({ items }: { items: { quote: string; name: string; role?: string }[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);
  const go = useCallback((next: number) => setIndex(((next % items.length) + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer.current = window.setTimeout(() => go(index + 1), 7000);
    return () => { if (timer.current) window.clearTimeout(timer.current); };
  }, [index, paused, go, items.length]);

  if (!items.length) return null;
  return (
    <section className="py-16 lg:py-20">
      <div className="shell">
        <div
          className="card relative overflow-hidden !rounded-[26px] !border-navy-100 p-8 lg:p-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span className="pointer-events-none absolute -right-6 -top-8 text-navy-100"><Icon name="quote" size={150} /></span>
          <div className="relative grid gap-8 lg:grid-cols-[1fr_260px] lg:items-end">
            <div aria-live="polite">
              <div key={index} className="animate-[riseIn_.6s_cubic-bezier(.2,.7,.2,1)_both]">
                <blockquote className="max-w-2xl font-display text-[1.25rem] font-medium leading-[1.5] text-navy-900 lg:text-[1.5rem]">
                  “{items[index]?.quote}”
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-800 font-display text-[.85rem] font-bold text-gold-300">{initials(items[index]?.name ?? "")}</span>
                  <span>
                    <span className="block font-display text-[.98rem] font-bold text-navy-900">{items[index]?.name}</span>
                    {items[index]?.role ? <span className="block text-[.85rem] text-slate-body">{items[index].role}</span> : null}
                  </span>
                </figcaption>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button key={i} type="button" onClick={() => go(i)} aria-label={`Show testimonial ${i + 1}`} aria-current={i === index}
                          className={cx("h-2.5 rounded-full transition-all", i === index ? "w-8 bg-gold-500" : "w-2.5 bg-navy-200 hover:bg-navy-300")} />
                ))}
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(index - 1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-navy-700 transition hover:border-navy-400 hover:bg-navy-50"><Icon name="arrow-left" size={17} /></button>
                <button type="button" onClick={() => go(index + 1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-navy-700 transition hover:border-navy-400 hover:bg-navy-50"><Icon name="arrow-right" size={17} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
