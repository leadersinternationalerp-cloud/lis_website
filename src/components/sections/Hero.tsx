import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import type { SiteConfig } from "@/lib/types";

export function Hero({ site }: { site: SiteConfig }) {
  const { hero, stats } = site;
  return (
    <section className="relative isolate overflow-hidden bg-white pb-16 pt-10 lg:pb-24 lg:pt-14">
      {/* layered background: navy wedge + soft paper wash */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[78%]">
        <div className="absolute inset-0 bg-[radial-gradient(120%_140%_at_-10%_0%,#0b3f7f_0%,#00275c_46%,#02132c_100%)] [clip-path:polygon(0_0,100%_0,100%_74%,74%_100%,0_92%)]" />
        <div className="absolute inset-0 opacity-[.5] [clip-path:polygon(0_0,100%_0,100%_74%,74%_100%,0_92%)] [background-image:linear-gradient(to_right,rgb(255_255_255/.05)_1px,transparent_1px)] [background-size:78px_100%]" />
      </div>
      <div className="pointer-events-none absolute -right-24 top-10 -z-10 h-[460px] w-[460px] rounded-full bg-gold-500/10 blur-3xl" />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-10">
        <div className="reveal-mask max-w-xl">
          <p className="eyebrow eyebrow-gold mb-5 flex items-center gap-3">
            <span className="h-px w-9 bg-gold-400/80" />
            {hero.eyebrow}
          </p>
          <h1 className="display text-[clamp(2.6rem,7.2vw,4.4rem)] text-white">
            <span>{hero.title}</span>
            {hero.highlight ? (
              <span className="mt-1 block text-gold-400">
                <span className="rule-gold">{hero.highlight}</span>
              </span>
            ) : null}
          </h1>
          <p className="mt-6 text-[1.06rem] leading-relaxed text-navy-100/90">{hero.lead}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {hero.buttons.map((b) => (
              <ButtonLink key={b.href} href={b.href} variant={b.variant === "gold" ? "gold" : "outline"}>
                {b.label}
              </ButtonLink>
            ))}
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-6">
            {(hero.badges ?? []).map((b) => (
              <li key={b.text} className="flex items-center gap-2 text-[.85rem] font-semibold text-navy-100">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-gold-300 ring-1 ring-white/15">
                  <Icon name={b.icon} size={14} />
                </span>
                {b.text}
              </li>
            ))}
          </ul>
        </div>

        {/* photo with orbiting result chips */}
        <Reveal className="relative">
          <div className="hero-photo kenburns relative aspect-[4/3.05] w-full">
            <Img src={hero.image} alt={hero.imageAlt ?? `${site.school.name} students`} priority sizes="(max-width:1024px) 92vw, 46vw" cdnWidth={1200} className="object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(200deg,transparent_55%,rgb(2_19_44_.55)_100%)]" />
            <div className="hero-sheen" />
          </div>

          <span className="pointer-events-none absolute -left-7 -top-7 hidden h-28 w-28 lg:block">
            <svg viewBox="0 0 120 120" className="h-full w-full animate-orbit text-gold-300" aria-hidden="true">
              <defs><path id="orbit-path" d="M60 60 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0" /></defs>
              <text fill="currentColor" style={{ fontFamily: "var(--font-display)", fontSize: 11.5, fontWeight: 700, letterSpacing: "3.4px" }}>
                <textPath href="#orbit-path" startOffset="0">LEARN · GROW · ACHIEVE · LIS · </textPath>
              </text>
            </svg>
            <span className="absolute inset-[26%] grid place-items-center rounded-full bg-navy-900/85 text-gold-300 ring-1 ring-gold-400/40 backdrop-blur">
              <Icon name="graduation" size={20} />
            </span>
          </span>

          <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-hairline bg-white/95 p-3.5 shadow-card backdrop-blur sm:left-auto sm:right-4 sm:top-auto sm:w-[268px]">
            <div className="flex items-center gap-3">
              <span className="icon-chip !h-11 !w-11"><Icon name="trophy" size={19} /></span>
              <div className="min-w-0">
                <p className="font-display text-[1.55rem] font-extrabold leading-none text-navy-900">{stats?.[2]?.value}{stats?.[2]?.suffix}</p>
                <p className="mt-1 truncate text-[.78rem] font-semibold uppercase tracking-[.1em] text-navy-500">{stats?.[2]?.label}</p>
              </div>
            </div>
            <p className="mt-2.5 border-t border-hairline pt-2.5 text-[.8rem] text-slate-body">{stats?.[2]?.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
