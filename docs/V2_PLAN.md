# Kodesec v2 — plan for the new website

## Context
The current kodesec.com (see `CLAUDE.md`, `docs/ARCHITECTURE.md`, `docs/SEO_AUDIT.md`) is a static Next.js
marketing site full of AI-generated copy. It has a broken booking embed and weak SEO, and the only way to publish
a post is to push `.mdx` files through git. v2 is a full front-end rebuild, and the team will supply the designs
and logo. It adds:

- a **PortSwigger-style Academy** (structured learning for red, blue and white-hat security, development, cloud and DevOps)
- the existing **Blog**, kept and upgraded
- an **Admin panel**: upload a structured `.md` file with its images, preview it, publish it, and see live Google Analytics numbers
- **Images stored in GitHub**, because there's no budget for a paid CDN or storage
- a **booking calendar with an intake form**, and a **pricing page** where every call to action leads to booking
- **YouTube and Loom embeds**, social links, rewritten service pages, and a proper **CI/CD** pipeline
- **High-end admin security**: only the 4 founders can reach the admin, with Cloudflare Access + MFA + enrolled devices + passkeys, an audit log and alerts (§6)
- **High-quality SEO**: strict technical SEO checked in CI, topic clusters, the Academy as a content engine, and an ongoing white-hat backlink programme (§8)

