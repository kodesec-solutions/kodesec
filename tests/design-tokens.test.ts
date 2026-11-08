import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync("app/styles/tokens.css", "utf8");

/** Returns {token: value} for the first block whose selector line matches `selector`. */
function block(selector: RegExp): Record<string, string> {
  const m = css.match(new RegExp(selector.source + String.raw`\s*\{([^}]*)\}`, "m"));
  if (!m) throw new Error(`block not found: ${selector}`);
  const out: Record<string, string> = {};
  for (const d of m[m.length - 1].matchAll(/--([\w-]+):\s*([^;]+);/g)) out[d[1]] = d[2].trim();
  return out;
}

const theme = block(/^@theme/);
const light = block(/^\[data-theme="light"\]/);
const dark = block(/^\[data-theme="dark"\],\s*\.sim-bg/);
const band = { ...block(/^\.theme-light/) };

function lum(hex: string) {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function ratio(a: string, b: string) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

const TEXT = ["color-fg", "color-fg-2", "color-fg-3", "color-brand", "color-danger", "color-warn", "color-success", "color-info"];
const SURFACES = ["color-bg", "color-bg-2", "color-surface", "color-card"];

describe("design tokens", () => {
  it("dark values in @theme match the [data-theme=dark] island block", () => {
    for (const [k, v] of Object.entries(dark)) {
      if (k.startsWith("color-") && k in theme) expect(v, k).toBe(theme[k]);
    }
  });

  for (const [name, t, bgs] of [
    ["dark", { ...theme, ...dark }, SURFACES],
    ["light", { ...theme, ...light }, SURFACES],
  ] as const) {
    it(`${name}: text tokens reach WCAG AA (4.5:1) on every surface`, () => {
      for (const fg of TEXT) for (const bg of bgs) {
        expect(ratio(t[fg], t[bg]), `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
    });
  }

  it("mint band: text tokens reach AA", () => {
    const t = { ...theme, ...light, ...band };
    for (const fg of ["color-fg", "color-fg-2", "color-fg-3", "color-brand"]) {
      for (const bg of ["color-bg", "color-bg-2", "color-surface"]) {
        expect(ratio(t[fg], t[bg]), `${fg} on ${bg}`).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it("button text keeps AA: white on light brand, ink on dark brand", () => {
    expect(ratio("#ffffff", light["color-brand"])).toBeGreaterThanOrEqual(4.5);
    expect(ratio("#02140a", theme["color-brand"])).toBeGreaterThanOrEqual(4.5);
    expect(ratio("#ffffff", theme["color-danger-strong"])).toBeGreaterThanOrEqual(4.5);
  });

  it("type scale never goes below 12px", () => {
    for (const [k, v] of Object.entries(theme)) {
      if (k.startsWith("text-") && !k.includes("--")) expect(parseFloat(v) * 16, k).toBeGreaterThanOrEqual(12);
    }
  });
});
