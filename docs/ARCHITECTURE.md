# Kodesec website — current architecture

Snapshot as of **2026-09-28**, based on the repo and on live checks of `kodesec.com` (DNS, HTTP headers, pages).

## 1. The big picture

```
                         ┌──────────────────────────────┐
  Developer ── git push ─▶  GitHub: kodesec-solutions/  │
                         │  kodesec  (branch: master)   │
                         └──────┬───────────────┬───────┘
                                │               │
             Vercel Git integration        GitHub Actions
                                │               │
                 ┌──────────────▼───┐   ┌───────▼──────────────────┐
                 │ Vercel build     │   │ ci.yml: lint + build     │
                 │ `next build`     │   │ nextjs.yml: build + deploy│
                 │ output: "export" │   │   to GitHub Pages (legacy)│
                 │  -> static out/  │   └──────────────────────────┘
                 └────────┬─────────┘
                          │ static HTML/JS/CSS/images
                 ┌────────▼─────────────────────────────┐
                 │ Vercel Edge CDN (served "Server:     │
                 │ Vercel", e.g. sin1 edge)             │
                 │ + vercel.json: security headers,     │
                 │   301 redirects for old service URLs │
                 └────────▲─────────────────────────────┘
                          │ HTTPS
   Registrar: Hostinger   │
   DNS: Cloudflare NS ────┘  kodesec.com  A → 216.198.79.1 (Vercel)
   (ursula/yoxall)           www.kodesec.com CNAME → *.vercel-dns-017.com → 308 to apex
                          │
                     ┌────┴────┐
                     │ Visitor │───▶ Web3Forms API (contact form POST, from browser)
                     └─────────┘───▶ Google Calendar appointment iframe (booking modal)
                                ───▶ Google Tag Manager + Google Analytics 4
                                ───▶ Google Fonts (self-hosted by next/font at build time)
```

There is **no backend**. Everything is prebuilt HTML. All dynamic behavior (form, booking, analytics) runs in
the visitor's browser against third-party services.

## 2. Layers

### 2.1 Source & CI
- Repo: `github.com/kodesec-solutions/kodesec`, default branch `master`.
- `.github/workflows/ci.yml` — on push/PR to `main`/`master`: `npm ci`, `npm run lint`, `npm run build` (Node 20).
- `.github/workflows/nextjs.yml` — on push to `master`: builds and deploys `./out` to **GitHub Pages**. This is a
  leftover from the Create-Next-App starter. It duplicates hosting, ignores `vercel.json` headers/redirects, and
  `configure-pages` injects a `basePath`. Recommend deleting it (or confirming nothing points at the Pages URL).

### 2.2 Build
- `next.config.ts`: `output: "export"`, `images.unoptimized: true`.
- Every route is pre-rendered at build time:
  - `generateStaticParams` in `app/services/[slug]` (from `content/solutions`) and `app/blog/[slug]` (from `content/blogs/*.mdx`).
  - `robots.ts`, `sitemap.ts`, and all `opengraph-image.tsx` files use `dynamic = "force-static"`.
- Blog MDX is read from disk with `fs` at build time (`lib/blog.ts`) and compiled with `next-mdx-remote/rsc`.
- Result: plain files in `out/` (≈ 21 HTML pages + assets). Adding a blog post = commit an `.mdx` → redeploy.

### 2.3 Hosting — Vercel
- Vercel project connected to the GitHub repo; each push to `master` = production deploy, other branches/PRs =
  preview deploys (Vercel default).
- Because the app is a static export, Vercel only serves files; **no serverless functions run**.
- `vercel.json` is the only place for runtime behavior:
  - Headers on `/(.*)`: `Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
    `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security` (1 yr, preload).
  - 7 permanent redirects from the old per-service URLs (e.g. `/services/manual-website-penetration-testing`)
    to the 4 consolidated service pages.
- Env var in Vercel: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (inlined into the client bundle at build — public by design).
- Observed live: `X-Vercel-Cache: HIT`, `Cache-Control: public, max-age=0, must-revalidate` on HTML.

### 2.4 Domain & DNS
- Registrar: **Hostinger** (registered 2025-11-27, **expires 2026-11-27** per RDAP — check auto-renew).
- Nameservers: **Cloudflare** (`ursula.ns.cloudflare.com`, `yoxall.ns.cloudflare.com`). DNS records are
  "DNS only" (not proxied): responses come straight from Vercel.
  - `kodesec.com` → A `216.198.79.1` (Vercel anycast)
  - `www.kodesec.com` → CNAME to Vercel → **308** to `https://kodesec.com/`
  - `http://` → 308 to `https://`.
