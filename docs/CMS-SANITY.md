# Connecting a CMS (Sanity) — optional

The site works without a CMS. Add Sanity when non-IT staff should upload photographs and
documents themselves, or when you want `/apply` submissions stored in a database.

**Cost:** Sanity's free plan covers 10k “viewer” requests and 2 GB of asset storage, which is
plenty for a school site.

## 1 · Create the project

```bash
npm install                 # `sanity` is already a devDependency here
npx sanity@latest init --no-install   # choose "existing project" or create one; ignore the generated config
```

It prints a project id (looks like `p7x2k9pa`). Put it, plus a title, in `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=x9pcz7mh
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_TITLE=LIS — School content
```

## 2 · Run the Studio

```bash
npm run studio              # http://localhost:3333  (reads sanity.config.ts)
```

`sanity.config.ts` + `src/sanity/schemas.ts` define five content types:

| Type | Feeds |
| --- | --- |
| **Photo** | `/gallery`, home page gallery strip |
| **News article** | `/news`, `/news/<slug>`, home page news card |
| **Document / download** | `/resources` |
| **Admission application** | written by the `/apply` form |
| **Website enquiry** | written by the `/contact` form |

Upload a photo: **Photos → New → drag the file into the image field → add alt text → Publish.**
The site shows it on the next refresh (ISR: 5 minutes; or `POST /api/revalidate?secret=…`).

## 3 · Let the forms write to it

Create an **Editor** token (Sanity → API → Tokens) and add to Vercel:

```
SANITY_API_WRITE_TOKEN=sk…
REVALIDATE_SECRET=some-long-random-string
```

`src/app/api/submit/route.ts` then stores applications/enquiries as documents (view them in the
Studio, or export to a spreadsheet). Without that token the same endpoint falls back to:
1. appending to `./submissions/outbox.jsonl` when the filesystem is writable, and
2. giving the family a one-click, pre-filled email to the admissions address. Nothing is lost.

## 4 · Deploy the Studio (optional)

So staff can edit from anywhere, not only from your laptop:

```bash
npx sanity build            # outputs to ./dist
npx sanity deploy           # free hosting → https://<name>.sanity.host
```

Restrict it in Sanity → API → CORS origins. Alternatively deploy `npx sanity dev`-free as a second
Vercel project using the same repo (`build: npx sanity build`, output `dist`).

## 5 · How the fallback behaves

`src/lib/content.ts` asks Sanity first for the three collections and uses `content/*.json` when:
- no project id is set, or
- a query errors (bad token, deleted dataset, offline), or
- the type is empty in Sanity.

That is deliberate: a CMS outage can never take the school website down. The library pages,
fees and admissions copy always live in the JSON files so they stay reviewable in Git.

## Migrating the current JSON into Sanity

Simplest practical route: keep the JSON for copy, and start publishing *new* photos, news and PDFs
in Sanity. Over time the CMS side grows and the JSON becomes the archive of launch content.
