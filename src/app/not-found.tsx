import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Crest } from "@/components/ui/Crest";
import { site } from "@/lib/content";

export default function NotFound() {
  return (
    <div className="dark-section noise grid min-h-dvh place-items-center py-20">
      <div className="shell max-w-2xl text-center">
        <div className="flex justify-center"><Crest size={92} /></div>
        <p className="eyebrow eyebrow-gold mt-8 justify-center">404 · wrong corridor</p>
        <h1 className="display mt-4 text-[clamp(2rem,6vw,3.2rem)] text-white">That page has moved, or never existed</h1>
        <p className="mx-auto mt-4 max-w-lg text-[1rem] leading-relaxed text-navy-100/90">
          Try the admissions desk, the calendar, or the photo gallery — those are the pages families actually look for.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-gold">Back to the home page</Link>
          <Link href="/admissions" className="btn btn-outline">Admissions</Link>
          <Link href="/gallery" className="btn btn-outline">Gallery</Link>
        </div>
        <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-[.9rem] text-navy-100/85">
          <li className="flex items-center gap-2"><Icon name="phone" size={15} className="text-gold-300" />{site.contact.phoneDisplay}</li>
          <li className="flex items-center gap-2"><Icon name="mail" size={15} className="text-gold-300" />{site.contact.email}</li>
        </ul>
      </div>
    </div>
  );
}
