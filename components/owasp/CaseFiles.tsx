"use client";

import { useState } from "react";
import { MonitorPlay } from "lucide-react";
import type { OwaspTopic } from "@/lib/content/schemas";
import { Biz } from "./BusinessContext";
import { THEMES, type Theme } from "./sims/kit";
import { cn } from "@/lib/utils";

type Case = OwaspTopic["cases"]["items"][number];

/** First sentence only: the case cards stay short. */
const first = (t: string) => t.split(/(?<=[.!?])\s+/)[0];

/**
 * Real incidents as tabs, kept short: the headline, then one line each for what it cost and the lesson.
 * The full story and sources sit behind "Read the full story". A case with a `youtube` id offers the real clip.
 */
export function CaseFiles({ cases, slug, theme }: { cases: Case[]; slug: string; theme: Theme }) {
  const [index, setIndex] = useState(0);
  const [clip, setClip] = useState(false);
  const c = cases[index];

  return (
    <div className="mt-8">
      {cases.length > 1 && (
        <div role="tablist" aria-label="Cases" className="mb-3 flex flex-wrap gap-2">
          {cases.map((x, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              className="pill-toggle"
              onClick={() => {
                setIndex(i);
                setClip(false);
              }}
            >
              {x.tab}
            </button>
          ))}
        </div>
      )}

      <article role={cases.length > 1 ? "tabpanel" : undefined} className="card overflow-hidden" style={{ "--acc": THEMES[theme] } as React.CSSProperties}>
        <div className={cn("ma relative h-2", `ma-${slug}`)} aria-hidden="true" />
        {clip && c.youtube ? (
          <div className="relative aspect-video bg-black">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${c.youtube}?autoplay=1&rel=0`}
              title={`${c.tab}: clip`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        ) : (
          <div key={index} className="kd-qcard grid gap-6 p-6 md:grid-cols-[1.1fr_1fr] md:p-8">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">{c.tag}</p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight text-fg md:text-[1.9rem]">{c.title}</h3>
            </div>
            <dl className="space-y-4">
              <div>
                <dt className="acc-text font-mono text-[0.66rem] uppercase tracking-[0.14em]">What it cost</dt>
                <dd className="mt-1 leading-relaxed text-fg-2">
                  <Biz text={first(c.fallout)} />
                </dd>
              </div>
              <div>
                <dt className="acc-text font-mono text-[0.66rem] uppercase tracking-[0.14em]">The lesson</dt>
                <dd className="mt-1 font-medium leading-relaxed text-fg">
                  <Biz text={c.lesson} />
                </dd>
              </div>
            </dl>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3 border-t hairline px-6 py-3 md:px-8">
          {c.youtube && (
            <button type="button" onClick={() => setClip((v) => !v)} className="inline-flex items-center gap-1.5 rounded-full bg-fg px-3.5 py-1.5 text-xs font-medium text-bg">
              <MonitorPlay className="h-3.5 w-3.5" /> {clip ? "Back to the case" : "Watch the clip"}
            </button>
          )}
          <details className="text-xs text-fg-3 [&_summary]:cursor-pointer">
            <summary>Read the full story and sources</summary>
            <div className="mt-2 max-w-3xl space-y-2 leading-relaxed text-fg-2">
              <p>
                <Biz text={c.what} />
              </p>
              <p>
                <Biz text={c.fallout} />
              </p>
              {c.sources && <p className="text-fg-3">{c.sources}</p>}
            </div>
          </details>
        </div>
      </article>
    </div>
  );
}
