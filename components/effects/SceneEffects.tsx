"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Reveal — elements marked data-reveal fade up the first time they enter the viewport.
 * Content is only hidden once this script runs (html.reveal-ready), so no-JS users see everything.
 * (Section colours are fixed per section; there are no scroll-driven background changes.)
 */
export default function SceneEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- reveal
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let revealIO: IntersectionObserver | null = null;
    if (!reduced) {
      root.classList.add("reveal-ready");
      revealIO = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              revealIO?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
      );
      items.forEach((el) => revealIO!.observe(el));
    }

    return () => {
      revealIO?.disconnect();
    };
  }, [pathname]);

  return null;
}