**Decisions already made:** Academy v1 is content only (no student accounts, progress saved in the browser).
Hosting moves to **Cloudflare, free tier** (Vercel Hobby doesn't allow commercial use, and the DNS is already on Cloudflare).
Publishing goes **draft → pull request with preview → Publish**. Booking uses **Cal.com free**.
The repo is **public**, so GitHub Actions minutes and CodeQL are free.

**Budget: $0/month.** The only running cost is the domain renewal at Hostinger (expires 2026-11-27).

---

## 1. Target architecture

```
 One of the 4 founders ──▶ admin.kodesec.com  (Cloudflare Access: exactly 4 emails + MFA + enrolled device; see §6)
                  ├─ Admin UI (React SPA, served as Worker static assets)
                  └─ admin-api Worker (verifies Access JWT + allowlist again; passkey step-up for Publish/Delete)
                                     ├──▶ GitHub App (branch → commit → PR → merge)
                                     ├──▶ GA4 Data API + Search Console API (read-only service account) ── cached in KV
                                     └──▶ audit log (D1) + security alerts (email / Discord webhook)

 Visitor forms/webhooks ──▶ api.kodesec.com  = public-api Worker (separate, holds NO admin/GitHub secrets)
                                     ├──▶ /contact: Turnstile check → Web3Forms (key stays server-side)
                                     └──▶ /webhooks/cal: HMAC-verified Cal.com bookings → shared KV "leads" (write-only)

 GitHub repo (public)  ── PR ──▶ Actions: validate → build → test → deploy PREVIEW (Cloudflare Pages branch URL)
                       ── merge to master ──▶ Actions: build → deploy PRODUCTION (Cloudflare Pages)

 Visitor ──▶ kodesec.com = Cloudflare Pages (fully static Next.js export; free, unlimited static requests)
             images come from the repo (/media/...), served by Cloudflare's CDN at no cost
             embeds: Cal.com, YouTube (nocookie + lite facade), Loom; analytics via GTM → GA4
```

Why this shape:
- **The public site stays a static export.** It's the fastest option, needs no server that can break, and avoids
  the Workers free-tier limits (3 MB script size, 10 ms CPU) that running full Next.js through OpenNext would hit.
- **Dynamic parts live in two small Workers** (Hono + Octokit + jose), split by trust level: `admin-api` (private,
  behind Access, holds the powerful secrets) and `public-api` (internet-facing contact form + webhooks, holds only
  low-value secrets). A bug in the public endpoint can't reach GitHub or analytics. Heavy work runs elsewhere:
  images are compressed **in the browser** before upload, and builds run in **GitHub Actions**.
- **The public site ships no admin code or admin URL**, and access to the admin is enforced by Cloudflare Access
  at the edge before any request reaches the Worker.

## 2. Repository layout (single repo)

```
app/                       Next.js App Router (public site, output: "export")
components/ui|sections|mdx|academy|blog
content/
  site.yml                 nav, social links, contact info, footer
  pricing.yml              engagement models per service (editable in admin)
  services/<slug>.md       service pages (new human-written copy)
  team/<slug>.md           authors (Person schema, author pages)
  blog/<slug>.md           blog posts (the 8 existing .mdx files migrated to .md)
  academy/<track>/_track.yml
  academy/<track>/<module>/_module.yml
  academy/<track>/<module>/<order>-<lesson>.md
public/media/{blog,academy,services}/<slug>/*.webp   images committed by the admin
public/_headers, public/_redirects                   ported from vercel.json (Cloudflare Pages format)
lib/content/  schemas.ts (zod), loaders.ts, markdown.ts (unified pipeline shared by the site and the admin preview)
lib/seo.ts                 buildMetadata() + JSON-LD helpers
workers/admin-api/         private Hono Worker + wrangler.toml (behind Cloudflare Access)
workers/public-api/        public Hono Worker: contact form + Cal.com webhook only
docs/security/             admin threat model, incident runbook, access register (who has what)
admin/                     Vite + React admin SPA (reuses lib/content/{schemas,markdown}.ts)
scripts/validate-content.ts, scripts/optimize-images.ts
design/                    designs + logo you provide (source of truth for the design tokens)
docs/CONTENT_GUIDE.md      how to write a blog post or lesson (templates)
```

Reuse from today: `lib/blog.ts` (the gray-matter loading pattern, which becomes `lib/content/loaders.ts`),
`components/JsonLd.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` (fixed to emit PNG files),
the typed-content idea from `content/solutions/types.ts`, the redirects in `vercel.json`, and the blog TOC logic in
`app/blog/[slug]/page.tsx`. Everything visual gets replaced.

## 3. Content format ("structured markdown")

Content is **plain Markdown, not MDX**, so uploaded files can't run code, rendered through one unified pipeline:
remark-gfm, GitHub alerts (`> [!TIP]`, `> [!WARNING]`), rehype-slug and autolink headings, build-time syntax
highlighting with Shiki (rehype-pretty-code), sanitisation, and a custom **embed plugin**: a YouTube or Loom URL on
a line by itself becomes a video player.

**Blog frontmatter:** `title, slug, description (≤160), date, updated, authors[team slugs], category, tags[], cover,
coverAlt, relatedServices[], draft`

**Lesson frontmatter:** `title, slug, track, module, order, level (beginner|practitioner|expert), roles[red|blue|dev|cloud|devops],
duration, prerequisites[], objectives[], video?, updated, authors[]`

**Body rules:** no H1 (the title is the H1), H2 and H3 only, fenced code blocks with a language, alt text on every
image, and an ethics note on offensive lessons ("only test systems you own or are authorised to test").

`docs/CONTENT_GUIDE.md` will include copy-paste templates. zod schemas check every file both in the admin and in CI.

## 4. Public site — pages

| Route | Notes |
|---|---|
| `/` | Built from your design. Real proof only: the SOC2/ISO badges and fake testimonials are removed unless they're real |
| `/services`, `/services/[slug]` | Keep the 4 existing URLs as hub pages. New copy from the team. Every CTA → `/book?service=<slug>` |
| `/pricing` | Driven by `content/pricing.yml`: models per service (e.g. Assessment / Project / Retainer) with scope and "from" or "custom quote". Each card → `/book?service=&plan=`. A per-client private quote link can come in v2 |
| `/book` + global modal | Cal.com embed (`@calcom/embed-react`), one event type per service, custom intake questions (company, service, stage, budget, notes), prefilled from URL params. Replaces the broken Google Calendar iframe |
| `/contact` | Short form (Turnstile → `public-api` Worker → Web3Forms) for enquiries that don't need a meeting. Reads `?type=` |
| `/blog`, `/blog/[slug]`, `/blog/category/[c]` | Keeps all 8 existing slugs. TOC, author box, related posts, links to services, video embeds |
| `/academy` | Tracks: Web Security, Network & AD, Cloud Security, DevOps/DevSecOps, Defensive/Blue Team, Secure Development |
| `/academy/[track]`, `/academy/[track]/[module]/[lesson]` | PortSwigger-style layout: sidebar tree, prev/next links, level badge, time estimate, objectives, "Mark complete" (localStorage), progress bar |
| `/team/[slug]`, `/about`, `/why-us`, `/projects` | Author pages with credentials (E-E-A-T). Projects page only if the case studies are real |
| `/search` | Pagefind (free, static): one index covering blog and academy |
| Legal, 404, `sitemap.xml`, `robots.txt`, `llms.txt` | Sitemap covers every content type with real `lastmod` values |

Header and footer are built from your designs. Social links come from `content/site.yml` and also feed the
Organization `sameAs` field. For SEO, apply everything in `docs/SEO_AUDIT.md §4`: one brand spelling, a
`<Topic> | Kodesec` title pattern, schema types (Organization/ProfessionalService with an address, Service,
FAQPage, BlogPosting with Person authors, Course/LearningResource for lessons, VideoObject for embeds,
BreadcrumbList), and PNG OG images.

## 5. Admin panel (admin.kodesec.com)

1. **Login:** only the 4 founders, through Cloudflare Access with MFA, an enrolled device and a passkey step-up for
   dangerous actions (full design in §6). The Worker verifies the Access JWT and uses that email as the git commit author.
2. **Dashboard:** GA4 realtime active users, users/sessions/top pages/sources/countries over 7 and 28 days, and
   Search Console clicks/impressions/top queries. The Worker caches these in KV for 10 minutes to stay within quotas.
   The dashboard also lists recent Cal.com bookings and contact submissions, and open drafts.
3. **New content:** choose Blog or Lesson, then drop in a `.md` file plus its images (or a folder or zip).
   The browser then:
   - validates the frontmatter
   - converts images to WebP (maximum 1600px wide, about 300 KB target)
   - rewrites image links to `/media/<type>/<slug>/…`
   - shows a live preview using the site's own renderer
4. **Save draft:** the Worker creates branch `content/<type>/<slug>` and writes everything in **one commit** using the
   Git Data API (blobs → tree → commit), then opens a PR. CI posts the Cloudflare Pages preview URL, and the admin
   shows it.
5. **Publish:** the Worker squash-merges the PR, and the production deploy runs automatically (about 2–3 minutes).
   **Unpublish/Delete** works the same way: a PR that removes the files and adds a redirect.
6. **Manage:** list and edit existing posts and lessons (loaded from the repo tree) with an in-browser editor, plus
   editors for `pricing.yml`, `site.yml` (social links) and the service pages. Every save goes through a PR.

Limits handled: the Worker makes at most 50 subrequests per call, so an upload is capped at about 40 images. The
GitHub App has contents and pull-request permissions on this repo only. Admin secrets (GitHub App key, GA service
account) live only in `admin-api`. The Cal webhook secret, Web3Forms key and Turnstile secret live only in
`public-api`. All are stored with `wrangler secret`.

## 6. Admin security — only the 4 founders, defence in depth

**Rule:** exactly 4 people can reach `admin.kodesec.com`: Yaser, Mian, Nafiul and Ashikul. Everyone else is
stopped at Cloudflare's edge and never sees the admin page, its JavaScript or its API. Every layer below works
independently, so one failure doesn't open the door. Everything here is on free plans (Cloudflare Zero Trust is
free for up to 50 users).

