import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { academics } from "@/lib/content";

export function ProgramsPreview() {
  return (
    <section className="paper border-y border-hairline py-16 lg:py-24">
      <div className="shell">
        <SectionHead
          eyebrow="Baby Class to Grade 6 / Year 6"
          title="One campus, two wings, personal attention"
          lead={academics.intro}
          action={
            <Link href="/academics" className="btn btn-quiet group">
              Full curriculum <Icon name="arrow-right" size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          }
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {academics.levels.map((level, i) => (
            <Reveal as="article" key={level.id} delay={i * 80} className="group card flex flex-col overflow-hidden !rounded-[20px] p-0">
              <Link href={`/academics#${level.id}`} className="flex h-full flex-col">
                <div className="relative h-40 overflow-hidden">
                  <Img src={level.image} alt={level.name} cdnWidth={600} sizes="(max-width:768px) 92vw, 22vw" className="transition-transform duration-[1100ms] group-hover:scale-[1.08]" />
                  <div className="absolute inset-0 bg-[linear-gradient(to_top,rgb(0_40_72/.8),transparent_58%)]" />
                  <span className="absolute bottom-3 left-4 font-display text-[.66rem] font-bold uppercase tracking-[.18em] text-sky-300">{level.ages}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[1.16rem] font-bold text-navy-900">{level.name}</h3>
                  <p className="mt-2 flex-1 text-[.9rem] leading-relaxed text-slate-body">{level.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 border-t border-hairline pt-3.5 font-display text-[.8rem] font-bold uppercase tracking-[.12em] text-sky-600 transition group-hover:text-navy-900">
                    Explore <Icon name="arrow-right" size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
