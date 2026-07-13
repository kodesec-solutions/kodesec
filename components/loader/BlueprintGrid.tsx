"use client";

import React from "react";
import { motion } from "framer-motion";

export default function BlueprintGrid() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10"
    >
      {/* Blueprint Grid Lines using SVG Pattern */}
      <svg className="absolute inset-0 w-full h-full text-white/[0.025] dark:text-white/[0.025] light:text-black/[0.025] stroke-current fill-none">
        <defs>
          {/* Small Grid pattern */}
          <pattern id="small-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" strokeWidth="0.5" />
          </pattern>
          {/* Major Grid pattern */}
          <pattern id="major-grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <rect width="100" height="100" fill="url(#small-grid)" />
            <path d="M 100 0 L 0 0 0 100" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#major-grid)" />
      </svg>

      {/* Blueprint Technical Markup details (crosshairs, corners, coordinates) */}
      <div className="absolute top-6 left-6 font-mono text-[9px] text-white/20 dark:text-white/20 light:text-black/20 tracking-wider">
        SYS.LOC // 45.9082
      </div>
      <div className="absolute top-6 right-6 font-mono text-[9px] text-white/20 dark:text-white/20 light:text-black/20 tracking-wider">
        STATUS // ACTIVE
      </div>
      <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/20 dark:text-white/20 light:text-black/20 tracking-wider">
        KODESEC // BUILD.0.1.0
      </div>
      <div className="absolute bottom-6 right-6 font-mono text-[9px] text-white/20 dark:text-white/20 light:text-black/20 tracking-wider">
        DISCIPLINE // ALL_SYSTEMS
      </div>

      {/* Focal Ring Crosshairs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] rounded-full border border-dashed border-white/[0.02] dark:border-white/[0.02] light:border-black/[0.02] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full border border-dashed border-white/[0.015] dark:border-white/[0.015] light:border-black/[0.015] pointer-events-none" />
    </motion.div>
  );
}
