"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import type { OwaspTopic } from "@/lib/content/schemas";
import { Biz, useBusiness } from "./BusinessContext";
import { useLesson } from "./LessonContext";
import { MotionArt } from "./MotionArt";
import { THEMES, type Theme } from "./sims/kit";
import { cn } from "@/lib/utils";

type Beat = { key: string; label: string; headline: string; body: string; extra?: string };

/**
 * The lesson's simulation card: the lesson's motion piece on its colour field, clicked through in short beats
 * (the film when there is one, then what it is, what it means for this business, what to do). Business-aware.
 */
export function ConceptStage({ topic, theme, slug }: { topic: OwaspTopic; theme: Theme; slug: string }) {
  const { current } = useBusiness();
  const { playToken } = useLesson();
  const [i, setI] = useState(0);
  const video = useRef<HTMLVideoElement>(null);
  const film = topic.simulation.film;
  const why = topic.quick.cards[1];
  const todo = topic.quick.cards[2];

  const beats: Beat[] = [
    ...(film ? [{ key: "film", label: "Watch", headline: "watch it happen.", body: topic.simulation.lede }] : []),
    { key: "what", label: "What it is", headline: topic.quick.title, body: topic.simulation.definition },
    {
      key: "means",
      label: `For ${current.label.toLowerCase()}`,
      headline: topic.cost.title,
      body: topic.cost.note ?? why.text,
      extra: why.text,
    },
    { key: "do", label: "What to do", headline: topic.decisions.items[0].title + ".", body: topic.decisions.items[0].text, extra: todo.text },
  ];
  const beat = beats[Math.min(i, beats.length - 1)];

  // "Try it in the simulation" links come back to the first beat
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- external restart request
    if (playToken) setI(0);
  }, [playToken]);

  // the film plays only while its beat is showing
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (beat.key === "film") v.play().catch(() => {});
    else v.pause();
  }, [beat.key]);

  return (
    <div className="card overflow-hidden" style={{ "--acc": THEMES[theme] } as React.CSSProperties}>
      <div className="relative aspect-[16/10] md:aspect-[16/8]">
        {film && beat.key === "film" ? (
          <video ref={video} className="absolute inset-0 h-full w-full bg-black object-cover" src={film.src} poster={film.poster} muted playsInline controls preload="metadata" />
        ) : (
          <MotionArt slug={slug}>
            <div className="ma-overlay">
              <p className="ma-kicker">
                {topic.slug.replace(/-/g, " ")} · {String(i + 1).padStart(2, "0")}/{String(beats.length).padStart(2, "0")}
              </p>
              <p key={beat.key + current.slug} className="ma-headline sim-in">
                <Biz text={beat.headline} />
              </p>
            </div>
          </MotionArt>
        )}
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[1fr_auto] md:items-start md:p-7">
        <div>
          <div role="tablist" aria-label="Simulation steps" className="flex flex-wrap gap-1.5">
            {beats.map((b, n) => (
              <button
                key={b.key}
                type="button"
                role="tab"
                aria-selected={n === i}
                onClick={() => setI(n)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                  n === i ? "acc-bg border-transparent text-black" : "border-line-2 text-fg-2 hover:text-fg",
                )}
              >
                {b.key === "film" && <Play className="h-3 w-3" />}
                <span className="font-mono text-[0.62rem] opacity-70">{String(n + 1).padStart(2, "0")}</span>
                {b.label}
              </button>
            ))}
          </div>
          <div key={beat.key + current.slug} className="sim-in mt-5 max-w-3xl" role="tabpanel">
            <p className="text-lg leading-relaxed text-fg">
              <Biz text={beat.body} />
            </p>
            {beat.extra && (
              <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-2">
                <Biz text={beat.extra} />
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2 md:pt-0">
          <button
            type="button"
            onClick={() => setI((n) => Math.max(0, n - 1))}
            disabled={i === 0}
            aria-label="Previous"
            className="grid h-10 w-10 place-items-center rounded-full border border-line-2 text-fg-2 transition-colors hover:text-fg disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          {i < beats.length - 1 ? (
            <button type="button" onClick={() => setI((n) => n + 1)} className="acc-bg inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-black">
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <a href="#you" className="acc-bg inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-black">
              Check your site <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
