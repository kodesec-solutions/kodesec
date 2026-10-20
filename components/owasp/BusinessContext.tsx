"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fill, tokens, type Vars } from "@/lib/academy/template";
import { cn } from "@/lib/utils";

export type BusinessProfile = { slug: string; label: string; vars: Vars };

const STORAGE_KEY = "kd-academy-business";

type Ctx = { profiles: BusinessProfile[]; current: BusinessProfile; choose: (slug: string) => void };
const BusinessCtx = createContext<Ctx | null>(null);

/**
 * Holds the business the visitor picked ("I run a clinic"). Every lesson renders the first profile on the
 * server, then switches to the remembered one after mounting, so static HTML and hydration agree.
 */
export function BusinessProvider({ profiles, children }: { profiles: BusinessProfile[]; children: React.ReactNode }) {
  const [slug, setSlug] = useState(profiles[0].slug);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restoring a saved choice after hydration
      if (saved && profiles.some((p) => p.slug === saved)) setSlug(saved);
    } catch {}
  }, [profiles]);

  const choose = (next: string) => {
    setSlug(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  };

  const current = profiles.find((p) => p.slug === slug) ?? profiles[0];
  return <BusinessCtx.Provider value={{ profiles, current, choose }}>{children}</BusinessCtx.Provider>;
}

export function useBusiness() {
  const ctx = useContext(BusinessCtx);
  if (!ctx) throw new Error("useBusiness needs a <BusinessProvider>");
  return ctx;
}

/** Renders lesson text with the current business filled in, plus **bold** and [[highlight]]. */
export function Biz({ text, className }: { text: string; className?: string }) {
  const { current } = useBusiness();
  return (
    <span className={className}>
      {tokens(fill(text, current.vars)).map((t, i) =>
        t.kind === "strong" ? (
          <strong key={i} className="font-semibold text-fg">
            {t.value}
          </strong>
        ) : t.kind === "mark" ? (
          <mark key={i} className="rounded bg-danger/15 px-1 text-danger">
            {t.value}
          </mark>
        ) : (
          t.value
        ),
      )}
    </span>
  );
}

/** "I run a [Online shop] [Clinic] …" */
export function BusinessPicker({ className, align = "start" }: { className?: string; align?: "start" | "center" }) {
  const { profiles, current, choose } = useBusiness();
  return (
    <div
      role="group"
      aria-label="Your type of business"
      className={cn("flex flex-wrap items-center gap-2", align === "center" && "justify-center", className)}
    >
      <span className="mr-1 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-fg-3">I run a</span>
      {profiles.map((p) => (
        <button
          key={p.slug}
          type="button"
          aria-pressed={p.slug === current.slug}
          onClick={() => choose(p.slug)}
          className="pill-toggle"
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
