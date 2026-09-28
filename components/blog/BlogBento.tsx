import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { DotCover } from "@/components/listing/DotCover";
import type { Post } from "@/lib/content/loaders";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Home-page "Latest from the blog" bento: one large feature card with two smaller cards stacked
 * beside it. Same card language as the blog/academy listings (square-ish corners, image filling a
 * rounded inner frame, calendar · category meta).
 */

function Cover({ post, className }: { post: Post; className?: string }) {
  return post.cover ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={post.cover} alt={post.coverAlt ?? ""} loading="lazy" decoding="async" className={cn("h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]", className)} />
  ) : (
    <DotCover label={`kodesec/${post.slug}`} seed={post.slug} className={cn("h-full w-full", className)} />
  );
}

function Meta({ post }: { post: Post }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-fg-2">
      <span className="flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5 text-fg-3" /> {formatDate(post.date)}
      </span>
      <span className="h-1 w-1 rounded-full bg-fg-2" />
      <span>{post.category}</span>
    </p>
  );
}

export function BlogBento({ posts }: { posts: Post[] }) {
  const [lead, ...rest] = posts;
  if (!lead) return null;
  return (
    <div className="grid gap-5 lg:grid-cols-5 lg:grid-rows-2">
      {/* large feature */}
      <article className="group relative flex flex-col rounded-lg border border-line-2 bg-card p-5 transition-colors hover:border-fg-3 lg:col-span-3 lg:row-span-2">
        <div className="aspect-[16/10] overflow-hidden rounded-lg bg-card-2 lg:aspect-auto lg:min-h-0 lg:flex-1">
          <Cover post={lead} />
        </div>
        <div className="mt-6 flex flex-col">
          <Meta post={lead} />
          <h3 className="mt-4 text-2xl font-semibold leading-snug text-fg md:text-[1.75rem]">
            <Link href={`/blog/${lead.slug}`} className="after:absolute after:inset-0">
              {lead.title}
            </Link>
          </h3>
          <div className="mt-3 flex items-end justify-between gap-6">
            <p className="line-clamp-2 text-[15px] leading-relaxed text-fg-2">{lead.description}</p>
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-dashed border-fg-3 text-fg-2 transition group-hover:border-brand group-hover:text-brand"
            >
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </article>

      {/* two smaller, stacked */}
      {rest.slice(0, 2).map((p) => (
        <article
          key={p.slug}
          className="group relative grid grid-cols-1 gap-5 rounded-lg border border-line-2 bg-card p-5 transition-colors hover:border-fg-3 sm:grid-cols-[minmax(0,11rem)_1fr] lg:col-span-2 lg:grid-cols-1 xl:grid-cols-[minmax(0,10rem)_1fr]"
        >
          <div className="aspect-[16/10] overflow-hidden rounded-lg bg-card-2 sm:aspect-square lg:aspect-[16/9] xl:aspect-square">
            <Cover post={p} className="object-left" />
          </div>
          <div className="flex min-w-0 flex-col">
            <Meta post={p} />
            <h3 className="mt-3 text-lg font-semibold leading-snug text-fg">
              <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                {p.title}
              </Link>
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-2">{p.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
