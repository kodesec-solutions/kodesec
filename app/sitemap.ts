import type { MetadataRoute } from "next";
import { getAcademy, getCategories, getPage, getPosts, getServices } from "@/lib/content/loaders";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPosts();
  const latestPost = posts[0]?.updated ?? posts[0]?.date;
  const tracks = getAcademy();
  const lessons = tracks.flatMap((t) => t.modules.flatMap((m) => m.lessons));
  const latestLesson = lessons.map((l) => l.updated).sort().at(-1);
  const u = (path: string, lastModified?: string) => ({ url: `${SITE_URL}${path}`, ...(lastModified ? { lastModified } : {}) });

  return [
    u("/", latestPost),
    u("/services"),
    ...getServices().map((s) => u(`/services/${s.slug}`)),
    ...getServices().flatMap((s) => s.subservices.map((sub) => u(`/services/${s.slug}/${sub.slug}`))),
    u("/pricing"),
    u("/book"),
    u("/contact"),
    u("/about"),
    u("/academy", latestLesson),
    ...tracks.filter((t) => t.lessonCount > 0).map((t) => u(t.href, t.modules.flatMap((m) => m.lessons.map((l) => l.updated)).sort().at(-1))),
    ...tracks.flatMap((t) => t.modules.map((m) => u(m.href))),
    ...lessons.map((l) => u(l.href, l.updated)),
    u("/blog", latestPost),
    ...getCategories().map((c) => u(`/blog/category/${c.slug}`)),
    ...posts.map((p) => u(`/blog/${p.slug}`, p.updated ?? p.date)),
    u("/privacy-policy", getPage("privacy-policy")?.data.updated),
    u("/terms-of-service", getPage("terms-of-service")?.data.updated),
  ];
}
