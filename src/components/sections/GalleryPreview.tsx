import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import type { Gallery } from "@/lib/types";

export function GalleryPreview({ gallery }: { gallery: Gallery }) {
  const photos = gallery.photos.slice(0, 6);
  const total = gallery.count ?? gallery.photos.length;
  return (
    <section className="dark-section noise relative py-16 lg:py-20">
      <div className="shell relative">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow eyebrow-gold mb-2.5 flex items-center gap-2.5">
              <span className="h-px w-8 bg-gold-400/70" /> School life
            </p>
            <h2 className="h2 text-white">Inside the gallery</h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-navy-100/85">{gallery.intro}</p>
          </div>
          <Link href="/gallery" className="btn btn-outline group shrink-0">
            View all {total} photos <Icon name="arrow-up-right" size={16} className="transition-transform group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-3 md:grid-cols-4">
          {photos.map((p, i) => (
            <Link
              key={p.src + i}
              href="/gallery"
              className={`group photo-tile ${i === 0 ? "col-span-2 row-span-2 aspect-square md:aspect-auto" : "aspect-[4/3.2]"}`}
            >
              <Img src={p.src} alt={p.title ?? "LIS photograph"} cdnWidth={800} sizes="(max-width:768px) 46vw, 22vw" className="transition duration-700 group-hover:scale-105" />
              <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10 transition group-hover:ring-gold-400/60" />
            </Link>
          ))}
          <Link href="/gallery" className="group relative hidden aspect-[4/3.2] place-items-center overflow-hidden rounded-[14px] border border-white/15 bg-white/5 md:grid">
            <span className="text-center">
              <span className="block font-display text-3xl font-extrabold text-gold-300">+{Math.max(0, total - photos.length)}</span>
              <span className="mt-1 block text-[.78rem] font-semibold uppercase tracking-[.16em] text-navy-100/80">More photos</span>
            </span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgb(253_203_36/.25),transparent_60%)] opacity-0 transition group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
