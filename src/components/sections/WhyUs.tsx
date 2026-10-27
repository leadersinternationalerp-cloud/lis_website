import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import type { SiteConfig } from "@/lib/types";

export function WhyUs({ site }: { site: SiteConfig }) {
  const { whyUs } = site;
  return (
    <section className="relative py-16 lg:py-24">
      <div className="shell grid items-start gap-12 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHead eyebrow="Why families choose LIS" title={whyUs.title} lead={whyUs.intro} />
          {whyUs.image ? (
            <Reveal className="relative mt-8 hidden lg:block">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[22px] rounded-bl-[86px] shadow-card">
                <Img src={whyUs.image} alt="A teacher working with pupils at LIS" cdnWidth={900} sizes="38vw" className="transition-transform duration-[1200ms] hover:scale-105" />
              </div>
              <div className="absolute -bottom-6 -right-4 w-[210px] rounded-2xl border border-hairline bg-white p-4 shadow-soft">
                <p className="flex items-center gap-2 font-display text-[.7rem] font-bold uppercase tracking-[.16em] text-navy-500">
                  <Icon name="shield" size={14} className="text-gold-600" /> Safe campus
                </p>
                <p className="mt-2 text-[.84rem] leading-snug text-slate-body">Safeguarding policy, staff screening, first aid on site all day.</p>
              </div>
            </Reveal>
          ) : null}
        </div>

        <ul className="grid gap-3.5">
          {whyUs.points.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 60}>
              <article className="card group flex gap-4 p-5 lg:p-6">
                <span className={i % 3 === 1 ? "icon-chip icon-chip--gold" : "icon-chip"}>
                  <Icon name={p.icon ?? "check"} size={20} />
                </span>
                <div>
                  <h3 className="h3 text-navy-900">{p.title}</h3>
                  <p className="mt-1.5 text-[.94rem] leading-relaxed text-slate-body">{p.text}</p>
                </div>
                <span className="ml-auto hidden self-center font-display text-[.8rem] font-bold text-navy-200 transition group-hover:text-gold-400 sm:block">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
