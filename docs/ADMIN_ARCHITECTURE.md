# Admin panel: architecture (Phase 4)

Agreed with the founders on 2026-09-29. This replaces `docs/V2_PLAN.md` §5–§6. Where the two differ, this file wins.

The admin lives in its **own private repo, `kodesec-solutions/kodesec-admin`** (local folder `../kodesec-admin`).
Its setup guide and security details are in that repo's `docs/`.

## What the admin does

| Section | What it does |
|---|---|
| **Dashboard** | GA4 realtime visitors; users, sessions, top pages, sources and countries over 7 and 28 days; Search Console clicks, impressions and top queries; recent Cal.com bookings; open drafts |
| **Blog** | Upload a `.md` file plus its images. It validates the frontmatter, converts images to WebP and shows a live preview in the site's own renderer. **Save draft** opens a PR with a preview URL; **Publish** merges it. Edit and unpublish existing posts |
| **Academy** | The same flow for lessons, with a track and module picker and lesson order |
| **Videos** | Every video slot: home film, home announcement, About video (`content/site.yml` → `about.video`). Each takes a **YouTube/Loom link** or an **mp4 (< 20 MB) plus a poster** |

## Decisions

| Topic | Decision |
|---|---|
| Where it runs | One Cloudflare Worker at a **secret `*.workers.dev` address** (not `admin.kodesec.com`, not Vercel: Vercel Hobby is non-commercial only and can't deploy org-owned private repos) |
| Login | **GitHub** (a GitHub App: 8-hour tokens, access to this repo only) + **passkey**. Only the 4 founders' numeric GitHub IDs are allowed. The first passkey also needs a one-time enrolment code |
| Cloudflare Zero Trust | **Not used** |
| Publishing | Any founder can publish. Publish needs a fresh passkey check and sends an alert |
| Videos | YouTube/Loom links, plus small mp4s in the repo. Cloudflare Pages rejects files over 25 MB, so the cap is 20 MB |
| Drafts | `content/` moves to a **private `kodesec-content` repo after the Cloudflare cutover**. The site repo stays public, so GitHub Actions and CodeQL stay free |
| Cost | $0 |

## Shape

```
 Founder ──▶ https://<secret>.<account>.workers.dev      (only the 4 know it; noindex, no links)
               │ the Worker runs before every file:
               │   signed out → only the login page exists; everything else is 404
               │   1. Sign in with GitHub → founder ID allowlist (others: 404 + alert)
               │   2. passkey (Windows Hello / Touch ID / phone)
               ▼
            admin UI + API ── founder's own GitHub token ──▶ kodesec repo
                                                              branch → 1 commit → PR → CI preview
                                                              Publish = merge → Cloudflare Pages → kodesec.com
                            ── GA4 + Search Console (read-only), cached in KV
                            ── KV audit log + Discord alerts
```

## Conflict rules
- The admin never uses a local git checkout; it writes through the GitHub API.
- Each draft has its own branch (`content/<type>/<slug>`) and touches only its own files, so different posts never conflict.
- One draft per post: an open PR for that post is reopened, not duplicated. Slugs are checked before saving.
- Edits carry the version of the file they started from. If someone changed it meanwhile, the save is refused and
  both versions are shown side by side.
- Shared files (`site.yml` video slots, `pricing.yml`) store the *change itself*, which is re-applied to the latest
  version at Publish. Only two edits to the *same* slot ask you to choose.
- Publish is disabled until CI passes. The admin never force-pushes, never deletes a branch holding unpublished work
  and never merges when GitHub reports a conflict.

## Build order
1. ✅ Sign-in and security (in `kodesec-admin`, tested, not deployed yet)
2. ✅ Publishing: blog + academy, with image upload (built and tested, not deployed)
3. Videos
4. Dashboard: GA4 + Search Console
5. `public-api` Worker: contact form behind Turnstile, Cal.com bookings
6. Internal pentest against OWASP ASVS L2. Then move `content/` to the private repo (after the cutover)
