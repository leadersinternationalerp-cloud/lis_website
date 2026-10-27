import { Reveal } from "@/components/ui/Reveal";

/** Vertical timeline used for the school story and the admissions process. */
export function Timeline({ items }: { items: { title: string; text: string; label?: string; note?: string }[] }) {
  return (
    <ol className="relative grid gap-7 pl-1">
      <span className="pointer-events-none absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[linear-gradient(to_bottom,var(--color-navy-200),var(--color-gold-400),transparent)] sm:block" />
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 70} className="relative flex gap-5">
          <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy-100 bg-white font-display text-[.8rem] font-extrabold text-navy-800 shadow-soft">
            {item.label ?? String(i + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1 pb-1">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <h3 className="h3 text-navy-900">{item.title}</h3>
              {item.note ? <span className="rounded-full bg-gold-100 px-2 py-0.5 text-[.7rem] font-bold uppercase tracking-[.1em] text-gold-700">{item.note}</span> : null}
            </div>
            <p className="mt-1.5 text-[.95rem] leading-relaxed text-slate-body">{item.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
