"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Shield, Cpu, Code, Zap, Workflow } from "lucide-react";

const iconMap = {
  users: Users,
  shield: Shield,
  cpu: Cpu,
  code: Code,
  zap: Zap,
  workflow: Workflow,
};

export interface TrustCardProps {
  title: string;
  description: string;
  icon: string;
  glowColor: string;
}

export default function TrustCard({ title, description, icon, glowColor }: TrustCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Shield;
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative rounded-3xl border border-white/5 bg-gradient-to-b from-[#0F1424]/40 to-[#0A0D18]/60 p-6 md:p-8 backdrop-blur-md overflow-hidden text-left h-full flex flex-col justify-between"
    >
      <div>
        {/* Background Hover Glow */}
        <div className={`absolute -right-16 -top-16 w-32 h-32 rounded-full bg-gradient-to-br ${glowColor} to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

        {/* Decorative inner gradient line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-primary/20 transition-all duration-500" />

        {/* Custom Icon Wrapper with animated ring */}
        <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/5 text-gray-400 group-hover:text-primary group-hover:border-primary/30 group-hover:bg-primary/5 transition-all duration-300 mb-6">
          <IconComponent className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
          <span className="absolute inset-0 rounded-2xl border border-primary/40 opacity-0 scale-95 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="mt-3 text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}
