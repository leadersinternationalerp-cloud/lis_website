"use client";
import { useEffect, useRef, useState } from "react";

/** Counts a numeric stat up when it scrolls into view; reduced motion = show it instantly. */
export function CountUp({ value, suffix = "" }: { value: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const target = Number(value.replace(/[^\d.]/g, ""));
  const prefix = value.match(/^[^\d]*/)?.[0] ?? "";
  const [display, setDisplay] = useState<string>(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !Number.isFinite(target)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const format = (n: number) => `${prefix}${target >= 1000 ? Math.round(n).toLocaleString("en-US") : Number(n.toFixed(target % 1 ? 1 : 0))}`;
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1250;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(format(target * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [prefix, target]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
