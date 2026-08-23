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
  themeColor?: string;
}

export default function SolutionHero({
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  primaryCtaHref,
  secondaryCtaLabel,
  secondaryCtaHref,
}: SolutionHeroProps) {
  return (
    <div className="relative text-left z-10 w-full min-w-0">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-mono font-bold tracking-widest uppercase mb-6"
      >
        <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
        <span className="whitespace-nowrap">{badge}</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-white leading-tight"
      >
        {title.split(" ").slice(0, -2).join(" ")}{" "}
        <span className="text-gradient-emerald">
          {title.split(" ").slice(-2).join(" ")}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-sm md:text-base leading-relaxed text-gray-400 max-w-xl font-sans"
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
          className="btn-primary"
        >
          <span>{primaryCtaLabel}</span>
          <ArrowRight size={16} className="shrink-0" />
        </Link>
        
        {secondaryCtaLabel && secondaryCtaHref && (
          <Link
            href={secondaryCtaHref}
            className="btn-secondary"
          >
            <Calendar size={16} className="text-primary shrink-0" />
            <span>{secondaryCtaLabel}</span>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
