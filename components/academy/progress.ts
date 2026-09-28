"use client";

import { useSyncExternalStore } from "react";

/**
 * Academy progress, stored only in this browser (no account needed).
 * Shape: { [lessonHref]: completedAtISO }
 */
const KEY = "kodesec.academy.progress.v1";
const EVENT = "kodesec:progress";
type Progress = Record<string, string>;

let snapshot: Progress = {};
let raw: string | null = null;

function read(): Progress {
  try {
    const next = window.localStorage.getItem(KEY);
    if (next !== raw) {
      raw = next;
      snapshot = next ? (JSON.parse(next) as Progress) : {};
    }
  } catch {
    snapshot = {};
  }
  return snapshot;
}

function write(p: Progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // storage unavailable (private mode) — progress just won't persist
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(cb: () => void) {
  const onStorage = (e: StorageEvent) => e.key === KEY && cb();
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

const EMPTY: Progress = {};

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY);
  return {
    progress,
    isDone: (href: string) => !!progress[href],
    setDone: (href: string, done: boolean) => {
      const next = { ...read() };
      if (done) next[href] = new Date().toISOString();
      else delete next[href];
      write(next);
    },
    reset: (hrefs: string[]) => {
      const next = { ...read() };
      hrefs.forEach((h) => delete next[h]);
      write(next);
    },
  };
}
