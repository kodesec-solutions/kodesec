import { BlogIndex } from "@/components/blog/BlogIndex";
import JsonLd from "@/components/JsonLd";
import { getPosts } from "@/lib/content/loaders";
import { breadcrumbLd, buildMetadata, ORG_ID, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Security Research & Engineering Blog",
  description: "Breach analyses, vulnerability deep-dives and practical engineering notes from the Kodesec team.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getPosts();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Blog", path: "/blog" }]),
          { "@context": "https://schema.org", "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, name: "Kodesec Blog", url: `${SITE_URL}/blog`, publisher: { "@id": ORG_ID } },
        ]}
      />
      <BlogIndex posts={posts} title="Blog" />
    </>
  );
}
