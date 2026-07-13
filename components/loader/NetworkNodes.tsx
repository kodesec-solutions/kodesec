"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Shield, Cloud, CheckCircle2 } from "lucide-react";

export default function NetworkNodes() {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.25,
      transition: {
        pathLength: { duration: 1.4, ease: "easeInOut" as const },
        opacity: { duration: 0.3 }
      }
    }
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (delay: number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay, duration: 0.5, type: "spring" as const, stiffness: 80 }
    })
  };

  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      {/* Central glow */}
      <div className="absolute w-24 h-24 rounded-full bg-primary/5 blur-xl pointer-events-none" />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full text-white/10 dark:text-white/10 light:text-black/10 fill-none stroke-current stroke-[1.5]"
      >
        <defs>
          <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#36E27B" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <linearGradient id="line-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
        </defs>

        {/* 1. Connecting Topology Lines (Spokes and Rings) */}
        {/* Outer Ring Diamond */}
        <motion.path
          d="M 100 40 L 160 100 L 100 160 L 40 100 Z"
          stroke="url(#line-grad-1)"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        {/* Horizontal & Vertical Cross spokes */}
        <motion.path
          d="M 40 100 H 160"
          stroke="rgba(255,255,255,0.05)"
          strokeDasharray="3 3"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.path
          d="M 100 40 V 160"
          stroke="rgba(255,255,255,0.05)"
          strokeDasharray="3 3"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* 2. Orbiting Data Packet Pulses */}
        {/* Diamond Outer Loop */}
        <motion.circle cx="0" cy="0" r="3" fill="#36E27B" stroke="none"
          animate={{
            cx: [100, 160, 100, 40, 100],
            cy: [40, 100, 160, 100, 40]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Inward data flows */}
        <motion.circle cx="40" cy="100" r="2.5" fill="#22D3EE" stroke="none"
          animate={{ cx: [40, 100] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle cx="160" cy="100" r="2.5" fill="#C084FC" stroke="none"
          animate={{ cx: [160, 100] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
        />
      </svg>

      {/* 3. Labeled Micro-Node Badges placed over coordinates */}
      {/* Top Node: Cloud & DevOps */}
      <motion.div
        custom={0.3}
        variants={nodeVariants}
        initial="hidden"
        animate="visible"
        className="absolute top-[8%] flex flex-col items-center gap-1"
      >
        <div className="h-10 w-10 rounded-xl bg-[#050810] border border-cyan-500/30 flex items-center justify-center shadow-lg">
          <Cloud size={16} className="text-cyan-400" />
        </div>
        <span className="text-[7.5px] font-mono font-bold tracking-wider text-cyan-400">OPS</span>
      </motion.div>

      {/* Left Node: Design & Engineering */}
      <motion.div
        custom={0.5}
        variants={nodeVariants}
        initial="hidden"
        animate="visible"
        className="absolute left-[8%] flex flex-col items-center gap-1"
      >
        <div className="h-10 w-10 rounded-xl bg-[#050810] border border-primary/30 flex items-center justify-center shadow-lg">
          <Code size={16} className="text-primary" />
        </div>
        <span className="text-[7.5px] font-mono font-bold tracking-wider text-primary">DEV</span>
      </motion.div>

      {/* Right Node: Quality Assurance */}
      <motion.div
        custom={0.7}
        variants={nodeVariants}
        initial="hidden"
        animate="visible"
        className="absolute right-[8%] flex flex-col items-center gap-1"
      >
        <div className="h-10 w-10 rounded-xl bg-[#050810] border border-purple-500/30 flex items-center justify-center shadow-lg">
          <CheckCircle2 size={16} className="text-purple-400" />
        </div>
        <span className="text-[7.5px] font-mono font-bold tracking-wider text-purple-400">QA</span>
      </motion.div>

      {/* Bottom Node: Network & Security */}
      <motion.div
        custom={0.9}
        variants={nodeVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-[8%] flex flex-col items-center gap-1"
      >
        <div className="h-10 w-10 rounded-xl bg-[#050810] border border-red-500/30 flex items-center justify-center shadow-lg">
          <Shield size={16} className="text-red-400" />
        </div>
        <span className="text-[7.5px] font-mono font-bold tracking-wider text-red-400">SEC</span>
      </motion.div>

      {/* Central Convergence Core Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.1, type: "spring", stiffness: 100 }}
        className="absolute h-9 w-9 rounded-full bg-[#050810] border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]"
      >
        <span className="text-[9px] font-mono font-bold text-white tracking-widest pl-0.5">KS</span>
      </motion.div>
    </div>
  );
}
