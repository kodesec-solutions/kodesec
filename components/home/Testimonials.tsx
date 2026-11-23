"use client";

import { useRef } from "react";
import { MapPin, Quote } from "lucide-react";
import type { Site } from "@/lib/content/schemas";

type Item = Site["testimonials"][number];

/** One client card: portrait, quote, cursor spotlight and a subtle 3D tilt. */
function Card({ t, index }: { t: Item; index: number }) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
    el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <div data-reveal style={{ "--reveal-delay": `${index * 140}ms` } as React.CSSProperties} className="tcard-wrap">
      <article ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="tcard group">
        <span aria-hidden="true" className="tcard-spot" />

        {/* ---- portrait ---- */}
        <div className="relative h-80 overflow-hidden sm:h-[26rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.photo}
            alt={`${t.name}, ${t.role} at ${t.company}`}
            width={480}
            height={480}
            loading="lazy"
            style={{ objectPosition: t.focus ?? "50% 40%" }}
            className="h-full w-full scale-105 object-cover grayscale-[0.5] transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/20 via-40% to-transparent" />

          <span className="chip absolute left-5 top-5 bg-bg/70 backdrop-blur">{t.project}</span>
          {t.companyLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.companyLogo}
              alt={t.company}
              className="absolute right-5 top-5 h-11 w-11 rounded-xl bg-white object-contain p-1 shadow-lg"
            />
          )}

          <div className="absolute inset-x-0 bottom-0 px-6 pb-5 sm:px-8">
            <p className="text-2xl font-semibold leading-tight text-fg">{t.name}</p>
            <p className="mt-1 text-sm text-fg-2">
              {t.role} · <span className="text-mint">{t.company}</span>
            </p>
          </div>
        </div>

        {/* ---- quote ---- */}
        <div className="relative flex flex-1 flex-col px-6 pb-7 pt-5 sm:px-8 sm:pb-8">
          {t.projectImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={t.projectImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover object-top opacity-[0.07] [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]"
            />
          )}
          <Quote aria-hidden="true" className="relative h-7 w-7 text-brand" />
          <blockquote className="relative mt-4 flex-1">
            <p className="text-lede leading-[1.65] text-fg sm:text-lg">{t.quote}</p>
          </blockquote>
          {t.location && (
            <p className="relative mt-7 flex items-center gap-1.5 border-t border-line pt-4 font-mono text-eyebrow uppercase tracking-[0.12em] text-fg-3">
              <MapPin className="h-3 w-3 text-brand" /> {t.location}
            </p>
          )}
        </div>
      </article>
    </div>
  );
}

/** Client testimonials, side by side (stacked on small screens). More clients flow into new rows. */
export default function Testimonials({ items }: { items: Item[] }) {
  if (items.length === 0) return null;
  return (
    <div className="tgrid mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
      {items.map((t, i) => (
        <Card key={t.name} t={t} index={i} />
      ))}
    </div>
  );
}
