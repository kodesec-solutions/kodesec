"use client";

import { cn } from "@/lib/utils";

/** On/off switch with a visible label. Uses a real checkbox, so keyboard and screen readers just work. */
export function Toggle({ checked, onChange, label, className }: { checked: boolean; onChange: (v: boolean) => void; label: string; className?: string }) {
  return (
    <label className={cn("inline-flex cursor-pointer select-none items-center gap-3 text-sm text-fg-2", className)}>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span
        aria-hidden
        className="relative h-6 w-11 flex-none rounded-full bg-line-2 transition-colors peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand after:absolute after:left-[3px] after:top-[3px] after:h-[18px] after:w-[18px] after:rounded-full after:bg-fg after:transition-transform peer-checked:after:translate-x-5 peer-checked:after:bg-bg"
      />
      {label}
    </label>
  );
}
