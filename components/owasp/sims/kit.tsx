"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/** Each lesson's simulation has its own colour. */
export const THEMES = {
  violet: "#a78bfa",
  orange: "#fb923c",
  sky: "#38bdf8",
  teal: "#2dd4bf",
  amber: "#fbbf24",
  rose: "#fb7185",
  indigo: "#818cf8",
  fuchsia: "#e879f9",
  lime: "#a3e635",
  red: "#f87171",
} as const;
export type Theme = keyof typeof THEMES;

/** Scenes are drawn on a fixed canvas and scaled to fit, like a video frame. */
export const W = 960;
export const H = 540;

export type SimState = {
  /** Has this step been completed? */
  done: (id: string) => boolean;
  /** The step waiting for the visitor (null when finished). */
  cur: string | null;
  /** Complete a step (only the current one counts). */
  act: (id: string) => void;
  /** Fill business placeholders: "{person}" → "patient". */
  v: (text: string) => string;
  /** Gallery loop: nothing is clickable, steps advance on their own. */
  demo: boolean;
};

const Ctx = createContext<SimState | null>(null);
export const SimProvider = Ctx.Provider;
export function useSim() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSim needs a simulation");
  return c;
}

/** Fits the 960×540 scene into its box: "contain" in lessons, "cover" behind gallery tiles. */
export function SimCanvas({ theme, fit = "contain", className, children }: { theme: Theme; fit?: "contain" | "cover"; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ s: 0, x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      const s = fit === "cover" ? Math.max(width / W, height / H) : width / W;
      setBox({ s, x: (width - W * s) / 2, y: fit === "cover" ? (height - H * s) / 2 : 0 });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [fit]);

  return (
    <div
      ref={ref}
      data-theme="dark"
      className={cn("sim-bg relative w-full overflow-hidden", fit === "contain" && "aspect-video", className)}
      style={{ "--acc": THEMES[theme] } as React.CSSProperties}
    >
      {box.s > 0 && (
        <div className="absolute left-0 top-0" style={{ width: W, height: H, transform: `translate(${box.x}px, ${box.y}px) scale(${box.s})`, transformOrigin: "0 0" }}>
          {children}
        </div>
      )}
    </div>
  );
}

/**
 * Something the visitor clicks. When it is the current step it glows in the lesson colour, shows a "click" tag
 * and completes the step; otherwise it is plain content.
 */
export function T({
  id,
  children,
  className,
  tag = "Click",
  tagSide = "top",
  style,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  tag?: string;
  tagSide?: "top" | "bottom" | "left" | "right";
  style?: React.CSSProperties;
}) {
  const { cur, act, demo } = useSim();
  const live = cur === id;
  if (!live || demo)
    return (
      <span className={cn("relative", live && "sim-target", className)} style={style}>
        {children}
      </span>
    );
  return (
    <button type="button" onClick={() => act(id)} className={cn("sim-target relative cursor-pointer text-left", className)} style={style}>
      {children}
      <span className={cn("sim-tag", `sim-tag-${tagSide}`)} aria-hidden>
        {tag}
      </span>
    </button>
  );
}

/** A browser window with dots and an address bar. */
export function Win({ x, y, w, h, url, children, className }: { x: number; y: number; w: number; h: number; url: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("sim-glass absolute flex flex-col rounded-2xl", className)} style={{ left: x, top: y, width: w, height: h }}>
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex gap-1.5">
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <div className="flex min-h-[30px] flex-1 items-center rounded-lg bg-black/40 px-3 font-mono text-[13px] text-white/80">{url}</div>
      </div>
      <div className="relative min-h-0 flex-1 p-5">{children}</div>
    </div>
  );
}

