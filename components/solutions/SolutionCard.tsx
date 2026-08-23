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
  const { slug, title, tagline, description, iconName } = solution;

  // Dynamically resolve icon
  const IconComponent = (LucideIcons as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>>)[iconName] || LucideIcons.Shield;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col justify-between h-full p-6 md:p-8 rounded-3xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(54,226,123,0.12)] overflow-hidden"
    >
      {/* Background Decorative Radial Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(54,226,123,0.04),transparent_70%)] pointer-events-none" />

      <div>
        {/* Header Icon / Badge */}
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-black">
            <IconComponent className="h-6 w-6" />
          </div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
            SOLUTION 0{index + 1}
          </span>
        </div>

        {/* Content */}
        <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight leading-snug mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-xs font-mono font-medium text-primary/90 tracking-wide mb-4 leading-normal">
          {tagline}
        </p>

        <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Button footer */}
      <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
        <Link 
          href={`/services/${slug}`}
          className="inline-flex items-center gap-2 text-xs font-heading font-semibold text-white group-hover:text-primary transition-colors"
        >
          Explore Solution
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5 text-primary" />
        </Link>
      </div>
    </motion.div>
  );
}
