# Kodesec website — SEO audit (current state)

Audit date: **2026-09-28**. Method: source review + live fetch of `https://kodesec.com` pages, `robots.txt`,
`sitemap.xml`, headers and DNS. No Search Console / GA data was available, so rankings, impressions, backlinks and
Core Web Vitals field data are **not** included — pull those from GSC/PageSpeed before the rebuild.

## Summary

The **technical foundation is decent** (static HTML, canonicals, sitemap, robots, JSON-LD, OG images, HTTPS,
one `<h1>` per page). The site is weak where it matters for a new B2B security brand: **very little content
(4 service pages, 8 posts), no local/regional targeting, unverifiable trust claims, generic keyword targeting,
heavy client-side JS, and several metadata bugs.** Rough score: **technical 7/10, on-page 5/10, content 3/10,
authority/E-E-A-T 3/10.**

## 1. What's working

| Item | Status |
|---|---|
| Server-rendered/static HTML (crawlable without JS) | ✅ |
| HTTPS, `http`→`https` and `www`→apex 308 redirects | ✅ |
| `robots.txt` allows all, points to sitemap | ✅ |
| `sitemap.xml` — 21 URLs (9 static, 4 services, 8 posts) auto-generated | ✅ |
| Unique `<title>` + meta description on every page | ✅ |
| Self-referencing canonicals (`metadataBase` = `https://kodesec.com`) | ✅ |
| Exactly one `<h1>` per page (checked live on 9 pages) | ✅ |
| JSON-LD: Organization, WebSite, ProfessionalService, Service, FAQPage, BreadcrumbList, Blog, BlogPosting | ✅ |
| Open Graph + Twitter cards; generated OG image per service and per blog post | ✅ (see bug below) |
| 301s from old service URLs to new consolidated pages | ✅ |
| Custom 404 returning real 404 status | ✅ |
| Fonts self-hosted via `next/font` (no render-blocking Google Fonts request) | ✅ |

## 2. Problems found (prioritised)

### High
1. **Thin content footprint.** Only 4 service pages covering broad topics ("cybersecurity", "cloud-devops").
   No dedicated pages for high-intent queries: *penetration testing services Bangladesh*, *web application
   penetration testing*, *VAPT*, *API security testing*, *Kubernetes security audit*, *SOC 2 readiness*, etc.
   The 2025 consolidation (7 specific pages → 4 broad ones, see `vercel.json` redirects) **reduced** keyword coverage.
2. **Unverifiable trust claims.** "SOC2 TYPE II", "ISO 27001 AUDITED", "GITHUB COMPLIANT" badges on the homepage,
   named testimonials ("Marcus Thorne, CTO, PayVelo", "Sarah Chen…", "Dr. Aris Vane…") and exact case-study
   metrics. If these aren't real and verifiable they damage E-E-A-T, can trigger Google's
   spam/"fake reviews" policies, and are a legal risk. Replace with real, attributable proof (client logos with
   permission, CVEs credited to the team, certifications held by named engineers like OSCP/CEH/CKA).
3. **No regional/local SEO.** The company is Bangladesh-based and the best-performing blog topics are Bangladesh
   breaches (Shwapno, NID leak), yet there is no address, no `LocalBusiness`/`PostalAddress` schema, no
   Google Business Profile link, no `en-BD` targeting, and `areaServed: "Worldwide"`.
4. **Authorship is anonymous.** Every post is by "KodeSec Research Team". For security content Google rewards
   real, credentialed authors. Add per-person author pages (`/team/<name>`) with `Person` schema and link posts to them.

### Medium
5. **Duplicate brand in titles**: blog posts render `… | KodeSec Research | Kodesec` (post titles up to ~130 chars,
   truncated in SERPs); services render `… Services | Kodesec Solutions | Kodesec`. Cause: pages append a suffix
   and `layout.tsx` `title.template` appends `| Kodesec` again.
6. **Inconsistent brand name**: Kodesec / KodeSec / KODESEC across titles, schema and copy — weakens entity recognition.
7. **OG image content-type** served as `application/octet-stream` (static export writes extensionless
   `opengraph-image` files). LinkedIn/Facebook/X may fail to render previews. Fix by exporting as `.png`
   or using static PNGs in `public/og/`.
8. **Blog post JSON-LD**: `dateModified` always equals `datePublished`; `author` is a team string not a `Person` with
   `url`; no `image` dimensions. Blog index embeds every post as `BlogPosting` inside `Blog` (fine, but duplicative).
