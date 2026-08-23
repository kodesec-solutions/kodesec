import { getAllPosts, getPostBySlug } from "@/lib/blog";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Calendar, User, ArrowLeft } from "lucide-react";

import AuthorProfile from "@/components/blog/AuthorProfile";
import SecurityWarning from "@/components/blog/SecurityWarning";
import EmbeddedCTA from "@/components/blog/EmbeddedCTA";
import TableOfContentsDropdown from "@/components/blog/TableOfContentsDropdown";

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | KodeSec",
    };
  }

  return {
    title: `${post.title} | KodeSec Research`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [post.image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

const mdxComponents = {
  AuthorProfile,
  SecurityWarning,
  EmbeddedCTA,
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function extractTableOfContents(content: string) {
  const headingRegex = /^(##|###)\s+(.*)$/gm;
  const matches: Array<{ level: number; label: string; id: string }> = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1] === "##" ? 2 : 3;
    const label = match[2].trim();
    const id = label
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    matches.push({ level, label, id });
  }

  return matches;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const tocItems = extractTableOfContents(post.content);

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
    <div className="relative overflow-hidden px-4 py-8 sm:px-6 lg:px-20 lg:py-16 text-white">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={articleSchema} />
      
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] blur-[150px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Navigation / Breadcrumb Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono font-medium text-gray-300 hover:text-white hover:border-primary/40 transition-all group shrink-0"
          >
            <ArrowLeft size={14} className="text-primary group-hover:-translate-x-1 transition-transform shrink-0" />
            <span>Back to all articles</span>
          </Link>

          <nav className="hidden sm:flex items-center gap-2 text-xs font-mono text-gray-400">
            <Link href="/blog" className="transition-colors hover:text-primary">
              Blog
            </Link>
            <span>/</span>
            <span className="min-w-0 truncate text-white max-w-[200px]">{post.slug}</span>
          </nav>
        </div>

        {/* MAIN ARTICLE CONTAINER (Full Width, No Sidebar Constraints) */}
        <article className="overflow-hidden rounded-3xl backdrop-blur-xl">
          {/* Header */}
          <header className="px-6 py-10 md:px-12 md:py-14 text-left">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-primary">
                <span className="px-3 py-1 rounded-full border border-primary/20 bg-primary/10">
                  {post.readingTime || "5 MIN READ"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight leading-tight">
                {post.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-400 font-sans leading-relaxed">
                {post.excerpt}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-gray-300">
                  <Calendar size={14} className="text-primary shrink-0" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-gray-300">
                  <User size={14} className="text-primary shrink-0" />
                  <span>{post.author}</span>
                </div>
              </div>
            </div>
          </header>

          {/* Body Content Area with Dropdown Table of Contents */}
          <main className="p-6 md:p-10 lg:p-12 text-left">
            
            {/* Interactive Dropdown Table of Contents */}
            <TableOfContentsDropdown items={tocItems} />

            {/* MDX Remote Content (Full Width) */}
            <div className="article-body prose prose-invert prose-base max-w-none sm:prose-lg prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white prose-p:text-gray-300 prose-p:font-sans prose-li:text-gray-300 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:rounded prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#070B12] prose-blockquote:border-l-primary prose-blockquote:text-gray-300 prose-img:rounded-2xl prose-img:border prose-img:border-white/10 prose-hr:border-white/10">
              <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </div>

            {/* Author Profile */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <AuthorProfile authorName={post.author} />
            </div>

            {/* Bottom Back Button */}
            <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
              <Link
                href="/blog"
                className="btn-secondary text-xs font-mono py-2.5 px-5"
              >
                <ArrowLeft size={14} className="text-primary shrink-0" />
                <span>Back to all articles</span>
              </Link>
            </div>
          </main>
        </article>
      </div>
    </div>
  );
}
