import Link from "next/link";
import Image from "next/image";
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
  aside,
  align = "left",
  size = "md",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
  crumbs?: Crumb[];
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  align?: "left" | "center";
  size?: "md" | "lg";
}) {
  return (
    <section className={cx("dark-section noise relative overflow-hidden", size === "lg" ? "py-20 lg:py-28" : "py-16 lg:py-24")}>
      {image ? (
        <div className="absolute inset-0">
          <Img src={image} alt="" sizes="100vw" className="object-cover" cdnWidth={1600} priority />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(1_19_38/.96)_0%,rgb(1_19_38/.82)_45%,rgb(1_19_38/.42)_100%)]" />
        </div>
      ) : null}
      <div className="pointer-events-none absolute -left-24 bottom-[-30%] h-[360px] w-[360px] rounded-full bg-sky-400/20 blur-3xl" />

      {/* Transparent logo watermark on the hero header */}
      <div className="pointer-events-none absolute -right-10 -top-8 sm:-right-6 sm:-top-6 lg:right-6 lg:-top-4 h-64 w-64 lg:h-80 lg:w-80 select-none opacity-[0.07] transition-opacity">
        <Image
          src="/logo.png"
          alt=""
          width={320}
          height={320}
          unoptimized
          priority
          className="h-full w-full object-contain"
        />
      </div>

      <div className="shell relative">
        <nav aria-label="Breadcrumb" className="mb-5 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-1 text-[.8rem] text-navy-200 backdrop-blur-md shadow-sm">
          <Link href="/" className="transition hover:text-sky-300">Home</Link>
          {(crumbs ?? []).map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <Icon name="chevron-right" size={12} className="text-sky-400/70" />
              {c.href ? <Link href={c.href} className="transition hover:text-sky-300">{c.label}</Link> : <span className="font-semibold text-sky-300">{c.label}</span>}
            </span>
          ))}
        </nav>

        <div className={cx(
          aside ? "grid items-center gap-10 lg:grid-cols-[1.14fr_.86fr] lg:gap-12" : "max-w-3xl",
          align === "center" && !aside && "mx-auto text-center"
        )}>
          <div>
            {eyebrow ? (
              <p className={cx("eyebrow eyebrow-sky mb-3 flex items-center gap-2.5", align === "center" && !aside && "justify-center")}>
                <span className="h-[2px] w-8 rounded-full bg-sky-400" />
                {eyebrow}
                {align === "center" && !aside ? <span className="h-[2px] w-8 rounded-full bg-sky-400" /> : null}
              </p>
            ) : null}
            <h1 className="display text-[clamp(2.1rem,5vw,3.4rem)] text-white">{title}</h1>
            {intro ? <p className="mt-5 text-[1.04rem] leading-relaxed text-navy-100/90">{intro}</p> : null}
            {actions ? <div className={cx("mt-8 flex flex-wrap items-center gap-3", align === "center" && !aside && "justify-center")}>{actions}</div> : null}
          </div>

          {aside ? (
            <div className="relative">
              {aside}
            </div>
          ) : null}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[linear-gradient(to_right,transparent,rgb(56_192_200/.75),rgb(253_203_36/.65),transparent)]" />
    </section>
  );
}
