import Link from "next/link";
import { Crest } from "@/components/ui/Crest";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Timeline } from "@/components/sections/Timeline";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { about, site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { initials } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "About us",
  description: "Leaders International School has taught Zanzibari children in Kisakasaka since 2009: Baby Class, Nursery (KG1 & KG2), NECTA Primary (Grades 1–6), and our Cambridge International Wing (Years 1–6).",
  path: "/about",
  image: "/media/gallery-culture-day.jpg",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.title}
        intro={about.hero.text}
        image={about.hero.image}
        crumbs={[{ label: "About us" }]}
        actions={
          <>
            <Link href="/admissions" className="btn btn-gold">Admissions & Fees <Icon name="arrow-right" size={16} /></Link>
            <Link href="/gallery" className="btn btn-outline">See the campus</Link>
          </>
        }
        aside={
          <div className="glass-panel relative rounded-3xl p-6 sm:p-7 shadow-lift border border-white/60">
            <div className="flex items-center gap-3.5 border-b border-navy-900/10 pb-4">
              <Crest size={60} className="drop-shadow-sm" />
              <div>
                <p className="font-display text-[1.1rem] font-extrabold text-navy-900 leading-tight">
                  {site.school.name}
                </p>
                <p className="mt-0.5 text-[.74rem] font-bold uppercase tracking-[.14em] text-sky-600">
                  {site.school.crestMotto}
                </p>
              </div>
            </div>

            <p className="mt-4 text-[.9rem] leading-relaxed text-slate-body">
              Child-centered, values-based early childhood and primary education on our purpose-built campus in Kisakasaka, Zanzibar.
            </p>

            <ul className="mt-4 grid gap-2">
              <li className="flex items-center gap-2.5 text-[.82rem] font-semibold text-navy-900">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-gold-400 text-navy-950 text-[11px] font-bold">✓</span>
                <span>Established 2009 · 15+ Years of Care</span>
              </li>
              <li className="flex items-center gap-2.5 text-[.82rem] font-semibold text-navy-900">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-sky-400/20 text-sky-700 text-[11px] font-bold ring-1 ring-sky-300">✓</span>
                <span>Dual Curricula: NECTA & Cambridge</span>
              </li>
              <li className="flex items-center gap-2.5 text-[.82rem] font-semibold text-navy-900">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-sky-400/20 text-sky-700 text-[11px] font-bold ring-1 ring-sky-300">✓</span>
                <span>Baby Class to Grade 6 / Year 6</span>
              </li>
            </ul>

            <div className="mt-5 border-t border-navy-900/10 pt-3.5 flex items-center justify-between text-[.78rem]">
              <span className="font-semibold text-navy-700">Kisakasaka, Zanzibar</span>
              <a href={site.contact.phoneHref} className="inline-flex items-center gap-1 font-display font-bold text-sky-700 hover:text-navy-900 transition">
                <Icon name="phone" size={13} /> {site.contact.phoneDisplay}
              </a>
            </div>
          </div>
        }
      />

      <section className="py-16 lg:py-20">
        <div className="shell grid gap-5 lg:grid-cols-3">
          {about.missionVision.map((m, i) => (
            <Reveal key={m.title} delay={i * 90} className={`card p-7 ${i === 1 ? "!border-navy-200 !bg-navy-50" : ""}`}>
              <span className={i % 2 ? "icon-chip icon-chip--gold" : "icon-chip"}><Icon name={m.icon} size={22} /></span>
              <h2 className="mt-5 font-display text-[1.3rem] font-bold text-navy-900">{m.title}</h2>
              <p className="mt-2.5 text-[.97rem] leading-relaxed text-slate-body">{m.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="paper border-y border-hairline py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead eyebrow="Since 2009" title={about.story.title} lead="Two classrooms in a rented hall, and a promise that nobody in the class would be invisible." />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.facts.map((f) => (
                <div key={f.label} className="card-flat px-4 py-3.5">
                  <p className="font-display text-[1.15rem] font-extrabold text-navy-900">{f.value}</p>
                  <p className="mt-0.5 text-[.78rem] font-semibold uppercase tracking-[.14em] text-navy-500">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
          <Timeline items={about.story.items.map((i) => ({ title: i.title, text: i.text, label: i.year }))} />
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="shell">
          <SectionHead eyebrow="What we stand for" title="Six values, not a poster on a wall" lead="They appear in our report comments, our disciplinary conversations and the way teachers are appraised." />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 60} className="group card flex gap-4 p-5">
                <span className="icon-chip !h-11 !w-11 transition group-hover:bg-gold-400 group-hover:!text-navy-900"><Icon name={v.icon} size={19} /></span>
                <div>
                  <h3 className="h3 text-navy-900">{v.title}</h3>
                  <p className="mt-1.5 text-[.92rem] leading-relaxed text-slate-body">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="leadership" className="dark-section noise relative scroll-mt-28 py-16 lg:py-24">
        <div className="shell relative">
          <SectionHead tone="light" eyebrow="Leadership" title={about.leadership.title} lead="Four people you will actually meet. Every one of them still teaches." action={<Link href="/contact" className="btn btn-outline">Talk to the office</Link>} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {about.leadership.people.map((p, i) => (
              <Reveal key={p.name} delay={i * 80} className="group card overflow-hidden p-0">
                <div className="relative grid h-44 place-items-center overflow-hidden bg-[linear-gradient(150deg,#0d3c7c,#02132c)]">
                  {p.photo ? (
                    <Img src={p.photo} alt={p.name} cdnWidth={500} sizes="24vw" />
                  ) : (
                    <>
                      <span className="font-display text-[2.6rem] font-extrabold text-white/85 transition group-hover:scale-105">{initials(p.name)}</span>
                      <span className="absolute bottom-3 left-3 rounded-full bg-white/10 px-2.5 py-1 text-[.66rem] font-semibold uppercase tracking-[.14em] text-gold-300 ring-1 ring-white/15">Add photo</span>
                    </>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[1.05rem] font-bold text-navy-900">{p.name}</h3>
                  <p className="mt-0.5 text-[.82rem] font-semibold uppercase tracking-[.12em] text-navy-500">{p.role}</p>
                  <p className="mt-1 text-[.82rem] text-slate-body">{p.qualification}</p>
                  <p className="mt-3 text-[.9rem] leading-relaxed text-slate-body">{p.bio}</p>
                  <a href={`mailto:${p.email}`} className="mt-3.5 inline-flex items-center gap-1.5 font-display text-[.82rem] font-bold text-navy-700 transition hover:text-gold-600">
                    <Icon name="mail" size={14} /> Email
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-[.82rem] text-navy-200/70">{about.leadership.note}</p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <SectionHead eyebrow="Our people" title={about.faculty.title} lead={about.faculty.text} />
            <div className="mt-8 grid grid-cols-2 gap-3">
              {about.faculty.stats.map((s) => (
                <div key={s.label} className="card-flat p-4 text-center">
                  <p className="font-display text-[1.8rem] font-extrabold text-navy-800">{s.value}</p>
                  <p className="mt-1 text-[.8rem] font-semibold leading-snug text-slate-body">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <ul className="grid gap-3">
            {about.faculty.departments.map((d, i) => (
              <Reveal as="li" key={d.name} delay={i * 50}>
                <div className="card flex flex-wrap items-center gap-4 p-5">
                  <span className="icon-chip !h-10 !w-10"><Icon name="book" size={17} /></span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-[1.02rem] font-bold text-navy-900">{d.name}</h3>
                    <p className="mt-1 text-[.9rem] text-slate-body">{d.detail}</p>
                  </div>
                  <p className="shrink-0 rounded-full bg-navy-50 px-3 py-1.5 text-[.78rem] font-semibold text-navy-700">Head: {d.head}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="paper border-y border-hairline py-14">
        <div className="shell grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {about.accreditations.map((a) => (
            <div key={a.title} className="flex gap-3.5">
              {"logo" in a && a.logo ? (
                <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white p-1 ring-1 ring-hairline">
                  <Img src={a.logo} alt={a.title} cdnWidth={120} sizes="40px" className="object-contain" />
                </span>
              ) : (
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-gold-600 ring-1 ring-hairline"><Icon name="shield" size={17} /></span>
              )}
              <div>
                <p className="font-display text-[.98rem] font-bold text-navy-900">{a.title}</p>
                <p className="mt-1 text-[.86rem] leading-relaxed text-slate-body">{a.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand site={site} />
    </>
  );
}
