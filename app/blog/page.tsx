import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Blog & Cybersecurity Research",
  description: "Read technical write-ups, vulnerability analysis (CVEs), and secure application design recommendations by KodeSec leads.",
  alternates: {
    canonical: "/blog",
  },
  keywords: ["cybersecurity blog", "vulnerability writeups", "OWASP recommendations", "security patches"],
};

export default function BlogPage() {
  const posts = getAllPosts();

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
      }
    ]
  };

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://kodesec.com/blog/#blog",
    "name": "Kodesec Cybersecurity Research Blog",
    "description": "Technical write-ups, vulnerability disclosures, and secure application blueprints.",
    "publisher": {
      "@id": "https://kodesec.com/#organization"
    },
    "blogPost": posts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "url": `https://kodesec.com/blog/${post.slug}`
    }))
  };
  // Prefer a post with frontmatter `featured: true`; fall back to first post.
  const featuredPost = posts.find((p) => p.featured) ?? posts[0];
  // Exclude the featured post from the list of other posts to avoid duplicate keys
  const otherPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  const formattedDate = (date: string) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return new Intl.DateTimeFormat("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(parsedDate);
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={blogSchema} />
      <Section grid className="px-6 py-14 lg:px-20 lg:py-20">
        <Container>
        <div className="max-w-6xl text-left">
          <Badge>Blog</Badge>
          <h1 className="mt-5 text-4xl font-black leading-tight text-secondary md:text-5xl lg:text-6xl">
            Security research, technical analysis, and practical engineering
            notes.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Read KodeSec case studies and technical breakdowns covering
            real-world attacks, secure delivery patterns, and the systems
            decisions that shape modern infrastructure.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Articles", value: `${posts.length}` },
            { label: "Focus", value: "Security-first" },
            { label: "Format", value: "Deep dives" },
          ].map((item) => (
            <Card
              key={item.label}
              className="p-4 bg-surface-dark/80 backdrop-blur-sm"
              glow="hover:border-primary/10"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-muted text-left">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-bold text-secondary text-left">
                {item.value}
              </p>
            </Card>
          ))}
        </div>

        {featuredPost ? (
          <section className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-surface-border bg-gradient-to-br from-surface-dark via-card-dark to-background-dark shadow-2xl transition-transform duration-300 hover:-translate-y-1 block text-left"
            >
              {featuredPost.image ? (
                <>
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-dark/80 via-card-dark/70 to-background-dark/80" />
                </>
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(54,226,123,0.14),transparent_34%)]" />
              )}
              <div className="relative p-7 md:p-10">
                <div className="flex flex-col justify-between h-full min-h-[320px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-primary font-mono font-bold">
                      <span className="px-2 py-0.5 rounded border border-primary/20 bg-primary/5">Featured</span>
                      <span className="h-1 w-1 rounded-full bg-primary/70" />
                      <span>{formattedDate(featuredPost.date)}</span>
                    </div>
                    <h2 className="mt-5 text-2xl font-black leading-tight text-secondary md:text-3xl lg:text-4xl">
                      {featuredPost.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                      {featuredPost.excerpt ||
                        "Read the full article for the complete analysis."}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                    <span>Read article</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </div>
            </Link>

            <Card className="bg-surface-dark/75 p-7 md:p-8 text-left" glow="hover:border-primary/10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary font-mono">
                Latest thinking
              </p>
              <div className="mt-5 space-y-5">
                <div className="rounded-2xl border border-surface-border bg-background-dark/60 p-4">
                  <p className="text-sm font-semibold text-secondary">
                    Clean structure
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Each post is written to be scannable first, then deep enough
                    for practitioners who want the technical detail.
                  </p>
                </div>
                <div className="rounded-2xl border border-surface-border bg-background-dark/60 p-4">
                  <p className="text-sm font-semibold text-secondary">
                    Practical context
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Case studies focus on what happened, why it mattered, and
                    what teams can do differently.
                  </p>
                </div>
                <div className="rounded-2xl border border-surface-border bg-background-dark/60 p-4">
                  <p className="text-sm font-semibold text-secondary">
                    Security lens
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Content centers on attack paths, controls, and design
                    choices that reduce real-world risk.
                  </p>
                </div>
              </div>
            </Card>
          </section>
        ) : null}

        <section className="mt-16 text-left">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary font-mono">
                All posts
              </p>
              <h2 className="mt-2 text-2xl font-bold text-secondary md:text-3xl">
                Recent articles
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(featuredPost ? [featuredPost, ...otherPosts] : posts).map(
              (post, index) => (
                <article
                  key={post.slug}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-surface-border bg-surface-dark/70 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)] text-left"
                >
                  {post.image && (
                    <div className="relative h-48 w-full overflow-hidden bg-surface-border">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between gap-3 font-mono">
                      <span className="inline-flex rounded-full border border-surface-border bg-background-dark/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                        {index === 0 ? "Featured" : "Article"}
                      </span>
                      <span className="text-xs text-muted">
                        {formattedDate(post.date)}
                      </span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="mt-5 block">
                      <h3 className="text-xl font-bold leading-snug text-secondary transition-colors duration-300 group-hover:text-primary">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {post.excerpt ||
                        "Open the post to read the full article and technical detail."}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1 font-mono"
                    >
                      <span>Read more</span>
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              ),
            )}
          </div>
        </section>
      </Container>
    </Section>
    </>
  );
}
