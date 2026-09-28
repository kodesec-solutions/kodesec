"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, CircleCheck, Circle, RotateCcw } from "lucide-react";
import { useProgress } from "./progress";
import { cn } from "@/lib/utils";

export function LessonStatus({ href, className }: { href: string; className?: string }) {
  const { isDone } = useProgress();
  return isDone(href) ? (
    <CircleCheck className={cn("h-4 w-4 shrink-0 text-brand", className)} aria-label="Completed" />
  ) : (
    <Circle className={cn("h-4 w-4 shrink-0 text-fg-3/60", className)} aria-label="Not completed" />
  );
}

export function MarkComplete({ href, nextHref }: { href: string; nextHref?: string | null }) {
  const { isDone, setDone } = useProgress();
  const router = useRouter();
  const done = isDone(href);
  return (
    <div className="card flex flex-col items-start justify-between gap-4 p-6 sm:flex-row sm:items-center">
      <div>
        <p className="font-medium text-fg">{done ? "Lesson completed" : "Finished this lesson?"}</p>
        <p className="mt-1 text-sm text-fg-2">Progress is saved in this browser — no account needed.</p>
      </div>
      <div className="flex gap-2">
        {done ? (
          <button type="button" onClick={() => setDone(href, false)} className="btn btn-ghost btn-sm">
            <RotateCcw className="h-3.5 w-3.5" /> Mark as not done
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setDone(href, true);
              const w = window as unknown as { dataLayer?: unknown[] };
              w.dataLayer?.push({ event: "academy_lesson_complete", lesson: href });
              if (nextHref) router.push(nextHref);
            }}
            className="btn btn-brand btn-sm"
          >
            <Check className="h-4 w-4" /> {nextHref ? "Complete & continue" : "Mark as complete"}
          </button>
        )}
      </div>
    </div>
  );
}

/** PortSwigger-style "Track your progress" card with a ring. */
export function TrackProgress({ title, hrefs }: { title: string; hrefs: string[] }) {
  const { isDone, reset } = useProgress();
  const done = hrefs.filter(isDone).length;
  const total = hrefs.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const r = 30;
  const c = 2 * Math.PI * r;
  const next = hrefs.find((h) => !isDone(h));

  return (
    <div className="card overflow-hidden p-6">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-3">Your progress</p>
      <div className="mt-5 flex items-center gap-5">
        <svg viewBox="0 0 72 72" className="h-[72px] w-[72px] shrink-0 -rotate-90" aria-hidden="true">
          <circle cx="36" cy="36" r={r} fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="6" />
          <circle
            cx="36"
            cy="36"
            r={r}
            fill="none"
            stroke="var(--color-brand)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (c * pct) / 100}
            className="transition-[stroke-dashoffset] duration-700"
          />
        </svg>
        <div>
          <p className="text-2xl font-semibold text-fg">{pct}%</p>
          <p className="text-sm text-fg-2">
            {done} of {total} lessons in {title}
          </p>
        </div>
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-tint/[0.06]">
        <div className="h-full rounded-full bg-brand transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        {next ? (
          <Link href={next} className="flex items-center gap-1.5 text-sm text-brand hover:underline">
            {done === 0 ? "Start the track" : "Continue"} <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span className="text-sm text-brand">Track complete 🎉</span>
        )}
        {done > 0 && (
          <button type="button" onClick={() => reset(hrefs)} className="text-xs text-fg-3 hover:text-fg-2">
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
