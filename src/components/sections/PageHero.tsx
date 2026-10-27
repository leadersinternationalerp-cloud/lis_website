import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { cx } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  crumbs,
  actions,
  align = "left",
  size = "md",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  crumbs?: Crumb[];
  actions?: React.ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg";
}) {
  return (
    <section className={cx("dark-section noise relative overflow-hidden", size === "lg" ? "py-20 lg:py-28" : "py-14 lg:py-20")}>
      {image ? (
        <div className="absolute inset-0 opacity-25">
          <Img src={image} alt="" sizes="100vw" className="object-cover" cdnWidth={1400} />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgb(1_19_38/.96)_18%,rgb(0_40_72/.74)_62%,rgb(17_102_112/.82))]" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute -left-24 bottom-[-30%] h-[360px] w-[360px] rounded-full bg-sky-400/20 blur-3xl" />
      <div className={cx("shell relative", align === "center" && "text-center")}>
        <nav aria-label="Breadcrumb" className={cx("mb-5 flex flex-wrap items-center gap-1.5 text-[.8rem] text-navy-200", align === "center" && "justify-center")}>
          <Link href="/" className="transition hover:text-sky-300">Home</Link>
          {(crumbs ?? []).map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <Icon name="chevron-right" size={12} className="text-sky-400/70" />
              {c.href ? <Link href={c.href} className="transition hover:text-sky-300">{c.label}</Link> : <span className="font-semibold text-sky-300">{c.label}</span>}
            </span>
          ))}
        </nav>
        <div className={cx("max-w-3xl", align === "center" && "mx-auto")}>
          {eyebrow ? (
            <p className={cx("eyebrow eyebrow-sky mb-3 flex items-center gap-2.5", align === "center" && "justify-center")}>
              <span className="h-[2px] w-8 rounded-full bg-sky-400" />
              {eyebrow}
              {align === "center" ? <span className="h-[2px] w-8 rounded-full bg-sky-400" /> : null}
            </p>
          ) : null}
          <h1 className="display text-[clamp(2.1rem,5.2vw,3.5rem)] text-white">{title}</h1>
          {intro ? <p className="mt-5 text-[1.04rem] leading-relaxed text-navy-100/90">{intro}</p> : null}
          {actions ? <div className={cx("mt-8 flex flex-wrap items-center gap-3", align === "center" && "justify-center")}>{actions}</div> : null}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[linear-gradient(to_right,transparent,rgb(56_192_200/.75),rgb(253_203_36/.65),transparent)]" />
    </section>
  );
}
