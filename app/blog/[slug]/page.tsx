import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export const dynamicParams = false;

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function estimateReadTime(contentHtml: string) {
  const plainText = contentHtml.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = plainText ? plainText.split(" ").length : 0;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function decodeHtml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function slugifyHeading(value: string) {
  return decodeHtml(value)
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getTocItems(contentHtml: string) {
  const items: Array<{ id: string; label: string; level: number }> = [];
  const seen = new Map<string, number>();
  const headingPattern = /<(h2|h3)>(.*?)<\/\1>/g;

  for (const match of contentHtml.matchAll(headingPattern)) {
    const level = Number(match[1].slice(1));
    const label = decodeHtml(match[2].replace(/<[^>]+>/g, "").trim());
    const baseId = slugifyHeading(label);
    const count = seen.get(baseId) ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

    seen.set(baseId, count + 1);
    items.push({ id, label, level });
  }

  return items;
}

function addHeadingIds(contentHtml: string) {
  const seen = new Map<string, number>();

  return contentHtml.replace(/<(h2|h3)>(.*?)<\/\1>/g, (match, tagName: string, innerHtml: string) => {
    const plainText = decodeHtml(innerHtml.replace(/<[^>]+>/g, "").trim());
    const baseId = slugifyHeading(plainText);
    const count = seen.get(baseId) ?? 0;
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

    seen.set(baseId, count + 1);
    return `<${tagName} id="${id}">${innerHtml}</${tagName}>`;
  });
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: String(post.slug) }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readTime = estimateReadTime(post.contentHtml);
  const tocItems = getTocItems(post.contentHtml);
  const articleHtml = addHeadingIds(post.contentHtml);

  return (
    <div className="relative overflow-hidden bg-background-dark px-4 py-8 sm:px-6 lg:px-20 lg:py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(54,226,123,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%)]" />

      <div className="mx-auto max-w-7xl">
        <nav className="mb-6 flex items-center gap-2 overflow-hidden text-sm text-muted sm:mb-8">
          <a href="/blog" className="transition-colors hover:text-primary">
            Blog
          </a>
          <span>/</span>
          <span className="min-w-0 truncate text-secondary">{post.title}</span>
        </nav>

        <article className="overflow-hidden rounded-[1.5rem] border border-surface-border bg-surface-dark/70 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-[2rem]">
          <header className="border-b border-surface-border bg-gradient-to-br from-surface-dark via-background-dark to-card-dark px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-14">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs sm:tracking-[0.18em]">
                <span className="hidden h-1 w-1 rounded-full bg-primary/70 sm:inline-block" />
                <span>{readTime}</span>
              </div>

              <h1 className="mt-4 text-2xl font-black leading-tight text-secondary sm:text-3xl md:text-5xl lg:text-6xl">
                {post.title}
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base md:text-lg">
                Technical analysis and security commentary presented in a clean,
                editorial format, rendered directly from the source markdown.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-background-dark/70 px-3 py-2 text-xs text-secondary sm:px-4 sm:text-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    calendar_today
                  </span>
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-background-dark/70 px-3 py-2 text-xs text-secondary sm:px-4 sm:text-sm">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    person
                  </span>
                  <span>{post.author ?? "KodeSec Research Team"}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
            <main className="px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-14">
              <div className="mb-6 grid gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
                {[
                  { label: "Reading pace", value: readTime },
                  { label: "Source", value: "Markdown file" },
                  { label: "Style", value: "Editorial layout" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-surface-border bg-background-dark/55 p-3 sm:p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted sm:text-[11px] sm:tracking-[0.18em]">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-secondary sm:mt-2">{item.value}</p>
                  </div>
                ))}
              </div>

              <div
                className="article-body prose prose-invert prose-base max-w-none sm:prose-lg prose-headings:scroll-mt-24 sm:prose-headings:scroll-mt-28 prose-headings:font-black prose-headings:tracking-tight prose-headings:text-secondary prose-p:text-muted prose-li:text-muted prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary prose-code:rounded prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary prose-pre:border prose-pre:border-surface-border prose-pre:bg-[#0a1020] prose-pre:shadow-[0_12px_36px_rgba(0,0,0,0.28)] prose-blockquote:border-l-primary prose-blockquote:text-secondary prose-img:rounded-2xl prose-img:border prose-img:border-surface-border prose-hr:border-surface-border"
                dangerouslySetInnerHTML={{ __html: articleHtml }}
              />
            </main>

            <aside className="border-t border-surface-border bg-background-dark/60 px-4 py-6 sm:px-6 sm:py-8 lg:border-l lg:border-t-0 lg:px-6 lg:py-10">
              <div className="space-y-4 lg:sticky lg:top-8 lg:space-y-5">
                <div className="rounded-2xl border border-surface-border bg-surface-dark/70 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    On this page
                  </p>
                  <div className="mt-3 space-y-2 sm:mt-4">
                    {tocItems.length > 0 ? (
                      tocItems.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/5 hover:text-primary ${
                            item.level === 3 ? "pl-5 text-muted" : "text-secondary"
                          }`}
                        >
                          {item.label}
                        </a>
                      ))
                    ) : (
                      <p className="text-sm leading-relaxed text-muted">
                        This article does not contain section headings yet.
                      </p>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-surface-border bg-surface-dark/70 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Reading note
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted sm:mt-3">
                    This article is generated from a markdown file in content/blogs,
                    so the editorial layout adapts to headings, lists, code blocks,
                    quotes, and images in the source.
                  </p>
                </div>

                <div className="rounded-2xl border border-surface-border bg-surface-dark/70 p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Source
                  </p>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted sm:mt-3">
                    Frontmatter provides the title, date, and slug, while the body is
                    transformed into HTML with Remark.
                  </p>
                </div>

                <div className="rounded-2xl border border-surface-border bg-gradient-to-br from-primary/10 to-transparent p-4 sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Quick facts
                  </p>
                  <ul className="mt-3 space-y-2.5 text-sm text-secondary sm:mt-4 sm:space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-primary">•</span>
                      <span>Static-export friendly route</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-primary">•</span>
                      <span>Typography plugin enabled for markdown</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-primary">•</span>
                      <span>Clean, high-contrast dark presentation</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/blog"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-surface-border bg-primary px-4 py-3 text-sm font-semibold text-[#09111a] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <span>Back to blog</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </div>
  );
}