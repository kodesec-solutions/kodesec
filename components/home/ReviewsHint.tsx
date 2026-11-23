"use client";

import { useEffect, useState } from "react";
import { ChevronsDown, Lock, Star, X } from "lucide-react";

const KEY = "kd-reviews-hint-closed";

/**
 * Floating hand of playing cards (one 16:9 card per client, fanned) on the left edge of the landing page,
 * with a hand-drawn arrow pointing at it.
 * Click = smooth scroll to the reviews. Hides once the reviews are on screen (or already passed),
 * and can be dismissed for the session.
 */
export default function ReviewsHint({
  targetId,
  items,
  confidential = 0,
}: {
  targetId: string;
  items: { src: string; name: string; role: string; company: string; rating: number }[];
  confidential?: number; // extra face-down cards for clients who asked not to be named
}) {
  const [ready, setReady] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [roomy, setRoomy] = useState(false); // enough screen that the poster won't cover the hero copy

  useEffect(() => {
    let closed = false;
    try {
      closed = !!sessionStorage.getItem(KEY);
    } catch {}
    if (closed) return;
    const t = window.setTimeout(() => setReady(true), 1200);
    const measure = () => setRoomy((window.innerWidth >= 1400 && window.innerHeight >= 780) || window.scrollY > 400);
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    const el = document.getElementById(targetId);
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting || e.boundingClientRect.top < 0), { threshold: 0.1 });
      io.observe(el);
    }
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      io?.disconnect();
    };
  }, [targetId]);

  const go = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(targetId)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };
  const close = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    setHidden(true);
  };

  if (!ready || hidden || !roomy) return null;

  const real = items.slice(0, 3).map((item) => ({ real: true as const, item }));
  const left = Math.ceil(confidential / 2);
  const cards: ({ real: true; item: (typeof items)[number] } | { real: false })[] = [
    ...Array.from({ length: left }, () => ({ real: false as const })),
    ...real,
    ...Array.from({ length: confidential - left }, () => ({ real: false as const })),
  ];

  return (
    <div className="kd-rise fixed bottom-4 left-8 z-40 hidden sm:block lg:bottom-8 lg:left-10">
      <svg aria-hidden="true" viewBox="0 0 270 84" className="pointer-events-none -mb-1 -ml-2 h-[56px] w-[190px] overflow-visible text-fg lg:h-[70px] lg:w-[225px]">
        <defs>
          <filter id="kd-pencil-r" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" />
          </filter>
        </defs>
        <g filter="url(#kd-pencil-r)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <text
            className="kd-hint-text"
            x="4"
            y="20"
            fill="currentColor"
            stroke="var(--color-bg)"
            strokeWidth="5"
            paintOrder="stroke"
            fontSize="19"
            transform="rotate(-3 4 20)"
            style={{ fontFamily: "'Segoe Print','Bradley Hand','Comic Sans MS',cursive" }}
          >
            Check out the reviews!
          </text>
          <path className="kd-stroke" pathLength="1" strokeWidth="1.7" d="M214 14 C 246 22, 254 48, 232 74" />
          <path className="kd-stroke kd-stroke-2" pathLength="1" strokeWidth="1.1" opacity="0.7" d="M216 17 C 248 26, 256 50, 234 77" />
          <path className="kd-stroke kd-stroke-3" pathLength="1" strokeWidth="1.7" d="M232 74 L246 70 M232 74 L231 58" />
        </g>
      </svg>

      <div className="group relative h-[14rem] w-[17rem] lg:h-[15.5rem] lg:w-[19rem]">
        {cards.map((c, i) => {
          // fan: spread evenly around the centre, like a hand of cards
          const k = i - (cards.length - 1) / 2;
          const base = "kd-card absolute bottom-0 left-1/2 -ml-[4.25rem] block aspect-[5/7] w-[8.5rem] overflow-hidden rounded-2xl border bg-fg text-bg lg:-ml-[4.75rem] lg:w-[9.5rem]";
          const style = { "--r": `${k * 5}deg`, "--x": `${k * 40}px`, "--y": `${Math.abs(k) * 4}px`, zIndex: c.real ? 10 + i : i } as React.CSSProperties;

          // other clients: present but unnamed (blurred, redacted)
          if (!c.real) {
            return (
              <span key={`c${i}`} aria-hidden="true" style={style} className={`${base} pointer-events-none border-fg/25 [filter:blur(1.5px)_brightness(0.82)]`}>
                <span className="flex h-full flex-col items-center p-3.5 text-center">
                  <span className="mt-6 flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-bg/15 bg-bg/10 lg:h-[4.5rem] lg:w-[4.5rem]">
                    <Lock className="h-5 w-5 text-bg/40" />
                  </span>
                  <span className="mt-4 h-2.5 w-20 rounded-full bg-bg/25" />
                  <span className="mt-2 h-2 w-14 rounded-full bg-bg/15" />
                  <span className="mt-auto font-mono text-eyebrow uppercase tracking-wide text-bg/50">Confidential</span>
                </span>
              </span>
            );
          }

          const t = c.item;
          return (
            <button
              key={t.name}
              type="button"
              onClick={go}
              aria-label={`Check out the reviews: ${t.name}, ${t.company}`}
              style={style}
              className={`${base} border-brand/60 text-left`}
            >
              <span className="flex h-full flex-col items-center p-3.5 text-center">
                <span className="flex items-center gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, n) => (
                    <Star key={n} aria-hidden="true" className={n < t.rating ? "h-3.5 w-3.5 fill-warn text-warn" : "h-3.5 w-3.5 text-bg/25"} />
                  ))}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.src}
                  alt=""
                  width={80}
                  height={80}
                  className="mt-3 h-16 w-16 shrink-0 rounded-full border-[3px] border-brand object-cover lg:h-[4.5rem] lg:w-[4.5rem]"
                />
                <span className="mt-3 block w-full truncate text-sm font-semibold leading-tight lg:text-body-sm">{t.name}</span>
                <span className="mt-1 block w-full truncate text-eyebrow text-bg/70">{t.role}</span>
                <span className="block w-full truncate text-eyebrow font-medium text-bg/90">{t.company}</span>
              </span>
            </button>
          );
        })}
        <span className="pointer-events-none absolute -bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap text-eyebrow text-fg-2">
          <ChevronsDown className="kd-bounce h-3.5 w-3.5 text-brand" /> Tap a card to read the reviews
        </span>
        <button
          type="button"
          onClick={close}
          aria-label="Dismiss"
          className="absolute -top-1 right-0 z-30 flex h-6 w-6 items-center justify-center rounded-full border border-line-2 bg-bg/80 text-fg-2 backdrop-blur transition-colors hover:text-fg"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
