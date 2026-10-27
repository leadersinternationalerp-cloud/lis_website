import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { Img } from "@/components/ui/Img";
import { Blocks } from "@/components/sections/Blocks";
import { NewsCard } from "@/components/sections/NewsCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { getNews, getNewsPost, getNewsSlugs, getNewsSiblings, site } from "@/lib/content";
import { buildMetadata, absolute } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/utils";
import type { Block } from "@/lib/types";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getNewsSlugs()).map((slug) => ({ slug }));
}

function blocksText(blocks?: Block[]) {
  if (!blocks?.length) return "";
  return blocks.map((b) => ("text" in b ? b.text : "items" in b ? b.items.join(" ") : "")).join(" ");
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const item = await getNewsPost(slug);
  if (!item) return buildMetadata({ title: "Story not found" });
  return buildMetadata({
    title: item.title,
    description: item.excerpt,
    path: `/news/${item.slug}`,
    image: item.image,
  });
}

export default async function NewsArticlePage({ params }: Params) {
  const { slug } = await params;
  const item = await getNewsPost(slug);
  if (!item) notFound();

  const [{ prev, next }, all] = await Promise.all([getNewsSiblings(item.slug), getNews()]);
  const related = all.filter((i) => i.slug !== item.slug && i.category === item.category).slice(0, 2);
  const fallbackRelated = related.length ? related : all.filter((i) => i.slug !== item.slug).slice(0, 2);
  const body = item.body?.length ? item.body : [{ type: "p", text: item.excerpt } as Block];

  return (
    <>
      <article>
        <header className="dark-section noise relative overflow-hidden pb-14 pt-12 lg:pb-16 lg:pt-16">
          <div className="shell relative max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-[.82rem] text-navy-200">
              <Link href="/" className="transition hover:text-gold-300">Home</Link>
              <Icon name="chevron-right" size={12} />
              <Link href="/news" className="transition hover:text-gold-300">News</Link>
              <Icon name="chevron-right" size={12} />
              <span className="font-semibold text-gold-300">{item.category}</span>
            </nav>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[.82rem] font-semibold uppercase tracking-[.14em] text-navy-200">
              <time>{formatDate(item.date)}</time>
              <span className="h-1 w-1 rounded-full bg-gold-400" />
              {item.category}
              <span className="h-1 w-1 rounded-full bg-gold-400" />
              {readingTime(blocksText(item.body))}
            </p>
            <h1 className="display mt-4 text-[clamp(1.95rem,4.6vw,3.05rem)] text-white">{item.title}</h1>
            <p className="mt-5 text-[1.06rem] leading-relaxed text-navy-100/90">{item.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/news" className="btn btn-outline !py-2 !text-[.85rem]"><Icon name="arrow-left" size={15} /> All news</Link>
              <a href={`mailto:?subject=${encodeURIComponent(item.title)}&body=${encodeURIComponent(absolute(`/news/${item.slug}`))}`} className="btn btn-outline !py-2 !text-[.85rem]"><Icon name="share" size={15} /> Share by email</a>
            </div>
          </div>
        </header>

        {item.image ? (
          <div className="shell -mt-2 lg:-mt-6">
            <div className="relative aspect-[16/8] overflow-hidden rounded-[26px] shadow-card">
              <Img src={item.image} alt={item.imageAlt ?? item.title} priority cdnWidth={1400} sizes="100vw" />
            </div>
          </div>
        ) : null}

        <div className="shell grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
          <div>
            <Blocks blocks={body} />
            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-hairline pt-6 text-[.85rem] text-slate-body">
              <Icon name="book" size={15} className="text-navy-400" />
              <Link href="/news" className="rounded-full bg-navy-50 px-3 py-1 font-semibold text-navy-700 transition hover:bg-navy-100">{item.category}</Link>
              <span>Filed by the school office</span>
            </div>
          </div>

          <aside className="grid gap-5 lg:sticky lg:top-28 lg:self-start">
            <div className="card-flat p-5">
              <p className="font-display text-[.7rem] font-bold uppercase tracking-[.2em] text-navy-500">Read next</p>
              <ul className="mt-3 grid gap-2.5">
                {[prev, next].filter(Boolean).map((sib) => (
                  <li key={sib!.slug}>
                    <Link href={`/news/${sib!.slug}`} className="group block rounded-xl border border-hairline p-3 transition hover:border-navy-200 hover:bg-navy-50">
                      <span className="block text-[.75rem] font-semibold uppercase tracking-[.12em] text-navy-400">{sib === prev ? "Newer" : "Older"}</span>
                      <span className="mt-1 block font-display text-[.95rem] font-bold leading-snug text-navy-900 group-hover:text-navy-700">{sib!.title}</span>
                    </Link>
                  </li>
                ))}
                {!prev && !next ? <li className="text-[.9rem] text-slate-body">This is the only story published so far.</li> : null}
              </ul>
            </div>
            <div className="card-flat bg-navy-50 p-5">
              <p className="font-display text-[1rem] font-bold text-navy-900">Have a story for the newsletter?</p>
              <p className="mt-1.5 text-[.88rem] leading-relaxed text-slate-body">Parents, teachers and student clubs can send photographs and a paragraph to the communications desk.</p>
              <a href={`mailto:${site.contact.email}`} className="btn btn-navy mt-4 !py-2 !text-[.85rem]"><Icon name="mail" size={14} /> Send a story</a>
            </div>
          </aside>
        </div>
      </article>

      {fallbackRelated.length ? (
        <section className="paper border-t border-hairline py-14">
          <div className="shell">
            <h2 className="h2 text-navy-900">More from LIS</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {fallbackRelated.map((r) => <NewsCard key={r.slug} item={r} size="stack" />)}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand site={site} />
    </>
  );
}
