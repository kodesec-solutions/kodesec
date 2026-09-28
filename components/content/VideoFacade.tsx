"use client";

import { useEffect } from "react";

/**
 * Turns `.kd-video[data-provider=youtube]` thumbnails (rendered from Markdown) into a real player on click.
 * Without JS the thumbnail simply links to YouTube. Uses youtube-nocookie.com for privacy.
 */
export default function VideoFacade() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>(".kd-video[data-provider='youtube'] .kd-video-link");
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const box = link.parentElement as HTMLElement;
      const id = box.dataset.id;
      if (!id || !/^[A-Za-z0-9_-]{6,64}$/.test(id)) return;
      e.preventDefault();
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
      iframe.title = "YouTube video";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      iframe.allowFullscreen = true;
      box.replaceChildren(iframe);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
