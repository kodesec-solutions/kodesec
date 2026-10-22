import { getAcademy, getCategories, getOwaspTopics, getPage, getPosts, getServices } from "@/lib/content/loaders";
import { SITE_URL } from "@/lib/seo";

export type SitemapEntry = { path: string; lastmod?: string };

/** One sitemap per content type, listed in the index at /sitemap.xml. */
export const SITEMAPS = ["pages", "services", "academy", "blog"] as const;
export type SitemapName = (typeof SITEMAPS)[number];

const latest = (dates: (string | undefined)[]) => dates.filter((d): d is string => !!d).sort().at(-1);

export function sitemapEntries(name: SitemapName): SitemapEntry[] {
  const posts = getPosts();
  const tracks = getAcademy();
  const lessons = tracks.flatMap((t) => t.modules.flatMap((m) => m.lessons));
  const latestPost = latest(posts.map((p) => p.updated ?? p.date));
  const latestLesson = latest(lessons.map((l) => l.updated));

  switch (name) {
    case "pages":
      return [
        { path: "/", lastmod: latest([latestPost, latestLesson]) },
        { path: "/pricing" },
        { path: "/book" },
        { path: "/contact" },
        { path: "/about" },
        { path: "/privacy-policy", lastmod: getPage("privacy-policy")?.data.updated },
        { path: "/terms-of-service", lastmod: getPage("terms-of-service")?.data.updated },
      ];
    case "services":
      return [
        { path: "/services" },
        ...getServices().flatMap((s) => [{ path: `/services/${s.slug}` }, ...s.subservices.map((sub) => ({ path: `/services/${s.slug}/${sub.slug}` }))]),
      ];
    case "academy":
      return [
        { path: "/academy", lastmod: latestLesson },
        ...getOwaspTopics().map((t) => ({ path: t.href })),
        ...tracks
          .filter((t) => t.lessonCount > 0)
          .map((t) => ({ path: t.href, lastmod: latest(t.modules.flatMap((m) => m.lessons.map((l) => l.updated))) })),
        ...tracks.flatMap((t) => t.modules.map((m) => ({ path: m.href, lastmod: latest(m.lessons.map((l) => l.updated)) }))),
        ...lessons.map((l) => ({ path: l.href, lastmod: l.updated })),
      ];
    case "blog":
      return [
        { path: "/blog", lastmod: latestPost },
        ...getCategories().map((c) => ({ path: `/blog/category/${c.slug}` })),
        ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.updated ?? p.date })),
      ];
  }
}

const xml = (body: string) => new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}\n`, { headers: { "Content-Type": "application/xml; charset=utf-8" } });

export function sitemapResponse(name: SitemapName) {
  const urls = sitemapEntries(name)
    .map((e) => `  <url><loc>${SITE_URL}${e.path === "/" ? "" : e.path}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}</url>`)
    .join("\n");
  return xml(`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`);
}

export function sitemapIndexResponse() {
  const items = SITEMAPS.map((n) => {
    const lastmod = latest(sitemapEntries(n).map((e) => e.lastmod));
    return `  <sitemap><loc>${SITE_URL}/sitemap-${n}.xml</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</sitemap>`;
  }).join("\n");
  return xml(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>`);
}
