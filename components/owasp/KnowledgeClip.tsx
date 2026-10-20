"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { OwaspTopic } from "@/lib/content/schemas";
import { plain } from "@/lib/academy/template";
import { useBusiness } from "./BusinessContext";
import { DefenseGraphic } from "./DefenseGraphic";
import { cn } from "@/lib/utils";

type Knowledge = OwaspTopic["owasp"];
type Beat = { label?: string; big?: string; text?: string; ticks?: string[]; graphic?: boolean };

/**
 * The OWASP knowledge for a lesson as a looping motion clip in the lesson's colour grade, with pencil-sketch
 * labels, ticks and underlines. "card": compact loop for the gallery tile. "full": the lesson page version,
 * with controls and the source credit. Content: OWASP Top 10:2025 (CC BY 3.0), paraphrased.
 */
export function KnowledgeClip({
  slug,
  code,
  title,
  owasp,
  why,
  variant = "full",
  paused = false,
  stagger = 0,
}: {
  slug: string;
  code: string;
  title: string;
  owasp: Knowledge;
  why?: string;
  variant?: "card" | "full";
  paused?: boolean;
  /** Gallery position: offsets each card's start and rhythm so they don't all change at once. */
  stagger?: number;
}) {
  const card = variant === "card";
  const { current } = useBusiness();
  const beats: Beat[] = card
    ? [{ big: title.toLowerCase() }, { label: "to stay safe", graphic: true }]
    : [
        { big: title.toLowerCase(), label: `OWASP Top 10 · ${code}` },
        { label: "what it is", text: owasp.summary },
        ...(why ? [{ label: "why it matters to you", text: plain(why, current.vars) }] : []),
        { label: "how to stay safe", ticks: owasp.prevent },
      ];
  // cards each get their own rhythm (3.2–4.9 s per beat) and a first-beat delay, so the wall never changes in unison
  const ms = card ? 3200 + ((stagger * 577) % 1700) : 5200;
  const firstDelay = card ? (stagger * 1730) % 6100 : 0;
  const first = useRef(true);

  // alternate cards start on the second beat, so the wall shows a mix from the first second
  const [i, setI] = useState(card ? stagger % 2 : 0);
  const [visible, setVisible] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const beat = beats[i];
  const count = beats.length;
  const hold = beat.ticks ? ms + beat.ticks.length * 500 : beat.graphic ? ms + 2400 : ms;
  useEffect(() => {
    // only the gallery cards play by themselves; the lesson version is a slideshow the visitor clicks through
    if (!card || !visible || paused) return;
    const wait = first.current ? hold + firstDelay : hold;
    const id = window.setTimeout(() => {
      first.current = false;
      setI((n) => (n + 1) % count);
    }, wait);
    return () => window.clearTimeout(id);
  }, [card, i, visible, paused, count, hold, firstDelay]);

  const go = (step: number) => setI((n) => (n + step + count) % count);

  return (
    <div
      ref={box}
      className={cn("ma kc absolute inset-0", `ma-${slug}`, card ? "kc-card" : "kc-full cursor-pointer")}
      {...(card
        ? {}
        : {
            role: "group",
            "aria-roledescription": "slideshow",
            "aria-label": `${title}: what OWASP says`,
            tabIndex: 0,
            onClick: () => go(1),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            },
          })}
    >
      <span className="ma-corner ma-c1" />
      <span className="ma-corner ma-c2" />
      <span className="ma-corner ma-c3" />
      <span className="ma-corner ma-c4" />
      <div className="kc-stage">
        <p className="kc-kicker">
          {code} · owasp top 10{!card && ` · ${String(i + 1).padStart(2, "0")}/${String(beats.length).padStart(2, "0")}`}
        </p>
        <div key={i} className="kc-beat sim-in" aria-live={card ? undefined : "polite"}>
          {beat.label && <p className="kc-label">{beat.label}</p>}
          {beat.big && (
            <>
              <p className="kc-big" style={card ? { fontSize: `min(13cqmin, ${(150 / Math.max(...beat.big.split(" ").map((w) => w.length))).toFixed(1)}cqw)` } : undefined}>
                {beat.big}
              </p>
              <svg className="kc-under" viewBox="0 0 400 20" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 13 C 100 4, 260 18, 396 7" />
              </svg>
            </>
          )}
          {beat.text && <p className="kc-text">{beat.text}</p>}
          {beat.graphic && <DefenseGraphic slug={slug} keywords={owasp.keywords} />}
          {beat.ticks && (
            <ul className="kc-ticks">
              {beat.ticks.map((t, n) => (
                <li key={t} style={{ animationDelay: `${0.25 + n * 0.5}s` }}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2.5" y="2.5" width="19" height="19" rx="3" />
                    <path className="tick" d="M6.5 12.5 L10.5 16.5 L18 7.5" style={{ animationDelay: `${0.45 + n * 0.5}s` }} />
                  </svg>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        {!card && (
          <div className="kc-progress" aria-hidden="true">
            {beats.map((_, n) => (
              <i key={n} className={cn(n < i && "done", n === i && "on")} />
            ))}
          </div>
        )}
      </div>
      {!card && (
        <div className="kc-nav" onClick={(e) => e.stopPropagation()}>
          <a href={owasp.url} target="_blank" rel="noopener noreferrer" className="kc-src">
            Source: OWASP Top 10:2025 (CC BY 3.0) ↗
          </a>
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
