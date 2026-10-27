# Deploying to Vercel

## First deploy (no CMS, no env vars needed)

1. Create a repository and push this folder:

   ```bash
   cd site
   git init && git add -A && git commit -m "LIS website"
   git branch -M main
   git remote add origin https://github.com/YOUR-SCHOOL/lis-website.git
   git push -u origin main
   ```

2. On [vercel.com](https://vercel.com) → **Add New… → Project → Import** that repository.
   - Framework preset: **Next.js** (auto-detected)
   - Build command: `npm run build` · Output directory: leave empty
   - Install command: `npm install`
3. **Deploy.** ~60–90 s. You get `https://<project>.vercel.app`.

The build has no external calls and no secrets, so it cannot fail because of them.

## Then, once

| Setting | Where | Value |
| --- | --- | --- |
| Canonical URL | Settings → Environment Variables | `NEXT_PUBLIC_SITE_URL = https://your-domain.tz` |
| Rename app | Settings → Domains | e.g. `leadersinternationalschool.ac.tz` |
| Add `www` | Settings → Domains | redirect `www` → apex |

Set a custom domain in **Settings → Domains**; for a `.co.tz` / `.ac.tz` domain add the two NS
records Vercel shows you at your registrar (or point an `A 76.76.21.21` record). DNS can take a
few hours; HTTPS is issued automatically.

After changing any `NEXT_PUBLIC_*` variable, redeploy (Deployments → ⋯ → Redeploy) — values are
compiled in at build time.

## Content updates after launch

| Change | What happens |
| --- | --- |
| Edit `content/*.json`, add `public/media` photo, push to Git | Vercel rebuilds → live in ~1 min. **This is the normal workflow.** |
| Publish in Sanity (photos, news, documents) | No rebuild needed. Pages refresh within 5 min (`export const revalidate = 300`), or instantly with the flush below |
| Urgent refresh | `curl -X POST "https://your-domain/api/revalidate?secret=REVALIDATE_SECRET"` (set `REVALIDATE_SECRET` in Vercel env) |

## Optional free extras worth turning on

- **Vercel Analytics / Speed Insights** — one click in the project dashboard, useful when you
  want to know whether parents actually land on `/apply`.
- **Preview deployments** — every branch/pull request gets its own URL, so the head teacher can
  approve changes before they go live.
- Cron (optional): add `vercel.json` with a `crons` entry if you want a nightly cache warm-up;
  not needed for normal use.

## If the build fails

| Message | Fix |
| --- | --- |
| `Cannot find module '…'` | `npm install` locally, commit `package-lock.json`, push |
| Type error in a JSON import | the JSON edit left a trailing comma or missing quote — `npm run check` shows the file |
| `Failed to fetch font` | network blocked at build; replace `next/font/google` with `next/font/local` + files in `public/fonts` |
| Image domain not allowed | add the host to `images.remotePatterns` in `next.config.ts` |

Run the same checks Vercel runs, before you push:

```bash
npm run check      # typecheck + lint + build
```
