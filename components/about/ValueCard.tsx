"use client";

import React from "react";
import { motion } from "framer-motion";

import { Users, MessageSquare, Compass, Cpu, Activity, Shield } from "lucide-react";

interface ValueCardProps {
  title: string;
  description: string;
  iconName: string;
  glowColor: string;
  index: number;
}

const iconMap = {
  users: Users,
  message: MessageSquare,
  compass: Compass,
  cpu: Cpu,
  activity: Activity,
  shield: Shield
};

export default function ValueCard({ title, description, iconName, glowColor, index }: ValueCardProps) {
  const IconComp = iconMap[iconName as keyof typeof iconMap] || Users;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative rounded-[2rem] border border-white/5 bg-[#0F1424]/40 p-6 md:p-8 backdrop-blur-md transition-all duration-300 hover:border-white/10 flex flex-col items-start text-left hover:shadow-[0_15px_30px_rgba(0,0,0,0.25)] overflow-hidden`}
    >
      {/* Glow highlight */}
      <div className={`absolute top-0 left-0 w-24 h-24 rounded-full bg-gradient-to-br ${glowColor} blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/5 mb-5 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300">
        <IconComp className="h-5.5 w-5.5 text-gray-400 group-hover:text-primary transition-colors" />
      </div>

      <h3 className="text-base font-black text-white tracking-tight leading-tight">
        {title}
      </h3>

      <p className="mt-3.5 text-xs text-gray-400 leading-relaxed font-sans font-medium">
        {description}
      </p>
    </motion.div>
  );
}
