import type { Block } from "@/lib/types";

/** Renders the shared block model used by local JSON and by mapped CMS portable text. */
export function Blocks({ blocks, className }: { blocks?: Block[]; className?: string }) {
  if (!blocks?.length) return null;
  return (
    <div className={`prose-lis ${className ?? ""}`}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "list":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <figure key={i} className="my-6">
                <blockquote className="pull-quote">{block.text}</blockquote>
                {block.author ? <figcaption className="mt-2 text-[.82rem] font-semibold uppercase tracking-[.12em] text-navy-500">— {block.author}</figcaption> : null}
              </figure>
            );
          case "image":
            return (
              <figure key={i} className="my-7">
                {/* CMS images can come from any host, so this one is not optimised by next/image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.src} alt={block.alt ?? ""} className="w-full rounded-2xl border border-hairline" loading="lazy" />
                {block.caption ? <figcaption className="mt-2 text-[.84rem] text-slate-body">{block.caption}</figcaption> : null}
              </figure>
            );
          default:
            return <p key={i}>{block.text}</p>;
        }
      })}
    </div>
  );
}
