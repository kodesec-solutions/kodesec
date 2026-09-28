import Listing, { type ListingItem } from "@/components/listing/Listing";
import { getCategories, type Post } from "@/lib/content/loaders";
import { formatDate } from "@/lib/format";

/** Aikido-style blog index (used by /blog and /blog/category/[category]). */
export function BlogIndex({ posts, activeCategory, title }: { posts: Post[]; activeCategory?: string; title: string }) {
  const toItem = (p: Post): ListingItem => ({
    href: `/blog/${p.slug}`,
    title: p.title,
    description: p.description,
    date: formatDate(p.date),
    meta: p.category,
    cover: p.cover,
    coverAlt: p.coverAlt,
    coverLabel: `kodesec/${p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    keywords: p.tags.join(" "),
  });
  const featured = activeCategory ? null : (posts.find((p) => p.featured) ?? posts[0]);
  const rest = posts.filter((p) => p.slug !== featured?.slug);
  const filters = [
    { label: "All posts", href: "/blog", active: !activeCategory },
    ...getCategories().map((c) => ({ label: c.name, href: `/blog/category/${c.slug}`, active: c.slug === activeCategory })),
  ];

  return (
    <Listing
      heading={activeCategory ? `${title}.` : "Welcome to our blog."}
      featuredLabel={activeCategory ? title : "Featured"}
      featured={featured ? toItem(featured) : null}
      items={rest.map(toItem)}
      filters={filters}
      rss="/blog/rss.xml"
      searchPlaceholder="Search articles"
    />
  );
}
