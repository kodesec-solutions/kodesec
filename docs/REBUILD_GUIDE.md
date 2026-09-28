# Rebuilding the Kodesec front end from scratch

A practical guide for whoever rebuilds kodesec.com. Read `CLAUDE.md`, `docs/ARCHITECTURE.md` and
`docs/SEO_AUDIT.md` first.

**The main rule: the look can change completely, but the URLs, content, SEO plumbing, and integrations must
survive.** Get those wrong and the domain loses the little search visibility it has.

---

## 0. Decide the approach

| Option | When to pick it | Effort |
|---|---|---|
| **A. New UI, same repo and stack (recommended)** | Keep Next.js + Vercel + static export and replace `components/`, page layouts and styles. Content files and SEO files are reused. | Lowest risk |
| B. Fresh Next.js repo, copy content over | You want a clean dependency tree and folder structure. Copy `content/`, `public/`, `config/site.ts` data, `vercel.json`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`. | Medium |
| C. Different framework (Astro, etc.) | Only if the team wants a content-first site with little JS. Astro + MDX fits this site well, but you must re-implement sitemap, OG images, redirects and headers. | Highest |

Recommendation: **A or B, staying on Next.js (App Router) + Vercel.** The hosting, DNS and CI already work.
Decide early whether to keep `output: "export"`:
- **Keep static export**: cheapest and simplest. Headers and redirects stay in `vercel.json`. No API routes.
- **Drop static export** (normal Vercel deploy): gives you `next/image` optimization, `redirects()`/`headers()` in
  `next.config`, and a server-side contact route (can hide the form key, add rate limiting and captcha). Costs nothing
  extra on Vercel at this traffic level. **Recommended if you want better image performance.**

## 1. Before you start (inventory and baseline)

1. Export current rankings and pages from **Google Search Console** (Performance → Pages/Queries, last 16 months)
   and save a copy of `https://kodesec.com/sitemap.xml`. This list is your "URLs that must not break".
2. Run PageSpeed Insights on `/`, `/services/cybersecurity` and one blog post. Save the scores as a baseline.
3. Confirm access to every account: GitHub org, Vercel project, Cloudflare (DNS), Hostinger (registrar,
   **domain expires 2026-11-27**), Web3Forms, Google Calendar (booking page), GTM and GA4.
4. Decide on the brand spelling (one of Kodesec / KodeSec) and use it everywhere.
5. Go through the trust content with the founders (testimonials, SOC2/ISO badges, case-study numbers). Keep only
   what is true and can be backed up. See SEO_AUDIT §2.2.

## 2. Things you must preserve

### URLs (all must still return 200, or 301 to a new home)
```
/  /about  /why-us  /services  /projects  /blog  /contact  /privacy-policy  /terms-of-service
/services/design-engineering  /services/cybersecurity  /services/cloud-devops  /services/quality-assurance
/blog/<slug>  for every slug in content/blogs/*.mdx frontmatter
/robots.txt  /sitemap.xml  /favicon.ico
```
Also keep the 7 legacy redirects already in `vercel.json`. If you split services into more pages (recommended),
keep the 4 parent URLs as hub pages. Don't 301 them away.

### SEO plumbing
- `metadataBase: new URL("https://kodesec.com")`, a per-page `title`/`description`, `alternates.canonical`.
- `app/sitemap.ts`, which must include every new page. `app/robots.ts`.
- JSON-LD via `components/JsonLd.tsx`: Organization and WebSite in the layout, Service, FAQPage and BreadcrumbList on
  services, BlogPosting and BreadcrumbList on posts.
- OG images for the default page, each service and each post (fix the content-type issue: emit `.png`).

