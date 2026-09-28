"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Neon-style full-width graphite band with a film looping silently behind the copy.
 * The video, poster and copy come from content/site.yml → `film`, so the video can be swapped
 * without touching code. The video only downloads once the section nears the viewport.
 */

export type FilmContent = {
  video: string;
  poster: string;
  heading: string[];
  lines: [string, string];
};

export default function FilmSection({ film }: { film: FilmContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play only while in view; reduced-motion users get the poster.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { rootMargin: "200px 0px" },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      aria-labelledby="film-title"
      className="relative isolate flex min-h-[600px] overflow-hidden border-t border-line bg-[#141615] md:h-[min(92vh,920px)]"
    >
      <video
        ref={videoRef}
        src={film.video}
        poster={film.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-60 [filter:grayscale(1)_contrast(1.1)_brightness(0.95)]"
      />

      {/* graphite wash so the copy reads */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#141615_0%,rgba(20,22,21,0.55)_28%,rgba(20,22,21,0.25)_55%,rgba(20,22,21,0.8)_85%,#141615_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,11,11,0.6)_100%)]" />

      <div className="container-kd relative flex w-full flex-col justify-between py-14 md:py-20">
        <h2 id="film-title" className="max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight text-fg sm:text-5xl md:text-[3.6rem]">
          {film.heading.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <div className="mt-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p className="max-w-md text-base leading-relaxed text-fg md:text-lg">
            {film.lines[0]}
            <br />
            <span className="text-fg-2">{film.lines[1]}</span>
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link href="/book" className="btn btn-sm bg-white text-bg hover:bg-mint">
              Book a call
            </Link>
            <Link href="/services" className="btn btn-sm btn-ghost bg-black/20 backdrop-blur">
              Our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
