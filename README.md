# kodesec.com

The website of **Kodesec Solutions**: penetration testing, secure engineering, and the free **Kodesec Academy**.

- Next.js 16 (static export) · React 19 · TypeScript · Tailwind v4
- Content in Markdown/YAML under `content/` (blog, academy, services, pricing, team, site settings)
- Deploys: Cloudflare Pages (v2) via GitHub Actions; v1 still on Vercel from `master`

```bash
npm install
npm run dev               # http://localhost:3000
npm run validate-content  # check content before a PR
npm run build             # static site in out/
```

| Doc | What's in it |
|---|---|
| [`CLAUDE.md`](CLAUDE.md) | How the codebase works, design system, rules |
| [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) | How to write blog posts and academy lessons |
| [`docs/V2_PLAN.md`](docs/V2_PLAN.md) | Full v2 plan: admin panel, security, SEO, CI/CD |

© Kodesec Solutions. All rights reserved.
