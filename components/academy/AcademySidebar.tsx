import Link from "next/link";
import { ChevronDown, ChevronLeft } from "lucide-react";
import type { AcademyTrack } from "@/lib/content/loaders";
import { LessonStatus } from "./ProgressWidgets";
import { cn } from "@/lib/utils";

/**
 * Left topic tree (PortSwigger layout, Kodesec theme): back link, track, modules as
 * collapsible groups, lessons with completion status. Current lesson highlighted.
 */
export function AcademySidebar({ track, currentHref }: { track: AcademyTrack; currentHref?: string }) {
  return (
    <nav aria-label={`${track.title} lessons`} className="text-sm">
      <Link href="/academy" className="flex items-center gap-1.5 text-xs text-fg-3 transition-colors hover:text-fg">
        <ChevronLeft className="h-3.5 w-3.5" /> All tracks
      </Link>
      <Link
        href={track.href}
        className={cn(
          "mt-4 block rounded-lg px-3 py-2 font-medium transition-colors",
          currentHref === track.href ? "bg-brand/15 text-fg" : "text-fg hover:bg-tint/[0.04]",
        )}
      >
        {track.title} — overview
      </Link>
      <ul className="mt-2 space-y-1">
        {track.modules.map((m) => {
          const containsCurrent = m.lessons.some((l) => l.href === currentHref) || m.href === currentHref;
          return (
            <li key={m.slug}>
              <details open={containsCurrent || track.modules.length === 1} className="group">
                <summary
                  className={cn(
                    "flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2 transition-colors [&::-webkit-details-marker]:hidden",
                    containsCurrent ? "text-fg" : "text-fg-2 hover:bg-tint/[0.04] hover:text-fg",
                  )}
                >
                  {m.title}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-open:rotate-180" />
                </summary>
                <ul className="mb-2 ml-3 mt-1 space-y-0.5 border-l border-line pl-2">
                  {m.lessons.map((l) => {
                    const active = l.href === currentHref;
                    return (
                      <li key={l.href}>
                        <Link
                          href={l.href}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-start gap-2.5 rounded-md px-2.5 py-1.5 leading-snug transition-colors",
                            active
                              ? "bg-brand/15 text-fg shadow-[inset_2px_0_0_var(--color-brand)]"
                              : "text-fg-2 hover:bg-tint/[0.04] hover:text-fg",
                          )}
                        >
                          <LessonStatus href={l.href} className="mt-0.5" />
                          <span>{l.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </details>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
