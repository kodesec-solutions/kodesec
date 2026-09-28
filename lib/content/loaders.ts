import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import YAML from "yaml";
import type { z } from "zod";
import {
  blogSchema,
  lessonSchema,
  moduleSchema,
  pageSchema,
  pricingSchema,
  serviceSchema,
  siteSchema,
  teamSchema,
  trackSchema,
  type BlogFrontmatter,
  type LessonFrontmatter,
  type Module,
  type Pricing,
  type ServiceFrontmatter,
  type Site,
  type TeamMember,
  type Track,
} from "./schemas";

/** Build-time content loaders. Every file is validated against its schema; a bad file fails the build. */

export const CONTENT_DIR = path.join(process.cwd(), "content");

const cache = new Map<string, unknown>();
function cached<T>(key: string, fn: () => T): T {
  if (process.env.NODE_ENV === "production" && cache.has(key)) return cache.get(key) as T;
  const value = fn();
  cache.set(key, value);
  return value;
}

function parse<S extends z.ZodTypeAny>(schema: S, data: unknown, file: string): z.infer<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  - ${i.path.join(".") || "(root)"}: ${i.message}`).join("\n");
    throw new Error(`Invalid content in ${path.relative(process.cwd(), file)}:\n${issues}`);
  }
  return result.data;
}

function readYaml<S extends z.ZodTypeAny>(file: string, schema: S): z.infer<S> {
  return parse(schema, YAML.parse(fs.readFileSync(file, "utf8")), file);
}

function readMarkdown<S extends z.ZodTypeAny>(file: string, schema: S) {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { data: parse(schema, data, file) as z.infer<S>, body: content, file };
}

function listFiles(dir: string, ext: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(ext) && !f.startsWith("_"))
    .map((f) => path.join(dir, f));
}

const showDrafts = () => process.env.KODESEC_SHOW_DRAFTS === "1";

// ---------------------------------------------------------------- site / pricing / pages

export const getSite = (): Site => cached("site", () => readYaml(path.join(CONTENT_DIR, "site.yml"), siteSchema));

export const getPricing = (): Pricing =>
  cached("pricing", () => readYaml(path.join(CONTENT_DIR, "pricing.yml"), pricingSchema));

export function getPage(slug: string) {
  const file = path.join(CONTENT_DIR, "pages", `${slug}.md`);
  return fs.existsSync(file) ? readMarkdown(file, pageSchema) : null;
}

// ---------------------------------------------------------------- team

export const getTeam = (): TeamMember[] =>
  cached("team", () =>
    listFiles(path.join(CONTENT_DIR, "team"), ".yml").map((f) => readYaml(f, teamSchema)),
  );

export const getPeople = () => getTeam().filter((m) => m.kind === "person");

export function getMember(slug: string): TeamMember | undefined {
  return getTeam().find((m) => m.slug === slug);
}

// ---------------------------------------------------------------- services

export type Service = ServiceFrontmatter & { body: string };

export const getServices = (): Service[] =>
  cached("services", () =>
    listFiles(path.join(CONTENT_DIR, "services"), ".md")
      .map((f) => {
        const { data, body } = readMarkdown(f, serviceSchema);
        return { ...data, body };
      })
      .sort((a, b) => a.order - b.order),
  );

export const getService = (slug: string) => getServices().find((s) => s.slug === slug);

export function getSubService(serviceSlug: string, subSlug: string) {
  const service = getService(serviceSlug);
  const sub = service?.subservices.find((x) => x.slug === subSlug);
  return service && sub ? { service, sub } : null;
}

// ---------------------------------------------------------------- blog

export type Post = BlogFrontmatter & { body: string };

export const getPosts = (): Post[] =>
  cached("posts", () =>
    listFiles(path.join(CONTENT_DIR, "blog"), ".md")
      .map((f) => {
        const { data, body } = readMarkdown(f, blogSchema);
        return { ...data, body };
      })
      .filter((p) => showDrafts() || !p.draft)
      .sort((a, b) => b.date.localeCompare(a.date)),
  );

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export function getCategories(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, number>();
  for (const p of getPosts()) map.set(p.category, (map.get(p.category) ?? 0) + 1);
  return [...map.entries()]
    .map(([name, count]) => ({ name, slug: slugify(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ---------------------------------------------------------------- academy

export type Lesson = LessonFrontmatter & { body: string; href: string };
export type AcademyModule = Module & { lessons: Lesson[]; href: string };
export type AcademyTrack = Track & { modules: AcademyModule[]; href: string; lessonCount: number };

export const getAcademy = (): AcademyTrack[] =>
  cached("academy", () => {
    const root = path.join(CONTENT_DIR, "academy");
    if (!fs.existsSync(root)) return [];
    return fs
      .readdirSync(root, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => {
        const trackDir = path.join(root, d.name);
        const track = readYaml(path.join(trackDir, "_track.yml"), trackSchema);
        const modules = fs
          .readdirSync(trackDir, { withFileTypes: true })
          .filter((m) => m.isDirectory() && fs.existsSync(path.join(trackDir, m.name, "_module.yml")))
          .map((m) => {
            const modDir = path.join(trackDir, m.name);
            const mod = readYaml(path.join(modDir, "_module.yml"), moduleSchema);
            const lessons = listFiles(modDir, ".md")
              .map((f) => {
                const { data, body } = readMarkdown(f, lessonSchema);
                if (data.track !== track.slug || data.module !== mod.slug) {
                  throw new Error(`${f}: frontmatter track/module must be "${track.slug}"/"${mod.slug}"`);
                }
                return { ...data, body, href: `/academy/${track.slug}/${mod.slug}/${data.slug}` };
              })
              .filter((l) => showDrafts() || !l.draft)
              .sort((a, b) => a.order - b.order);
            return { ...mod, lessons, href: `/academy/${track.slug}/${mod.slug}` };
          })
          .sort((a, b) => a.order - b.order);
        const lessonCount = modules.reduce((n, m) => n + m.lessons.length, 0);
        return { ...track, modules, href: `/academy/${track.slug}`, lessonCount };
      })
      .sort((a, b) => a.order - b.order);
  });

export const getTrack = (slug: string) => getAcademy().find((t) => t.slug === slug);

export function getLesson(trackSlug: string, moduleSlug: string, lessonSlug: string) {
  const track = getTrack(trackSlug);
  const mod = track?.modules.find((m) => m.slug === moduleSlug);
  const lesson = mod?.lessons.find((l) => l.slug === lessonSlug);
  if (!track || !mod || !lesson) return null;
  const flat = track.modules.flatMap((m) => m.lessons);
  const i = flat.findIndex((l) => l.href === lesson.href);
  return { track, module: mod, lesson, prev: flat[i - 1] ?? null, next: flat[i + 1] ?? null };
}

export const getAllLessons = () => getAcademy().flatMap((t) => t.modules.flatMap((m) => m.lessons));
