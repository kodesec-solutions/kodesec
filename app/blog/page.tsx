import { getAllPosts } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { ArrowUpRight, Clock } from "lucide-react";
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
      "mainEntityOfPage": `https://kodesec.com/blog/${post.slug}`
    }))
  };

  const formattedDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const otherPosts = posts.filter((p) => p.slug !== featuredPost?.slug);

  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={blogSchema} />

      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] blur-[150px] pointer-events-none rounded-full" />

      {/* HERO SECTION */}
      <Section className="pt-12 pb-16 relative z-10">
        <Container>
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest whitespace-nowrap">
                Security Research & Engineering Notes
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-tight">
              Security Research & <br className="hidden sm:inline" />
              <span className="text-gradient-emerald">Technical Engineering</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto">
              Read KodeSec case studies and technical breakdowns covering real-world vulnerability disclosures, secure application design patterns, and systems decisions.
            </p>

            {/* Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-2xl mx-auto">
              <div className="p-4 rounded-2xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl text-left">
                <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary">Articles</p>
                <p className="mt-1 text-2xl font-heading font-bold text-white">{posts.length}+ Published</p>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl text-left">
                <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary">Focus</p>
                <p className="mt-1 text-2xl font-heading font-bold text-white">Zero-Trust</p>
              </div>
              <div className="p-4 rounded-2xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl text-left">
                <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary">Format</p>
                <p className="mt-1 text-2xl font-heading font-bold text-white">Deep Dives</p>
              </div>
            </div>
          </div>

          {/* FEATURED POST SHOWCASE */}
          {featuredPost && (
            <div className="mt-16 grid gap-8 lg:grid-cols-12 items-stretch">
              
              {/* Featured Main Card (Split Layout - Image Top/Left, Text Cleanly Separated) */}
              <div className="lg:col-span-8 flex">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group relative flex flex-col w-full rounded-3xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(54,226,123,0.12)] text-left"
                >
                  {/* Image Container with Dark Gradient Overlay */}
                  {featuredPost.image && (
                    <div className="relative h-64 md:h-80 w-full overflow-hidden bg-black/40 border-b border-white/10">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] via-transparent to-black/30" />
                      
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-primary text-black">
                          FEATURED
                        </span>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 border border-white/10 text-gray-300 backdrop-blur-md">
                          {formattedDate(featuredPost.date)}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Text Content Area (No text collision over banner image!) */}
                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight leading-snug group-hover:text-primary transition-colors">
                        {featuredPost.title}
                      </h2>
                      <p className="mt-4 text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
                        {featuredPost.excerpt || "Read the full research article for complete vulnerability analysis and code patches."}
                      </p>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-primary flex items-center gap-2">
                        Read full breakdown
                        <ArrowUpRight size={16} className="shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                      {featuredPost.readingTime && (
                        <span className="text-[10px] font-mono text-gray-500 flex items-center gap-1">
                          <Clock size={12} /> {featuredPost.readingTime}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>

              {/* Side Card: Engineering Context */}
              <div className="lg:col-span-4 flex">
                <Card className="w-full bg-[#0D121F]/80 border-white/10 p-6 md:p-8 text-left flex flex-col justify-between" glow="hover:border-primary/30">
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                      Editorial Focus
                    </p>
                    <h3 className="text-lg font-heading font-bold text-white mt-2 mb-6">
                      Our Research Approach
                    </h3>

                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                        <p className="text-xs font-heading font-bold text-white">Clean Structure</p>
                        <p className="mt-1.5 text-xs text-gray-400 font-sans leading-relaxed">
                          Each post is structured for quick scanning first, followed by technical deep dives for engineers.
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                        <p className="text-xs font-heading font-bold text-white">Practical Context</p>
                        <p className="mt-1.5 text-xs text-gray-400 font-sans leading-relaxed">
                          Real threat timelines, root cause analysis, and actionable remediation pull requests.
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
                        <p className="text-xs font-heading font-bold text-white">Offensive Security Lens</p>
                        <p className="mt-1.5 text-xs text-gray-400 font-sans leading-relaxed">
                          Focusing on adversary attack paths and zero-trust controls that eliminate breach risk.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          )}

          {/* ALL ARTICLES GRID */}
          <section className="mt-20 text-left">
            <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/10">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                  All Articles
                </span>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mt-1">
                  Recent Publications
                </h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(featuredPost ? otherPosts : posts).map((post) => (
                <article
                  key={post.slug}
                  className="group flex flex-col h-full overflow-hidden rounded-3xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(54,226,123,0.12)] hover:-translate-y-1 text-left"
                >
                  {post.image && (
                    <div className="relative h-48 w-full overflow-hidden bg-black/40 border-b border-white/10">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0D121F] to-transparent opacity-60" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-primary uppercase">
                        ARTICLE
                      </span>
                      <span className="text-[11px]">{formattedDate(post.date)}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`} className="block">
                      <h3 className="text-lg font-heading font-bold leading-snug text-white group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                    </Link>

                    <p className="mt-3 flex-1 text-xs text-gray-400 font-sans leading-relaxed line-clamp-3">
                      {post.excerpt || "Read the full article for technical analysis and code patches."}
                    </p>

                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-bold text-primary">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 hover:text-[#FFFFFF] transition-colors"
                      >
                        <span>Read article</span>
                        <ArrowUpRight size={14} className="shrink-0" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

        </Container>
      </Section>
    </main>
  );
}
