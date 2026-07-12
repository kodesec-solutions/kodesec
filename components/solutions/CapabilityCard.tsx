"use client";

import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { SolutionCapability } from "@/content/solutions/types";

interface CapabilityCardProps {
  capability: SolutionCapability;
  themeColor: "primary" | "cyan" | "purple" | "amber";
  index: number;
}

export default function CapabilityCard({ capability, themeColor, index }: CapabilityCardProps) {
  const { title, description, outcome, iconName } = capability;

  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Cpu;

  const colorConfig = {
    primary: {
      text: "text-primary",
      bgBadge: "bg-primary/5 text-primary border-primary/20",
      glow: "group-hover:shadow-[0_0_25px_rgba(54,226,123,0.1)] hover:border-primary/30"
    },
    cyan: {
      text: "text-cyan-400",
      bgBadge: "bg-cyan-500/5 text-cyan-400 border-cyan-500/20",
      glow: "group-hover:shadow-[0_0_25px_rgba(34,211,238,0.1)] hover:border-cyan-500/30"
    },
    purple: {
      text: "text-purple-400",
      bgBadge: "bg-purple-500/5 text-purple-400 border-purple-500/20",
      glow: "group-hover:shadow-[0_0_25px_rgba(192,132,252,0.1)] hover:border-purple-500/30"
    },
    amber: {
      text: "text-amber-400",
      bgBadge: "bg-amber-500/5 text-amber-400 border-amber-500/20",
      glow: "group-hover:shadow-[0_0_25px_rgba(245,158,11,0.1)] hover:border-amber-500/30"
    }
  }[themeColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`group p-6 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] transition-all duration-300 ${colorConfig.glow} flex flex-col justify-between h-full`}
    >
      <div>
        {/* Header Icon */}
        <div className={`p-2.5 rounded-xl border w-fit ${colorConfig.bgBadge} mb-4`}>
          <IconComponent className="h-5 w-5" />
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-white tracking-tight leading-snug mb-2">
          {title}
        </h4>

        {/* Description */}
        <p className="text-xs text-gray-400 font-medium leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {/* Outcome Badge */}
      <div className="mt-auto border-t border-white/5 pt-3">
        <span className="text-[9px] font-mono font-bold tracking-wider text-gray-500 block uppercase mb-1">
          Business Outcome
        </span>
        <span className={`text-[10px] font-bold ${colorConfig.text} leading-snug`}>
          {outcome}
        </span>
      </div>
    </motion.div>
  );
}
