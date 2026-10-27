import Link from "next/link";
import { Crest } from "@/components/ui/Crest";
import { Icon } from "@/components/ui/Icon";
import type { SiteConfig } from "@/lib/types";

export function Footer({ site }: { site: SiteConfig }) {
  const year = new Date().getFullYear();
  return (
    <footer className="dark-section noise relative">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-sky-400/20 blur-3xl" />
      <div className="shell relative">
        {/* quick links strip */}
        {site.quickLinks?.length ? (
          <div className="-mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {site.quickLinks.map((q, idx) => (
              <Link key={q.href + q.label} href={q.href}
                    className="group flex items-center gap-3 rounded-2xl border border-sky-300/25 bg-white/10 px-4 py-3.5 backdrop-blur transition hover:border-sky-400/70 hover:bg-sky-400/15">
                <span className={idx % 2 === 0 ? "icon-chip icon-chip--sky !h-10 !w-10" : "icon-chip icon-chip--gold !h-10 !w-10"}>
                  <Icon name={q.icon ?? "arrow-up-right"} size={17} />
                </span>
                <span className="font-display text-[.95rem] font-semibold text-white">{q.label}</span>
                <Icon name="arrow-right" size={16} className="ml-auto text-sky-300 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        ) : null}

        <div className="grid gap-10 py-14 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))] lg:py-16">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3.5">
              <Crest size={62} />
              <span>
                <span className="block font-display text-[1.02rem] font-extrabold leading-tight text-white">{site.school.name}</span>
                <span className="mt-1.5 flex items-center gap-1.5">
                  <span className="h-[2px] w-5 rounded-full bg-gradient-to-r from-sky-400 to-gold-400" />
                  <span className="font-display text-[.6rem] font-bold uppercase tracking-[.34em] text-sky-300">{site.school.wordmark.line3}</span>
                </span>
              </span>
            </Link>
            <p className="mt-4 text-[.9rem] leading-relaxed text-navy-100/85">{site.footer.blurb}</p>
            <div className="mt-5 flex items-center gap-2">
              {site.socials.map((s) => (
                <a key={s.platform} href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.label}
                   className="grid h-9 w-9 place-items-center rounded-full border border-sky-300/25 text-navy-100 transition hover:-translate-y-0.5 hover:border-sky-400 hover:bg-sky-400/15 hover:text-sky-300">
                  <Icon name={s.platform} size={16} />
                </a>
              ))}
            </div>
            <p className="mt-5 text-[.72rem] leading-relaxed text-navy-200/75">{site.school.accreditation}</p>
          </div>

          {site.footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-[.72rem] font-bold uppercase tracking-[.2em] text-sky-300">{col.title}</h3>
              <ul className="mt-4 grid gap-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href} className="link-under text-[.92rem] text-navy-100/90 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid gap-4 border-t border-sky-300/15 py-7 text-[.86rem] text-navy-100/85 sm:grid-cols-2 lg:grid-cols-4">
          <p className="flex items-start gap-2.5"><Icon name="pin" size={17} className="mt-0.5 shrink-0 text-sky-300" /><span>{site.location.street}<br />{site.location.label}</span></p>
          <a href={`mailto:${site.contact.email}`} className="flex items-start gap-2.5 transition hover:text-white"><Icon name="mail" size={17} className="mt-0.5 shrink-0 text-sky-300" /><span className="break-all">{site.contact.email}</span></a>
          <a href={site.contact.phoneHref} className="flex items-start gap-2.5 transition hover:text-white"><Icon name="phone" size={17} className="mt-0.5 shrink-0 text-sky-300" /><span>{site.contact.phoneDisplay}</span></a>
          <p className="flex items-start gap-2.5"><Icon name="clock" size={17} className="mt-0.5 shrink-0 text-sky-300" /><span>{site.contact.officeHours?.[0]?.days} {site.contact.officeHours?.[0]?.hours}</span></p>
        </div>
      </div>

      <div className="relative border-t border-sky-300/15 bg-navy-950/65">
        <div className="shell flex flex-col gap-3 py-5 text-[.78rem] text-navy-200/80 md:flex-row md:items-center md:justify-between">
          <p>© {year} {site.school.legalName}. All rights reserved.</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2" aria-label="Footer legal">
            <Link href="/resources#policies" className="transition hover:text-sky-300">Policies</Link>
            <Link href="/resources#documents" className="transition hover:text-sky-300">Documents</Link>
            <Link href="/contact#careers" className="transition hover:text-sky-300">Careers</Link>
            <Link href="/faq" className="transition hover:text-sky-300">FAQ</Link>
            <a href={site.portal.href} className="inline-flex items-center gap-1 transition hover:text-sky-300">Portal <Icon name="external" size={12} /></a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
