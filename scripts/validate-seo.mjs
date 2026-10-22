/**
 * SEO gate for the built site (out/). Run after `npm run build`: npm run validate-seo
 * Errors fail CI; warnings are printed. See docs/V2_PLAN.md §8.1.
 *
 * Per page: one <h1>, unique title <= 60 chars, description 120-160 chars, self-referencing canonical,
 * OG + Twitter tags with an image, alt text on every <img>, valid JSON-LD with a BreadcrumbList,
 * no broken internal links, no orphan pages (>= 2 inbound links), and a clean sitemap / robots.txt.
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const SITE = "https://kodesec.com";
const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

if (!fs.existsSync(OUT)) {
  console.error("out/ not found, run `npm run build` first");
  process.exit(1);
}

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

const all = walk(OUT);
const htmlFiles = all.filter((f) => f.endsWith(".html") && !f.endsWith("404.html") && !path.basename(f).startsWith("_"));
const routeOf = (f) => {
  const rel = path.relative(OUT, f).split(path.sep).join("/").replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel.replace(/\/index$/, "")}`;
};
const routes = new Set(htmlFiles.map(routeOf));
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const meta = (html, attr, key) => {
  const re = new RegExp(`<meta[^>]+${attr}="${key}"[^>]*>`, "i");
  const tag = html.match(re)?.[0];
  const content = tag?.match(/content="([^"]*)"/i)?.[1];
  return content === undefined ? undefined : decode(content);
};

const titles = new Map();
const descs = new Map();
const inbound = new Map();

for (const file of htmlFiles) {
  const route = routeOf(file);
  const html = fs.readFileSync(file, "utf8");
  const body = html.replace(/<script[\s\S]*?<\/script>/g, "");

  // --- title
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  if (!title) err(route, "missing <title>");
  else {
    if (title.length > 60) warn(route, `title is ${title.length} chars (${title})`);
    if ((title.match(/\| Kodesec/g) ?? []).length > 1) err(route, `brand repeated in title: ${title}`);
    titles.set(title, [...(titles.get(title) ?? []), route]);
  }

  // --- description
  const desc = meta(html, "name", "description");
  if (!desc) err(route, "missing meta description");
  else {
    if (desc.length < 70 || desc.length > 170) warn(route, `description is ${desc.length} chars (aim 120-160)`);
    descs.set(desc, [...(descs.get(desc) ?? []), route]);
  }

  // --- h1
  const h1s = (body.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) err(route, `${h1s} <h1> tags (need exactly 1)`);

  // --- canonical + indexability
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]*>/i)?.[0]?.match(/href="([^"]*)"/)?.[1];
  const expected = `${SITE}${route === "/" ? "" : route}`;
  if (!canonical) err(route, "missing canonical");
  else if (canonical.replace(/\/$/, "") !== expected) err(route, `canonical ${canonical} != ${expected}`);
  const robots = meta(html, "name", "robots") ?? "";
  if (/noindex/.test(robots)) warn(route, "page is noindex");

  // --- Open Graph / Twitter
  for (const k of ["og:title", "og:description", "og:url", "og:image", "og:type"]) {
    if (!meta(html, "property", k)) err(route, `missing ${k}`);
  }
  for (const k of ["twitter:card", "twitter:image"]) if (!meta(html, "name", k)) err(route, `missing ${k}`);
  const ogImage = meta(html, "property", "og:image");
  if (ogImage && !/\.(png|jpe?g|webp)(\?|$)/i.test(ogImage) && !/opengraph-image/.test(ogImage)) warn(route, `og:image has no image extension: ${ogImage}`);

  // --- images
  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(m[0])) err(route, `<img> without alt: ${m[0].slice(0, 90)}`);
  }

  // --- JSON-LD
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  if (!ld.length) err(route, "no JSON-LD");
  let hasBreadcrumb = false;
  for (const m of ld) {
    try {
      const data = JSON.parse(m[1]);
      for (const node of Array.isArray(data) ? data : [data]) {
        if (node["@type"] === "BreadcrumbList") hasBreadcrumb = true;
        if (!node["@context"] && !node["@graph"]) err(route, "JSON-LD node without @context");
      }
    } catch {
      err(route, "invalid JSON-LD");
    }
  }
  if (route !== "/" && !hasBreadcrumb) warn(route, "no BreadcrumbList JSON-LD");

  // --- internal links
  const seen = new Set();
  for (const m of body.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = decode(m[1]).split("#")[0].split("?")[0];
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const target = href.replace(/\/$/, "") || "/";
    if (seen.has(target)) continue;
    seen.add(target);
    const isAsset = /\.[a-z0-9]{2,5}$/i.test(target);
    if (isAsset) {
      if (!fs.existsSync(path.join(OUT, target))) err(route, `broken asset link ${href}`);
      continue;
    }
    if (!routes.has(target)) err(route, `broken internal link ${href}`);
    else if (target !== route) inbound.set(target, (inbound.get(target) ?? 0) + 1);
  }
}

for (const [t, rs] of titles) if (rs.length > 1) err(rs.join(", "), `duplicate title "${t}"`);
for (const [d, rs] of descs) if (rs.length > 1) warn(rs.join(", "), `duplicate description "${d.slice(0, 60)}..."`);
for (const r of routes) if (r !== "/" && (inbound.get(r) ?? 0) < 2) warn(r, `orphan-ish: only ${inbound.get(r) ?? 0} inbound link(s) (want >= 2)`);

// --- sitemap & robots
const sitemapPath = path.join(OUT, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) err("sitemap.xml", "missing");
else {
  const index = fs.readFileSync(sitemapPath, "utf8");
  const children = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!/<sitemapindex/.test(index) || !children.length) err("sitemap.xml", "not a sitemap index");
  const locs = [];
  for (const c of children) {
    const f = path.join(OUT, c.slice(SITE.length));
    if (!fs.existsSync(f)) {
      err("sitemap.xml", `child sitemap not built: ${c}`);
      continue;
    }
    locs.push(...[...fs.readFileSync(f, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
  }
  const set = new Set(locs);
  if (set.size !== locs.length) err("sitemap.xml", "duplicate URLs");
  for (const l of locs) {
    if (!l.startsWith(SITE)) err("sitemap.xml", `foreign URL ${l}`);
    const p = l.slice(SITE.length).replace(/\/$/, "") || "/";
    if (!routes.has(p)) err("sitemap.xml", `lists a page that is not built: ${l}`);
  }
  for (const r of routes) {
    const url = `${SITE}${r === "/" ? "" : r}`;
    if (!set.has(url) && !set.has(`${url}/`)) warn("sitemap.xml", `built page missing from sitemap: ${r}`);
  }
}
const robotsPath = path.join(OUT, "robots.txt");
if (!fs.existsSync(robotsPath) || !/Sitemap:\s*https:\/\/kodesec\.com\/sitemap\.xml/i.test(fs.readFileSync(robotsPath, "utf8"))) {
  err("robots.txt", "missing or does not reference the sitemap");
}
if (!fs.existsSync(path.join(OUT, "llms.txt"))) warn("llms.txt", "missing");

for (const w of warnings) console.warn(`⚠ ${w}`);
for (const e of errors) console.error(`✖ ${e}`);
console.log(`\nvalidate-seo: ${htmlFiles.length} pages — ${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
