import { cx } from "@/lib/utils";

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
  action,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center text-center",
        className,
      )}
    >
      <div className={cx("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className={cx("mb-2.5 flex items-center gap-2.5 text-[.72rem] font-semibold uppercase tracking-[.22em] font-display", align === "center" && "justify-center", tone === "light" ? "text-gold-300" : "text-navy-500")}>
            <span className={cx("h-px w-8", tone === "light" ? "bg-gold-400/70" : "bg-navy-300")} />
            {eyebrow}
          </p>
        ) : null}
        <h2 className={cx("h2", tone === "light" ? "text-white" : "text-navy-900")}>{title}</h2>
        {lead ? <p className={cx("lead mt-3", tone === "light" ? "text-navy-100/90" : "")}>{lead}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
