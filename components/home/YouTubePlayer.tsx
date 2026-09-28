"use client";

import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Click-to-play YouTube: shows the video thumbnail (no YouTube scripts or cookies until clicked),
 * then swaps in a youtube-nocookie iframe. Falls back to a local video file when there's no link.
 */
export default function YouTubePlayer({
  id,
  title,
  fallbackVideo,
  fallbackPoster,
}: {
  id: string | null;
  title: string;
  fallbackVideo: string;
  fallbackPoster: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(id ? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg` : fallbackPoster);

  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl border border-black/10 bg-[#04160d] shadow-[0_40px_80px_-30px_rgba(4,22,13,0.55)]">
      {!id ? (
        // No announcement link yet: play the local film with controls
        <video src={fallbackVideo} poster={fallbackPoster} controls playsInline preload="none" className="h-full w-full object-cover" aria-label={title} />
      ) : playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 h-full w-full cursor-pointer" aria-label={`Play video: ${title}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt=""
            loading="lazy"
            onLoad={(e) => {
              // YouTube returns a 120px grey placeholder when maxres doesn't exist
              if (id && e.currentTarget.naturalWidth <= 120) setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
            }}
            onError={() => id && setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#04160d] shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition group-hover:scale-105">
            <Play className="ml-1 h-8 w-8 fill-current" />
          </span>
          <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> YouTube
          </span>
        </button>
      )}
    </div>
  );
}
