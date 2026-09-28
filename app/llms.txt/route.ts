import { getAcademy, getPosts, getServices, getSite } from "@/lib/content/loaders";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/** llms.txt — a plain-text map of the site for AI assistants (https://llmstxt.org). */
export function GET() {
  const site = getSite();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Services",
    ...getServices().flatMap((s) => [
      `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.summary}`,
      ...s.subservices.map((sub) => `  - [${sub.title}](${SITE_URL}/services/${s.slug}/${sub.slug}): ${sub.summary}`),
    ]),
    "",
    "## Academy (free security lessons)",
    ...getAcademy().flatMap((t) => t.modules.flatMap((m) => m.lessons.map((l) => `- [${l.title}](${SITE_URL}${l.href}): ${t.title} / ${m.title}, ${l.level}`))),
    "",
    "## Blog",
    ...getPosts().map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
    "",
    "## Company",
    `- [About](${SITE_URL}/about)`,
    `- [Pricing](${SITE_URL}/pricing)`,
    `- [Contact](${SITE_URL}/contact)`,
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
