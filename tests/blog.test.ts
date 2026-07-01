import { describe, it, expect } from "vitest";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

describe("MDX Blog Parsing and Service Layer", () => {
  it("should parse and return all blog posts summaries", () => {
    const posts = getAllPosts();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);

    // Verify first summary structure (should not include content to keep lists lightweight)
    const post = posts[0];
    expect(post).toHaveProperty("slug");
    expect(post).toHaveProperty("title");
    expect(post).toHaveProperty("date");
    expect(post).toHaveProperty("author");
    expect(post).toHaveProperty("excerpt");
    expect(post).toHaveProperty("readingTime");
  });

  it("should fetch a single post with full content by slug", async () => {
    const posts = getAllPosts();
    const targetSlug = posts[0].slug;

    const post = await getPostBySlug(targetSlug);
    expect(post).toBeDefined();
    expect(post).not.toBeNull();
    expect(post?.slug).toBe(targetSlug);
    expect(post?.title).toBe(posts[0].title);
    expect(post).toHaveProperty("content");
  });

  it("should return null for a non-existent slug", async () => {
    const post = await getPostBySlug("non-existent-blog-slug-kodesec");
    expect(post).toBeNull();
  });
});