### 6.1 Layer 1: who can even reach it (Cloudflare edge)
- A **Cloudflare Access application** covers `admin.kodesec.com/*` and the admin API. Policy: **Allow** only if
  **all** of these are true:
  - the email is one of the 4 listed addresses (an explicit list, not a domain rule, so a new `@kodesec.com`
    mailbox gets nothing)
  - login came from the identity provider (Google or GitHub) **with MFA**, enforced through Access's
    "require MFA" (`amr`) rule
  - the device is **enrolled in Cloudflare WARP** (free) under the Kodesec Zero Trust org, so a stolen password
    or session cookie on someone else's laptop doesn't work
  - optionally, the country is in an allowlist (Bangladesh plus travel countries, easy to edit)
- **Sessions:** 8-hour Access sessions, forced re-login daily, and the sessions of one person (or everyone) can
  be revoked from the Zero Trust dashboard in one click.
- **No bypass routes:** the Worker's `*.workers.dev` URL and preview URLs are **disabled**, so the Worker can only
  be reached through `admin.kodesec.com` behind Access. The Cloudflare Pages preview deployments
  (`*.kodesec.pages.dev`) are also put behind an Access policy for the same 4 people.
- **WAF (free managed rules), Bot Fight Mode**, and a rate-limit rule on the admin hostname.
- **No discovery:** the admin URL isn't linked anywhere on the public site. It sends
  `X-Robots-Tag: noindex, nofollow`, has its own `robots.txt` (`Disallow: /`), and isn't in the sitemap.
  This only adds to Access; it doesn't replace it.

