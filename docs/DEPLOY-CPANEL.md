# Deploying to cPanel Hosting

This project is configured so you can deploy to **any cPanel hosting plan** using either:

1. **Option 1 (Recommended — Works on ALL cPanel plans): Static HTML + PHP Form Mailer (`public_html`)**
2. **Option 2 (For cPanel plans with "Setup Node.js App"): Node.js Server (`server.js`)**

---

## Option 1: Static `public_html` Upload + PHP Form Mailer (Recommended)

This option exports all pages into static HTML/CSS/JS inside `out/` and bundles:
- `.htaccess` (Apache/LiteSpeed rules, custom 404 page, and asset caching)
- `api/submit.php` (PHP form mailer that sends Online Applications and Contact Enquiries directly to `info@leaderinternationalschool.ac.tz` using cPanel's built-in PHP `mail()` and logs a backup in `/submissions/outbox.jsonl`)

### Step 1 — Build the cPanel package on your computer
```bash
npm run build:cpanel
```
This generates:
- `out/` — the complete static site folder
- `cpanel-public_html.zip` — a single `.zip` archive ready to upload to cPanel

### Step 2 — Upload to cPanel File Manager
1. Log in to **cPanel** and open **File Manager**.
2. Click **Settings** (top-right corner of File Manager) and check **"Show Hidden Files (dotfiles)"** so `.htaccess` is visible.
3. Open your domain root folder (`public_html`).
4. Click **Upload** and select `cpanel-public_html.zip` from your project folder (`e:\LIS\site\cpanel-public_html.zip`).
5. Go back to `public_html`, right-click `cpanel-public_html.zip`, and click **Extract** → extract into `/public_html`.
6. Delete `cpanel-public_html.zip` from `public_html` once extracted.

> **Tip for Email Deliverability:** Make sure the email account `info@leaderinternationalschool.ac.tz` (or a forwarder) exists under **cPanel → Email Accounts** so cPanel's local mail server delivers applications and enquiries straight to your inbox.

---

## Option 2: cPanel "Setup Node.js App" (`server.js`)

Use this option if your cPanel plan includes **Software → Setup Node.js App** (Phusion Passenger) and you want to run Next.js as a live Node.js server.

### Step 1 — Build the production Next.js bundle
```bash
npm run build
```

### Step 2 — Upload to an application folder on cPanel
1. In **cPanel → File Manager**, create a folder outside `public_html`, for example `/home/YOUR_CPANEL_USER/lis-site`.
2. Upload the project files (`package.json`, `package-lock.json`, `next.config.ts`, `server.js`, `.next/`, `public/`, `content/`, `src/`) into `/home/YOUR_CPANEL_USER/lis-site`.
3. In **cPanel → Setup Node.js App**, click **Create Application**:
   - **Node.js version:** `20.x` or `22.x`
   - **Application mode:** `Production`
   - **Application root:** `lis-site`
   - **Application URL:** your domain (`leaderinternationalschool.ac.tz`)
   - **Application startup file:** `server.js`
4. Click **Create**, then click **Run NPM Install**, and finally click **Restart**.
