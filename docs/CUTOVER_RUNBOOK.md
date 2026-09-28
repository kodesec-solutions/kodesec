# Cutover runbook: Vercel → Cloudflare Pages (kodesec.com)

**Goal:** move kodesec.com from Vercel (Hobby, non-commercial terms) to Cloudflare Pages, with less than 2–3 minutes of
disruption, nothing lost (analytics, forms, redirects, SEO), and a one-click rollback at every step.

**Why this can be almost zero-downtime:** your DNS is **already on Cloudflare**. The nameservers are
`ursula.ns.cloudflare.com` and `yoxall.ns.cloudflare.com`, and the records are "DNS only", pointing to Vercel. So there is no
nameserver change and no propagation wait. The cutover is **one DNS record edit** inside Cloudflare, and it can be undone
with one edit.

**Golden rule:** do the phases **in order**. Don't start a phase until the one before it is ✅. Vercel stays fully working
until Phase 6, so every step before that is reversible.

---

## Phase 0: Check before touching anything (15 min, no risk)

| # | Do this | Why |
|---|---|---|
| 0.0 | **Know who does what.** Hostinger is the **registrar** (renewal, due 2026-11-27, and the nameserver setting). **Cloudflare runs the DNS** (nameservers `ursula`/`yoxall.ns.cloudflare.com`). All record changes happen in **Cloudflare**. Don't edit DNS in Hostinger's panel (it's ignored), and don't change the nameservers. | Avoids editing the wrong panel. Keep auto-renew on at Hostinger. |
| 0.1 | In Cloudflare, open **the account you'll use** → Websites. Confirm **kodesec.com** is listed there. | Pages can only auto-manage DNS for a zone in the **same account**. If the zone is in another account, stop and move the Pages project there instead. |
| 0.2 | kodesec.com → **DNS → Records → Export** (⋯ menu). Save the file somewhere safe. | A full backup of every record, including MX/TXT for email and Google verification. |
| 0.3 | Screenshot the current apex and `www` records: `kodesec.com A 216.198.79.1` (DNS only) and `www CNAME …vercel-dns…` (DNS only). | These are your **rollback values**. |
| 0.4 | Edit those two records → set **TTL = 1 min**. Wait at least 1 hour (the old TTL must expire). | Rollback then takes effect within a minute. |
| 0.5 | Vercel → kodesec → **Settings → Environment Variables**: copy the value of `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. If it's hidden, take it from your Web3Forms dashboard. | The contact form needs it on Cloudflare too. |
| 0.6 | Google Tag Manager → container **GTM-PX3H2865** → Tags. Note whether there's a Google tag / GA4 tag for **G-LH10BFSBJQ**. | The site loads GA4 **directly** as well (same as today). If GTM also fires G-LH10BFSBJQ, remove `ga4Id` from `content/site.yml` to avoid double counting. If it doesn't, leave it as is. |
| 0.7 | Google Search Console → Settings → Ownership verification. Note the method. | DNS-TXT or Google-Analytics verification survives the move. An **HTML file** or **meta tag** method would need re-adding. |
| 0.8 | Cloudflare → kodesec.com → **SSL/TLS → Overview**: set **Full (strict)**. **Edge Certificates**: turn on **Always Use HTTPS**. Speed → turn **Rocket Loader off**. Leave **Web Analytics auto-inject off**. | Rocket Loader rewrites scripts and injected beacons are blocked by our security policy (CSP). |

## Phase 1: Create the Cloudflare Pages project (10 min, no risk)

1. Cloudflare → **Workers & Pages → Create → Pages → "Upload assets" (Direct Upload)**. Name it **`kodesec`**. Upload any
   small folder (a single `index.html` is fine), and set the production branch to **master**.
   - If `kodesec` is taken, use e.g. `kodesec-web` and change `--project-name=kodesec` in
     `.github/workflows/deploy-cloudflare.yml`.
   - Don't use "Connect to Git". GitHub Actions builds and uploads, so the checks run first.
2. **My Profile → API Tokens → Create token → Custom**, with permission **Account → Cloudflare Pages → Edit**, limited to
   your account. Copy the token.
3. Copy your **Account ID** (right sidebar of any zone overview).
4. GitHub → repo → **Settings → Secrets and variables → Actions → New secret** (add all three):
   - `CLOUDFLARE_API_TOKEN` = the token
   - `CLOUDFLARE_ACCOUNT_ID` = the account ID
   - `WEB3FORMS_ACCESS_KEY` = the value from 0.5

✅ Done when the three secrets exist. **kodesec.com is untouched.**

## Phase 2: Set up the booking calendar (20 min, no risk)

1. Create a free account at **cal.com** and connect the Google Calendar the founders use.
2. Create an event type called **"Scoping call"** (30 min). Add booking questions: company, service, project stage,
   budget (optional), notes.
3. Copy its link, e.g. `https://cal.com/kodesec/scoping-call`, and put **`kodesec/scoping-call`** in `content/site.yml` →
   `booking.calLink`.
4. Optionally, in Cal.com → Settings → Appearance, set the brand colour to `#2ECC71`.

Until this is filled in, `/book` shows the email fallback. Nothing breaks.

## Phase 3: Preview the new site on Cloudflare (30–60 min, no risk)

1. Push the `v2` branch (Claude will only do this when you say so) and open a **pull request `v2` → `master`**.
2. GitHub Actions runs CI, then deploys a preview and **comments the preview URL** on the PR
   (`https://pr-<n>.kodesec-3p5.pages.dev`). Vercel will also post its own preview. Both are fine.
3. Test the **Cloudflare preview** (checklist in Phase 7). Pay special attention to:
   - `/contact`: send a real test message and check the inbox
   - `/book`: book a test slot and check that it appears in Google Calendar
   - the browser console on the home page: there should be no red "Content Security Policy" errors
   - an old URL such as `/services/manual-website-penetration-testing`: it should 301 to `/services/cybersecurity`

✅ Done when the preview passes every check. Fix anything by pushing to `v2`, and the preview updates.

## Phase 4: Launch v2 content, still on Vercel (5 min, instantly reversible)

1. **Merge the PR into `master`.**
2. Two things happen automatically:
   - **Vercel** builds v2 and puts it live on kodesec.com, which is still pointed at Vercel.
   - **GitHub Actions** deploys the same build to Cloudflare production (`kodesec-3p5.pages.dev`).
3. Check kodesec.com shows v2, and that `https://kodesec-3p5.pages.dev` shows the same thing.
4. **Rollback:** Vercel → Deployments → **Instant Rollback** to the old deployment.

Why this order: the new content goes live on the host you already trust. Moving hosts (Phase 5) then only swaps
identical copies, so visitors can't see a difference.

## Phase 5: Switch the host, the actual cutover (2–3 min)

Do this at a quiet hour (e.g. early morning UK time).

1. Cloudflare → **Workers & Pages → kodesec → Custom domains → Set up a custom domain → `kodesec.com`**.
2. Cloudflare will offer to **replace** the existing `kodesec.com` A record. Confirm. It becomes a **proxied** CNAME to
   `kodesec-3p5.pages.dev`.
3. Wait until the domain status is **Active** (usually 1–3 minutes). During this window a few requests may briefly show a
   certificate or "not found" page. That's your 2–3 minutes.
4. Check from a terminal:
   ```bash
   curl -sI https://kodesec.com | grep -i -E "server|content-security|strict-transport"
   ```
   You should see `server: cloudflare`, plus the CSP and HSTS headers.
5. **`www`:**
   - In **DNS**, change `www` to **CNAME `www` → `kodesec.com`**, **Proxied** (orange cloud).
   - In **Rules → Redirect Rules → Create**, use the template **"Redirect from WWW to root"**
     (`https://www.kodesec.com/*` → `https://kodesec.com/${1}`, **301**, preserve query string).
   - Check: `curl -sI https://www.kodesec.com/about` should return **301** to `https://kodesec.com/about`.

**Rollback (1 minute):**
- Pages → Custom domains → remove `kodesec.com`.
- Set the DNS record back to **A `216.198.79.1`, DNS only** (from 0.3).
- Vercel still has the domain and v2, so it serves immediately.

## Phase 6: Retire Vercel (after 1–2 weeks of stable Cloudflare)

1. Vercel → kodesec → **Settings → Git → Disconnect** (stops duplicate builds on every push).
2. Vercel → **Domains**: remove `kodesec.com` and `www.kodesec.com`.
3. Keep the Vercel project for another month as a cold backup, then delete it.
4. DNS: set the TTLs back to **Auto**.

## Phase 7: Verification checklist (run in Phase 3, and again right after Phase 5)

- [ ] Home, services (all 4), pricing, book, contact, about, blog (list, category, 3 posts), academy (list, track,
      lesson), privacy, terms, and a random 404 all load in **light and dark** mode
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/blog/rss.xml` load
- [ ] `https://kodesec.com/opengraph-image` returns `content-type: image/png` (LinkedIn Post Inspector shows the preview)
- [ ] The 9 legacy redirects in `public/_redirects` return **301**
- [ ] **Contact form:** a test message arrives
- [ ] **Booking:** a test booking arrives in Google Calendar and the confirmation email is received
- [ ] **Analytics:** GA4 → Realtime shows your visit; GTM Preview mode connects
- [ ] **Search Console:** still verified; re-submit `https://kodesec.com/sitemap.xml`
- [ ] Browser console on home, book and a blog post: **no CSP errors**
- [ ] The YouTube announcement plays (once a link is set), and the film section video plays
- [ ] Top strip links to the partnership section; theme toggle works and remembers the choice

## What moves automatically, and what you do by hand

| Thing | How it carries over |
|---|---|
| Pages, blog, academy, images, video | Built from the repo on every merge to `master` |
| Security headers (CSP, HSTS, …) | `public/_headers` (Cloudflare's version of `vercel.json`) |
| Old-URL 301s | `public/_redirects` |
| `www` → apex | Cloudflare Redirect Rule (Phase 5.5) |
| Google Tag Manager + GA4 | In the site code (`content/site.yml` → `analytics`), so no dashboard change needed |
| Contact form key | GitHub secret `WEB3FORMS_ACCESS_KEY` (Phase 1.4) |
| Cal.com booking | `content/site.yml` → `booking.calLink` (Phase 2) |
| TLS certificate | Issued by Cloudflare automatically (Phase 5) |
| Email (MX/SPF/DKIM) | **Untouched.** Only the apex and `www` records change |