### Integrations
- **Contact form → Web3Forms** (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`). Fields currently sent: `subject` (inquiry type),
  `from_name`, `replyto`, `Fullname`, `Email`, `Company Name`, `project stage`, `brief`. Keep the same fields so the
  inbox rules still work, or tell the team.
- **Booking**: the Google Calendar appointment URL in `components/contact/AppointmentModal.tsx`. The rebuild can use
  a plain "Book a call" button or a modal. Either way, **add `https://calendar.google.com` to CSP `frame-src`** if it's
  embedded, because it's blocked today.
- **Analytics**: GTM `GTM-PX3H2865` and GA4 `G-LH10BFSBJQ`. Pick one loading path (GTM recommended) and add
  conversion events for `form_submit` and `booking_open`.

### Content (reuse, don't retype)
- `content/blogs/*.mdx` and `public/blog/**` → move as they are. The posts are plain Markdown + GFM (tables etc.)
  and use no custom JSX components today. If you add components later, re-check with
  `grep -rhoE "<[A-Z][A-Za-z]+" content/blogs | sort -u` before a migration.
- `content/solutions/*.ts` → the typed service content. Reuse the `SolutionContent` type or extend it.
- `config/site.ts` → nav, footer, team, about, contact copy. Move the icons out of this file (it currently imports
  React components, which ties data to the UI) and keep icon names as strings, like `content/solutions` already does.
- `components/projects/ProjectShowcase.tsx` holds case-study data inline. Move it into `content/projects/*.ts` or MDX.

## 3. Step-by-step plan

### Step 1: Branch and clean up
```bash
git checkout -b redesign
npm uninstall react-router-dom lottie-react remark remark-html dotenv react-icons
# delete dead code (see CLAUDE.md §7.9), app/data/, and .github/workflows/nextjs.yml (GitHub Pages)
```
Update `README.md`.

### Step 2: Design system first
1. Define design tokens (colors, type scale, spacing, radius, shadows) once, in `app/globals.css` with Tailwind v4
   `@theme`. Remove the duplicate `tailwind.config.ts` values, or keep only one source of truth.
2. Build or reshape the primitives in `components/ui/` (Button, Card, Badge, Section, Container, Heading, Prose,
   Accordion, Tabs). Pages should use only primitives and section components, with no one-off inline styles.
3. Decide on motion: CSS transitions by default. Use framer-motion only for 1–2 signature moments. Remove the
   full-screen intro **loader**, or make it non-blocking, because it delays first content.
4. Support light mode only if the design needs it. `next-themes` currently forces dark.

### Step 3: Layout shell
- `app/layout.tsx`: fonts, metadata defaults (fix `title.template` so pages pass only their own topic),
  Organization and WebSite JSON-LD, analytics, Header, a single `<main>`, Footer.
- Pages must **not** render another `<main>`. Use `<section>` and `<article>`.
- Header: accessible dropdown (keyboard and Esc), mobile menu, "Book a call" CTA.

### Step 4: Rebuild pages one by one
Suggested order (the highest-traffic and highest-intent pages first):
1. `/services/[slug]` template, driven by `content/solutions`.
2. `/` home.
3. `/blog` and `/blog/[slug]`: prose styles, TOC, author box, related posts, links to the matching service page.
4. `/contact`: form, booking, and read `?type=` to preselect the inquiry type.
5. `/about`, `/why-us`, `/projects`, legal pages.

Checklist for each page: one `<h1>` with the target keyword, a unique title under 60 chars, a description of
140–160 chars, a canonical, breadcrumb JSON-LD, internal links to 2–3 related pages, and images with width, height and alt text.

### Step 5: SEO and content upgrades (do them during the rebuild)
- Add focused service landing pages (e.g. `/services/cybersecurity/web-application-penetration-testing`) and
  link them from the hub pages.
- Add `/team/<name>` author pages and change blog frontmatter `author` to reference them.
- Add address and phone to the footer and `PostalAddress` to the Organization schema.
- Sitemap: use real `lastModified` (for posts, a frontmatter `updated` field; for pages, the git commit date or a constant you maintain).

### Step 6: Security headers
Update `vercel.json` (or `next.config` `headers()` if you drop static export):
- `frame-src 'self' https://www.googletagmanager.com https://calendar.google.com`
- Try to remove `'unsafe-eval'` from `script-src`. Next.js production doesn't need it.
- Keep HSTS, nosniff, X-Frame-Options, Referrer-Policy and Permissions-Policy.

### Step 7: QA before launch
```bash
npm run lint && npm run build
npx serve out   # if static export; otherwise `npm start`
```
- Crawl the preview deploy (Screaming Frog or `npx linkinator <preview-url> --recurse`) and confirm there are no 404s,
  every old URL is 200 or 301, and every page has a canonical.
- Compare the new `sitemap.xml` with the saved old one. Nothing may be missing without a redirect.
- Run Lighthouse and PageSpeed on the preview. Target mobile Performance ≥ 90, LCP < 2.5 s, CLS < 0.1, and A11y ≥ 95.
- Validate structured data with the Rich Results Test and OG previews with the LinkedIn Post Inspector and
  opengraph.xyz.
- Submit a real contact form (check that the email arrives) and open the booking modal (check the iframe loads with no CSP console error).
- Check GA4 and GTM Realtime.

### Step 8: Launch
1. Merge `redesign` → `master`. Vercel deploys production automatically. **No DNS changes are needed** (Cloudflare
   already points at Vercel).
2. Resubmit `sitemap.xml` in Google Search Console and use URL Inspection → "Request indexing" for the key pages.
3. Watch GSC Coverage and Performance for 2–4 weeks and fix any 404s it reports with redirects.
4. Rollback plan: Vercel → Deployments → promote the previous production deployment (instant).

## 4. If you ever move hosting or DNS

- **Leaving Vercel** (e.g. Cloudflare Pages or Netlify): the static export (`out/`) works anywhere. Port the
  `vercel.json` headers and redirects to the new host's format (`_headers`/`_redirects`), then change the Cloudflare
  DNS records. Keep the Vercel project alive until DNS has fully switched.
- **Moving DNS off Cloudflare / back to Hostinger**: copy **every** record first (A, CNAME, MX, TXT for SPF/DKIM/DMARC
  and any Google verification). Missing MX/TXT records break email and Search Console verification.
- **Domain renewal**: keep auto-renew on at Hostinger. The current expiry is 2026-11-27.

## 5. Suggested target structure

```
app/
  (marketing)/layout.tsx         # header/footer shell
  (marketing)/page.tsx
  (marketing)/services/[slug]/page.tsx
  (marketing)/services/[slug]/[sub]/page.tsx   # optional focused landing pages
  (marketing)/blog/[slug]/page.tsx
  (marketing)/team/[slug]/page.tsx
  sitemap.ts robots.ts opengraph-image.tsx layout.tsx
components/
  ui/            # primitives only
  sections/      # reusable page sections (Hero, FeatureGrid, FAQ, CTA, Timeline, ...)
  mdx/           # prose element overrides + optional Callout/Warning/CTA for posts
content/
  site.ts        # nav, footer, contact, socials (no React imports)
  team/*.ts  solutions/*.ts  projects/*.ts  blogs/*.mdx
lib/
  content.ts     # loaders for blog/solutions/team/projects
  seo.ts         # buildMetadata(), jsonLd helpers (Organization, Service, BlogPosting, Breadcrumb)
```
