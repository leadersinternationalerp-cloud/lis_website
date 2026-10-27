"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Crest } from "@/components/ui/Crest";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/utils";
import type { SiteConfig } from "@/lib/types";

type NavItem = SiteConfig["nav"][number];

export function Header({ site }: { site: SiteConfig }) {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [sheet, setSheet] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenu(null); setSheet(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = sheet ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sheet]);

  const notice = site.notice;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`) || (href !== "/" && pathname.startsWith(href));

  return (
    <header className="no-print sticky top-0 z-50">
      {/* utility bar */}
      <div className="bg-navy-950 text-[.78rem] text-navy-100">
        <div className="shell flex h-11 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <span className="flex items-center gap-1.5 truncate">
              <Icon name="pin" size={14} className="text-sky-400" />
              {site.location.label}
            </span>
            <span className="hidden h-3.5 w-px bg-sky-400/25 sm:block" />
            <a href={`mailto:${site.contact.email}`} className="hidden truncate transition hover:text-sky-300 sm:flex sm:items-center sm:gap-1.5">
              <Icon name="mail" size={14} className="text-sky-400" />
              {site.contact.email}
            </a>
            <span className="hidden h-3.5 w-px bg-sky-400/25 lg:block" />
            <a href={site.contact.phoneHref} className="hidden items-center gap-1.5 transition hover:text-sky-300 lg:flex">
              <Icon name="phone" size={14} className="text-sky-400" />
              {site.contact.phoneDisplay}
            </a>
          </div>
          <div className="flex items-center gap-1">
            <div className="mr-1 hidden items-center gap-1 md:flex">
              {site.socials.map((s) => (
                <a key={s.platform} href={s.href} target="_blank" rel="noreferrer noopener" aria-label={s.label}
                   className="grid h-7 w-7 place-items-center rounded-full text-navy-100 transition hover:bg-sky-400/15 hover:text-sky-300">
                  <Icon name={s.platform} size={14} />
                </a>
              ))}
            </div>
            <a href={site.portal.href} className="flex items-center gap-1.5 rounded-full bg-sky-400/15 px-3 py-1.5 font-semibold text-white ring-1 ring-sky-400/35 transition hover:bg-sky-400 hover:text-navy-950">
              <Icon name="lock" size={13} />
              <span className="hidden sm:inline">{site.portal.label}</span>
              <span className="sm:hidden">Portal</span>
            </a>
          </div>
        </div>
      </div>

      {/* notice ticker — styled after the light-blue motto ribbon on the LIS crest */}
      {notice?.enabled ? (
        <div className="border-b border-sky-600/25 bg-[linear-gradient(90deg,#30b8c0_0%,#58d3dc_50%,#30b8c0_100%)] text-navy-950">
          <div className="shell flex h-9 items-center gap-3 overflow-hidden">
            <span className="hidden shrink-0 rounded-full bg-navy-900 px-2.5 py-0.5 text-[.62rem] font-bold uppercase tracking-[.18em] text-sky-300 ring-1 ring-sky-300/30 sm:block">
              Admissions
            </span>
            <div className="mask-fade relative min-w-0 flex-1 overflow-hidden">
              <div className="marquee gap-16 whitespace-nowrap text-[.8rem] font-semibold">
                {[0, 1].map((dup) => (
                  <span key={dup} className="flex items-center gap-16" aria-hidden={dup === 1}>
                    <span>{notice.text}</span>
                    {notice.href ? (
                      <Link href={notice.href} className="inline-flex items-center gap-1 font-bold underline decoration-navy-900/45 underline-offset-4 hover:decoration-navy-950">
                        {notice.linkLabel ?? "Read more"} <Icon name="arrow-right" size={13} />
                      </Link>
                    ) : null}
                    <span className="text-navy-900/85">Call {site.contact.phoneDisplay}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* main bar */}
      <div
        className={cx(
          "relative border-b transition-all duration-300",
          scrolled ? "border-hairline bg-white/95 shadow-[0_10px_30px_-24px_rgb(0_40_72_.45)] backdrop-blur" : "border-transparent bg-white",
        )}
        onMouseLeave={() => setMenu(null)}
      >
        <div className={cx("shell flex items-center justify-between gap-6 transition-all duration-300", scrolled ? "h-[68px]" : "h-[82px]")}>
          <Link href="/" className="group flex items-center gap-3.5" aria-label={`${site.school.name} — home`}>
            <Crest size={scrolled ? 48 : 58} className="transition-all duration-300" />
            <span className="leading-none">
              <span className="block font-display text-[1.06rem] font-extrabold tracking-[-.01em] text-navy-900 sm:text-[1.18rem]">
                {site.school.wordmark.line1}
                <br />
                {site.school.wordmark.line2}
              </span>
              <span className="mt-1.5 flex items-center gap-2">
                <span className="h-[2px] w-6 rounded-full bg-gradient-to-r from-sky-400 to-gold-400 transition-all duration-300 group-hover:w-9" />
                <span className="font-display text-[.62rem] font-bold uppercase tracking-[.38em] text-sky-600">{site.school.wordmark.line3}</span>
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
            {site.nav.map((item: NavItem) => {
              const active = isActive(item.href);
              const hasKids = Boolean(item.children?.length);
              return (
                <div key={item.label} className="relative" onMouseEnter={() => setMenu(hasKids ? item.label : null)}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={hasKids ? menu === item.label : undefined}
                    onFocus={() => hasKids && setMenu(item.label)}
                    className={cx(
                      "relative flex items-center gap-1 rounded-full px-3.5 py-2 font-display text-[.93rem] font-semibold transition",
                      active ? "text-navy-900" : "text-navy-700/90 hover:text-sky-700",
                    )}
                  >
                    {item.label}
                    {hasKids ? <Icon name="chevron-down" size={13} className={cx("transition-transform duration-300", menu === item.label && "rotate-180 text-sky-500")} /> : null}
                    <span className={cx("absolute inset-x-3 -bottom-0.5 h-[2.5px] origin-left rounded-full bg-gradient-to-r from-sky-400 to-gold-400 transition-transform duration-300", active ? "scale-x-100" : "scale-x-0")} />
                  </Link>

                  {hasKids && menu === item.label ? (
                    <div className="absolute left-1/2 top-[calc(100%+10px)] z-40 w-[360px] -translate-x-1/2">
                      <div className="card overflow-hidden !rounded-2xl p-2 !border-sky-200">
                        <p className="px-3 pb-2 pt-2 font-display text-[.66rem] font-bold uppercase tracking-[.2em] text-sky-600">{item.label}</p>
                        <ul className="grid">
                          {item.children!.map((child) => (
                            <li key={child.href + child.label}>
                              <Link href={child.href} onClick={() => setMenu(null)}
                                    className="group flex items-start gap-3 rounded-xl px-3 py-2.5 transition hover:bg-sky-50">
                                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-sky-50 text-sky-700 transition group-hover:bg-sky-400 group-hover:text-navy-950">
                                  <Icon name="chevron-right" size={13} />
                                </span>
                                <span>
                                  <span className="block font-display text-[.92rem] font-semibold text-navy-900">{child.label}</span>
                                  {child.description ? <span className="mt-0.5 block text-[.8rem] leading-snug text-slate-body">{child.description}</span> : null}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link href={item.href} onClick={() => setMenu(null)} className="mt-1 flex items-center justify-between rounded-xl bg-navy-800 px-3 py-2.5 font-display text-[.85rem] font-semibold text-white transition hover:bg-sky-600">
                          All {item.label.toLowerCase()} <Icon name="arrow-right" size={14} className="text-sky-300" />
                        </Link>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/apply" className="btn btn-navy group hidden sm:inline-flex !px-5 !py-2.5 !text-[.9rem] ring-1 ring-sky-400/35">
              Apply Now
              <span className="grid h-5 w-5 place-items-center rounded-full bg-sky-400 text-navy-950 transition-transform duration-300 group-hover:translate-x-0.5">
                <Icon name="arrow-right" size={12} strokeWidth={2.4} />
              </span>
            </Link>
            <button type="button" onClick={() => setSheet(true)} className="grid h-11 w-11 place-items-center rounded-full border border-hairline text-navy-800 transition hover:bg-sky-50 lg:hidden" aria-label="Open menu">
              <Icon name="menu" size={20} />
            </button>
          </div>
        </div>
      </div>

      {sheet ? <MobileSheet site={site} onClose={() => setSheet(false)} isActive={isActive} /> : null}
    </header>
  );
}

function MobileSheet({ site, onClose, isActive }: { site: SiteConfig; onClose: () => void; isActive: (href: string) => boolean }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div className="fixed inset-0 z-[80] lg:hidden">
      <button type="button" aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm" />
      <div className="absolute inset-y-0 right-0 flex w-[min(420px,92vw)] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
          <span className="flex items-center gap-2.5">
            <Crest size={42} />
            <span className="font-display text-[.95rem] font-extrabold leading-tight text-navy-900">{site.school.name}</span>
          </span>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-hairline text-navy-800" aria-label="Close menu">
            <Icon name="close" size={18} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile">
          <ul className="grid gap-1">
            {site.nav.map((item) => {
              const kids = item.children ?? [];
              return (
                <li key={item.label} className="rounded-xl">
                  <div className={cx("flex items-center justify-between rounded-xl px-3 py-3 transition", isActive(item.href) ? "bg-sky-50" : "hover:bg-sky-50")}>
                    <Link href={item.href} onClick={onClose} className="flex-1 font-display text-[1rem] font-semibold text-navy-900">
                      {item.label}
                    </Link>
                    {kids.length ? (
                      <button type="button" onClick={() => setExpanded(expanded === item.label ? null : item.label)} aria-expanded={expanded === item.label}
                              aria-label={`Toggle ${item.label} section`} className="grid h-8 w-8 place-items-center rounded-full text-sky-600">
                        <Icon name="chevron-down" size={16} className={cx("transition-transform", expanded === item.label && "rotate-180")} />
                      </button>
                    ) : null}
                  </div>
                  {kids.length && expanded === item.label ? (
                    <ul className="mt-1 grid gap-0.5 border-l-2 border-sky-200 pl-3">
                      {kids.map((c) => (
                        <li key={c.href + c.label}>
                          <Link href={c.href} onClick={onClose} className="block rounded-lg px-2 py-2 text-[.92rem] text-slate-body transition hover:bg-sky-50 hover:text-navy-900">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="grid gap-3 border-t border-hairline px-5 py-5">
          <Link href="/apply" onClick={onClose} className="btn btn-sky justify-center">Apply for Jan 2027</Link>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <a href={site.contact.phoneHref} className="card-flat flex items-center gap-2 px-3 py-2.5 font-semibold text-navy-800"><Icon name="phone" size={16} className="text-sky-600" /> Call</a>
            <a href={site.contact.whatsappHref ?? "#"} className="card-flat flex items-center gap-2 px-3 py-2.5 font-semibold text-navy-800"><Icon name="whatsapp" size={16} className="text-sky-600" /> WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}
