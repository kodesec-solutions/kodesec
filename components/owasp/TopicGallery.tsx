"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { THEMES, type Theme } from "./sims/kit";
import { KnowledgeClip } from "./KnowledgeClip";
import type { OwaspTopic } from "@/lib/content/schemas";
import { cn } from "@/lib/utils";

export type GalleryTopic = {
  slug: string;
  href: string;
  code: string;
  title: string;
  category: string;
  readMinutes: number;
  theme: Theme;
  preview: { size: "tall" | "square" | "wide"; video?: string; poster?: string };
  owasp: OwaspTopic["owasp"];
};

/** Lessons shown as wide feature cards (two columns) in the full grid. */
const WIDE = ["A01", "A05"];

/** Masonry wall of lessons: each card is the lesson's live motion piece, with its title underneath. */
export function TopicGallery({ topics, categories }: { topics: GalleryTopic[]; categories: Record<string, string> }) {
  const [filter, setFilter] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const shown = filter ? topics.filter((t) => t.category === filter) : topics;
  const count = (c: string) => topics.filter((t) => t.category === c).length;

  return (
    <div data-paused={paused || undefined}>
      <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-2 border-b hairline pb-5">
        <span className="mr-2 text-xs text-fg-3">Filter:</span>
        <button type="button" className="pill-toggle" aria-pressed={filter === null} onClick={() => setFilter(null)}>
          All <span className="pill-count">{topics.length}</span>
        </button>
        {Object.entries(categories).map(([key, label]) => (
          <button key={key} type="button" className="pill-toggle" aria-pressed={filter === key} onClick={() => setFilter(filter === key ? null : key)}>
            {label} <span className="pill-count">{count(key)}</span>
          </button>
        ))}
        <button type="button" onClick={() => setPaused((p) => !p)} className="ml-auto inline-flex items-center gap-1.5 text-xs text-fg-3 hover:text-fg">
          {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          {paused ? "Play previews" : "Pause previews"}
        </button>
      </div>

      {/* Bento grid: two featured cards span two columns; with all ten showing, the tiles fill the grid with no gaps. */}
      <ul className="grid grid-flow-row-dense grid-cols-1 gap-4 sm:auto-rows-[190px] sm:grid-cols-2 xl:grid-cols-4">
        {shown.map((t, n) => (
          <li key={t.href} className={cn("sm:row-span-2", !filter && WIDE.includes(t.code) && "sm:col-span-2")}>
            <TopicCard topic={t} paused={paused} stagger={n} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function TopicCard({ topic, paused, stagger }: { topic: GalleryTopic; paused: boolean; stagger: number }) {
  return (
    <Link href={topic.href} className="group flex h-full flex-col focus-visible:outline-offset-4" style={{ "--acc": THEMES[topic.theme] } as React.CSSProperties}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg sm:aspect-auto sm:flex-1">
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <KnowledgeClip slug={topic.slug} code={topic.code} title={topic.title} owasp={topic.owasp} variant="card" paused={paused} stagger={stagger} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 pt-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="acc-bg grid h-6 w-6 flex-none place-items-center rounded-full font-mono text-[0.55rem] font-semibold text-black">
            {topic.code.slice(1)}
          </span>
          <span className="truncate text-[0.95rem] font-semibold tracking-tight text-fg">{topic.title}</span>
        </span>
        <span className="inline-flex flex-none items-center gap-1 rounded-md border border-line-2 px-2 py-0.5 text-[0.7rem] text-fg-3 transition-colors group-hover:border-fg-3 group-hover:text-fg">
          {topic.readMinutes} min <ArrowUpRight className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
