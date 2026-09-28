import { describe, expect, it } from "vitest";
import { blogSchema, lessonSchema } from "@/lib/content/schemas";
import { getAcademy, getLesson, getPosts, getServices, getSite } from "@/lib/content/loaders";

describe("content", () => {
  it("loads every content file without schema errors", () => {
    expect(getSite().name).toBe("Kodesec");
    expect(getServices().length).toBeGreaterThan(0);
    expect(getPosts().length).toBeGreaterThan(0);
    expect(getAcademy().length).toBeGreaterThan(0);
  });

  it("keeps the legacy blog URLs", () => {
    const slugs = getPosts().map((p) => p.slug);
    for (const s of ["vercel-oauth-breach", "shwapno-data-breach-2026", "github-rce-cve-2026-3854-git-push-exploit"]) {
      expect(slugs).toContain(s);
    }
  });

  it("links lessons with prev/next inside a track", () => {
    const l = getLesson("web-security", "access-control", "insecure-direct-object-references");
    expect(l?.prev?.slug).toBe("what-is-access-control");
    expect(l?.next?.slug).toBe("preventing-access-control-vulnerabilities");
  });

  it("rejects bad frontmatter", () => {
    expect(blogSchema.safeParse({ title: "x", slug: "Bad Slug" }).success).toBe(false);
    expect(
      lessonSchema.safeParse({ title: "Lesson", slug: "ok", track: "t", module: "m", order: 1, level: "wizard", duration: "1", updated: "2026-01-01", authors: ["a"] }).success,
    ).toBe(false);
  });
});
