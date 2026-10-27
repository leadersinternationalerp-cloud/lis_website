import { Icon } from "@/components/ui/Icon";
import { PageHero } from "@/components/sections/PageHero";
import { ApplyForm } from "@/components/client/ApplyForm";
import { site, admissions } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Apply online",
  description: "Apply to Leaders International School in about six minutes. No application fee, no agent — the admissions desk reads every form.",
  path: "/apply",
});

export default function ApplyPage() {
  const steps = admissions.process.steps;
  return (
    <>
      <PageHero
        eyebrow="January 2027 Intake"
        title="Apply for the 2026/2027 academic year"
        intro="Six minutes, three short screens. Enrolling Baby Class, Nursery (KG1 & KG2), NECTA Grades 1–6, and Cambridge Years 1–6."
        crumbs={[{ label: "Admissions", href: "/admissions" }, { label: "Apply" }]}
        size="md"
      />
      <section className="py-12 lg:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[1.55fr_.45fr] lg:gap-10">
          <ApplyForm admissionsEmail={site.contact.admissionsEmail ?? site.contact.email} />

          <aside className="grid gap-4 lg:sticky lg:top-28 lg:self-start">
            <div className="card-flat p-5">
              <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">What happens next</p>
              <ol className="mt-4 grid gap-3.5">
                {steps.slice(2).map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-800 font-display text-[.72rem] font-bold text-gold-300">{i + 1}</span>
                    <span>
                      <span className="block font-display text-[.92rem] font-bold text-navy-900">{s.title}</span>
                      <span className="block text-[.85rem] leading-snug text-slate-body">{s.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="card-flat bg-navy-50 p-5">
              <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">Have ready</p>
              <ul className="mt-3 grid gap-2">
                {admissions.requirements.groups[0].items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[.87rem] leading-snug text-navy-800">
                    <Icon name="check" size={13} className="mt-1 shrink-0 text-navy-600" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-flat p-5">
              <p className="text-[.9rem] leading-relaxed text-slate-body">Prefer to talk it through? The admissions desk is on the phone Monday to Friday 7:30–17:00, and Saturday mornings.</p>
              <div className="mt-4 grid gap-2">
                <a href={site.contact.phoneHref} className="btn btn-navy !py-2.5 !text-[.88rem] justify-center"><Icon name="phone" size={15} /> {site.contact.phoneDisplay}</a>
                <Link href="/admissions#fees" className="btn btn-quiet !py-2.5 !text-[.88rem] justify-center">See the fees first</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
