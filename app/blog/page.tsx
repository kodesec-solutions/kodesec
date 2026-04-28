import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export default function BlogPage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

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
    <div className="relative overflow-hidden bg-background-dark px-6 py-14 lg:px-20 lg:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(54,226,123,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_24%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="max-w-6xl">
          <span className="inline-flex rounded-full border border-surface-border bg-surface-dark px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Blog
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight text-secondary md:text-5xl lg:text-6xl">
            Security research, technical analysis, and practical engineering notes.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Read KodeSec case studies and technical breakdowns covering real-world
            attacks, secure delivery patterns, and the systems decisions that shape
            modern infrastructure.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Articles", value: `${posts.length}` },
            { label: "Focus", value: "Security-first" },
            { label: "Format", value: "Deep dives" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-surface-border bg-surface-dark/80 p-4 backdrop-blur-sm"
            >
              <p className="text-xs uppercase tracking-[0.16em] text-muted">
                {item.label}
              </p>
              <p className="mt-2 text-lg font-bold text-secondary">{item.value}</p>
            </div>
          ))}
        </div>

        {featuredPost ? (
          <section className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-surface-border bg-gradient-to-br from-surface-dark via-card-dark to-background-dark p-7 md:p-10 shadow-2xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(54,226,123,0.14),transparent_34%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-primary">
                    <span>Featured</span>
                    <span className="h-1 w-1 rounded-full bg-primary/70" />
                    <span>{formattedDate(featuredPost.date)}</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-black leading-tight text-secondary md:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                    {featuredPost.excerpt || "Read the full article for the complete analysis."}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                  <span>Read article</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                </div>
              </div>
            </Link>

            <div className="rounded-3xl border border-surface-border bg-surface-dark/75 p-7 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Latest thinking
              </p>
              <div className="mt-5 space-y-5">
                <div className="rounded-2xl border border-surface-border bg-background-dark/60 p-4">
                  <p className="text-sm font-semibold text-secondary">Clean structure</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Each post is written to be scannable first, then deep enough for
                    practitioners who want the technical detail.
                  </p>
                </div>
                <div className="rounded-2xl border border-surface-border bg-background-dark/60 p-4">
                  <p className="text-sm font-semibold text-secondary">Practical context</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Case studies focus on what happened, why it mattered, and what
                    teams can do differently.
                  </p>
                </div>
                <div className="rounded-2xl border border-surface-border bg-background-dark/60 p-4">
                  <p className="text-sm font-semibold text-secondary">Security lens</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Content centers on attack paths, controls, and design choices that
                    reduce real-world risk.
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                All posts
              </p>
              <h2 className="mt-2 text-2xl font-bold text-secondary md:text-3xl">
                Recent articles
              </h2>
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {(featuredPost ? [featuredPost, ...otherPosts] : posts).map((post, index) => (
              <article
                key={post.slug}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-surface-border bg-surface-dark/70 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full border border-surface-border bg-background-dark/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {index === 0 ? "Featured" : "Article"}
                  </span>
                  <span className="text-xs text-muted">{formattedDate(post.date)}</span>
                </div>

                <Link href={`/blog/${post.slug}`} className="mt-5 block">
                  <h3 className="text-xl font-bold leading-snug text-secondary transition-colors duration-300 group-hover:text-primary">
                    {post.title}
                  </h3>
                </Link>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt || "Open the post to read the full article and technical detail."}
                </p>

                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1"
                >
                  <span>Read more</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}