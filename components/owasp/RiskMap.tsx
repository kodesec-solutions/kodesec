"use client";

import { useState } from "react";
import type { OwaspTopic } from "@/lib/content/schemas";
import { plain } from "@/lib/academy/template";
import { Biz, useBusiness } from "./BusinessContext";
import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";

type Zone = OwaspTopic["map"]["zones"][number];

/** "Where it hides": pick a part of the website, see what's there, what goes wrong and what to ask. */
export function RiskMap({ zones }: { zones: Zone[] }) {
  const [index, setIndex] = useState(0);
  const { current } = useBusiness();
  const zone = zones[index];

  const rows: [string, React.ReactNode][] = [
    ["What's here", <Biz key="h" text={zone.here} />],
    ["What goes wrong", <Biz key="w" text={zone.wrong} />],
    [
      "Ask your team",
      <span key="a" className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <Biz text={zone.ask} className="text-fg" />
        <CopyButton text={() => plain(zone.ask, current.vars)} />
      </span>,
    ],
    ["Developers call it", zone.term],
  ];

  return (
    <div className="mt-10">
      <div className={cn("grid grid-cols-2 gap-2.5", zones.length > 4 ? "md:grid-cols-3" : "md:grid-cols-4")}>
        {zones.map((z, i) => (
          <button
            key={i}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className="group flex min-h-20 flex-col justify-between gap-3 rounded-2xl border border-line bg-card/60 p-4 text-left text-[0.95rem] font-medium text-fg transition-colors hover:border-line-2 aria-pressed:border-brand/60 aria-pressed:bg-brand/[0.07]"
          >
            <span className="font-mono text-[0.65rem] tracking-[0.14em] text-fg-3 group-aria-pressed:text-brand">{String(i + 1).padStart(2, "0")}</span>
            <Biz text={z.label} />
          </button>
        ))}
      </div>

      <div className="card mt-3 overflow-hidden">
        <div className="flex items-center gap-3 border-b hairline px-5 py-3 font-mono text-[0.8rem] text-fg-3">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
            <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
            <i className="h-2.5 w-2.5 rounded-full bg-line-2" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-full bg-bg/70 px-3 py-1">
            <Biz text={zone.url} className="text-brand" />
          </span>
        </div>
        <dl className="divide-y divide-line px-5" aria-live="polite">
          {rows.map(([term, value]) => (
            <div key={term} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="pt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">{term}</dt>
              <dd className="text-[0.97rem] leading-relaxed text-fg-2">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
