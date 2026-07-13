"use client";

import React, { useState, useEffect } from "react";
import LoaderOverlay from "./LoaderOverlay";

interface LoaderProps {
  children: React.ReactNode;
}

export default function Loader({ children }: LoaderProps) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // 1. Accessibility check: check prefers-reduced-motion setting
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setLoading(false);
      return;
    }

    // 2. Session storage check: only show loader once per browser session
    const hasLoadedThisSession = sessionStorage.getItem("kodesec_loaded");
    if (hasLoadedThisSession === "true") {
      setLoading(false);
      return;
    }

  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("kodesec_loaded", "true");
    setLoading(false);
  };

  // Prevent server-side rendering mismatch or layout shifts
  if (!mounted) {
    return (
      <div className="bg-background min-h-screen w-full flex items-center justify-center pointer-events-none" />
    );
  }

  return (
    <>
      {loading && (
        <LoaderOverlay
          onComplete={handleComplete}
        />
      )}
      <div className={`transition-opacity duration-700 ease-out ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {children}
      </div>
    </>
  );
}
