"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ text, label = "Copy", className }: { text: () => string; label?: string; className?: string }) {
  const [state, setState] = useState<"idle" | "ok" | "fail">("idle");

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(text());
      ok = true;
    } catch {}
    setState(ok ? "ok" : "fail");
    window.setTimeout(() => setState("idle"), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line-2 px-3 py-1 text-xs text-fg-2 transition-colors hover:border-brand/50 hover:text-brand",
        className,
      )}
    >
      {state === "ok" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {state === "ok" ? "Copied" : state === "fail" ? "Select and copy manually" : label}
    </button>
  );
}
