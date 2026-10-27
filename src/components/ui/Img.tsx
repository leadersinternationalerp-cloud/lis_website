import Image from "next/image";
import { resolveSrc, withFit } from "@/lib/image";
import { cx } from "@/lib/utils";

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  /** width used to request a sized CDN url when the source is a Sanity asset */
  cdnWidth?: number;
  priority?: boolean;
  rounded?: string;
};

/** fill-based image with sensible defaults for every card and hero on the site. */
export function Img({ src, alt, className, sizes = "(max-width: 768px) 100vw, 50vw", cdnWidth, priority }: Props) {
  const resolved = resolveSrc(src);
  if (!resolved) {
    return (
      <div className={cx("grid place-items-center bg-navy-100 text-navy-400", className)} role="img" aria-label={`${alt} — image placeholder`}>
        <span className="font-display text-xs font-semibold tracking-[.18em] uppercase">Add photo</span>
      </div>
    );
  }
  return (
    <Image
      src={cdnWidth ? withFit(resolved, cdnWidth) : resolved}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cx("object-cover", className)}
    />
  );
}