### 6.2 Layer 2: the Worker trusts nothing (application)
- It **verifies the `Cf-Access-Jwt-Assertion` token on every request**: signature against the team's public
  keys, `aud`, `iss` and expiry, using `jose`. Requests without a valid token get `403`. It never trusts the
  plain email header alone.
- It **checks the email against its own 4-person allowlist** (a Worker secret), so a mistake in the Access
  policy still can't let a fifth person in.
- **Passkey step-up (WebAuthn)** for dangerous actions: Publish, Delete/Unpublish, editing pricing or site
  settings, and viewing the audit log. Each founder registers a passkey (Touch ID, Windows Hello, a phone or a
  YubiKey), and the Worker checks it with `@simplewebauthn/server`. A hijacked browser session alone can't publish.
- **Two-person rule for publishing (optional, recommended):** the person who created a draft can't publish it;
  a second founder has to approve. Emergency override needs a passkey and is logged and alerted.
- **Request hardening:**
  - `SameSite=Strict` cookies plus a strict `Origin` check and a custom header on every state-changing call (CSRF)
  - zod validation on every input
  - slugs limited to `^[a-z0-9-]{3,80}$` and file paths built on the server (no path traversal)
  - uploads restricted to `.md` plus JPEG/PNG/WebP/GIF, checked by magic bytes and not just the extension;
    SVG and HTML are rejected
  - size limits on every file and on the whole request
  - Markdown sanitised before preview and again at build
- **Admin UI headers:**
  - a strict CSP with no `unsafe-inline` or `unsafe-eval` (hash-based), and `frame-ancestors 'none'`
  - HSTS with preload
  - COOP/COEP/CORP
  - `Referrer-Policy: no-referrer` and a locked-down `Permissions-Policy`
- **Rate limiting** per user and IP in the Worker, plus lock-out and an alert after repeated failed step-ups.

### 6.3 Layer 3: least-privilege secrets and accounts
- **GitHub App:** installed on this one repo only, with contents and pull-request write access and nothing else
  (no admin, no workflows, no secrets). Its private key is a Worker secret, rotated every 90 days. Commits it makes
  are signed and show as "Verified".
- **GitHub repo rules:** branch protection on `master` (required checks, no force-push, no deletion), `CODEOWNERS`
  for `workers/`, `.github/` and security files so any change there needs a founder review, and 2FA required for
  the organisation.
- **GA4 / Search Console:** a service account with **Viewer / read-only** access only.
- **Cloudflare API token for CI:** scoped to "Pages: Edit" and "Workers Scripts: Edit" for this account only.
- **Personal accounts of the 4 founders:** passkeys or hardware-key MFA on Google, GitHub, Cloudflare and
  Hostinger. Registrar lock plus auto-renew on the domain. At least 2 founders are owners of every account (so no
  single point of failure), and nobody outside the 4 is.
- Secrets never go in the repo (gitleaks in CI). They're listed, without their values, in `docs/security/access-register.md`.

### 6.4 Layer 4: see everything, react fast (monitoring and response)
- **Audit log** in Cloudflare D1 (free), and the admin can't edit it: who, what, when, IP, country, device, and the PR or
  commit link for every login, draft, publish, delete and settings change. It's viewable in the admin (passkey
  required) and exported to the repo's security docs monthly.
- **Real-time alerts** to the founders by email and a private Discord or Slack webhook for:
  - a new device or country
  - failed step-ups or a denied Access attempt
  - every Publish and Delete
  - a change to the Access policy
  - a secret rotation
- **Incident runbook** (`docs/security/runbook.md`): revoke all Access sessions, then remove the person or device,
  rotate the GitHub App key and Worker secrets, revert the last merges in GitHub, and review the audit log.
  There's also a **kill switch**: one Worker variable puts the admin into read-only mode.

### 6.5 Layer 5: prove it (testing)
- CI runs automated tests against the admin API: no token, a forged or expired JWT, a valid JWT for a non-allowlisted
  email, a missing passkey on Publish, a cross-origin request, path traversal slugs, and a disguised file upload.
  **Each must be rejected.**
