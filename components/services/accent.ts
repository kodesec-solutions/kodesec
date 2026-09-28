/** Per-category accent classes (Aikido-style tinted columns). Full class names so Tailwind picks them up. */
export const ACCENT = {
  emerald: {
    text: "text-emerald-400 light:text-emerald-700",
    tint: "bg-emerald-500/[0.07] light:bg-emerald-600/[0.06]",
    head: "bg-emerald-500/15 text-emerald-300 light:bg-emerald-600/10 light:text-emerald-800",
    border: "border-emerald-500/25",
    glow: "shadow-[0_30px_120px_-40px_rgba(16,185,129,0.55)]",
  },
  violet: {
    text: "text-violet-400 light:text-violet-700",
    tint: "bg-violet-500/[0.07] light:bg-violet-600/[0.06]",
    head: "bg-violet-500/15 text-violet-300 light:bg-violet-600/10 light:text-violet-800",
    border: "border-violet-500/25",
    glow: "shadow-[0_30px_120px_-40px_rgba(139,92,246,0.55)]",
  },
  sky: {
    text: "text-sky-400 light:text-sky-700",
    tint: "bg-sky-500/[0.07] light:bg-sky-600/[0.06]",
    head: "bg-sky-500/15 text-sky-300 light:bg-sky-600/10 light:text-sky-800",
    border: "border-sky-500/25",
    glow: "shadow-[0_30px_120px_-40px_rgba(14,165,233,0.55)]",
  },
  amber: {
    text: "text-amber-400 light:text-amber-700",
    tint: "bg-amber-500/[0.07] light:bg-amber-600/[0.06]",
    head: "bg-amber-500/15 text-amber-300 light:bg-amber-600/10 light:text-amber-800",
    border: "border-amber-500/25",
    glow: "shadow-[0_30px_120px_-40px_rgba(245,158,11,0.5)]",
  },
  rose: {
    text: "text-rose-400 light:text-rose-700",
    tint: "bg-rose-500/[0.07] light:bg-rose-600/[0.06]",
    head: "bg-rose-500/15 text-rose-300 light:bg-rose-600/10 light:text-rose-800",
    border: "border-rose-500/25",
    glow: "shadow-[0_30px_120px_-40px_rgba(244,63,94,0.5)]",
  },
} as const;
export type Accent = keyof typeof ACCENT;
