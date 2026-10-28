import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { Timeline } from "@/components/sections/Timeline";
import { Reveal } from "@/components/ui/Reveal";
import { CtaBand } from "@/components/sections/CtaBand";
import { admissions, site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admissions & 2026/2027 Fee Structure",
  description: "Apply to Leaders International School for the January 2027 intake: Baby Class, Nursery (KG1 & KG2), NECTA Grades 1–6, and Cambridge Years 1–6. Official 2026/2027 fee structure and monthly instalment breakdown.",
  path: "/admissions",
  image: "/media/gallery-reading-corner.jpg",
});

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow={admissions.eyebrow}
        title="Five steps, one conversation"
        intro={admissions.intro}
        image="/media/gallery-reading-corner.jpg"
        crumbs={[{ label: "Admissions" }]}
        actions={
          <>
            <Link href="/apply" className="btn btn-gold">Apply for Jan 2027 <Icon name="arrow-right" size={16} /></Link>
            <a href="/documents/fee-structure.pdf" target="_blank" rel="noreferrer noopener" className="btn btn-outline"><Icon name="download" size={16} /> Fee Structure PDF</a>
            <a href={site.contact.whatsappHref} className="btn btn-outline"><Icon name="whatsapp" size={16} /> Ask a question</a>
          </>
        }
      />

      <section className="paper border-b border-hairline py-8">
        <div className="shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-3 text-[.95rem] text-navy-800">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-400 text-navy-900"><Icon name="sparkles" size={15} /></span>
            <span className="max-w-2xl">{admissions.openNote}</span>
          </p>
          <a href="/documents/fee-structure.pdf" target="_blank" rel="noreferrer noopener" className="btn btn-quiet shrink-0 !py-2.5 !text-[.86rem]"><Icon name="download" size={15} /> Official 2026/2027 Fee PDF</a>
        </div>
      </section>

      {/* Official Admissions Poster Announcement */}
      <section className="py-12 lg:py-16 bg-white border-b border-hairline">
        <div className="shell">
          <div className="overflow-hidden rounded-3xl border border-sky-200/80 bg-paper shadow-card transition duration-500 hover:shadow-lift">
            <div className="grid lg:grid-cols-[1.12fr_.88fr] items-center">
              <a
                href="/media/admissions-open-banner.jpg"
                target="_blank"
                rel="noreferrer noopener"
                className="group relative block aspect-[2/1] w-full overflow-hidden bg-navy-950"
                title="Click to view full-size admissions poster"
              >
                <Img
                  src="/media/admissions-open-banner.jpg"
                  alt="Leaders International School Admissions Open All Classes"
                  priority
                  unoptimized
                  cdnWidth={1200}
                  sizes="(max-width:1024px) 100vw, 55vw"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-navy-900/10 transition group-hover:bg-transparent" />
                <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy-900/80 px-3 py-1.5 text-[.74rem] font-semibold text-white shadow-soft backdrop-blur-md">
                  <Icon name="search" size={13} /> View Full Poster
                </span>
              </a>
              <div className="p-7 lg:p-10">
                <span className="eyebrow eyebrow-sky inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
                  Interviews Ongoing
                </span>
                <h2 className="mt-3 font-display text-[1.65rem] lg:text-[2.1rem] font-extrabold tracking-tight text-navy-900 leading-tight">
                  Admissions Open for All Classes
                </h2>
                <p className="mt-3 text-[.98rem] leading-relaxed text-slate-body">
                  Leaders International School is now welcoming prospective learners across both Cambridge Assessment International Education and NECTA National curricula — Baby Class, Nursery (KG1 & KG2), through Primary Grades 1–6 / Years 1–6.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/apply" className="btn btn-gold">
                    Apply Online Now <Icon name="arrow-right" size={16} />
                  </Link>
                  <a href="tel:+255777427140" className="btn btn-navy">
                    <Icon name="phone" size={16} /> +255 777 427 140
                  </a>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-hairline pt-4 text-[.82rem] text-slate-body">
                  <span>Direct Admissions: <strong className="text-navy-900">+255 777 427 140</strong></span>
                  <span>Email: <a href="mailto:admissions@leaderinternationalschool.ac.tz" className="font-semibold text-sky-600 underline">admissions@leaderinternationalschool.ac.tz</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-28 py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHead eyebrow="Step by step" title={admissions.process.title} lead="From your first phone call to your child's first morning in January 2027." />
            <div className="mt-8 card-flat grid gap-3 p-5">
              <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">Key dates · January 2027 intake</p>
              <ul className="grid gap-2">
                {admissions.calendar.map((c) => (
                  <li key={c.label} className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2 text-[.92rem] last:border-0 last:pb-0">
                    <span className="font-semibold text-navy-900">{c.label}</span>
                    <span className="text-slate-body">{c.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Timeline items={admissions.process.steps.map((s) => ({ title: s.title, text: s.text, note: s.duration }))} />
        </div>
      </section>

      <section id="requirements" className="dark-section noise relative scroll-mt-28 py-16 lg:py-24">
        <div className="shell relative">
          <SectionHead tone="light" eyebrow="Before you apply" title={admissions.requirements.title} lead={admissions.requirements.note} />
          <div className="mt-9 grid gap-4 lg:grid-cols-2">
            {admissions.requirements.groups.map((g, i) => (
              <Reveal key={g.title} delay={i * 60} className="card overflow-hidden !p-0">
                <div className="flex items-center gap-3 border-b border-hairline bg-paper px-5 py-4">
                  <span className="icon-chip !h-9 !w-9"><Icon name={i === 0 ? "file" : i === 1 ? "graduation" : i === 2 ? "book" : "globe"} size={16} /></span>
                  <h3 className="font-display text-[1.05rem] font-bold text-navy-900">{g.title}</h3>
                </div>
                <ul className="grid gap-2.5 p-5">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[.93rem] leading-relaxed text-slate-body">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="fees" className="scroll-mt-28 py-16 lg:py-24">
        <div className="shell">
          <SectionHead
            eyebrow={`${admissions.fees.academicYear} · Issued ${admissions.fees.issuedDate}`}
            title={admissions.fees.title}
            lead={admissions.fees.note}
            action={
              <div className="flex flex-wrap gap-2.5">
                <a href="/documents/fee-structure.pdf" target="_blank" rel="noreferrer noopener" className="btn btn-quiet"><Icon name="download" size={16} /> Download PDF</a>
                <Link href="/apply" className="btn btn-navy">Start application</Link>
              </div>
            }
          />

          <div className="mt-9 grid gap-6 lg:grid-cols-[1.35fr_.65fr]">
            <div className="grid gap-6">
              {/* Table 1: Annual Fees by Category */}
              <div className="card overflow-hidden !p-0">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline bg-paper px-5 py-3.5">
                  <h3 className="font-display text-[.98rem] font-bold text-navy-900">1. Annual Fees by Category</h3>
                  <span className="rounded-full bg-navy-800 px-3 py-1 font-display text-[.72rem] font-bold uppercase tracking-[.14em] text-gold-300">12 Equal Monthly Instalments</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="lis-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Wing</th>
                        <th>Annual Fee (TZS)</th>
                        <th>Monthly Instalment (TZS)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissions.fees.table.map((row) => (
                        <tr key={row.level}>
                          <td className="font-semibold text-navy-900">{row.level}</td>
                          <td>
                            <span className="inline-flex rounded-full bg-navy-50 px-2.5 py-0.5 text-[.76rem] font-semibold text-navy-700">
                              {row.curriculum}
                            </span>
                          </td>
                          <td className="font-display font-bold text-navy-800">{row.annualTzs}</td>
                          <td className="font-display font-extrabold text-gold-700">{row.monthlyTzs}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Table 2: Monthly Fee Breakdown */}
              <div className="card overflow-hidden !p-0">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline bg-paper px-5 py-3.5">
                  <h3 className="font-display text-[.98rem] font-bold text-navy-900">2. Monthly Fee Breakdown (TZS per month)</h3>
                  <span className="text-[.8rem] text-slate-body">All-inclusive monthly schedule for Grades 1–6 & Years 1–6</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="lis-table">
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Tuition</th>
                        <th>Stationery</th>
                        <th>Caution Fee</th>
                        <th>Breakfast & Lunch</th>
                        <th>Madrasa</th>
                        <th>Monthly Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admissions.fees.breakdown.map((row) => (
                        <tr key={row.category}>
                          <td className="font-semibold text-navy-900 whitespace-nowrap">{row.category}</td>
                          <td>{row.tuition}</td>
                          <td>{row.stationery}</td>
                          <td>{row.caution}</td>
                          <td>{row.meals}</td>
                          <td>{row.madrasa}</td>
                          <td className="font-display font-extrabold text-navy-900">{row.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="border-t border-hairline bg-paper px-5 py-3.5 text-[.83rem] leading-relaxed text-slate-body">
                  {admissions.fees.footnote}
                </div>
              </div>
            </div>

            <div className="grid gap-4 lg:content-start">
              {/* Registration Fee Banner */}
              <div className="rounded-2xl border border-gold-300 bg-gold-50 p-5">
                <p className="flex items-center gap-2 font-display text-[.72rem] font-bold uppercase tracking-[.18em] text-gold-700">
                  <Icon name="award" size={16} /> 3. {admissions.fees.registrationFee.label}
                </p>
                <p className="mt-2 font-display text-2xl font-extrabold text-navy-900">{admissions.fees.registrationFee.amount}</p>
                <p className="mt-1.5 text-[.9rem] leading-relaxed text-navy-800">{admissions.fees.registrationFee.text}</p>
              </div>

              <div className="card-flat p-5">
                <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">Included in your monthly fee</p>
                <ul className="mt-3 grid gap-2">
                  {admissions.fees.covers.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[.9rem] text-slate-body"><Icon name="check" size={14} className="mt-1 shrink-0 text-navy-600" />{c}</li>
                  ))}
                </ul>
              </div>
              <div className="card-flat p-5">
                <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">Not included / communicated separately</p>
                <ul className="mt-3 grid gap-2">
                  {admissions.fees.excluded.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-[.9rem] text-slate-body"><Icon name="close" size={13} className="mt-1 shrink-0 text-navy-300" />{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {admissions.fees.discounts.map((d) => (
              <div key={d.label} className="card-flat flex items-center gap-3 p-4">
                <span className="icon-chip icon-chip--gold !h-10 !w-10"><Icon name="receipt" size={16} /></span>
                <span>
                  <span className="block text-[.86rem] leading-snug text-slate-body">{d.label}</span>
                  <span className="block font-display text-[.95rem] font-bold text-navy-900">{d.value}</span>
                </span>
              </div>
            ))}
          </div>

          <div id="bursaries" className="mt-10 scroll-mt-28 rounded-[24px] border border-gold-300 bg-gold-50 p-6 lg:p-8">
            <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr]">
              <div>
                <p className="eyebrow mb-2" style={{ color: "var(--color-gold-700)" }}>Payment flexibility</p>
                <h3 className="h2 text-navy-900">{admissions.bursaries.title}</h3>
                <p className="lead mt-3">{admissions.bursaries.text}</p>
                <a href="/documents/fee-structure.pdf" target="_blank" rel="noreferrer noopener" className="btn btn-navy mt-5 !py-2.5 !text-[.88rem]"><Icon name="download" size={15} /> Official 2026/2027 Fee Structure (PDF)</a>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gold-200 bg-white">
                <table className="lis-table">
                  <thead><tr><th>Option</th><th>Arrangement</th><th>Details</th></tr></thead>
                  <tbody>
                    {admissions.bursaries.bands.map((b) => (
                      <tr key={b.band}><td>{b.band}</td><td>{b.covers}</td><td className="text-[.88rem]">{b.for}</td></tr>
                    ))}
                  </tbody>
                </table>
                <p className="border-t border-hairline px-4 py-3 text-[.84rem] text-slate-body">{admissions.bursaries.how}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="openday" className="paper scroll-mt-28 border-y border-hairline py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <SectionHead eyebrow="Visit us" title={admissions.openday.title} lead={admissions.openday.text} />
            <ul className="mt-7 grid gap-2.5">
              {admissions.openday.what.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[.95rem] text-slate-body">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-navy-800 text-gold-300"><Icon name="check" size={11} strokeWidth={3} /></span>{w}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[.92rem] text-slate-body">{admissions.openday.book}</p>
          </div>
          <div className="card p-6">
            <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">Next tours</p>
            <ul className="mt-4 grid gap-3">
              {admissions.openday.nextDates.map((d) => (
                <li key={d} className="flex items-center gap-3 rounded-xl border border-hairline bg-paper px-4 py-3">
                  <Icon name="calendar" size={17} className="text-navy-600" />
                  <span className="font-display text-[.95rem] font-semibold text-navy-900">{d}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-t border-hairline pt-4 text-[.88rem] text-slate-body">
              <p className="flex items-start gap-2"><Icon name="clock" size={15} className="mt-0.5 shrink-0 text-navy-500" />{admissions.openday.when}</p>
              <p className="mt-2 flex items-start gap-2"><Icon name="pin" size={15} className="mt-0.5 shrink-0 text-navy-500" />{admissions.openday.where}</p>
            </div>
            <Link href="/contact" className="btn btn-gold mt-5 w-full justify-center">Book a tour</Link>
            <p className="mt-4 text-center text-[.82rem] text-slate-body">{admissions.contactNote}</p>
          </div>
        </div>
      </section>

      <CtaBand site={site} />
    </>
  );
}
