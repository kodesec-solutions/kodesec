#!/usr/bin/env node
/**
 * Design-system guard (npm run lint:design). Fails when UI code bypasses the tokens in app/styles/tokens.css:
 *   1. arbitrary colours:       bg-[#fff], text-[#04160d], border-[rgb(...)]
 *   2. arbitrary font sizes:    text-[13px], text-[0.7rem]   (use text-eyebrow / caption / body-sm / lede ...)
 *   3. chromatic Tailwind palette classes: text-red-300, bg-emerald-400/10 (use danger / success / warn / brand / violet)
 *   4. text below 12px
 * Hex values inside the files listed in ALLOW are intentional (brand assets, third-party logos, OG image renderer, lesson palette).
 * See docs/DESIGN_SYSTEM.md.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOTS = ["app", "components"];
const ALLOW = new Set([
  "components/brand/Logo.tsx", // logo vector, brand asset
  "components/services/accent.ts", // one hue per service category: the only place raw palette classes are allowed
  "app/opengraph-image.tsx", // satori cannot read CSS variables
  "components/ui/StackLogo.tsx", // third-party brand colours
  "components/owasp/sims/kit.tsx", // lesson accent palette (feeds --acc)
  "components/listing/DotCover.tsx", // generated SVG artwork
  "components/booking/Booking.tsx", // Cal.com config
  "app/layout.tsx", // <meta name=theme-color>
]);
const PALETTE = "red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose";
const RULES = [
  { re: /\b(?:text|bg|border|from|to|via|ring|fill|stroke|outline|shadow)-\[(?:#|rgb|hsl|oklch)[^\]]*\]/g, msg: "arbitrary colour: add a token in app/styles/tokens.css" },
  { re: /\btext-\[\d*\.?\d+(?:px|rem|em)\]/g, msg: "arbitrary font size: use the type scale (text-eyebrow, caption, body-sm, lede, h2, hero-sm, display or Tailwind's own)" },
  { re: new RegExp(String.raw`\b(?:text|bg|border|from|to|via|ring|fill|stroke)-(?:${PALETTE})-\d{2,3}(?:/\d+)?\b`, "g"), msg: "raw palette colour: use danger / success / warn / brand / violet tokens" },
];

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (/\.(tsx|ts)$/.test(name)) yield p;
  }
}

let bad = 0;
for (const root of ROOTS) {
  for (const file of walk(root)) {
    const rel = relative(".", file).split(sep).join("/");
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      for (const { re, msg } of RULES) {
        // the allow list only exempts hex/palette data, never font sizes
        if (ALLOW.has(rel) && !msg.startsWith("arbitrary font")) continue;
        for (const m of line.matchAll(re)) {
          bad++;
          console.error(`${rel}:${i + 1}  ${m[0]}  → ${msg}`);
        }
      }
    });
  }
}
if (bad) {
  console.error(`\n${bad} design-token violation(s). See docs/DESIGN_SYSTEM.md.`);
  process.exit(1);
}
console.log("design tokens: ok");
