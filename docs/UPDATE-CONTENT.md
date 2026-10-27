# Updating content without a CMS

The whole site reads from nine JSON files in `content/`. Edit one, save, and the page changes.
If you run `npm run dev` in a terminal, the browser updates as you type.

## 1. Add a news story

```jsonc
// content/news.json → "items": [ … ]   (newest first is automatic — order does not matter)
{
  "slug": "form-2-debates-district-final",      // becomes /news/<slug> — use lower-case + hyphens
  "title": "Form 2 reaches the district debate final",
  "category": "School Life",                    // appears as the chip + filter
  "date": "2026-03-14",
  "excerpt": "Two speakers, one motion about urban water, and a second place.",
  "image": "/media/news-debate.jpg",            // file lives in public/media/
  "imageAlt": "Two students at podium microphones",
  "featured": true,                             // true = candidate for the home page card
  "body": [
    { "type": "p", "text": "Opening paragraph." },
    { "type": "h2", "text": "The team" },
    { "type": "list", "items": ["Amina, Form 2", "Juma, Form 2"] },
    { "type": "quote", "text": "We practised every lunchtime.", "author": "Amina, speaker" }
  ]
}
```

`body` accepts `p`, `h2`, `h3`, `list`, `quote` and `image` blocks — that is the whole vocabulary.

## 2. Add photographs to the gallery

**Easiest:** drop files into `public/media/uploads/campus/` (or `science`, `sport`, `culture`,
`library`) and run

```bash
npm run media:import
```

Filenames become captions: `flag-day-2026.jpg` → “Flag Day 2026”. Re-running is safe: captions you
edited in `content/gallery.json` are kept, and nothing is deleted.

**Or by hand** in `content/gallery.json`:

```jsonc
{ "src": "/media/hero-students.jpg", "album": "campus", "title": "Morning reading", "caption": "optional" }
```

`gallery.count` is the size of the whole archive (it drives the “+N more photos” tile) — the import
script never lowers it.

## 3. Add or replace a document

1. Put the PDF in `public/documents/` (any name you like, e.g. `fee-structure.pdf`).
2. Add a row to `content/resources.json`:

```jsonc
{
  "title": "Fee Structure & Payment Schedule",
  "category": "Fees",                 // must exist in "categories" to be filterable
  "type": "pdf",                      // pdf | doc | sheet | slides | image
  "size": "188 KB",
  "href": "/documents/fee-structure.pdf",
  "updated": "2026-01-05",
  "description": "Termly fees in TZS and USD, sibling discount…"
}
```

Replacing a file with the same name is enough for a re-deploy to serve the new one.
`npm run docs:samples` writes a labelled placeholder for any row whose file is missing, so no
download link is ever broken.

## 3b. School uniform

The uniform block on `/resources#uniform` is content too — colours, items, where to buy and the
lending practice live in `content/resources.json` under `uniform`:

```jsonc
"uniform": {
  "title": "School uniform & appearance",
  "intro": "…",
  "items": [ { "name": "Cream polo shirt", "detail": "Sky-blue collar … crest embroidered on the left chest" } ],
  "swatches": [ { "label": "Sky collar & cuffs", "hex": "#8FD1F2" } ],   // drives the colour chips
  "buy": "Order through the front office …",
  "note": "No child is sent home for missing uniform …"
}
```

Change a `hex` and the swatch on the page changes with it. The same colours are used in
`src/app/globals.css` (`--color-sky-uniform-*`) if you want the accent elsewhere.

> Photographers' note: the images in this repo were generated to match that spec — cream polo,
> sky-blue collar and cuffs, navy bottoms, crest on the chest, crest on the head veil too, colourful
> classic classrooms, and learners from several backgrounds in every frame. Keep the same brief when
> you replace them with real photographs.

## 4. Fees, dates, nav, contact details

| Want to change | File → key |
| --- | --- |
| Phone, email, WhatsApp, office hours | `site.json` → `contact` |
| Facebook / Instagram / YouTube / X links | `site.json` → `socials` |
| Parent portal URL | `site.json` → `portal.href` |
| Menu items and dropdowns | `site.json` → `nav` (each entry may have `children`) |
| The yellow strip at the very top | `site.json` → `notice` (`enabled: false` hides it) |
| Headline, sub-headline, hero photo | `site.json` → `hero` |
| The four cards under the hero | `site.json` → `features` |
| Numbers band | `site.json` → `stats` |
| Term dates & upcoming dates | `resources.json` → `termDates`, `keyDates` |
| Fee table, discounts, bursary bands | `admissions.json` → `fees`, `bursaries` |
| Class-by-class requirements | `admissions.json` → `requirements.groups` |
| Staff profiles | `about.json` → `leadership.people` (set `photo` to `""` to show initials) |
| FAQ items | `faq.json` → `groups[].items` |

## 5. Colours and logo

- Palette: one block at the top of `src/app/globals.css` (`--color-navy-*`, `--color-gold-*`).
  Change `--color-navy-800` and `--color-gold-400` and the whole site follows.
- Crest: `src/components/ui/Crest.tsx` (inline SVG) and `public/crest.svg` (favicon, PWA icon).
  To use a scanned logo instead, drop `public/logo.png` in and replace `<Crest …/>` with
  `<Image src="/logo.png" …/>` in `Header.tsx` and `Footer.tsx`.
- Fonts: `src/app/layout.tsx` — Poppins (headings) and Inter (body), self-hosted at build time.

## 6. Publish

```bash
git add -A && git commit -m "news: district debate final" && git push
```

Vercel builds and deploys. Every commit also gets a preview URL for checking before share.

Before you push, a 1-second integrity check that no page is left with an empty image slot:

```bash
npm run check:media
```
