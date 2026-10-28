import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";

export function AdmissionsSpotlight() {
  return (
    <section className="relative overflow-hidden py-12 lg:py-16 bg-gradient-to-b from-white via-paper to-white">
      <div className="shell">
        <Reveal className="group relative overflow-hidden rounded-3xl border border-sky-200/90 bg-white p-3 sm:p-5 shadow-card transition-all duration-500 hover:shadow-lift">
          <div className="grid items-center gap-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-8">
            <a
              href="/admissions"
              className="relative block aspect-[2/1] w-full overflow-hidden rounded-2xl bg-navy-950 shadow-soft"
              title="View full admissions notice"
            >
              <Img
                src="/media/admissions-open-banner.jpg"
                alt="Leaders International School Admissions Open All Classes"
                priority
                unoptimized
                cdnWidth={1100}
                sizes="(max-width:1024px) 100vw, 55vw"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-transparent" />
              <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-navy-900/80 px-3 py-1 text-[.74rem] font-bold text-white shadow-soft backdrop-blur-md">
                <Icon name="sparkles" size={13} className="text-gold-400" /> Admissions Notice
              </span>
            </a>

            <div className="flex flex-col justify-center px-2 sm:px-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="eyebrow eyebrow-sky inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-gold-400 animate-pulse" />
                  Interviews Ongoing
                </span>
                <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[.7rem] font-bold text-sky-700 ring-1 ring-sky-200">
                  Cambridge & NECTA
                </span>
              </div>

              <h2 className="mt-3 font-display text-[1.55rem] sm:text-[1.85rem] font-extrabold text-navy-900 leading-tight">
                Admissions Open for All Classes
              </h2>

              <p className="mt-2.5 text-[.94rem] leading-relaxed text-slate-body">
                Enrolment is ongoing across Baby Class, Nursery (KG1 & KG2), NECTA Grades 1–6, and Cambridge Years 1–6. Book your child&apos;s interview or tour our Kisakasaka campus.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link href="/apply" className="btn btn-gold !py-2.5 !text-[.88rem]">
                  Apply Online <Icon name="arrow-right" size={15} />
                </Link>
                <Link href="/admissions" className="btn btn-navy !py-2.5 !text-[.88rem]">
                  Fee Structure & Process
                </Link>
                <a
                  href="tel:+255777427140"
                  className="inline-flex items-center gap-1.5 font-display text-[.85rem] font-bold text-navy-700 hover:text-sky-600 transition ml-1"
                >
                  <Icon name="phone" size={15} className="text-sky-500" />
                  +255 777 427 140
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
