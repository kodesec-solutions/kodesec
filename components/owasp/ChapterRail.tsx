"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type Chapter = { id: string; label: string; hint: string };

/**
 * Fixed chapter list on wide screens: numbered, always labelled, with a one-line hint for the current chapter and
 * overall progress, so a busy owner can see where they are and skip ahead.
 */
export function ChapterRail({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el);
    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let i = 0;
      els.forEach((el, n) => {
        if (el.getBoundingClientRect().top <= line) i = n;
      });
      setActive(i);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [chapters]);

  const pct = Math.round(((active + 1) / chapters.length) * 100);

  return (
    <nav aria-label="Lesson chapters" className="fixed left-4 top-1/2 z-30 hidden w-44 -translate-y-1/2 2xl:block">
      <div className="mb-4">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-fg-3">In this lesson · {pct}%</p>
        <span className="mt-2 block h-0.5 overflow-hidden rounded-full bg-line-2">
          <span className="block h-full rounded-full bg-brand transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </span>
      </div>
      <ol className="space-y-0.5">
        {chapters.map((c, i) => {
          const on = i === active;
          const done = i < active;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={on ? "location" : undefined}
                className={cn("group block rounded-lg px-2 py-1.5 transition-colors", on ? "bg-brand/[0.08]" : "hover:bg-tint/[0.03]")}
              >
                <span className="flex items-baseline gap-2.5">
                  <span className={cn("font-mono text-[0.62rem] tabular-nums", on ? "text-brand" : done ? "text-fg-2" : "text-fg-3")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={cn("text-[0.8rem] leading-tight", on ? "font-medium text-fg" : done ? "text-fg-2" : "text-fg-3 group-hover:text-fg-2")}>
                    {c.label}
                  </span>
                </span>
                {on && <span className="kd-sub mt-1 block pl-[1.6rem] text-[0.7rem] leading-snug text-fg-2">{c.hint}</span>}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
