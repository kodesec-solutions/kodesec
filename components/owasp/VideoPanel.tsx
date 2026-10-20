"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { OwaspTopic } from "@/lib/content/schemas";
import { THEMES, type Theme } from "./sims/kit";

type Video = OwaspTopic["video"];

/**
 * "Short on time? Watch it instead." The marketing video for the lesson: YouTube (click to load, nocookie) or a
 * self-hosted file. Until one is added the panel loops the simulation behind a "coming soon" note.
 */
export function VideoPanel({ video, title, code, theme }: { video: Video; title: string; code: string; theme: Theme }) {
  const [playing, setPlaying] = useState(false);
  const minutes = video.minutes ? `${video.minutes}-minute` : "short";

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-video bg-black">
        {video.youtube ? (
          playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${video.youtube}?autoplay=1&rel=0`}
              title={`${title}: video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button type="button" onClick={() => setPlaying(true)} className="group absolute inset-0" aria-label={`Play the ${title} video`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- static export, remote thumbnail */}
              <img
                src={video.poster ?? `https://i.ytimg.com/vi/${video.youtube}/maxresdefault.jpg`}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
              />
              <PlayBadge />
            </button>
          )
        ) : video.src ? (
          <video className="absolute inset-0 h-full w-full" src={video.src} poster={video.poster} controls playsInline preload="metadata" />
        ) : (
          <>
            <div data-theme="dark" className="sim-bg absolute inset-0" style={{ "--acc": THEMES[theme] } as React.CSSProperties} />
            <div className="absolute inset-0 grid place-items-center bg-black/40 text-center">
              <div>
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/60">Video</p>
                <p className="mt-2 text-2xl font-semibold text-white">Coming soon</p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <p className="text-sm text-fg-2">
          The {minutes} version of this lesson, made for owners who&apos;d rather watch than read.
        </p>
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">{code} · Watch instead</span>
      </div>
    </div>
  );
}

function PlayBadge() {
  return (
    <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-glow transition-transform group-hover:scale-105">
      <Play className="ml-1 h-6 w-6" />
    </span>
  );
}
