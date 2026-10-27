import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { getUpcoming, resources } from "@/lib/content";
import { monthShort } from "@/lib/utils";

export function UpcomingBand() {
  const items = getUpcoming();
  return (
    <section className="py-16 lg:py-20">
      <div className="shell grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <SectionHead eyebrow="Save the date" title="Next on the school calendar" />
          <ul className="mt-8 grid gap-3">
            {items.map((item, i) => {
              const m = monthShort(item.date);
              return (
                <Reveal as="li" key={item.label + item.date} delay={i * 70}>
                  <Link href="/resources#calendar" className="card group flex items-center gap-5 p-4">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-navy-800 text-center text-white transition group-hover:bg-gold-400 group-hover:text-navy-900">
                      <span className="block font-display text-[.6rem] font-bold uppercase tracking-[.18em] opacity-80">{m.month}</span>
                      <span className="block font-display text-xl font-extrabold leading-none">{m.day}</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-[1.02rem] font-bold text-navy-900">{item.label}</span>
                      <span className="mt-0.5 block text-[.86rem] text-slate-body">{item.kind} · {m.year}</span>
                    </span>
                    <Icon name="arrow-right" size={18} className="text-navy-300 transition group-hover:translate-x-1 group-hover:text-gold-600" />
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <div className="card-flat flex flex-col justify-between gap-6 bg-[linear-gradient(160deg,#fff,#f2f7fd)] p-7">
          <div>
            <p className="flex items-center gap-2 font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">
              <Icon name="calendar" size={15} className="text-gold-600" /> Term dates 2026 / 2027
            </p>
            <ul className="mt-5 grid gap-4">
              {resources.termDates?.map((t) => (
                <li key={t.term} className="border-l-2 border-gold-400 pl-4">
                  <p className="font-display text-[1rem] font-bold text-navy-900">{t.term}</p>
                  <p className="text-[.9rem] font-semibold text-navy-700">{t.dates}</p>
                  {t.note ? <p className="mt-1 text-[.84rem] leading-relaxed text-slate-body">{t.note}</p> : null}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/resources#calendar" className="btn btn-navy group self-start">
            Full calendar & documents <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
