"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Layers, Code2, Workflow, Activity, RefreshCw, Plus, Minus } from "lucide-react";

const iconMap = {
  shield: ShieldCheck,
  layers: Layers,
  code: Code2,
  workflow: Workflow,
  activity: Activity,
  refresh: RefreshCw,
};

export interface Principle {
  title: string;
  summary: string;
  detail: string;
  icon: string;
}

export interface PrincipleCardProps {
  principle: Principle;
}

export default function PrincipleCard({ principle }: PrincipleCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = iconMap[principle.icon as keyof typeof iconMap] || ShieldCheck;

  return (
    <motion.div
      layout
      onClick={() => setIsOpen(!isOpen)}
      className="group relative rounded-3xl border border-white/5 bg-gradient-to-b from-[#0F1424]/40 to-[#0A0D18]/60 p-6 backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-primary/20 text-left h-fit"
    >
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border border-white/5 text-gray-400 group-hover:text-primary transition-colors duration-300">
            <IconComponent size={20} />
          </div>
          <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors duration-300">
            {principle.title}
          </h3>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.02] border border-white/5 text-gray-400 group-hover:text-white transition-colors duration-300">
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </div>
      </div>

      {/* Summary always visible */}
      <p className="mt-4 text-xs md:text-sm text-gray-400 font-medium leading-relaxed">
        {principle.summary}
      </p>

      {/* Expandable detailed section */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 pt-3">
              <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-semibold">
                {principle.detail}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