9. **`meta keywords`** are set everywhere — ignored by Google; harmless but noise.
10. **Nested `<main>`** on blog index, blog post and service pages (layout already has `<main>`). Minor a11y/semantics issue.
11. **Sitemap `lastmod`** for all static pages is a hard-coded date (`2026-09-20`), and `changefreq`/`priority`
    are ignored by Google. Use real modification dates.
12. **Weak internal linking**: blog posts don't link to the relevant service pages in a structured way (only an
    `EmbeddedCTA` component), service pages don't list related articles, no category/tag pages.
13. **Generic, jargon-heavy copy**: H1 "Innovating for a Secure Tomorrow" contains no target keyword; many H2s are
    visual labels ("Core Capabilities", "Ecosystem"). The home H1/intro should state *what* and *for whom*
    (e.g. "Penetration Testing & Secure Software Engineering for SaaS and Fintech").

### Performance (affects rankings via Core Web Vitals)
14. Heavy client JS: ~58 client components, framer-motion on nearly every section, a full-screen intro **loader**
    that hides content (opacity 0) on first visit → likely hurts **LCP** for real users; 14–17 script tags per page.
    Home HTML is ~125 KB, blog post ~220 KB (RSC payload duplicates content).
15. `next/image` optimization is disabled (`unoptimized: true`); several images are 300–460 KB JPEG/PNG with no
    WebP/AVIF and no explicit sizing → slow LCP on blog pages. Founder photos are up to 365 KB.
16. Fixed full-viewport blurred glow layers (`blur-[190px]`) are GPU-expensive on low-end mobiles.

### Low / housekeeping
17. No `llms.txt` (optional; not used by Google) and no explicit AI-crawler policy.
18. No `apple-touch-icon`, no web manifest.
19. `/contact?type=careers` has no careers content — "Careers" link is a soft dead end.
20. Twitter link in `socialLinksConfig` points to `https://twitter.com` (no handle); not in `sameAs` — good, but fix or remove.
21. Both GTM and GA4 hard-coded — risk of double pageviews; no conversion events defined for form submit / booking.

## 3. Current keyword/page map

| Page | Primary topic today | Suggested primary query |
|---|---|---|
| `/` | "Cybersecurity & Software Engineering" | penetration testing & secure software development company (Bangladesh) |
| `/services/cybersecurity` | Network & Cyber Security | penetration testing services / VAPT |
| `/services/design-engineering` | Secure app dev | secure web application development |
| `/services/cloud-devops` | Cloud & DevOps | DevSecOps / Kubernetes security consulting |
| `/services/quality-assurance` | QA | Playwright test automation services |
| `/blog/shwapno-data-breach-2026` | Shwapno breach | shwapno data breach (news, time-sensitive) |
| `/blog/bangladesh-nid-data-breach-2026` | NID leaks | bangladesh nid data leak |
| `/blog/github-rce-cve-2026-3854-git-push-exploit` | CVE writeup | CVE-2026-3854 |
| `/blog/vercel-oauth-breach` | Vercel breach | vercel oauth breach april 2026 |
| `/blog/claude-code-decoded-project-structure` | Claude Code | off-topic for a security firm — consider moving/removing |

## 4. Recommended SEO requirements for the rebuild

1. Keep every existing URL or 301 it (`vercel.json` or `next.config` redirects if moving off static export).
2. One consistent brand string; title pattern `<Page topic> | Kodesec` (≤ 60 chars), descriptions 140–160 chars.
3. Split services into specific landing pages (web app pentest, API pentest, network/AD pentest, cloud security
   review, secure SDLC/DevSecOps, QA automation) each targeting one query, with FAQ + Service schema.
4. Add `/team/<person>` author pages with credentials; attribute posts to people.
5. Add location signals: address, phone, `LocalBusiness`/`ProfessionalService` with `PostalAddress`, `areaServed`
   (Bangladesh + target export markets), Google Business Profile.
6. Replace unverifiable claims with real evidence; add a "Security research / CVEs" or "Hall of fame" page.
7. Performance budget: LCP < 2.5 s on 4G mobile, no blocking intro loader, animations only where they add meaning,
   AVIF/WebP images with width/height, minimal client components.
8. Blog: categories/tags, related posts, links to service pages, real `dateModified`, per-post OG PNGs.
9. Analytics: one tag source (GTM *or* gtag), conversion events for form submit and booking; connect Google
   Search Console + Bing Webmaster Tools and submit the sitemap.
