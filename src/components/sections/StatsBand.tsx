import { CountUp } from "@/components/client/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteConfig } from "@/lib/types";

export function StatsBand({ site }: { site: SiteConfig }) {
  return (
    <section className="paper relative overflow-hidden border-y border-hairline py-14 lg:py-16">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_1px_1px,rgb(0_39_92/.08)_1px,transparent_0)] [background-size:22px_22px] opacity-70" />
      <div className="shell relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {site.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 90} className="group relative">
            <span className="absolute -left-4 top-1 hidden font-display text-[3.4rem] font-extrabold leading-none text-navy-100 lg:block">0{i + 1}</span>
            <p className="font-display text-[2.7rem] font-extrabold leading-none tracking-[-.03em] text-navy-800 transition-colors group-hover:text-gold-600">
              <CountUp value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2.5 font-display text-[.95rem] font-bold text-navy-900">{s.label}</p>
            {s.note ? <p className="mt-1 text-[.85rem] text-slate-body">{s.note}</p> : null}
            <span className="mt-3 block h-[3px] w-10 rounded-full bg-gold-400 transition-all duration-500 group-hover:w-16" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
