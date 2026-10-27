import Link from "next/link";
import { Icon } from "./Icon";
import { cx } from "@/lib/utils";

const styles: Record<string, string> = {
  gold: "btn btn-gold",
  navy: "btn btn-navy",
  outline: "btn btn-outline",
  quiet: "btn btn-quiet",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "navy" | "outline" | "quiet";
  icon?: string;
  className?: string;
  size?: "sm" | "md";
};

export function ButtonLink({ href, children, variant = "gold", icon = "arrow-right", className, size = "md" }: Props) {
  const external = /^https?:|^mailto:|^tel:/.test(href);
  const cls = cx(styles[variant], size === "sm" && "!py-2 !px-3.5 !text-sm", className);
  const inner = (
    <>
      <span>{children}</span>
      <Icon name={icon} size={size === "sm" ? 15 : 17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
    </>
  );
  if (external) {
    return (
      <a href={href} className={cx(cls, "group")} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer noopener" : undefined}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cx(cls, "group")}>
      {inner}
    </Link>
  );
}
