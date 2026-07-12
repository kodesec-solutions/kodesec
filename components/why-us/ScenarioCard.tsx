"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface ScenarioCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  active: boolean;
  onHover: () => void;
}

export default function ScenarioCard({ title, description, icon: Icon, active, onHover }: ScenarioCardProps) {
  return (
    <motion.div
      onMouseEnter={onHover}
      whileHover={{ y: -2 }}
      className={`relative rounded-3xl border p-6 flex flex-col justify-between items-start text-left cursor-pointer transition-all duration-300 h-full
        ${active 
          ? "border-primary bg-primary/5 shadow-[0_0_25px_rgba(54,226,123,0.08)]" 
          : "border-white/5 bg-[#0F1424]/40 hover:border-white/10 hover:bg-[#0F1424]/60"
        }`}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 mb-5 text-gray-400">
        <Icon size={18} className={active ? "text-primary animate-pulse" : "text-gray-400"} />
      </div>
      <div>
        <h3 className={`text-sm font-bold tracking-tight transition-colors duration-300 ${active ? "text-primary" : "text-gray-200"}`}>
          {title}
        </h3>
        <p className="mt-2 text-xs text-gray-400 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
