import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import type { SiteConfig } from "@/lib/types";

export function CtaBand({ site }: { site: SiteConfig }) {
  const { cta } = site;
  return (
    <section className="dark-section noise relative overflow-hidden py-16 lg:py-20">
      <div className="pointer-events-none absolute -left-20 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-[12%] h-24 w-24 animate-[floaty_11s_ease-in-out_infinite] rounded-3xl border border-sky-400/45" />
      <div className="pointer-events-none absolute bottom-[14%] right-[22%] h-12 w-12 animate-[floaty_8s_ease-in-out_infinite] rounded-full border border-sky-300/30" />
      <div className="shell relative grid items-center gap-10 lg:grid-cols-[1.25fr_.85fr]">
        <div>
          <p className="eyebrow eyebrow-sky mb-3 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-[pulseRing_2.6s_ease-out_infinite] rounded-full bg-sky-400" />
              <span className="relative h-2 w-2 rounded-full bg-sky-400" />
            </span>
            Admissions open
          </p>
          <h2 className="h2 max-w-xl text-white">{cta.title}</h2>
          <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-navy-100/90">{cta.text}</p>
        </div>
        <div className="card-flat !border-sky-300/25 !bg-white/10 p-6 backdrop-blur lg:p-7">
          <div className="flex items-center gap-2 text-sky-300">
            <Icon name="award" size={18} />
            <span className="font-display text-[.72rem] font-bold uppercase tracking-[.2em]">Next intake</span>
          </div>
          <p className="mt-3 font-display text-2xl font-extrabold text-white">January 2027 Intake (2026/2027)</p>
          <p className="mt-2 text-[.9rem] text-navy-100/85">Enrolling Baby Class, Nursery (KG1 & KG2), NECTA Grades 1–6 & Cambridge Years 1–6 · 12-month instalment plan.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonLink href={cta.primary.href} variant="gold">{cta.primary.label}</ButtonLink>
            {cta.secondary ? <ButtonLink href={cta.secondary.href} variant="outline" icon="calendar">{cta.secondary.label}</ButtonLink> : null}
          </div>
          {cta.phone ? (
            <a href={cta.phoneHref} className="mt-4 inline-flex items-center gap-2 text-[.88rem] font-semibold text-white transition hover:text-sky-300">
              <Icon name="phone" size={15} className="text-sky-300" /> Prefer to talk? {cta.phone}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
