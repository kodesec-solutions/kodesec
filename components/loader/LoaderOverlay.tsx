"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlueprintGrid from "./BlueprintGrid";
import NetworkNodes from "./NetworkNodes";
import LogoAnimation from "./LogoAnimation";

interface LoaderOverlayProps {
  onComplete: () => void;
}

type LoaderStage = "intro" | "nodes" | "logo" | "tagline" | "exit";

export default function LoaderOverlay({ onComplete }: LoaderOverlayProps) {
  const [stage, setStage] = useState<LoaderStage>("intro");

  useEffect(() => {
    // Stage Timeline
    // 0ms: intro (blueprint grid begins drawing)
    // 400ms: nodes (discipline node graphics draw and scan)
    // 2000ms: logo (nodes fade, Kodesec logo starts drawing)
    // 3200ms: tagline (brand statement fades in below the logo)
    // 4100ms: exit (fade out preloader)
    // 4600ms: onComplete callback
    
    const timers = [
      setTimeout(() => setStage("nodes"), 500),
      setTimeout(() => setStage("logo"), 2000),
      setTimeout(() => setStage("tagline"), 3000),
      setTimeout(() => setStage("exit"), 4000),
      setTimeout(() => onComplete(), 4500)
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, [onComplete]);

  // Technical indicator message
  const statusMessage = "INITIALIZING SECURE SYSTEMS";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={stage === "exit" ? { opacity: 0, y: -40, pointerEvents: "none" } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background select-none overflow-hidden"
    >
      {/* Background blueprint grid */}
      <BlueprintGrid />

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center text-center max-w-md px-6">
        <div className="relative h-64 w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {/* Stage 1 & 2: Show Unified Services Lifecycle Animation */}
            {(stage === "intro" || stage === "nodes") && (
              <motion.div
                key="nodes-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                transition={{ duration: 0.3 }}
                className="absolute"
              >
                <NetworkNodes />
              </motion.div>
            )}

            {/* Stage 3 & 4: Convergence into Kodesec Logo */}
            {(stage === "logo" || stage === "tagline") && (
              <motion.div
                key="logo-stage"
                initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute"
              >
                <LogoAnimation />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Brand Statement / Tagline Section */}
        <div className="mt-8 h-12 flex flex-col items-center justify-start overflow-hidden">
          <AnimatePresence mode="wait">
            {/* Show active system status label first */}
            {(stage === "intro" || stage === "nodes") && (
              <motion.div
                key="discipline-label"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.4, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-[10px] font-mono font-bold tracking-widest text-foreground uppercase"
              >
                {statusMessage}
              </motion.div>
            )}

            {/* Show finalized brand tagline statement */}
            {(stage === "logo" || stage === "tagline") && (
              <motion.div
                key="brand-label"
                initial={{ opacity: 0, y: 10 }}
                animate={stage === "tagline" ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-primary uppercase">
                  KODESEC
                </span>
                {stage === "tagline" && (
                  <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.05em" }}
                    animate={{ opacity: 0.8, letterSpacing: "0.15em" }}
                    transition={{ duration: 0.4 }}
                    className="text-xs font-sans font-medium text-foreground mt-1 whitespace-nowrap"
                  >
                    Engineering Secure Digital Products
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
