"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Img } from "@/components/ui/Img";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";
import type { Gallery } from "@/lib/types";

export function GalleryExplorer({ gallery }: { gallery: Gallery }) {
  const [album, setAlbum] = useState<string>("all");
  const [open, setOpen] = useState<number | null>(null);

  const photos = useMemo(
    () => (album === "all" ? gallery.photos : gallery.photos.filter((p) => p.album === album)),
    [album, gallery.photos],
  );

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, step]);

  const chips = [{ id: "all", label: "All photos" }, ...gallery.albums];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter photographs">
        {chips.map((c) => {
          const count = c.id === "all" ? gallery.photos.length : gallery.photos.filter((p) => p.album === c.id).length;
          const active = album === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setAlbum(c.id)}
              className={cx(
                "flex items-center gap-2 rounded-full border px-4 py-2 font-display text-[.85rem] font-semibold transition",
                active ? "border-navy-800 bg-navy-800 text-white shadow-soft" : "border-hairline bg-white text-navy-700 hover:border-navy-300 hover:bg-navy-50",
              )}
            >
              {c.label}
              <span className={cx("rounded-full px-1.5 text-[.7rem] font-bold", active ? "bg-gold-400 text-navy-900" : "bg-navy-50 text-navy-500")}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid auto-rows-[172px] grid-cols-2 gap-3.5 md:grid-cols-4">
        {photos.map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            type="button"
            onClick={() => setOpen(i)}
            className={cx("group photo-tile text-left", (i === 0 || i === 5) && "md:col-span-2 md:row-span-2")}
            aria-label={`Open photograph: ${p.title ?? "untitled"}`}
          >
            <Img src={p.src} alt={p.title ?? "LIS photograph"} cdnWidth={900} sizes="(max-width:768px) 46vw, 24vw" />
            {p.title ? <figcaption>{p.title}</figcaption> : null}
            <span className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-navy-900/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
              <Icon name="search" size={14} />
            </span>
          </button>
        ))}
      </div>

      {photos.length === 0 ? (
        <p className="mt-8 rounded-2xl border border-dashed border-navy-200 bg-navy-50 p-8 text-center text-navy-700">
          No photographs in this album yet. Drop files into <code className="rounded bg-white px-1.5 py-0.5">public/media/uploads</code> and run <code className="rounded bg-white px-1.5 py-0.5">npm run media:import</code>.
        </p>
      ) : null}

      {open !== null && photos[open] ? (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={photos[open].title ?? "Photograph"} onClick={close}>
          <button type="button" onClick={close} aria-label="Close" className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white/10">
            <Icon name="close" size={18} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous photograph" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white/10 md:left-8">
            <Icon name="arrow-left" size={20} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next photograph" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white/10 md:right-8">
            <Icon name="arrow-right" size={20} />
          </button>
          {/* the lightbox shows the original at full size, from any host */}
          <figure onClick={(e) => e.stopPropagation()} className="flex max-h-full flex-col items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photos[open].src} alt={photos[open].title ?? ""} className="object-contain" />
            <figcaption className="text-center text-[.9rem] text-navy-100">
              {photos[open].title}
              {photos[open].caption ? <span className="mt-1 block text-[.84rem] text-navy-200/80">{photos[open].caption}</span> : null}
              <span className="mt-1 block text-[.76rem] uppercase tracking-[.18em] text-gold-300">{open + 1} / {photos.length}</span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </div>
  );
}
