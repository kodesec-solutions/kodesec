# Writing for kodesec.com

Everything on the site is plain Markdown (`.md`) or YAML (`.yml`) in `content/`. Until the admin panel ships,
add files with a pull request. CI checks every file (`npm run validate-content`) and blocks the merge if
something is wrong.

## Blog post: `content/blog/<slug>.md`

```markdown
---
title: "Broken Access Control: The #1 OWASP Risk"     # ≤ 60 chars shows fully in Google
slug: broken-access-control-guide                    # the URL: /blog/broken-access-control-guide (never change it later)
description: "What broken access control is, how attackers exploit it, and the five fixes that stop it."   # 120–160 chars
date: "2026-10-01"
updated: "2026-10-01"                                # bump when you edit the post
authors: [nafiul-islam]                              # file name in content/team/ (without .yml)
category: Application Security                       # existing categories keep the blog tidy
tags: [owasp, access control]
cover: /media/blog/broken-access-control-guide/cover.webp
coverAlt: "Diagram of a user reaching another user's data"
relatedServices: [cybersecurity]                     # shows the post on that service page
featured: false
draft: false
---

Opening paragraph (no H1 — the title above is the H1).

## First section

Text, **bold**, `inline code`, [internal link](/academy/web-security).

![Describe the image for screen readers and Google](/media/blog/broken-access-control-guide/flow.webp)
```

## Academy lesson: `content/academy/<track>/<module>/<order>-<slug>.md`

```markdown
---
title: Insecure direct object references (IDOR)
slug: insecure-direct-object-references
track: web-security            # must match the folder
module: access-control         # must match the folder
order: 2                       # position inside the module
level: practitioner            # beginner | practitioner | expert
roles: [red, dev]              # red | blue | dev | cloud | devops
duration: 15 min
prerequisites: [what-is-access-control]   # slugs of earlier lessons
objectives:
  - Identify where an application exposes object identifiers
  - Test for horizontal access control flaws safely
video: https://youtu.be/VIDEO_ID           # optional: shown at the top of the lesson
updated: "2026-09-28"
authors: [kodesec-research]
---
```

- New module: create a folder with `_module.yml` (`title`, `slug`, `order`, `summary`).
- New track: create a folder with `_track.yml` (`title`, `slug`, `order`, `icon`, `status: published | coming-soon`, `summary`, `roles`).
- Offensive lessons must include the ethics note: *Only test systems you own or have written permission to test.*

## Formatting you can use

| You write | You get |
|---|---|
| `## Heading` / `### Sub-heading` | Sections, which also build the "On this page" menu |
| ```` ```http ```` … ```` ``` ```` | Syntax-highlighted code (any language: `js`, `python`, `bash`, `http`, `yaml`…) |
| `> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`, `> [!CAUTION]`, `> [!IMPORTANT]` on the first line of a quote | Coloured callout boxes |
| A YouTube or Loom link **alone on its own line** | An embedded video player |
| `\| a \| b \|` tables, `- [ ] task` lists | Tables and checklists |

Raw HTML is ignored on purpose: it can't run scripts, so a copied snippet can't break the page.

## Images

- Put them in `public/media/<blog|academy>/<slug>/`. Use WebP, at most 1600 px wide and under 500 KB.
- Every image needs alt text: `![what the image shows](/media/...)`.

## Before you open the PR

```bash
npm run validate-content   # errors must be fixed; warnings are SEO advice
npm run dev                # preview at http://localhost:3000
```

## Videos (home page film band)

The looping film on the home page is set in `content/site.yml` → `film`:

```yaml
film:
  video: /media/video/kodesec-promo.mp4
  poster: /media/video/kodesec-promo-poster.jpg   # shown before the video loads
  heading: ["Security built into", "everything you ship."]
  lines: ["Trusted by builders, dreaded by attackers.", "Test, fix and verify — faster — with Kodesec."]
```

To swap the video:

1. Compress it for the web (keeps quality, cuts size by ~60%):
   ```bash
   ffmpeg -i new-video.mp4 -vf "scale=1600:-2" -c:v libx264 -preset slow -crf 26 \
     -pix_fmt yuv420p -movflags +faststart -an public/media/video/kodesec-promo-v2.mp4
   ffmpeg -ss 5 -i new-video.mp4 -frames:v 1 -vf "scale=1600:-2" -q:v 4 public/media/video/kodesec-promo-v2.jpg
   ```
   (`-an` drops audio — the band plays muted anyway.)
2. Use a **new file name** (e.g. `-v2`) and update `video` / `poster` in `site.yml`, so browsers
   don't keep showing the old cached file. Delete the old file.
3. `npm run validate-content` — it fails if the file is missing or over 20 MB, warns over 10 MB.

Size limits: GitHub blocks files over 100 MB; Cloudflare Pages serves files up to 25 MB. Keep videos under 10 MB.
YouTube or Loom videos inside blog posts and lessons don't need any of this — paste the link on its own line.

## Announcement video (home page mint band)

Set in `content/site.yml` → `announcement` (the admin panel will edit the same fields):

```yaml
announcement:
  label: Announcement
  title: "Our new cloud security service is live"
  summary: "What it covers, who it's for, and how to book a review."
  date: "2026-10-01"
  youtube: "https://youtu.be/VIDEO_ID"      # any YouTube link; leave "" to show the Kodesec film
  cta: { label: "Book a scoping call", href: "/book" }
```

The site shows the YouTube thumbnail with a play button; the video loads only when clicked
(no YouTube tracking until then). `npm run validate-content` rejects links that aren't YouTube.

## Services and their animations

Each category is one file in `content/services/` (`cybersecurity`, `software-development`, `cloud`, `devops`,
`quality-assurance`). A category has a hero animation (`media`), 3–4 feature rows (`highlights`, each with its own
`media`) and a list of `subservices`, and each sub-service gets its own page at `/services/<category>/<sub-slug>`.

- **Add a sub-service:** add an item under `subservices:` with `title`, `slug`, `icon`, `summary`, `offerings` and three `problems`.
  Put list items in quotes if they contain a comma.
- **Swap an animation:** put a file in `public/media/services/` and point `media:` at it. `.svg`, `.gif`, `.webp`, `.png`, `.jpg`,
  `.mp4` and `.webm` all work. Videos play muted and looped. Keep them under ~1 MB and use a 7:5 (tile) or 3:2 (hero) ratio.
- **Give a sub-service its own animation:** add `media:` to that sub-service. Otherwise it reuses the category's first feature animation.
- The built-in animations are generated by `npm run gen-media` (`scripts/gen-service-media.mjs`).
