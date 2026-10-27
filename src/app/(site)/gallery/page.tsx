import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHead } from "@/components/ui/SectionHead";
import { GalleryExplorer } from "@/components/client/GalleryExplorer";
import { getGallery, site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Photo & media gallery",
  description: "Photographs of LIS campus life in Kisakasaka: classrooms, laboratories, library, sport, culture day and assemblies.",
  path: "/gallery",
});

export default async function GalleryPage() {
  const gallery = await getGallery();
  const total = gallery.count ?? gallery.photos.length;
  return (
    <>
      <PageHero
        eyebrow="Media"
        title={gallery.title}
        intro={gallery.intro}
        image={gallery.photos[0]?.src}
        crumbs={[{ label: "Gallery" }]}
        actions={
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[.88rem] text-navy-100">
            <span className="flex items-center gap-2"><Icon name="image" size={16} className="text-gold-300" />{gallery.photos.length} of {total} photographs online</span>
            <a href="#video" className="flex items-center gap-2"><Icon name="play" size={15} className="text-gold-300" />Video tour</a>
          </div>
        }
      />

      <section className="py-14 lg:py-16">
        <div className="shell">
          <GalleryExplorer gallery={gallery} />
        </div>
      </section>

      <section id="video" className="paper scroll-mt-28 border-y border-hairline py-16 lg:py-20">
        <div className="shell grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <SectionHead eyebrow="Video" title={gallery.video?.title ?? "Video tour"} lead={gallery.video?.text}
              action={gallery.video?.href ? <a href={gallery.video.href} target="_blank" rel="noreferrer noopener" className="btn btn-navy"><Icon name="play" size={15} /> Watch on YouTube</a> : undefined} />
            <p className="mt-6 text-[.9rem] text-slate-body">
              Film something at school? Send it to <a className="font-semibold text-navy-800 underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> and the media club will edit it in.
            </p>
          </div>
          <a href={gallery.video?.href ?? "#"} target="_blank" rel="noreferrer noopener" className="group relative block aspect-[16/10] overflow-hidden rounded-[24px] shadow-card">
            <Img src={gallery.video?.thumbnail} alt="Video tour thumbnail" cdnWidth={1000} sizes="(max-width:1024px) 92vw, 45vw" className="transition-transform duration-[1200ms] group-hover:scale-105" />
            <span className="absolute inset-0 bg-navy-950/45 transition group-hover:bg-navy-950/30" />
            <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold-400 text-navy-900 shadow-lift transition-transform duration-500 group-hover:scale-110">
              <Icon name="play" size={26} />
            </span>
            <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 font-display text-[.8rem] font-bold text-navy-900">3:12 · LIS campus tour</span>
          </a>
        </div>
      </section>

      <section className="py-14 lg:py-16">
        <div className="shell grid gap-5 md:grid-cols-3">
          {[
            { icon: "camera", title: "Who takes these", text: "Our media club and the staff phone, mostly. Nothing here is a stock photograph." },
            { icon: "shield", title: "Consent & privacy", text: "Faces are published only with a signed media consent on the enrolment form. Ask the office to remove any image." },
            { icon: "image", title: "Get your prints", text: "Event albums are collected at the front office; the contribution goes to the bursary fund." },
          ].map((c) => (
            <div key={c.title} className="card flex gap-4 p-5">
              <span className="icon-chip !h-11 !w-11"><Icon name={c.icon} size={19} /></span>
              <div>
                <h3 className="h3 text-navy-900">{c.title}</h3>
                <p className="mt-1.5 text-[.9rem] leading-relaxed text-slate-body">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="shell mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-navy-200 bg-navy-50 p-5">
          <p className="max-w-2xl text-[.9rem] leading-relaxed text-navy-800">
            <strong className="font-semibold">Updating this page?</strong> Put photographs in <code className="rounded bg-white px-1.5 py-0.5">public/media/uploads/&lt;album&gt;/</code> and run <code className="rounded bg-white px-1.5 py-0.5">npm run media:import</code> — it writes <code className="rounded bg-white px-1.5 py-0.5">content/gallery.json</code> for you. Or connect a CMS and upload from the Studio.
          </p>
          <Link href="/resources" className="btn btn-quiet !py-2 !text-[.85rem]">Documents & calendar</Link>
        </div>
      </section>
    </>
  );
}
