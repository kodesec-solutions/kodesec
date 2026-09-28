import { cn } from "@/lib/utils";

/** Renders HTML produced by lib/content/markdown.ts (already sanitised: no raw HTML from content). */
export function Prose({ html, className }: { html: string; className?: string }) {
  return <div className={cn("kd-prose", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
