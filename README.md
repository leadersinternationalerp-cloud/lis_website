# Leaders International School — website

A marketing website for Leaders International School in Kisakasaka, Zanzibar: Baby Class, Nursery (KG1 & KG2), NECTA Primary (Grades 1–6), and Cambridge Assessment International Education Primary (Years 1–6) — with navy + gold branding, a circular SVG crest, and content that any teacher or the bursar can update without touching design code.

Built with **Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript**, deploying to **Vercel**
as a static/ISR site. Optional **Sanity** CMS for photographs, documents, news and admissions
enquiries.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (this is what Vercel runs) |
| `npm start` | Serve the production build locally |
| `npm run check` | Type-check + lint + build in one go |
| `npm run media:import` | Turn `public/media/uploads/<album>/*.jpg` into the gallery |
| `npm run check:media` | Fail if any image or PDF referenced in `content/` is missing from `public/` |
| `npm run docs:samples` | Create placeholder PDFs for any missing download links |
| `npm run studio` | Sanity Studio on http://localhost:3333 (needs a project id in `.env.local`) |

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, 4 feature cards, programmes, why-us, stats, news, gallery, calendar, testimonials, admissions CTA |
| `/about` | Mission/vision/promise, growth timeline, values, leadership team, departments, accreditation |
| `/academics` | Pre-primary, Primary, O-Level, A-Level, clubs, results table, a day in the life |
| `/admissions` | 5-step process, entry requirements, fee tables, bursary bands, Open Day |
| `/apply` | 3-step application form (saves to Sanity, or hands the family a pre-filled email) |
| `/news`, `/news/[slug]` | Filterable newsroom + article pages |
| `/gallery` | Album filters + lightbox (arrow keys / Esc) |
| `/resources` | Searchable document library, term dates, key dates, policies |
| `/faq` | 15 parent questions in accordions |
| `/contact` | Contact cards, department table, map, enquiry form, careers |
| `/api/submit`, `/api/revalidate` | Form endpoint + cache flush |

## Where the content lives

Everything on screen comes from nine JSON files in [`content/`](./content) — see
[docs/UPDATE-CONTENT.md](docs/UPDATE-CONTENT.md) for a field-by-field map.

```
content/site.json        name, contact, socials, nav, hero, features, stats, CTA, footer
content/news.json        newsroom + home-page news cards
content/gallery.json     albums + photographs
content/resources.json   downloads, term dates, key dates
content/about.json       story, values, leadership, departments, accreditation
content/academics.json   the four stages, clubs, results, day rhythm
content/admissions.json  process, requirements, fees, bursaries, open day
content/contact.json     cards, departments, directions, careers
content/faq.json         questions by group
public/media/**          photographs (hero, news, gallery, team)
public/documents/**      PDFs offered for download
```

Media and documents can also be managed in a browser through Sanity —
[docs/CMS-SANITY.md](docs/CMS-SANITY.md).

## Deploy to Vercel

1. Push this folder to GitHub/GitLab.
2. In Vercel: **Add New → Project → Import** the repo. Framework preset *Next.js*,
   build command `npm run build`, output auto-detected. No env vars required.
3. Deploy. Then set `NEXT_PUBLIC_SITE_URL` to your real domain and redeploy once, so the
   sitemap, robots and share previews use it ([docs/DEPLOY-VERCEL.md](docs/DEPLOY-VERCEL)).

Ongoing updates: edit a file in `content/`, add a photo to `public/media/`, commit, push —
Vercel rebuilds and every page updates. Each deploy gets its own preview URL automatically.

## Things to change before you publish

The structure, colours and wording are real; the specific numbers and names are **sample copy**
written to show what belongs where. Before launch, replace:

- results percentages, student counts, fee figures, term dates and the school code (`content/*.json`)
- staff names and the four placeholder photos on `/about` (`public/media/`)
- the uniform spec in `content/resources.json` → `uniform` (currently: cream polo + sky-blue collar + navy trousers/skirt + crest on chest and on the head veil — colours listed as hex swatches on `/resources#uniform`)
- the placeholder PDFs in `public/documents/` (real signed documents)
- social links + portal URL (`content/site.json` → `socials`, `portal`)
- map coordinates / `embedUrl` in `content/contact.json` if the gate is elsewhere

## Layout

```
src/
  app/
    layout.tsx            fonts, metadata, JSON-LD
    (site)/               every public page + shared header/footer
    api/                  submit + revalidate endpoints
  components/
    ui/                   Crest, Icon set, Img, Reveal, ButtonLink, SectionHead
    layout/               Header (dropdown nav, notice ticker), Footer
    sections/             Hero, FeatureStrip, NewsCard, PageHero, Timeline, CtaBand…
    client/               the interactive bits: gallery, filters, forms, carousel
  lib/                    content loader, Sanity layer, types, SEO, utils
sanity.config.ts          Studio config (npx sanity dev / npm run studio)
src/sanity/schemas.ts     photo, news, resource, application, enquiry
scripts/                  media:import, docs:samples
docs/                     update-content, cms-sanity, deploy-vercel
```

## Notes on craft

- No external requests at runtime: fonts are bundled by `next/font`, all icons are inline SVG,
  photographs come from `/public`. The site works in an airplane, and so does the preview.
- Motion is CSS-only and switched off under `prefers-reduced-motion`; scroll reveals render
  visible in the HTML first, so a broken script can never hide your content.
- Accessible: skip link, focus rings, labelled nav landmarks, keyboard lightbox, AA-contrast
  palette, semantic headings on every page.
