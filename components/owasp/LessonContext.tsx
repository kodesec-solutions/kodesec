"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Ctx = {
  /** Bumped to restart the simulation; see `play`. */
  playToken: number;
  /** Scroll to the simulation and start it again (from the risk map or the questionnaire). */
  play: () => void;
};

const LessonCtx = createContext<Ctx | null>(null);

/** Shared state that lets the risk map and the questionnaire send the visitor back to the simulation. */
export function LessonProvider({ children }: { children: React.ReactNode }) {
  const [playToken, setPlayToken] = useState(0);
  const play = useCallback(() => {
    setPlayToken((n) => n + 1);
    document.getElementById("simulate")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);
  return <LessonCtx.Provider value={{ playToken, play }}>{children}</LessonCtx.Provider>;
}

export function useLesson() {
  const ctx = useContext(LessonCtx);
  if (!ctx) throw new Error("useLesson needs a <LessonProvider>");
  return ctx;
}
