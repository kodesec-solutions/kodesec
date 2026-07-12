"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

interface SolutionHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  themeColor?: "primary" | "cyan" | "purple" | "amber";
}

export default function SolutionHero({
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
  themeColor = "primary"
}: SolutionHeroProps) {
  
  const gradients = {
    primary: "from-primary via-emerald-400 to-accent-cyan",
    cyan: "from-cyan-400 via-sky-400 to-primary",
    purple: "from-purple-400 via-pink-400 to-indigo-400",
    amber: "from-amber-400 via-yellow-400 to-orange-400"
  }[themeColor];

  const primaryBtn = {
    primary: "bg-primary hover:bg-primary-hover hover:shadow-[0_0_25px_rgba(54,226,123,0.3)] text-[#0B0F1A]",
    cyan: "bg-cyan-400 hover:bg-cyan-500 hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] text-[#0B0F1A]",
    purple: "bg-purple-500 hover:bg-purple-600 hover:shadow-[0_0_25px_rgba(192,132,252,0.3)] text-white",
    amber: "bg-amber-500 hover:bg-amber-600 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] text-[#0B0F1A]"
  }[themeColor];

  const badgeColor = {
    primary: "bg-primary/10 border-primary/20 text-primary",
    cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    purple: "bg-purple-500/10 border-purple-500/20 text-purple-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400"
  }[themeColor];

  return (
    <div className="relative text-left z-10 w-full min-w-0">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-widest uppercase mb-6 ${badgeColor}`}
      >
        {badge}
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.05]"
      >
        {title.split(" ").slice(0, -2).join(" ")}{" "}
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradients} font-black`}>
          {title.split(" ").slice(-2).join(" ")}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-sm md:text-base leading-relaxed text-gray-400 max-w-lg font-medium"
      >
        {subtitle}
      </motion.p>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto"
      >
        <Link
          href={primaryCtaHref}
          className={`w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold transition-all cursor-pointer ${primaryBtn}`}
        >
          {primaryCtaLabel}
          <ArrowRight size={16} />
        </Link>
        
        {secondaryCtaLabel && secondaryCtaHref && (
          <Link
            href={secondaryCtaHref}
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-8 text-sm font-bold text-white transition-all hover:bg-white/[0.06] hover:border-white/20 cursor-pointer"
          >
            <Calendar size={16} />
            {secondaryCtaLabel}
          </Link>
        )}
      </motion.div>
    </div>
  );
}