/** A side panel: the website's own view, the attacker, settings, a database… */
export function Box({
  x,
  y,
  w,
  h,
  title,
  icon: Icon,
  tone = "plain",
  children,
  className,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  title: string;
  icon?: LucideIcon;
  tone?: "plain" | "attacker" | "acc";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("sim-glass absolute rounded-2xl", tone === "attacker" && "sim-glass-red", className)}
      style={{ left: x, top: y, width: w, height: h }}
    >
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3">
        {Icon && (
          <span className={cn("grid h-6 w-6 place-items-center rounded-md", tone === "attacker" ? "bg-red-400/15 text-red-300" : "acc-soft acc-text")}>
            <Icon className="h-3.5 w-3.5" />
          </span>
        )}
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">{title}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

/** A small on/off switch drawn in the scene. */
export function Switch({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="flex items-center gap-3 text-[13.5px] text-white/85">
      <span className={cn("relative h-5 w-9 flex-none rounded-full transition-colors duration-300", on ? "acc-bg" : "bg-white/15")}>
        <i className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all duration-300", on ? "left-[18px]" : "left-0.5")} />
      </span>
      {label}
    </span>
  );
}

/** A button drawn in the scene (wrap it in <T> to make it the click target). */
export function Btn({ children, tone = "acc", className }: { children: React.ReactNode; tone?: "acc" | "plain" | "dark" | "danger"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-semibold",
        tone === "acc" && "acc-bg text-black",
        tone === "plain" && "border border-white/15 bg-white/[0.06] text-white/90",
        tone === "dark" && "bg-[#14201a] text-white",
        tone === "danger" && "bg-red-500/90 text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Status pill: good / bad / neutral. */
export function Pill({ tone = "plain", children, className }: { tone?: "good" | "bad" | "warn" | "plain" | "acc"; children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10.5px] uppercase tracking-wider",
        tone === "good" && "border-emerald-400/50 bg-emerald-400/10 text-emerald-300",
        tone === "bad" && "border-red-400/50 bg-red-400/10 text-red-300",
        tone === "warn" && "border-amber-400/50 bg-amber-400/10 text-amber-300",
        tone === "plain" && "border-white/15 text-white/60",
        tone === "acc" && "acc-border acc-soft acc-text",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Data travelling between two points: a dashed line with moving dashes. */
export function Flow({ from, to, on, tone = "acc", lift = 60 }: { from: [number, number]; to: [number, number]; on: boolean; tone?: "acc" | "bad" | "good"; lift?: number }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const d = `M ${x1} ${y1} Q ${(x1 + x2) / 2} ${Math.min(y1, y2) - lift} ${x2} ${y2}`;
  return (
    <svg className="pointer-events-none absolute inset-0" width={W} height={H} aria-hidden>
      <path d={d} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="1.5" strokeDasharray="3 6" />
      {on && (
        <path
          d={d}
          fill="none"
          className="sim-flow"
          stroke={tone === "bad" ? "#f87171" : tone === "good" ? "#34d399" : "var(--acc)"}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 14"
        />
      )}
    </svg>
  );
}

/** Appears with a soft blur-in whenever `show` turns true. */
export function Reveal({ show, children, className, style }: { show: boolean; children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  if (!show) return null;
  return (
    <div className={cn("sim-in", className)} style={style}>
      {children}
    </div>
  );
}

/** The red "stamp" that lands on something that should never have happened. */
export function Stamp({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("sim-stamp absolute rounded border-2 border-red-500 px-2 py-0.5 font-mono text-[13px] font-bold uppercase tracking-[0.14em] text-red-500", className)}>{children}</span>;
}

/** Handwritten note (Caveat). */
export function Note({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <p className={cn("sim-in pointer-events-none absolute whitespace-nowrap font-[family-name:var(--font-hand)] text-[24px] font-semibold leading-none acc-text", className)} style={style}>
      {children}
    </p>
  );
}

/** Number that counts up whenever `to` changes. */
export function useCount(to: number, ms = 1200) {
  const [n, setN] = useState(to);
  const from = useRef(to);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      setN(Math.round(a + (to - a) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms]);
  return n;
}