- A weekly **OWASP ZAP baseline scan** (free GitHub Action) against the admin login and the public site.
- **Before launch and then yearly, an internal penetration test** of the admin by the team (it's our own specialty),
  checked against **OWASP ASVS Level 2**. Findings are fixed before go-live.

### 6.6 One thing to decide: drafts in a public repo
Because the repo is public, a draft PR (and its content) is visible on GitHub before it's published. That's fine
for normal posts, but not for embargoed research (e.g. an unpatched vulnerability write-up). Options:
**(a)** keep the repo public and write embargoed work offline until it's safe, or **(b)** move `content/` to a
**private** `kodesec-content` repo that the build pulls in (free, and 2,000 Actions minutes a month is enough).
Recommended: **(b)** if embargoed research is expected. Otherwise (a).

## 7. CI/CD (GitHub Actions, free for a public repo)

- **`ci.yml` (every PR):** `npm ci` (cached), then eslint and `tsc --noEmit`, then vitest (schemas, markdown and
  embed plugins, loaders), then `validate-content` (frontmatter, unique slugs, missing or oversized images over
  500 KB, broken internal links), then `next build` and Pagefind, then Playwright smoke tests against the built
  `out/`, then Lighthouse CI budgets (mobile performance ≥ 90, accessibility ≥ 95). Finally it runs
  `wrangler pages deploy out --branch=pr-<n>` and comments the preview URL on the PR.
- **`deploy.yml` (push to master):** the same build, then `wrangler pages deploy out --branch=master` (production).
  It also runs `wrangler deploy` for `workers/admin-api`, `workers/public-api` and the admin SPA when those paths change.
- **Security:** CodeQL, Dependabot (weekly), gitleaks secret scan.
- **Branch protection on master:** required CI checks, no direct pushes. Code PRs need one review. Content PRs are
  gated by the admin's Publish step.
- Delete `.github/workflows/nextjs.yml` (the GitHub Pages workflow).
- GitHub secrets needed: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

## 8. High-quality SEO (built in from day one, then grown every month)

Goal: rank for high-intent security queries (penetration testing, VAPT, DevSecOps, cloud security) in Bangladesh
and the export markets we target, and get cited by AI search (Google AI Overviews, ChatGPT, Perplexity).
Good SEO has three parts: **technical perfection** (we control it fully), **content depth** (the Academy is the
engine), and **authority/backlinks** (earned, never bought).

### 8.1 Technical SEO (enforced by CI, so it can't regress)
- A static, pre-rendered HTML page for every route. No content hidden behind JS or loaders.
- **Core Web Vitals budget** on mobile: LCP < 2.0 s, INP < 200 ms, CLS < 0.05. Lighthouse CI fails the PR if any is missed.
- A `validate-seo` script in CI checks every built page for:
  - exactly one `<h1>`
  - a unique title under 60 chars in the form `<Topic> | Kodesec`
  - a meta description of 120–160 chars
  - a self-referencing canonical
  - OG and Twitter tags with a PNG image
  - alt text on every image
  - no broken internal links
  - no orphan pages (each page has at least 2 internal links pointing to it)
- A valid JSON-LD **entity graph** (`@id`-linked):
  - **Organization** (with logo, address, `sameAs`) and **WebSite**
  - **ProfessionalService** (address, `areaServed`) and **Service**
  - **Person** for each author (with `knowsAbout`, credentials, `sameAs` LinkedIn/GitHub)
  - **BlogPosting**, **Course / LearningResource**, **VideoObject**, **FAQPage**, **BreadcrumbList**

  CI validates it with a schema checker.
- Sitemap index split by type (pages, services, blog, academy) with real `lastmod`. `robots.txt` has an explicit
  policy for AI crawlers (allow GPTBot, ClaudeBot and PerplexityBot to crawl public content). Add `llms.txt`.
- Clean, permanent URLs. Every removed or renamed page gets a 301 (the admin adds it automatically on unpublish).
  `www` and `http` 301 to the canonical `https://kodesec.com`.
- **IndexNow** ping to Bing/Yandex on every production deploy. Search Console + Bing Webmaster Tools verified,
  with sitemaps submitted.
- Images: WebP, explicit width/height, descriptive file names, lazy-loaded below the fold.
- A proper 404 page, no soft 404s, and no duplicate pages from tag/category/pagination (canonical + `noindex` on thin listing pages).

### 8.2 On-page and content strategy
- **Keyword map before writing.** One primary query per URL, no cannibalisation, kept in `docs/seo/keyword-map.md`
  and reviewed quarterly. Built with the `claude-seo:seo-cluster` / `seo-plan` skills plus the free Google Search
  Console and Keyword Planner.
- **Topic clusters (hub and spoke):**
  - Each service hub (e.g. `/services/cybersecurity`) links to focused landing pages, such as web app pentest,
    API pentest, network/AD pentest, cloud config review, secure SDLC, and Playwright QA.
  - Each landing page links to related Academy lessons and blog posts, and those link back.
- **The Academy is the SEO engine.** Evergreen, deep "how X works / how to test / how to fix" lessons attract
  links and long-tail traffic (the same model PortSwigger uses). Each lesson ends with a relevant service CTA.
- **Blog = timely + opinion.** Breach analyses (e.g. Shwapno, NID), CVE breakdowns, and yearly "State of
  security in Bangladesh" reports built from original data. Original data is the strongest link magnet.
- **E-E-A-T:**
  - Real named authors with author pages, certifications (OSCP, CEH, CKA, AWS…), and CVEs or bug-bounty credits.
  - A "Reviewed by" line on technical posts.
  - `updated` dates maintained.
  - Real case studies only, with client permission.
- **AI-search readiness (GEO):**
  - A short direct-answer paragraph under each H2.
  - Definition boxes, FAQ blocks, comparison tables, and cited sources.
  - Checked with the `claude-seo:seo-geo` and `marketing-skills:ai-seo` skills.
- **Content cadence target:** 4 blog posts and 4–8 Academy lessons per month. Refresh the top 20 pages every
  quarter (check with `claude-seo:seo-drift`).

### 8.3 Backlinks and authority (white-hat only)
Buying links or using link farms/PBNs breaks Google's spam policies and risks a manual penalty that can wipe out
the domain, so we don't do it. We earn links by:

| Tactic | How | Target |
|---|---|---|
| Linkable assets | Free tools on the site (security headers checker, CVSS calculator, password-policy generator, subnet/CIDR calculator), cheat sheets, the Academy, yearly research report | 1 new asset per quarter |
| Digital PR | Pitch breach analyses and research data to Bangladeshi and regional tech media (The Daily Star tech, TechCrunch-style regional outlets, BASIS news), and answer journalist requests (Qwoted, Featured.com, HARO alternatives) | 2–4 media mentions / month |
| Community & open source | Publish tools/scripts on GitHub under the Kodesec org linking back; write CVE advisories; present at OWASP Dhaka / BSides / DevOps meetups (event pages link to speakers) | Ongoing |
| Guest & expert content | Guest posts on reputable security/dev blogs (e.g. dev.to, Hashnode, Medium publications with canonical back to us), podcast guest spots | 2 / month |
| Citations & directories | Consistent NAP (name, address, phone) on Google Business Profile, LinkedIn, Clutch, GoodFirms, DesignRush, BASIS member directory, Crunchbase, G2 (via `marketing-skills:directory-submissions`) | Top 20 in month 1 |
| Partnerships | Co-authored content and "partner" pages with cloud/tool vendors and clients (with permission) | Ongoing |
| Unlinked mentions & broken links | Monthly: find mentions of "Kodesec" without a link and ask for one; find broken links to competitor content we can replace | Monthly |
| Social amplification | Every post/lesson shared on LinkedIn, X, Reddit (where rules allow), Hacker News/lobste.rs for strong research | Every publish |

Track the backlink profile monthly with free sources: Search Console "Links", Bing Webmaster backlinks, and the
`claude-seo:seo-backlinks` skill (Moz/Common Crawl free data). Disavow only if a real spam attack appears.

### 8.4 Local and international
- A **Google Business Profile** for the Dhaka office, with reviews from real clients.
- `LocalBusiness`/`ProfessionalService` schema with the address, and consistent NAP everywhere.
- English site targeting Bangladesh plus chosen export markets (e.g. UK, US, Middle East). If a Bangla version is
  added later, use `/bn/` with hreflang (`claude-seo:seo-hreflang`).

### 8.5 Measurement and admin integration
- GA4 conversions: `booking_completed`, `contact_submitted`, `pricing_cta_click`, `academy_lesson_complete`,
  `outbound_github_click`.
- The admin dashboard gets an **SEO tab**:
  - Search Console clicks, impressions, CTR and average position
  - top queries and pages
  - pages losing traffic
  - new and lost referring domains (from the GSC links export)
  - the content-freshness list (pages not updated in 6 months or more)
- **Monthly SEO report**: run `/claude-seo:seo-audit` on production and save it to `docs/seo/reports/YYYY-MM.md`.
- **KPIs (12 months):**
  - health score ≥ 90
  - 100% of pages indexed
  - 50+ referring domains from real sites (DR/DA 30 or higher)
  - top-10 rankings for 20 or more target queries
  - organic traffic growing month over month
  - organic leads tracked as booking conversions

## 9. Migration and cutover

1. Build v2 on a `v2` branch. Deploy to the `kodesec.pages.dev` preview.
2. Port the `vercel.json` headers to `public/_headers`. Update the CSP: add Cal.com, youtube-nocookie.com,
   loom.com, challenges.cloudflare.com, and the `api.kodesec.com` origin (public-api), and drop `unsafe-eval`. Move the 7 legacy
   redirects into `public/_redirects`.
3. Convert the 8 `.mdx` posts to `.md` (already checked: they use no custom components) and move their images to
   `public/media/blog/`.
4. Crawl the preview. Every URL in the old sitemap must return 200 or 301.
5. Add the custom domain in Cloudflare Pages and switch the apex and `www` records from Vercel to Pages.
   Keep Vercel running for 2 weeks, then remove it. Resubmit the sitemap in Search Console.

## 10. Phases

| # | Phase | Output |
|---|---|---|
| 0 | Inputs | Your `design/` folder (logo, header, footer, blog, page designs), service copy, pricing models, Cal.com account + event types, Cloudflare account, GA4 service account, GitHub App |
| 1 | Foundation | Repo cleanup, design tokens from your designs, layout shell, content layer (schemas + markdown pipeline), 8 posts migrated, CI + preview deploys working |
| 2 | Public site | Home, services, pricing, booking, contact, blog, team/about, social links, video embeds, search |
| 3 | Academy | Track/module/lesson routes, sidebar/progress UI, 1 sample track with 3 lessons as a template |
| 4 | Admin | Security layers first (§6: Access policy for the 4, WARP device enrolment, JWT verification, passkeys, audit log, alerts), then GitHub App, upload → preview → PR → publish, content editing, analytics dashboard. Ends with an internal pentest against ASVS L2 |
| 5 | Harden and launch | SEO/schema pass (§8.1 checks green in CI), performance and accessibility budgets, security headers, DNS cutover, Search Console + Bing + IndexNow set up |
| 6 | SEO growth (ongoing, monthly) | Keyword map, content cadence, 1 linkable asset per quarter, directory citations, digital PR, Google Business Profile, monthly SEO report + KPI review (§8.2–8.5) |

## 11. Verification
- `npm run lint && npx tsc --noEmit && npx vitest run && npm run validate-content && npm run build` pass locally and in CI.
- A PR gets a working Cloudflare Pages preview URL posted automatically.
- **Admin end-to-end:** upload a sample `.md` with 3 images → a PR appears with one commit and WebP images under
  `public/media/…` → the preview shows the post with images and a YouTube embed → Publish → it's live on
  production within about 3 minutes.
- Booking: a test booking through `/book?service=cybersecurity` arrives in Google Calendar with the intake answers and
  shows up in the admin dashboard. There are no CSP errors in the console.
- The contact form delivers an email, and Turnstile blocks a request that has no token.
- The dashboard's realtime user count matches GA4 Realtime.
- Link crawl of production: no 404s, and every old URL still resolves. Rich Results Test passes for BlogPosting,
  Course, FAQPage and Service. Lighthouse mobile performance ≥ 90.
- `npm run validate-seo` passes on the full build. A deliberately broken page (missing canonical or duplicate title) fails CI.
- `/claude-seo:seo-audit https://kodesec.com` scores ≥ 90 after launch. Search Console shows all sitemap URLs indexed within 4 weeks.
- The admin SEO tab numbers match Search Console for the same date range.
- **Admin access:** from a non-allowlisted Google account, an allowlisted account on an unenrolled device, and a
  direct request to the Worker's `workers.dev` URL, the admin can't be reached (Access denies, or `403`/`404`).
  Each of the 4 founders can log in from their enrolled device, and Publish asks for their passkey.
- The admin security test suite (§6.5) passes in CI, and the ZAP baseline shows no high-risk findings.
- A test Publish shows up in the audit log and triggers an alert. Revoking a founder's session in Zero Trust logs them out immediately.
