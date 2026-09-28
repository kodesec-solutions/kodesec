import { getPosts, getSite } from "@/lib/content/loaders";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const site = getSite();
  const items = getPosts()
    .slice(0, 30)
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${SITE_URL}/blog/${p.slug}</link><guid>${SITE_URL}/blog/${p.slug}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><category>${esc(p.category)}</category><description>${esc(p.description)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Kodesec Blog</title><link>${SITE_URL}/blog</link><description>${esc(site.tagline)}</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
