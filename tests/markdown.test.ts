import { describe, expect, it } from "vitest";
import { parseVideoUrl, readingTime, renderMarkdown } from "@/lib/content/markdown";

describe("parseVideoUrl", () => {
  it.each([
    ["https://www.youtube.com/watch?v=dQw4w9WgXcQ", { provider: "youtube", id: "dQw4w9WgXcQ" }],
    ["https://youtu.be/dQw4w9WgXcQ", { provider: "youtube", id: "dQw4w9WgXcQ" }],
    ["https://www.youtube.com/shorts/dQw4w9WgXcQ", { provider: "youtube", id: "dQw4w9WgXcQ" }],
    ["https://www.loom.com/share/0123456789abcdef", { provider: "loom", id: "0123456789abcdef" }],
  ])("recognises %s", (url, expected) => expect(parseVideoUrl(url)).toEqual(expected));

  it.each(["https://evil.com/watch?v=abc", "not a url", "https://youtube.com/watch?v=<script>"])("rejects %s", (url) =>
    expect(parseVideoUrl(url)).toBeNull(),
  );
});

describe("renderMarkdown", () => {
  it("turns a bare YouTube URL into a privacy-friendly embed", async () => {
    const { html } = await renderMarkdown("Intro\n\nhttps://youtu.be/dQw4w9WgXcQ\n");
    expect(html).toContain('class="kd-video"');
    expect(html).toContain("i.ytimg.com/vi/dQw4w9WgXcQ");
  });

  it("leaves a YouTube link inside a sentence as a normal link", async () => {
    const { html } = await renderMarkdown("Watch [this](https://youtu.be/dQw4w9WgXcQ) now.");
    expect(html).not.toContain("kd-video");
  });

  it("drops raw HTML and dangerous links", async () => {
    const { html } = await renderMarkdown('<script>alert(1)</script>\n\n<img src=x onerror=alert(1)>\n\n[x](javascript:alert(1))');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("javascript:");
  });

  it("builds a table of contents from h2/h3", async () => {
    const { toc } = await renderMarkdown("## First\n\ntext\n\n### Sub part\n\n## Second");
    expect(toc).toEqual([
      { id: "first", text: "First", depth: 2 },
      { id: "sub-part", text: "Sub part", depth: 3 },
      { id: "second", text: "Second", depth: 2 },
    ]);
  });

  it("renders GitHub alerts and highlights code", async () => {
    const { html } = await renderMarkdown("> [!WARNING]\n> careful\n\n```js\nconst a = 1\n```");
    expect(html).toContain("markdown-alert-warning");
    expect(html).toContain('data-language="js"');
  });

  it("opens external links in a new tab safely", async () => {
    const { html } = await renderMarkdown("[ext](https://example.com)");
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("estimates reading time", () => {
    expect(readingTime("word ".repeat(660))).toBe("3 min read");
  });
});
