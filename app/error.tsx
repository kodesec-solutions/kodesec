"use client";

import React, { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import { logger } from "@/lib/logger";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to our logging layer
    logger.error("Application runtime error boundary caught:", error);
  }, [error]);

  return (
    <div className="relative min-h-[75vh] flex items-center justify-center bg-background-dark px-6 py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.05),transparent_40%)]" />

      <div className="relative max-w-md w-full rounded-3xl border border-surface-border bg-surface-dark/70 p-8 text-center backdrop-blur-md shadow-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 mx-auto mb-6">
          <AlertCircle size={32} />
        </div>

        <h1 className="text-xl font-bold text-white tracking-tight">System Crash Handled</h1>

        <p className="mt-3 text-xs text-gray-400 leading-relaxed font-medium">
          An unexpected exception occurred in the client-side thread execution lifecycle.
        </p>

        <div className="mt-4 p-3 rounded-xl border border-white/5 bg-white/[0.01] text-[10px] font-mono text-gray-500 text-left overflow-x-auto max-h-24">
          {error.message || "Unknown execution error"}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_15px_rgba(54,226,123,0.3)] cursor-pointer font-mono"
          >
            <RotateCcw size={14} />
            <span>Reset pipeline</span>
          </button>
        </div>
      </div>
    </div>
  );
}