- TLS certificate issued/managed by Vercel.
- Email (`contact@kodesec.com`) — MX not documented here; check the Cloudflare DNS zone before changing anything.

### 2.5 Third-party services (browser-side)

| Service | Used for | Where | Notes |
|---|---|---|---|
| Web3Forms | Contact form delivery (email) | `components/contact/ContactForm.tsx` | Key from `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`; no spam protection/captcha |
| Google Calendar appointment schedule | "Book a call" modal | `components/contact/AppointmentModal.tsx` | **Blocked by CSP** `frame-src` — needs `https://calendar.google.com` |
| Google Tag Manager `GTM-PX3H2865` | Tag management | `app/layout.tsx` | |
| Google Analytics 4 `G-LH10BFSBJQ` | Analytics | `app/layout.tsx` | Loaded directly *and* possibly via GTM |
| Google Fonts | Typography | `next/font/google` | Downloaded at build, self-hosted |
| LinkedIn / GitHub | Social links | `config/site.ts` | `twitter` points to plain `https://twitter.com` |

## 3. Application structure

```
app/                      # Next.js App Router (all routes static)
  layout.tsx              # <html>, fonts, metadata defaults, GTM/GA4, Org+WebSite JSON-LD,
                          #   Loader → AppointmentModal, Header, <main>, Footer
  page.tsx                # Home
  services/ page.tsx, [slug]/page.tsx, [slug]/opengraph-image.tsx
  blog/     page.tsx, [slug]/page.tsx, [slug]/opengraph-image.tsx
  about/ why-us/ projects/ contact/ privacy-policy/ terms-of-service/
  robots.ts sitemap.ts opengraph-image.tsx error.tsx not-found.tsx favicon.ico globals.css
  data/services.{json,ts} # LEGACY, only used by dead ServiceDetailClient
components/
  ui/                     # shadcn-style primitives (button, card, badge, section, container, ...)
  home/ about/ why-us/ projects/ solutions/ contact/ blog/ loader/ services/
  Header.tsx Footer.tsx JsonLd.tsx ThemeProvider.tsx
  (+ several unused visualizers — see CLAUDE.md §7)
config/site.ts            # central site copy & config (nav, footer, team, testimonials, page copy)
content/
  solutions/*.ts          # typed content for the 4 service pages
  blogs/*.mdx             # 8 blog posts
lib/ blog.ts utils.ts logger.ts
public/ assets/ (logo, founder photos)  blog/<slug>/ (article images)   ~6.4 MB total
vercel.json               # headers + redirects (the only "server config")
```

### Data flow
```
config/site.ts ─────────────┐
content/solutions/*.ts ─────┼─▶ Server Components (build time) ─▶ static HTML + RSC payload
content/blogs/*.mdx ─ fs ───┘         │
                                      └─▶ Client Components (framer-motion, header, loader,
                                          modal, form, carousels) hydrate in the browser
```
- ~58 files are `"use client"`. Page files themselves are Server Components; interactive sections are client islands.
- The whole app is wrapped in the client `Loader`, which fades content in after the intro animation (first
  visit per session). Content is still present in the HTML for crawlers.

## 4. Routes (live, all 200)

`/`, `/about`, `/why-us`, `/services`, `/services/{design-engineering,cybersecurity,cloud-devops,quality-assurance}`,
`/projects`, `/blog`, `/blog/<8 slugs>`, `/contact`, `/privacy-policy`, `/terms-of-service`,
`/robots.txt`, `/sitemap.xml`, `/opengraph-image`, `/favicon.ico`. Unknown paths → custom 404.

## 5. Security posture (of the site itself)
- Good: static site (tiny attack surface), HSTS, `nosniff`, `X-Frame-Options: DENY`, restrictive Permissions-Policy,
  no secrets in repo.
- Weak: CSP allows `'unsafe-inline'` and `'unsafe-eval'` for scripts; CSP blocks the booking iframe (bug);
  `Access-Control-Allow-Origin: *` on HTML (Vercel default for static, harmless); contact form has no bot protection.

## 6. Cost/ownership
- Vercel (likely Hobby or Pro plan — check who owns the project), Cloudflare DNS (free), Hostinger domain (~yearly),
  Web3Forms (free tier), Google services (free). Ensure at least two team members have access to each account.
