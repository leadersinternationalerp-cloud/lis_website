import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { faq, site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Parents' FAQ",
  description: "Answers to the questions families ask most before applying to Leaders International School, Zanzibar.",
  path: "/faq",
});

export default function FaqPage() {
  const total = faq.groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <>
      <PageHero
        eyebrow="Help"
        title={faq.title}
        intro={faq.intro}
        crumbs={[{ label: "FAQ" }]}
        actions={
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[.88rem] text-navy-100">
            <span className="flex items-center gap-2"><Icon name="book" size={16} className="text-gold-300" />{total} answers</span>
            <a href={site.contact.whatsappHref} className="flex items-center gap-2"><Icon name="whatsapp" size={16} className="text-gold-300" /> Ask us something else</a>
          </div>
        }
      />

      <section className="py-14 lg:py-16">
        <div className="shell grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">On this page</p>
            <ul className="mt-4 grid gap-1.5">
              {faq.groups.map((g, i) => (
                <li key={g.title}>
                  <a href={`#group-${i}`} className="group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[.92rem] font-semibold text-navy-700 transition hover:bg-navy-50 hover:text-navy-900">
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold-400" />{g.title}
                    <span className="ml-auto text-[.78rem] text-navy-400">{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 card-flat bg-navy-50 p-4">
              <p className="text-[.88rem] leading-relaxed text-navy-800">Still unsure? A five-minute call usually settles it.</p>
              <a href={site.contact.phoneHref} className="btn btn-navy mt-3 w-full justify-center !py-2 !text-[.85rem]"><Icon name="phone" size={14} /> {site.contact.phoneDisplay}</a>
            </div>
          </nav>

          <div className="grid gap-10">
            {faq.groups.map((g, i) => (
              <section key={g.title} id={`group-${i}`} className="scroll-mt-28">
                <h2 className="h2 flex items-center gap-3 text-navy-900">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-navy-800 font-display text-[.8rem] font-bold text-gold-300">0{i + 1}</span>
                  {g.title}
                </h2>
                <ul className="mt-5 grid gap-2.5">
                  {g.items.map((item) => (
                    <li key={item.q}>
                      <details className="card group !rounded-2xl open:!border-navy-200">
                        <summary className="flex cursor-pointer list-none items-start gap-4 p-5 marker:hidden">
                          <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-700 transition group-open:rotate-90 group-open:bg-gold-400">
                            <Icon name="chevron-right" size={13} strokeWidth={2.4} />
                          </span>
                          <span className="flex-1 font-display text-[1.02rem] font-bold text-navy-900">{item.q}</span>
                        </summary>
                        <div className="px-5 pb-5 pl-16">
                          <p className="text-[.95rem] leading-relaxed text-slate-body">{item.a}</p>
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
            <div className="rounded-2xl border border-hairline bg-paper p-6">
              <p className="font-display text-[1.1rem] font-bold text-navy-900">Not answered here?</p>
              <p className="mt-2 text-[.95rem] leading-relaxed text-slate-body">
                Write to the office or come to an Open Day — most questions are about placement, fees and the daily routine, and all three are answered in person in about fifteen minutes.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="btn btn-navy !py-2.5 !text-[.88rem]">Contact the office</Link>
                <Link href="/admissions#openday" className="btn btn-quiet !py-2.5 !text-[.88rem]">Open Day details</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand site={site} />
    </>
  );
}
