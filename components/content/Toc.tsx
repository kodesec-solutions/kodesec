"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/content/markdown";
import { cn } from "@/lib/utils";

/** "On this page" with scroll-spy (Neon-style). */
export function Toc({ items, className }: { items: TocItem[]; className?: string }) {
  const [active, setActive] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  if (items.length < 2) return null;
  return (
    <nav aria-label="On this page" className={className}>
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-3">On this page</p>
      <ul className="mt-4 space-y-1 border-l border-line">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              className={cn(
                "-ml-px block border-l py-1 text-[0.82rem] leading-snug transition-colors",
                i.depth === 3 ? "pl-6" : "pl-3",
                active === i.id ? "border-brand text-fg" : "border-transparent text-fg-3 hover:text-fg-2",
              )}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
