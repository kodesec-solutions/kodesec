"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { getThemePref, setThemePref, subscribeTheme, type ThemePref } from "./theme";
import { cn } from "@/lib/utils";

const OPTIONS: { value: ThemePref; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
];

export function useThemePref(): ThemePref {
  return useSyncExternalStore(subscribeTheme, getThemePref, () => "system");
}

/** Segmented Light / Dark / System control. `labels` shows text next to the icons. */
export default function ThemeToggle({ labels = false, className }: { labels?: boolean; className?: string }) {
  const pref = useThemePref();
  return (
    <div role="radiogroup" aria-label="Colour theme" className={cn("inline-flex items-center gap-0.5 rounded-full border border-line-2 p-0.5", className)}>
      {OPTIONS.map(({ value, label, Icon }) => {
        const active = pref === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setThemePref(value)}
            className={cn(
              "flex h-7 items-center justify-center gap-1.5 rounded-full text-xs transition-colors",
              labels ? "px-2.5" : "w-7",
              active ? "bg-fg text-bg" : "text-fg-2 hover:text-fg",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {labels && <span>{label}</span>}
          </button>
        );
      })}
    </div>
  );
}
