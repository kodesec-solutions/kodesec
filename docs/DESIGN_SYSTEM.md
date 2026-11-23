# Kodesec design system

One source of truth: **`app/styles/tokens.css`**. Everything else (components, pages) consumes it.
Enforced by `npm run lint:design` (CI) and `tests/design-tokens.test.ts` (contrast + theme parity).

## File map

| File | What lives there |
|---|---|
| `app/styles/tokens.css` | `@theme` tokens (dark default), light/dark/mint-band re-maps, brand RGB channels, z-index scale |
| `app/styles/base.css` | html/body, focus ring, heading rhythm |
| `app/styles/components.css` | `.btn*`, `.card`, `.chip`, `.eyebrow`, `.pill-toggle`, `.container-kd`, nav glow |
| `app/styles/prose.css` | `.kd-prose` (blog, academy, legal), alerts, code, video embeds |
| `app/styles/effects.css` | horizon, page rails, reveal, service beam, halftone, theme fixes |
| `app/styles/academy.css` | simulations (`.sim-*`), motion art (`.ma-*`), clips (`.kc-*`), defense graphics (`.dg-*`) |

## Tokens

**Colour (theme-aware):** `bg`, `bg-2`, `surface`, `line`, `line-2`, `fg`, `fg-2`, `fg-3`, `brand`, `brand-2`, `mint`, `danger`, `warn`, `success`, `info`, `card`, `card-2`, `tint`.
**Colour (constant):** `violet`, `violet-2` (second accent), `ink`, `ink-2` (deep green), `panel`, `panel-2`, `panel-3` (always-dark chrome), `paper`, `danger-strong`.
**In plain CSS** use `rgb(var(--brand-rgb) / .3)`, never a literal `rgb(46 204 113 / .3)`.

| Use | Token |
|---|---|
| Body text | `text-fg-2` (lead copy `text-fg`) |
| Captions, meta | `text-fg-3` (AA on every surface) |
| Links, accents | `text-brand` |
| `brand-2` | decoration only (3.8:1 on black): never body text |
| Errors / warnings / success | `danger` / `warn` / `success` / `info` |

**Type scale** (12px is the floor): `text-eyebrow` 12 · `text-caption` 13 · `text-body-sm` 15 · `text-lede` 17 · `text-h2` 44 · `text-hero-sm` 40 · `text-display` 68, plus Tailwind's own `text-xs … text-6xl`.
**H1 tiers:** *display* (home hero only): `text-hero-sm sm:text-5xl lg:text-display` · *page* (`PageHero`, services, listings): `text-4xl sm:text-5xl md:text-6xl` · *article* (blog post, lesson): `text-3xl sm:text-4xl md:text-5xl`.
**Shape:** `rounded-full` (pills), `rounded-2xl`/`.card` (cards), `rounded-panel` (big panels). **Elevation:** `shadow-glow`, `shadow-panel`. **Motion:** `ease-out-expo`, `ease-spring`; always honour `prefers-reduced-motion`.
**z-index:** `z-(--z-raised|sticky|header|top)`.

## Components

- `Section` (+ `SectionHeading`, `PageHero`): every page section. Pass `id`, `aria-*`, `className` (e.g. `border-t border-line`). Don't hand-write `<section class="py-…">`.
- Containers: `.container-kd` (1200px). The only wider one is `.container-kd.container-wide` (1400px).
- Buttons: `.btn` + `.btn-primary | .btn-brand | .btn-ghost | .btn-acc` (Academy accent), `.btn-sm`, `.btn-icon` (icon only, needs `aria-label`), `.btn-link` (quiet text). Toggles/filters: `.pill-toggle` with `aria-pressed`.
- Cards `.card` (+ `.card-hover`), labels `.chip` / `.chip-brand`, section labels `.eyebrow`.
- Callouts in Markdown: GitHub alerts (`> [!NOTE]`); rendered by `.kd-prose`.

## Themes

`<html data-theme="light|dark">` is set before paint. Dark islands (hero, beam, film band, `.sim-bg`) re-apply the dark tokens. The mint band is `Section tone="light"`.
When you change a **dark** value, change it in *both* `@theme` and the `[data-theme="dark"], .sim-bg` block (the test fails if they differ).

## Rules (checked by `npm run lint:design`)

1. No arbitrary colours (`bg-[#…]`, `text-[rgb(…)]`). Add a token.
2. No arbitrary font sizes (`text-[13px]`). Use the scale.
3. No chromatic Tailwind palette classes (`text-red-300`, `bg-emerald-400/10`).
4. Allowed hex lives only in: `Logo.tsx`, `services/accent.ts` (one hue per service category), `opengraph-image.tsx` (satori can't read CSS vars), `StackLogo.tsx` (third-party brand colours), `sims/kit.tsx` (lesson accent palette), `DotCover.tsx`, `Booking.tsx`, `layout.tsx` (theme-color meta).
5. New token or utility name → also add it to `extendTailwindMerge` in `lib/utils.ts`, or `cn()` will drop real colours.
6. Contrast: text tokens must reach 4.5:1 on every surface (tested). Check any new colour pair before using it.
7. New class in a component → `components.css`; effect → `effects.css`; Academy motion → `academy.css`.
