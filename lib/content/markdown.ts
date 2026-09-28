import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import { remarkAlert } from "remark-github-blockquote-alert";
import { visit } from "unist-util-visit";
import type { Root as MdRoot, Paragraph } from "mdast";
import type { Root as HRoot, Element, ElementContent } from "hast";

/**
 * One Markdown pipeline for the whole site (blog, academy, services, legal) and the admin preview.
 * Plain Markdown only: raw HTML in content is dropped (remark-rehype without allowDangerousHtml),
 * so uploaded files can never inject scripts.
 */

export type TocItem = { id: string; text: string; depth: 2 | 3 };
export type RenderedMarkdown = { html: string; toc: TocItem[] };

// ---------- Video embeds: a YouTube or Loom URL alone on a line becomes a player ----------

export function parseVideoUrl(raw: string): { provider: "youtube" | "loom"; id: string } | null {
  let url: URL;
  try {
    url = new URL(raw.trim());
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\.|^m\./, "");
  const idOk = (id: string | null | undefined) => (id && /^[A-Za-z0-9_-]{6,64}$/.test(id) ? id : null);
  if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const id = url.pathname.startsWith("/watch")
      ? url.searchParams.get("v")
      : url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/)?.[1];
    return idOk(id) ? { provider: "youtube", id: id! } : null;
  }
  if (host === "youtu.be") {
    const id = url.pathname.slice(1);
    return idOk(id) ? { provider: "youtube", id } : null;
  }
  if (host === "loom.com") {
    const id = url.pathname.match(/^\/(?:share|embed)\/([^/?#]+)/)?.[1];
    return idOk(id) ? { provider: "loom", id: id! } : null;
  }
  return null;
}

function videoHast(provider: "youtube" | "loom", id: string): ElementContent {
  if (provider === "youtube") {
    // Lightweight facade: a thumbnail link that a tiny client script swaps for the iframe on click.
    return {
      type: "element",
      tagName: "div",
      properties: { className: ["kd-video"], dataProvider: "youtube", dataId: id },
      children: [
        {
          type: "element",
          tagName: "a",
          properties: {
            href: `https://www.youtube.com/watch?v=${id}`,
            target: "_blank",
            rel: ["noopener", "noreferrer"],
            ariaLabel: "Play video",
            className: ["kd-video-link"],
          },
          children: [
            {
              type: "element",
              tagName: "img",
              properties: { src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, alt: "", loading: "lazy", decoding: "async" },
              children: [],
            },
            { type: "element", tagName: "span", properties: { className: ["kd-video-play"], ariaHidden: "true" }, children: [] },
          ],
        },
      ],
    };
  }
  return {
    type: "element",
    tagName: "div",
    properties: { className: ["kd-video"], dataProvider: "loom", dataId: id },
    children: [
      {
        type: "element",
        tagName: "iframe",
        properties: {
          src: `https://www.loom.com/embed/${id}`,
          title: "Loom video",
          loading: "lazy",
          allow: "fullscreen",
          allowFullScreen: true,
          referrerPolicy: "strict-origin-when-cross-origin",
        },
        children: [],
      },
    ],
  };
}

function remarkEmbeds() {
  return (tree: MdRoot) => {
    visit(tree, "paragraph", (node: Paragraph) => {
      if (node.children.length !== 1) return;
      const only = node.children[0];
      let url: string | null = null;
      if (only.type === "link" && only.children.length === 1 && only.children[0].type === "text") {
        url = only.url;
      } else if (only.type === "text" && /^https?:\/\/\S+$/.test(only.value.trim())) {
        url = only.value.trim();
      }
      if (!url) return;
      const video = parseVideoUrl(url);
      if (!video) return;
      const data = (node.data ??= {});
      const hast = videoHast(video.provider, video.id) as Element;
      data.hName = hast.tagName;
      data.hProperties = hast.properties;
      data.hChildren = hast.children;
    });
  };
}

// ---------- Link / image hardening ----------

const SAFE_PROTOCOL = /^(https?:|mailto:|tel:|\/|#|\.)/i;

function rehypeHarden() {
  return (tree: HRoot) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName === "a") {
        const href = String(node.properties?.href ?? "");
        if (!SAFE_PROTOCOL.test(href)) {
          delete node.properties.href;
          return;
        }
        if (/^https?:\/\//i.test(href) && !href.startsWith("https://kodesec.com")) {
          node.properties.target = "_blank";
          node.properties.rel = ["noopener", "noreferrer"];
        }
      }
      if (node.tagName === "img") {
        const src = String(node.properties?.src ?? "");
        if (!/^(https:\/\/|\/)/.test(src)) delete node.properties.src;
        node.properties.loading ??= "lazy";
        node.properties.decoding = "async";
      }
    });
    // wrap tables so they scroll horizontally on small screens
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName !== "table" || !parent || index === undefined) return;
      parent.children[index] = {
        type: "element",
        tagName: "div",
        properties: { className: ["kd-table"] },
        children: [node],
      };
      return "skip";
    });
  };
}

function rehypeToc(toc: TocItem[]) {
  return () => (tree: HRoot) => {
    visit(tree, "element", (node: Element) => {
      if ((node.tagName === "h2" || node.tagName === "h3") && node.properties?.id) {
        toc.push({ id: String(node.properties.id), text: textOf(node), depth: node.tagName === "h2" ? 2 : 3 });
      }
    });
  };
}

function textOf(node: ElementContent | Element): string {
  if (node.type === "text") return node.value;
  if (node.type === "element") {
    // skip the autolink "#" anchor
    if (node.properties?.className && String(node.properties.className).includes("kd-anchor")) return "";
    return node.children.map(textOf).join("");
  }
  return "";
}

export async function renderMarkdown(markdown: string): Promise<RenderedMarkdown> {
  const toc: TocItem[] = [];
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkAlert)
    .use(remarkEmbeds)
    .use(remarkRehype)
    .use(rehypeHarden)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      test: ["h2", "h3"],
      properties: { className: ["kd-anchor"], ariaHidden: "true", tabIndex: -1 },
      content: { type: "text", value: "#" },
    })
    .use(rehypeToc(toc))
    .use(rehypePrettyCode, { theme: "github-dark-default", keepBackground: false, defaultLang: { block: "plaintext" } })
    .use(rehypeStringify)
    .process(markdown);
  return { html: String(file), toc };
}

/** Words → "N min read" */
export function readingTime(markdown: string): string {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
