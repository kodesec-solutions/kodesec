# CLAUDE.md — Kodesec website (v2)

Context for Claude and humans working in this repo. Read this first.

- **Plan:** `docs/V2_PLAN.md` (architecture, admin panel, admin security §6, SEO §8, CI/CD, phases)
- **Writing content:** `docs/CONTENT_GUIDE.md`
- **Old production site (v1, still live on Vercel from `master`):** `docs/ARCHITECTURE.md`, `docs/SEO_AUDIT.md`

## Status (2026-09-28)

v2 is being built on the **`v2` branch**. `master` still deploys the old v1 site to Vercel. Don't merge v2 into
`master` until the cutover checklist in `docs/V2_PLAN.md` §9 is done.

| Phase | State |
|---|---|
| 1 Foundation (content layer, design system, CI) | ✅ done |
| 2 Public site (home, services, pricing, booking, contact, blog, about, legal) | ✅ done: copy still needs the team (`TODO(team)` markers) |
| 3 Academy (tracks → modules → lessons, progress in browser) | ✅ done: 1 sample module, 3 lessons |
| 4 Admin panel + Workers (admin-api, public-api) | ⏳ not started |
| 5 Launch (Cloudflare Pages, DNS cutover) | ⏳ |

## What the site is

kodesec.com is the site of **Kodesec Solutions**, a founder-led security and engineering firm in Dhaka. It has:
5 service categories with 31 sub-service pages (`/services`, `/services/<category>`, `/services/<category>/<sub>`, Aikido-style), pricing that always leads to booking (`/pricing` → `/book`), a Cal.com booking
page, a contact form (Web3Forms), a **blog** (`/blog`), and a free **PortSwigger-style Academy** (`/academy`),
which is lessons only, with no labs.

## Stack

- Next.js 16 App Router, **static export** (`output: "export"`, `out/`), React 19, TypeScript, Tailwind v4.
- Content: Markdown/YAML in `content/`, validated by zod (`lib/content/schemas.ts`), loaded at build time
  (`lib/content/loaders.ts`), rendered by one unified pipeline (`lib/content/markdown.ts`): GFM, GitHub alerts,
  Shiki highlighting, heading anchors and TOC, YouTube/Loom embeds from a bare URL on its own line. **Raw HTML in content
  is dropped by design.**
- SEO: `lib/seo.ts` (`buildMetadata` + JSON-LD builders), `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt`,
  `app/blog/rss.xml`, `app/opengraph-image.tsx`.
- Fonts: Geist and Geist Mono. Icons: lucide-react (brand icons live in `components/ui/Icon.tsx` because lucide v1 dropped them).

## Design system (from the reference videos: Neon, Aikido, Atomik, PortSwigger)

- Black canvas `#030605`, brand greens from the logo: `--color-brand #2ECC71`, `--color-brand-2 #1F7A4D`, mint `#B8F5D2`.
  The tokens are in `app/globals.css` (`@theme`).
- `<Aurora />` (`components/effects/Aurora.tsx`): green/white aurora with blurred light, vertical curtain rays and grain.
  It's pure CSS and frozen when the user prefers reduced motion. `<Horizon />` is the glowing planet edge behind closing CTAs.
- The header is a floating capsule nav with mega-menus built from content (Aikido). The footer has a giant faded KODESEC wordmark (Atomik).
- `.eyebrow` (mono uppercase with a green square), `.btn-primary` (white pill), `.btn-ghost`, `.btn-brand`, `.card`,
  `.chip`, and `.kd-prose` for all rendered Markdown.
- Logo: `components/brand/Logo.tsx` holds the vector K mark (redrawn from `assets/…jpeg`) plus the KODE**SEC** wordmark.
- Academy lesson layout: left topic tree, center lesson, right progress ring, TOC and CTA
  (`app/academy/[track]/[module]/[lesson]/page.tsx`).

## Commands

```bash
npm run dev               # http://localhost:3000
npm run build             # static export → out/
npm run lint && npm run typecheck && npm test
npm run validate-content  # schemas, broken links, missing/oversized images, SEO warnings
```

Env: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (contact form). The Cal.com link goes in `content/site.yml` → `booking.calLink`.

## Rules

- **Never change a public URL** without a 301 in **both** `vercel.json` and `public/_redirects`
  (and headers in both `vercel.json` and `public/_headers`).
- Content lives in `content/`, not in components. Pages read it via `lib/content/loaders.ts`.
- New content fields: update the zod schema first, then `validate-content`, then the admin panel.
- A new third-party script, iframe or API needs a CSP update in `vercel.json` and `public/_headers`.
- No fake social proof: no invented testimonials, client logos, certifications or metrics.
- Keep client components small. Pages are server components, and interactivity is isolated (`HeaderClient`, `Toc`,
  `Booking`, `ContactForm`, academy progress widgets).
