import Link from "next/link";
import type { Post } from "@/lib/content/loaders";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function PostCard({ post, className, priority }: { post: Post; className?: string; priority?: boolean }) {
  return (
    <article className={cn("card card-hover group flex flex-col overflow-hidden", className)}>
      {post.cover && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.cover}
            alt={post.coverAlt ?? ""}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.12em]">
          <span className="text-brand">{post.category}</span>
          <span className="text-fg-3">{formatDate(post.date)}</span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-fg">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg-2">{post.description}</p>
      </div>
    </article>
  );
}
