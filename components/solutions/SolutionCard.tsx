"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { SolutionContent } from "@/content/solutions/types";

interface SolutionCardProps {
  solution: SolutionContent;
  index: number;
}

export default function SolutionCard({ solution, index }: SolutionCardProps) {
  const { slug, title, tagline, description, themeColor, iconName } = solution;

  // Dynamically resolve icon
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>>)[iconName] || LucideIcons.Shield;

  // Resolve theme coloring classes
  const themeClasses = {
    primary: {
      borderHover: "hover:border-primary/40",
      glow: "group-hover:shadow-[0_0_40px_rgba(54,226,123,0.15)]",
      textGlow: "text-primary group-hover:text-primary-light",
      bgBadge: "bg-primary/10 text-primary border-primary/20",
      btnBg: "bg-primary hover:bg-primary-hover text-[#0B0F1A]"
    },
    cyan: {
      borderHover: "hover:border-cyan-500/40",
      glow: "group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]",
      textGlow: "text-cyan-400 group-hover:text-cyan-300",
      bgBadge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      btnBg: "bg-cyan-400 hover:bg-cyan-500 text-[#0B0F1A]"
    },
    purple: {
      borderHover: "hover:border-purple-500/40",
      glow: "group-hover:shadow-[0_0_40px_rgba(192,132,252,0.15)]",
      textGlow: "text-purple-400 group-hover:text-purple-300",
      bgBadge: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      btnBg: "bg-purple-500 hover:bg-purple-600 text-white"
    },
    amber: {
      borderHover: "hover:border-amber-500/40",
      glow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
      textGlow: "text-amber-400 group-hover:text-amber-300",
      bgBadge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      btnBg: "bg-amber-500 hover:bg-amber-600 text-[#0B0F1A]"
    }
  }[themeColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col justify-between h-full p-6 md:p-8 rounded-3xl border border-white/10 bg-card/40 backdrop-blur-md transition-all duration-300 ${themeClasses.borderHover} ${themeClasses.glow} overflow-hidden`}
    >
      {/* Background Decorative Radial Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.02),transparent_60%)] pointer-events-none" />

      <div>
        {/* Header Icon / Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-2xl border ${themeClasses.bgBadge} transition-colors duration-300`}>
            <IconComponent className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
            SOLUTION 0{index + 1}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-none mb-3">
          {title}
        </h3>
        
        <p className="text-xs font-mono font-bold text-gray-400 tracking-wide mb-4 leading-normal">
          {tagline}
        </p>

        <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Button footer */}
      <div className="mt-auto">
        <Link 
          href={`/services/${slug}`}
          className={`inline-flex items-center gap-1.5 text-xs font-extrabold font-mono tracking-wider ${themeClasses.textGlow} transition-colors group-hover:underline`}
        >
          Explore Solution
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
