import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteConfig } from "@/lib/types";

export function FeatureStrip({ site }: { site: SiteConfig }) {
  return (
    <section className="relative z-10 -mt-4 pb-4 lg:-mt-12 lg:pb-0">
      <div className="shell">
        <Reveal className="card grid overflow-hidden !rounded-[22px] !border-white/70 lg:grid-cols-4">
          {site.features.map((f, i) => {
            const inner = (
              <>
                <span className={i % 2 === 1 ? "icon-chip icon-chip--gold" : "icon-chip"}>
                  <Icon name={f.icon} size={22} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[1.02rem] font-bold text-navy-900">{f.title}</span>
                  <span className="mt-1.5 block text-[.9rem] leading-relaxed text-slate-body">{f.text}</span>
                  {f.href ? (
                    <span className="mt-2.5 inline-flex items-center gap-1.5 font-display text-[.8rem] font-bold uppercase tracking-[.12em] text-navy-600 transition group-hover:text-gold-600">
                      Learn more <Icon name="arrow-right" size={13} />
                    </span>
                  ) : null}
                </span>
              </>
            );
            return (
              <div key={f.title} className="group relative">
                {i > 0 ? <span className="absolute inset-y-5 left-0 hidden w-px bg-hairline lg:block" /> : null}
                {f.href ? (
                  <Link href={f.href} className="flex h-full flex-col gap-3.5 p-6 transition hover:bg-navy-50/60 lg:gap-4 lg:p-7">
                    {inner}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col gap-3.5 p-6 lg:gap-4 lg:p-7">{inner}</div>
                )}
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
