/**
 * Content validation for CI and the admin panel. Run: npm run validate-content
 * Fails (exit 1) on errors; prints warnings for SEO issues that shouldn't block a publish.
 */
import fs from "node:fs";
import path from "node:path";
import { parseVideoUrl } from "../lib/content/markdown";
import {
  getAcademy, getAllLessons, getPage, getPosts, getPricing, getServices, getSite, getTeam, slugify,
} from "../lib/content/loaders";

const errors: string[] = [];
const warnings: string[] = [];
const MAX_IMAGE_BYTES = 500 * 1024;
const PUBLIC = path.join(process.cwd(), "public");

function load<T>(label: string, fn: () => T): T | null {
  try {
    return fn();
  } catch (e) {
    errors.push(`${label}: ${(e as Error).message}`);
    return null;
  }
}

const site = load("site.yml", getSite);
load("pricing.yml", getPricing);
const team = load("team", getTeam) ?? [];
const services = load("services", getServices) ?? [];
const posts = load("blog", getPosts) ?? [];
const tracks = load("academy", getAcademy) ?? [];
const lessons = tracks.length ? getAllLessons() : [];
for (const p of ["privacy-policy", "terms-of-service"]) load(`pages/${p}`, () => getPage(p));

const authorSlugs = new Set(team.map((t) => t.slug));
const serviceSlugs = new Set(services.map((s) => s.slug));

// ---- every internal route that exists, for link checking
const routes = new Set<string>([
  "/", "/services", "/pricing", "/book", "/contact", "/about", "/academy", "/blog", "/privacy-policy", "/terms-of-service",
  ...services.map((s) => `/services/${s.slug}`),
  ...services.flatMap((s) => s.subservices.map((sub) => `/services/${s.slug}/${sub.slug}`)),
  ...posts.map((p) => `/blog/${p.slug}`),
  ...posts.map((p) => `/blog/category/${slugify(p.category)}`),
  ...tracks.map((t) => t.href),
  ...tracks.flatMap((t) => t.modules.map((m) => m.href)),
  ...lessons.map((l) => l.href),
]);

function dupes(list: string[], label: string) {
  const seen = new Set<string>();
  for (const s of list) {
    if (seen.has(s)) errors.push(`${label}: duplicate slug "${s}"`);
    seen.add(s);
  }
}
dupes(posts.map((p) => p.slug), "blog");
dupes(lessons.map((l) => l.href), "academy");

function checkImage(ref: string, where: string) {
  if (/^https?:\/\//.test(ref)) {
    if (!ref.startsWith("https://")) errors.push(`${where}: image must use https: ${ref}`);
    return;
  }
  const file = path.join(PUBLIC, decodeURI(ref.split(/[?#]/)[0]));
  if (!fs.existsSync(file)) return errors.push(`${where}: image not found: ${ref}`);
  const size = fs.statSync(file).size;
  if (size > MAX_IMAGE_BYTES) warnings.push(`${where}: image ${ref} is ${Math.round(size / 1024)} KB (keep under ${MAX_IMAGE_BYTES / 1024} KB)`);
}

function checkBody(body: string, where: string) {
  if (/^#\s/m.test(body.replace(/```[\s\S]*?```/g, ""))) warnings.push(`${where}: uses an H1 (#) — the title is already the H1, start at ##`);
  for (const m of body.matchAll(/!\[([^\]]*)\]\(([^)\s]+)/g)) {
    if (!m[1].trim()) warnings.push(`${where}: image without alt text: ${m[2]}`);
    checkImage(m[2], where);
  }
  for (const m of body.matchAll(/(?<!!)\[[^\]]*\]\((\/[^)\s#?]*)/g)) {
    const href = m[1].replace(/\/$/, "") || "/";
    if (!routes.has(href) && !fs.existsSync(path.join(PUBLIC, href))) errors.push(`${where}: broken internal link ${m[1]}`);
  }
}

for (const p of posts) {
  const where = `content/blog/${p.slug}.md`;
  p.authors.forEach((a) => authorSlugs.has(a) || errors.push(`${where}: unknown author "${a}" (add content/team/${a}.yml)`));
  p.relatedServices.forEach((s) => serviceSlugs.has(s) || errors.push(`${where}: unknown related service "${s}"`));
  if (p.cover) checkImage(p.cover, where);
  if (p.description.length > 160) warnings.push(`${where}: description is ${p.description.length} chars (aim for 120–160)`);
  if (p.title.length > 65) warnings.push(`${where}: title is ${p.title.length} chars (search shows ~60)`);
  checkBody(p.body, where);
}

const lessonSlugs = new Set(lessons.map((l) => l.slug));
for (const l of lessons) {
  const where = `academy ${l.href}`;
  l.authors.forEach((a) => authorSlugs.has(a) || errors.push(`${where}: unknown author "${a}"`));
  l.prerequisites.forEach((p) => lessonSlugs.has(p) || errors.push(`${where}: unknown prerequisite "${p}"`));
  checkBody(l.body, where);
}
for (const t of tracks) {
  if (t.cover) checkImage(t.cover, `academy/${t.slug} cover`);
  if (t.status === "published" && t.lessonCount === 0) errors.push(`academy/${t.slug}: published track has no lessons`);
  for (const m of t.modules) {
    const orders = m.lessons.map((l) => l.order);
    if (new Set(orders).size !== orders.length) errors.push(`academy/${t.slug}/${m.slug}: two lessons share the same "order"`);
  }
}
for (const s of services) {
  const where = `content/services/${s.slug}.md`;
  checkBody(s.body, where);
  for (const m of [s.media, ...s.highlights.map((h) => h.media), ...s.subservices.map((x) => x.media).filter(Boolean)] as string[]) {
    if (!fs.existsSync(path.join(PUBLIC, m))) errors.push(`${where}: media not found: ${m}`);
  }
  for (const x of s.subservices) {
    if (x.problems.length && x.problems.length !== 3) warnings.push(`${where}: ${x.slug} has ${x.problems.length} problems (expected 3 — an unquoted comma may have split one; quote the list items)`);
  }
  const subs = s.subservices.map((x) => x.slug);
  if (new Set(subs).size !== subs.length) errors.push(`${where}: duplicate sub-service slug`);
}
if (site) {
  checkImage(site.film.poster, "site.yml film.poster");
  const vid = path.join(PUBLIC, site.film.video);
  if (!fs.existsSync(vid)) errors.push(`site.yml film.video not found: ${site.film.video}`);
  else if (fs.statSync(vid).size > 20 * 1024 * 1024) errors.push(`site.yml film.video is over 20 MB (Cloudflare Pages limit is 25 MB) — compress it`);
  else if (fs.statSync(vid).size > 10 * 1024 * 1024) warnings.push(`film video is ${Math.round(fs.statSync(vid).size / 1048576)} MB — aim for under 10 MB`);
}
if (site?.announcement.youtube && parseVideoUrl(site.announcement.youtube)?.provider !== "youtube") {
  errors.push(`site.yml announcement.youtube is not a valid YouTube link: ${site.announcement.youtube}`);
}
if (site && !site.booking.calLink) warnings.push("site.yml: booking.calLink is empty — /book shows the email fallback");

for (const w of warnings) console.warn(`⚠ ${w}`);
for (const e of errors) console.error(`✖ ${e}`);
console.log(
  `\n${posts.length} posts · ${lessons.length} lessons in ${tracks.length} tracks · ${services.length} services · ${team.length} authors — ${errors.length} error(s), ${warnings.length} warning(s)`,
);
process.exit(errors.length ? 1 : 0);
