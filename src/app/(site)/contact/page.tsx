import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { EnquiryForm } from "@/components/client/EnquiryForm";
import { Reveal } from "@/components/ui/Reveal";
import { contact, site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact us & Careers",
  description: "Talk to Leaders International School in Kisakasaka, Zanzibar: phone, WhatsApp, email, department contacts, directions, and teacher & staff recruitment (deadline 4 Dec 2026).",
  path: "/contact",
  image: "/media/gallery-classroom.jpg",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.title}
        intro={contact.intro}
        image="/media/gallery-classroom.jpg"
        crumbs={[{ label: "Contact" }]}
        actions={
          <div className="flex flex-wrap gap-2">
            <a href={site.contact.phoneHref} className="btn btn-gold !py-2.5 !text-[.9rem]"><Icon name="phone" size={16} /> {site.contact.phoneDisplay}</a>
            <a href={site.contact.whatsappHref} className="btn btn-outline !py-2.5 !text-[.9rem]"><Icon name="whatsapp" size={16} /> WhatsApp</a>
            <a href="#careers" className="btn btn-outline !py-2.5 !text-[.9rem]"><Icon name="graduation" size={16} /> We Are Hiring</a>
          </div>
        }
      />

      <section className="py-14 lg:py-16">
        <div className="shell grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contact.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 70} className="card group flex h-full flex-col p-5">
              <span className={i % 2 ? "icon-chip icon-chip--gold" : "icon-chip"}><Icon name={c.icon} size={20} /></span>
              <h2 className="mt-4 font-display text-[1.05rem] font-bold text-navy-900">{c.title}</h2>
              <ul className="mt-2.5 flex-1 grid gap-1.5">
                {c.lines.map((line) => <li key={line} className="text-[.9rem] leading-snug text-slate-body">{line}</li>)}
              </ul>
              <a href={c.actionHref} className="mt-4 inline-flex items-center gap-1.5 font-display text-[.84rem] font-bold text-navy-700 transition group-hover:text-gold-600">
                {c.actionLabel} <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="paper border-y border-hairline py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
          <EnquiryForm officeEmail={site.contact.email} />
          <div className="grid gap-4">
            <div className="card overflow-hidden !p-0">
              <div className="border-b border-hairline px-5 py-4">
                <p className="font-display text-[1rem] font-bold text-navy-900">Find the campus</p>
                <p className="mt-1 text-[.85rem] text-slate-body">{site.location.street} · {site.location.area}</p>
              </div>
              <iframe
                title="Map of Leaders International School, Kisakasaka, Zanzibar"
                src={contact.map.embedUrl}
                className="h-[240px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <p className="text-[.85rem] text-slate-body">Offline? Ask for “LIS gate, Kisakasaka” in any taxi.</p>
                <a href={site.location.googleMapsUrl} className="inline-flex items-center gap-1.5 font-display text-[.84rem] font-bold text-navy-700 hover:text-gold-600">
                  Directions <Icon name="external" size={13} />
                </a>
              </div>
            </div>
            <div className="card-flat p-5">
              <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">Office hours</p>
              <ul className="mt-3 grid gap-2">
                {site.contact.officeHours?.map((h) => (
                  <li key={h.days} className="flex items-baseline justify-between gap-4 border-b border-hairline pb-2 text-[.9rem] last:border-0 last:pb-0">
                    <span className="font-semibold text-navy-900">{h.days}</span><span className="text-slate-body">{h.hours}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[.84rem] leading-relaxed text-slate-body">{site.contact.termOfficeNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="shell">
          <SectionHead eyebrow="Who to ask" title="Department contacts" lead="One number reaches all of these; the email addresses go straight to the person who handles it." />
          <div className="mt-8 overflow-hidden card !p-0">
            <div className="overflow-x-auto">
              <table className="lis-table">
                <thead><tr><th>Department</th><th>Email</th><th>Phone</th><th>Handles</th></tr></thead>
                <tbody>
                  {contact.departments.map((d) => (
                    <tr key={d.name}>
                      <td className="whitespace-nowrap">{d.name}</td>
                      <td><a href={`mailto:${d.email}`} className="break-all text-navy-600 underline decoration-navy-200 underline-offset-2 hover:decoration-navy-600">{d.email}</a></td>
                      <td className="whitespace-nowrap">{d.phone}</td>
                      <td className="text-[.88rem]">{d.handles}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="paper border-t border-hairline py-16 lg:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <SectionHead eyebrow="Directions" title={contact.gettingHere.title} lead={contact.gettingHere.text} />
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {contact.gettingHere.landmarks.map((l) => (
                <li key={l} className="flex items-start gap-3 rounded-xl border border-hairline bg-white p-3.5 text-[.92rem] text-navy-800">
                  <Icon name="pin" size={16} className="mt-0.5 shrink-0 text-gold-600" />{l}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[.9rem] leading-relaxed text-slate-body">{contact.gettingHere.parking}</p>
          </div>
          <div className="card p-6 lg:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="icon-chip icon-chip--gold"><Icon name="graduation" size={20} /></span>
              <span className="rounded-full bg-gold-100 px-3 py-1 font-display text-[.74rem] font-bold uppercase tracking-[.15em] text-gold-700">
                Deadline: {contact.careers.deadline}
              </span>
            </div>
            <h2 className="mt-4 font-display text-[1.35rem] font-bold text-navy-900">{contact.careers.title}</h2>
            <p className="mt-2 text-[.95rem] leading-relaxed text-slate-body">{contact.careers.text}</p>
            <ul className="mt-5 grid gap-2.5">
              {contact.careers.openings.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-[.9rem] text-navy-800"><Icon name="check" size={14} className="mt-1 shrink-0 text-navy-600" />{o}</li>
              ))}
            </ul>
            <div className="mt-5 rounded-xl border border-hairline bg-paper p-4 text-[.85rem] text-slate-body">
              <p className="font-display text-[.72rem] font-bold uppercase tracking-[.16em] text-navy-600">Application requirements</p>
              <p className="mt-1">Send your <strong>Academic Documents</strong> and <strong>CV</strong> to <a href={`mailto:${contact.careers.email}`} className="font-semibold text-navy-800 underline">{contact.careers.email}</a> or <a href={`mailto:${contact.careers.altEmail}`} className="font-semibold text-navy-800 underline">{contact.careers.altEmail}</a>.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${contact.careers.email},${contact.careers.altEmail}?subject=${encodeURIComponent("Job Application — Leaders International School")}`} className="btn btn-navy !py-2.5 !text-[.88rem]"><Icon name="mail" size={15} /> Email CV & Documents</a>
              <Link href="/resources#documents" className="btn btn-quiet !py-2.5 !text-[.88rem]">Vacancy pack</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="careers" className="scroll-mt-28 border-t border-hairline py-16 lg:py-24">
        <div className="shell">
          <SectionHead
            eyebrow={`Recruitment · Apply by ${contact.careers.deadline}`}
            title="Open Vacancies"
            lead="Click any poster to view full size. Send your CV and academic certificates to info@leaderinternationalschool.ac.tz or leadersinternationalerp@gmail.com."
          />
          <div className="mt-9 grid gap-6 md:grid-cols-3">
            {contact.careers.posters.map((poster, i) => (
              <Reveal key={poster.title} delay={i * 75} className="card group flex flex-col overflow-hidden !p-0">
                <a href={poster.image} target="_blank" rel="noreferrer noopener" className="relative block aspect-[3/4] overflow-hidden bg-navy-950">
                  <Img src={poster.image} alt={poster.title} cdnWidth={900} sizes="(max-width:768px) 92vw, 31vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                </a>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-[1.05rem] font-bold text-navy-900">{poster.title}</h3>
                    <p className="mt-1 text-[.86rem] leading-snug text-slate-body">{poster.subtitle}</p>
                  </div>
                  <a href={poster.image} target="_blank" rel="noreferrer noopener" className="mt-4 inline-flex items-center gap-1.5 font-display text-[.82rem] font-bold text-navy-700 hover:text-gold-600">
                    Open full poster <Icon name="external" size={13} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
