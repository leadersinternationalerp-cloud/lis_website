import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { academics, site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { cx } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Academics",
  description: "Baby Class, Nursery (KG1 & KG2), NECTA Primary (Grades 1–6), and our Cambridge International Wing (Years 1–6) at Leaders International School, Kisakasaka, Zanzibar.",
  path: "/academics",
  image: "/media/gallery-lab.jpg",
});

export default function AcademicsPage() {
  return (
    <>
      <PageHero
        eyebrow={academics.eyebrow}
        title="A curriculum with two doors out"
        intro={academics.intro}
        image="/media/gallery-lab.jpg"
        crumbs={[{ label: "Academics" }]}
        actions={
          <div className="flex flex-wrap gap-2">
            {academics.levels.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="rounded-full border border-white/25 bg-white/5 px-3.5 py-1.5 font-display text-[.84rem] font-semibold text-white backdrop-blur transition hover:border-gold-400 hover:text-gold-300">
                {l.name}
              </a>
            ))}
          </div>
        }
      />

      {academics.levels.map((level, i) => (
        <section key={level.id} id={level.id} className={cx("scroll-mt-28 py-16 lg:py-20", i % 2 === 1 ? "paper border-y border-hairline" : "")}>
          <div className={cx("shell grid items-center gap-10 lg:grid-cols-2 lg:gap-14", i % 2 === 1 && "lg:[&>*:first-child]:order-2")}>
            <Reveal className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] rounded-tr-[80px] shadow-card">
                <Img src={level.image} alt={level.name} cdnWidth={1000} sizes="(max-width:1024px) 92vw, 46vw" className="transition-transform duration-[1400ms] hover:scale-105" />
              </div>
              <span className="absolute -bottom-5 left-6 rounded-2xl bg-navy-800 px-4 py-3 text-white shadow-lift">
                <span className="block font-display text-[.66rem] font-bold uppercase tracking-[.18em] text-gold-300">Stage 0{i + 1}</span>
                <span className="block font-display text-[1.05rem] font-bold">{level.ages}</span>
              </span>
            </Reveal>
            <div>
              <p className="eyebrow mb-2.5">{level.summary.split(".")[0]}.</p>
              <h2 className="h2 text-navy-900">{level.name}</h2>
              <p className="lead mt-3">{level.summary}</p>
              <ul className="mt-6 grid gap-2.5">
                {level.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-[.95rem] text-slate-body">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-100 text-gold-700"><Icon name="check" size={12} strokeWidth={3} /></span>
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {level.subjects.map((s) => (
                  <span key={s} className="rounded-full border border-hairline bg-white px-3 py-1.5 text-[.8rem] font-semibold text-navy-700">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* enrichment */}
      <section id="enrichment" className="dark-section noise relative scroll-mt-28 py-16 lg:py-24">
        <div className="shell relative">
          <SectionHead tone="light" eyebrow="Beyond the timetable" title={academics.enrichment.title} lead={academics.enrichment.text}
            action={<Link href="/gallery" className="btn btn-outline">See it in the gallery</Link>} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {academics.enrichment.items.map((item, i) => (
              <Reveal key={item.title} delay={i * 55} className="group card flex h-full flex-col gap-3 p-5 !bg-white/[.06] !border-white/15 !shadow-none backdrop-blur transition hover:!bg-white/10 hover:!border-gold-400/50">
                <span className="icon-chip icon-chip--gold !h-11 !w-11"><Icon name={item.icon} size={19} /></span>
                <h3 className="font-display text-[1.02rem] font-bold text-white">{item.title}</h3>
                <p className="text-[.9rem] leading-relaxed text-navy-100/85">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* results */}
      <section className="py-16 lg:py-24">
        <div className="shell grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div>
            <SectionHead eyebrow="Accountability" title={academics.results.title} lead={academics.results.note} />
            <div className="mt-7 grid grid-cols-2 gap-3">
              {academics.results.highlights.map((h) => (
                <div key={h.label} className="card-flat p-4">
                  <p className="font-display text-[1.7rem] font-extrabold text-navy-800">{h.value}</p>
                  <p className="mt-1 text-[.82rem] leading-snug text-slate-body">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card overflow-hidden !p-0">
            <div className="flex items-center justify-between border-b border-hairline px-5 py-3.5">
              <p className="font-display text-[.95rem] font-bold text-navy-900">{academics.results.table.caption}</p>
              <Link href="/resources#documents" className="text-[.82rem] font-semibold text-navy-600 hover:text-navy-900">Full report PDF</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="lis-table">
                <thead>
                  <tr>{academics.results.table.columns.map((c) => <th key={c}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {academics.results.table.rows.map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td key={i}>
                          {i === row.length - 1 ? <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-2.5 py-1 text-[.78rem] font-semibold text-gold-700">{cell}</span> : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* day + approach */}
      <section className="paper border-y border-hairline py-16 lg:py-20">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHead eyebrow="A ordinary Tuesday" title="How the day runs" />
            <ol className="mt-7 grid gap-0">
              {academics.dayInLife.map((d, i) => (
                <li key={d.time} className="group relative flex gap-5 pb-6 last:pb-0">
                  {i < academics.dayInLife.length - 1 ? <span className="absolute left-[42px] top-7 h-full w-px bg-navy-200" /> : null}
                  <span className="z-10 w-[46px] shrink-0 font-display text-[.9rem] font-bold text-navy-700">{d.time}</span>
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-gold-400 ring-4 ring-paper transition group-hover:scale-125" />
                  <p className="text-[.95rem] leading-relaxed text-slate-body">{d.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <SectionHead eyebrow="Teaching & learning" title={academics.approach.title} />
            <ul className="mt-7 grid gap-3">
              {academics.approach.points.map((p) => (
                <li key={p.title} className="card flex gap-4 p-5">
                  <span className="icon-chip !h-10 !w-10"><Icon name="sparkles" size={17} /></span>
                  <div>
                    <h3 className="h3 text-navy-900">{p.title}</h3>
                    <p className="mt-1.5 text-[.92rem] leading-relaxed text-slate-body">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand site={site} />
    </>
  );
}
