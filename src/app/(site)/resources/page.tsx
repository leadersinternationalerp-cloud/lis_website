import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { ResourceBrowser } from "@/components/client/ResourceBrowser";
import { Reveal } from "@/components/ui/Reveal";
import { getResources } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Resources & documents",
  description: "Download the LIS application form, prospectus, fee structure, school calendar, uniform list and policies.",
  path: "/resources",
});

export default async function ResourcesPage() {
  const resources = await getResources();
  return (
    <>
      <PageHero
        eyebrow="Documents"
        title={resources.title}
        intro={resources.intro}
        image="/media/gallery-computer-lab.jpg"
        crumbs={[{ label: "Resources" }]}
        actions={
          <div className="flex flex-wrap gap-2">
            <a href="#documents" className="btn btn-gold !py-2 !text-[.86rem]"><Icon name="download" size={15} /> {resources.documents.length} documents</a>
            <a href="#calendar" className="btn btn-outline !py-2 !text-[.86rem]"><Icon name="calendar" size={15} /> Term dates</a>
          </div>
        }
      />

      <section id="documents" className="scroll-mt-28 py-14 lg:py-16">
        <div className="shell">
          <ResourceBrowser documents={resources.documents} categories={resources.categories} />
          <p className="mt-6 flex items-start gap-2.5 rounded-xl bg-navy-50 p-4 text-[.88rem] leading-relaxed text-navy-800">
            <Icon name="sparkles" size={16} className="mt-0.5 shrink-0 text-gold-600" />{resources.downloadsNote}
          </p>
        </div>
      </section>

      <section id="calendar" className="paper scroll-mt-28 border-y border-hairline py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <SectionHead eyebrow="Academic calendar" title="Term dates and exam windows" lead={resources.calendarNote} />
            <div className="mt-8 grid gap-3">
              {resources.termDates?.map((t, i) => (
                <Reveal key={t.term} delay={i * 70} className="card flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:gap-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-navy-800 font-display text-[.8rem] font-bold text-gold-300">T{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[1.05rem] font-bold text-navy-900">{t.term}</span>
                    <span className="block text-[.92rem] font-semibold text-navy-600">{t.dates}</span>
                  </span>
                  {t.note ? <span className="max-w-sm text-[.86rem] leading-snug text-slate-body">{t.note}</span> : null}
                </Reveal>
              ))}
            </div>
          </div>
          <div className="card-flat p-5 lg:p-6">
            <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">Coming up</p>
            <ul className="mt-4 grid gap-3">
              {resources.keyDates?.map((k) => {
                const d = new Date(k.date);
                return (
                  <li key={k.label} className="flex items-center gap-3.5 rounded-xl border border-hairline bg-white p-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gold-100 text-center">
                      <span className="font-display text-[.95rem] font-extrabold leading-none text-gold-700">{Number.isNaN(d.getTime()) ? "–" : d.getUTCDate()}</span>
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[.95rem] font-bold leading-snug text-navy-900">{k.label}</span>
                      <span className="block text-[.82rem] text-slate-body">{formatDate(k.date)} · {k.kind}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <Link href="/admissions#openday" className="btn btn-navy mt-5 w-full justify-center !py-2.5 !text-[.88rem]">Book an Open Day visit</Link>
          </div>
        </div>
      </section>


      <section id="uniform" className="scroll-mt-28 border-t border-hairline py-16 lg:py-20">
        <div className="shell">
          <SectionHead eyebrow="Cream · sky blue · navy" title={resources.uniform?.title ?? "School uniform"} lead={resources.uniform?.intro}
            action={<a href="/documents/uniform-list.pdf" className="btn btn-quiet !py-2.5 !text-[.88rem]"><Icon name="download" size={15} /> Uniform list (PDF)</a>} />

          <div className="mt-9 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
            <ul className="grid gap-3 sm:grid-cols-2">
              {resources.uniform?.items.map((u, i) => (
                <Reveal as="li" key={u.name} delay={i * 45}>
                  <div className="card flex h-full items-start gap-3.5 p-5">
                    <span className="mt-0.5 h-8 w-8 shrink-0 rounded-lg border border-hairline" style={{ background: i === 0 ? "#F4EFE3" : i === 1 ? "#12294F" : i === 2 ? "#ffffff" : i % 2 ? "#8FD1F2" : "#00275c" }} />
                    <div>
                      <h3 className="h3 text-navy-900">{u.name}</h3>
                      <p className="mt-1.5 text-[.9rem] leading-relaxed text-slate-body">{u.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>

            <div className="grid gap-4 lg:content-start">
              <div className="card-flat p-5">
                <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">The colours, exactly</p>
                <ul className="mt-4 grid gap-2.5">
                  {resources.uniform?.swatches?.map((sw) => (
                    <li key={sw.label} className="flex items-center gap-3">
                      <span className="h-9 w-16 shrink-0 rounded-lg border border-black/10 shadow-inner" style={{ background: sw.hex }} />
                      <span className="min-w-0">
                        <span className="block font-display text-[.92rem] font-bold text-navy-900">{sw.label}</span>
                        <span className="block font-mono text-[.76rem] uppercase text-slate-body">{sw.hex}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-hairline pt-3 text-[.86rem] leading-relaxed text-slate-body">{resources.uniform?.buy}</p>
              </div>
              <div className="rounded-2xl border border-sky-uniform-200 bg-sky-uniform-50 p-5">
                <p className="flex items-center gap-2 font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-sky-uniform-700">
                  <Icon name="heart" size={15} /> Our practice
                </p>
                <p className="mt-2.5 text-[.93rem] leading-relaxed text-navy-800">{resources.uniform?.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="policies" className="scroll-mt-28 py-16 lg:py-20">
        <div className="shell">
          <SectionHead eyebrow="Policies in plain language" title="What we are held to" lead="Short summaries here; the binding text is in the PDFs above." />
          <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "shield", title: "Safeguarding", text: "Every adult on site is screened. Any concern goes to the designated safeguarding lead the same day, and to the authorities where required." },
              { icon: "heart", title: "Anti-bullying", text: "Report it to any teacher. Restorative conversation first, then a written plan with the families, then sanctions if it repeats." },
              { icon: "phone", title: "Phones & devices", text: "Personal phones and tablets stay at home; learners use our supervised ICT lab at school. Calls to a child are made through the office." },
              { icon: "bus", title: "Transport", text: "Seats are allocated by route and stop. A missing child is traced by the office within five minutes, parents first." },
            ].map((p) => (
              <div key={p.title} className="card p-5">
                <span className="icon-chip"><Icon name={p.icon} size={19} /></span>
                <h3 className="mt-4 h3 text-navy-900">{p.title}</h3>
                <p className="mt-2 text-[.9rem] leading-relaxed text-slate-body">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-navy-800 p-6 text-white">
            <p className="max-w-2xl text-[.95rem] leading-relaxed text-navy-100">
              Something missing, or a document out of date? Tell the office and we will fix it within a day — these pages are maintained by the school, not by an agency.
            </p>
            <Link href="/contact" className="btn btn-gold !py-2.5 !text-[.88rem]">Contact us <Icon name="arrow-right" size={15} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
