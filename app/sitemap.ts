import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { solutions } from "@/content/solutions";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kodesec.com";

  // Static routes
  const staticLastMod = new Date("2026-09-20T00:00:00.000Z");
  const staticRoutes = [
    "",
    "/about",
    "/why-us",
    "/services",
    "/projects",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: staticLastMod,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic solutions routes
  const serviceRoutes = solutions.map((sol) => ({
    url: `${baseUrl}/services/${sol.slug}`,
    lastModified: staticLastMod,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog routes
  const blogPosts = getAllPosts();
  const blogRoutes = blogPosts.map((post) => {
    let postDate = staticLastMod;
    try {
      const parsed = new Date(post.date);
      if (!Number.isNaN(parsed.getTime())) {
        postDate = parsed;
      }
    } catch {
      // fallback to staticLastMod
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes];
}
