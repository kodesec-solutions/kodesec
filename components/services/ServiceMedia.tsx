import { cn } from "@/lib/utils";

/**
 * Renders a service illustration from content: animated .svg / .gif / .webp / .png / .jpg as an
 * image, .mp4 / .webm as a silent looping video. Swap files by changing the `media` path in content.
 */
export function ServiceMedia({ src, alt, className, priority }: { src: string; alt: string; className?: string; priority?: boolean }) {
  const cls = cn("block h-auto w-full rounded-2xl", className);
  if (/\.(mp4|webm)$/i.test(src)) {
    return <video src={src} autoPlay muted loop playsInline aria-label={alt} className={cls} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" className={cls} />;
}
