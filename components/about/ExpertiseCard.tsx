"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code, Shield, Cloud } from "lucide-react";

interface ExpertiseCardProps {
  title: string;
  description: string;
  outcomes: string[];
  iconName: string;
  link: string;
  glowClass: string;
  index: number;
}

const iconMap = {
  code: Code,
  shield: Shield,
  cloud: Cloud,
  check: CheckCircle2
};

export default function ExpertiseCard({
  title,
  description,
  outcomes,
  iconName,
  link,
  glowClass,
  index
}: ExpertiseCardProps) {
  const IconComp = iconMap[iconName as keyof typeof iconMap] || Code;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-[2rem] border border-white/5 bg-[#0F1424]/40 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between text-left ${glowClass}`}
    >
      <div>
        {/* Animated Top Icon Banner */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/5 mb-6 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-500">
          <IconComp className="h-6 w-6 text-gray-400 group-hover:text-primary transition-colors duration-500" />
        </div>

        <h3 className="text-xl font-black text-white tracking-tight leading-snug">
          {title}
        </h3>

        <p className="mt-4 text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
          {description}
        </p>

        {/* Business Outcomes Section */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <h4 className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-3.5">
            Key Outcomes
          </h4>
          <ul className="space-y-2">
            {outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                <span className="font-sans font-medium leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 pt-4 border-t border-white/5">
        <Link
          href={link}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gray-400 group-hover:text-primary transition-colors cursor-pointer"
        >
          EXPLORE SOLUTION
          <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
