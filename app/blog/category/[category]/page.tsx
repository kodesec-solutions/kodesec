import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import JsonLd from "@/components/JsonLd";
import { getCategories, getPosts, slugify } from "@/lib/content/loaders";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const c = getCategories().find((x) => x.slug === category);
  if (!c) return {};
  return buildMetadata({
    title: `${c.name} Articles`,
    description: `${c.name} articles from the Kodesec team: ${c.count} post${c.count === 1 ? "" : "s"} of practical, research-backed security writing.`,
    path: `/blog/category/${c.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategories().find((x) => x.slug === category);
  if (!c) notFound();
  const posts = getPosts().filter((p) => slugify(p.category) === category);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Blog", path: "/blog" }, { name: c.name, path: `/blog/category/${c.slug}` }])} />
      <BlogIndex posts={posts} activeCategory={c.slug} title={c.name} />
    </>
  );
}
