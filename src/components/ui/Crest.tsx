import Image from "next/image";
import { cx } from "@/lib/utils";

/**
 * Renders the official Leaders International School crest logo.
 */
export function Crest({ size = 76, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Leaders International School crest"
      width={size}
      height={size}
      unoptimized
      priority
      className={cx("shrink-0 object-contain select-none drop-shadow-[0_2px_6px_rgb(0_40_72/.18)]", className)}
      style={{ width: size, height: size }}
    />
  );
}
