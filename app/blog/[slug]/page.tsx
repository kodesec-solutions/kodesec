import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ChevronLeft, Calendar, User } from "lucide-react";
import JsonLd from "@/components/JsonLd";

// Import custom MDX components
import Callout from "@/components/blog/Callout";
import SecurityWarning from "@/components/blog/SecurityWarning";
import EmbeddedCTA from "@/components/blog/EmbeddedCTA";
import AuthorProfile from "@/components/blog/AuthorProfile";

export const dynamic = "force-static";
export const dynamicParams = false;

// Custom MDX components mapping
const mdxComponents = {
  Callout,
  SecurityWarning,
  EmbeddedCTA,
  AuthorProfile,
};

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
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getTocItemsFromMdx(content: string) {
  const items: Array<{ id: string; label: string; level: number }> = [];
  const lines = content.split("\n");
  const seen = new Map<string, number>();

  for (const line of lines) {
    const match = line.match(/^(##|###)\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      const label = match[2].trim().replace(/[*_`[\]()]/g, "");
      const baseId = slugifyHeading(label);
      const count = seen.get(baseId) ?? 0;
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;

      seen.set(baseId, count + 1);
      items.push({ id, label, level });
    }
  }

  return items;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: String(post.slug) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Kodesec",
    };
  }

  return {
    title: `${post.title} | KodeSec Research`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    keywords: [
      post.author.toLowerCase(),
      "vulnerability research",
      "exploit proof of concept",
      "remediation advice",
      "kodesec blog",
      post.slug.replace(/-/g, " "),
    ],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tocItems = getTocItemsFromMdx(post.content);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://kodesec.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://kodesec.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `https://kodesec.com/blog/${post.slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://kodesec.com/blog/${post.slug}/#article`,
    "headline": post.title,
    "description": post.excerpt,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@id": "https://kodesec.com/#organization"
    },
    "mainEntityOfPage": `https://kodesec.com/blog/${post.slug}`,
    "image": post.image ? `https://kodesec.com${post.image}` : "https://kodesec.com/assets/Logo.png"
  };

  return (
    <div className="relative overflow-hidden bg-background-dark px-4 py-8 sm:px-6 lg:px-20 lg:py-16">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={articleSchema} />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(54,226,123,0.12),transparent_28%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 overflow-hidden text-sm text-muted sm:mb-8">
          <Link href="/blog" className="transition-colors hover:text-primary">
            Blog
          </Link>
          <span>/</span>
          <span className="min-w-0 truncate text-secondary">{post.slug}</span>
        </nav>

        <article className="overflow-hidden rounded-[1.5rem] border border-surface-border bg-surface-dark/70 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:rounded-[2rem]">
          {/* Header */}
          <header className="border-b border-surface-border bg-gradient-to-br from-surface-dark via-background-dark to-card-dark px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-14">
            <div className="max-w-6xl">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs sm:tracking-[0.18em]">
                <span className="hidden h-1 w-1 rounded-full bg-primary/70 sm:inline-block" />
                <span>{post.readingTime}</span>
              </div>

              <h1 className="mt-4 text-xl font-black leading-tight text-secondary sm:text-2xl md:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-3 max-w-5xl text-xs leading-relaxed text-muted sm:text-sm md:text-base lg:text-lg">
                {post.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-background-dark/70 px-2.5 py-1.5 text-[11px] text-secondary sm:px-4 sm:py-2 sm:text-sm">
                  <Calendar size={14} className="text-primary" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-surface-border bg-background-dark/70 px-2.5 py-1.5 text-[11px] text-secondary sm:px-4 sm:py-2 sm:text-sm">
                  <User size={14} className="text-primary" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          </header>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* Main Content */}
            <main className="min-w-0 overflow-hidden px-4 py-6 sm:px-6 sm:py-8 md:px-10 md:py-10 lg:px-14">
              <div className="mb-6 grid gap-3 sm:mb-8 sm:grid-cols-3 sm:gap-4">
                {[
                  { label: "Reading pace", value: post.readingTime },
                  { label: "Source", value: "MDX Architecture" },
                  { label: "Style", value: "Editorial layout" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-surface-border bg-background-dark/55 p-2.5 sm:p-4"
                  >
                    <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-muted sm:text-[11px] sm:tracking-[0.18em]">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-xs font-semibold text-secondary sm:mt-2 sm:text-sm">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Render serialized MDX content with custom components */}
              <div className="article-body prose prose-invert prose-base max-w-none sm:prose-lg prose-headings:scroll-mt-24 sm:prose-headings:scroll-mt-28 prose-headings:font-black prose-headings:tracking-tight prose-headings:text-secondary prose-p:text-muted prose-li:text-muted prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-secondary prose-code:rounded prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary prose-pre:border prose-pre:border-surface-border prose-pre:bg-[#0a1020] prose-pre:shadow-[0_12px_36px_rgba(0,0,0,0.28)] prose-blockquote:border-l-primary prose-blockquote:text-secondary prose-img:rounded-2xl prose-img:border prose-img:border-surface-border prose-hr:border-surface-border">
                <MDXRemote source={post.content} components={mdxComponents} />
              </div>

              {/* Footer Author Profile */}
              <div className="mt-12 pt-8 border-t border-surface-border">
                <AuthorProfile authorName={post.author} />
              </div>
            </main>

            {/* Sidebar Table of Contents */}
            <aside className="border-t border-surface-border bg-background-dark/60 px-4 py-6 sm:px-6 sm:py-8 lg:border-l lg:border-t-0 lg:px-6 lg:py-10">
              <div className="space-y-4 lg:sticky lg:top-28 lg:space-y-5">
                <div className="rounded-2xl border border-surface-border bg-surface-dark/70 p-3 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-primary sm:text-xs sm:tracking-[0.18em]">
                    On this page
                  </p>
                  <div className="mt-3 space-y-1.5 sm:space-y-2">
                    {tocItems.length > 0 ? (
                      tocItems.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block rounded-lg px-2 py-1.5 text-xs transition-colors hover:bg-white/5 hover:text-primary sm:px-3 sm:py-2 sm:text-sm ${
                            item.level === 3
                              ? "pl-4 text-muted sm:pl-5"
                              : "text-secondary"
                          }`}
                        >
                          {item.label}
                        </a>
                      ))
                    ) : (
                      <p className="text-xs leading-relaxed text-muted sm:text-sm">
                        This article does not contain section headings yet.
                      </p>
                    )}
                  </div>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-surface-border bg-primary px-4 py-2.5 text-xs font-semibold text-[#09111a] transition-transform duration-300 hover:-translate-y-0.5 sm:py-3 sm:text-sm font-mono"
                >
                  <ChevronLeft size={16} />
                  <span>Back to blog</span>
                </Link>
              </div>
            </aside>
          </div>
        </article>
      </div>
    </div>
  );
}
