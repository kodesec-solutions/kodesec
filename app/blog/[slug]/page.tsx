import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { AuroraBars } from "@/components/effects/AuroraBars";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Prose } from "@/components/content/Prose";
import { Toc } from "@/components/content/Toc";
import { PostCard } from "@/components/blog/PostCard";
import { AuthorBox } from "@/components/blog/AuthorBox";
import JsonLd from "@/components/JsonLd";
import { getMember, getPost, getPosts, slugify } from "@/lib/content/loaders";
import { readingTime, renderMarkdown } from "@/lib/content/markdown";
import { formatDate } from "@/lib/format";
import { articleLd, breadcrumbLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return buildMetadata({
    title: p.title,
    description: p.description,
    path: `/blog/${p.slug}`,
    image: p.cover,
    type: "article",
    publishedTime: p.date,
    modifiedTime: p.updated ?? p.date,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const { html, toc } = await renderMarkdown(post.body);
  const authors = post.authors.map(getMember).filter((m) => !!m);
  const related = getPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .concat(getPosts().filter((p) => p.slug !== post.slug && p.category !== post.category))
    .slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Blog", path: "/blog" },
            { name: post.category, path: `/blog/category/${slugify(post.category)}` },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleLd(post),
        ]}
      />
      <header className="relative isolate overflow-hidden pb-12 pt-32 md:pt-40">
        <AuroraBars intensity="soft" />
        <div className="container-kd relative max-w-4xl">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.category, path: `/blog/category/${slugify(post.category)}` },
            ]}
          />
          <h1 className="mt-8 text-3xl font-semibold leading-[1.12] text-fg sm:text-4xl md:text-5xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-fg-2">{post.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-fg-2">
            {authors.map((a) => (
              <span key={a.slug} className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt="" className="h-8 w-8 rounded-full border border-line-2 bg-surface object-cover p-0.5" />
                <span className="text-fg">{a.name}</span>
              </span>
            ))}
            <time dateTime={post.date} className="font-mono text-xs uppercase tracking-[0.1em] text-fg-3">
              {formatDate(post.date)}
            </time>
            <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] text-fg-3">
              <Clock className="h-3.5 w-3.5" /> {readingTime(post.body)}
            </span>
          </div>
        </div>
      </header>

      <div className="container-kd grid gap-12 pb-20 lg:grid-cols-12">
        <article className="min-w-0 lg:col-span-8 lg:col-start-1">
          <Prose html={html} />
          {post.tags.length > 0 && (
            <ul className="mt-12 flex flex-wrap gap-2 border-t border-line pt-8">
              {post.tags.map((t) => (
                <li key={t} className="chip">
                  #{t}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10 space-y-4">
            {authors.map((a) => (
              <AuthorBox key={a.slug} member={a} />
            ))}
          </div>
          <Link href="/blog" className="btn btn-ghost mt-10">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
        </article>

        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-28 space-y-6">
            <Toc items={toc} className="max-h-[55vh] overflow-y-auto pr-2" />
            <div className="card overflow-hidden p-6">
              <p className="eyebrow">Kodesec</p>
              <p className="mt-4 font-semibold text-fg">Worried about the same risk?</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">
                We test for it every week. Book a free scoping call and get a fixed quote.
              </p>
              <Link href="/book" className="btn btn-brand btn-sm mt-5">
                Book a call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-line py-20">
          <div className="container-kd">
            <h2 className="text-2xl font-semibold text-fg">Keep reading</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
