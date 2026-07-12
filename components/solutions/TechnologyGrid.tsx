"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SolutionTechnology } from "@/content/solutions/types";

interface TechnologyGridProps {
  technologies: SolutionTechnology[];
}

export default function TechnologyGrid({ technologies }: TechnologyGridProps) {
  // Extract categories
  const categories = Array.from(new Set(technologies.map(t => t.category)));
  const [activeTab, setActiveTab] = useState(categories[0] || "");

  // Fallback check if categories are empty
  if (categories.length === 0) return null;

  const filteredTech = technologies.filter(t => t.category === activeTab);

  return (
    <div className="space-y-8 text-center max-w-4xl mx-auto">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-muted/20 border border-white/5 w-fit mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer font-mono
              ${activeTab === cat 
                ? "bg-primary text-[#0B0F1A] shadow-[0_0_15px_rgba(54,226,123,0.3)]" 
                : "text-gray-400 hover:text-white"}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="relative min-h-[160px]">
        <motion.div 
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 justify-center"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className={`p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center transition-all duration-300 ${tech.glow}`}
              >
                <span className="text-sm font-extrabold text-white tracking-wide">
                  {tech.name}
                </span>
                <span className="text-[9px] font-mono text-gray-500 mt-1 uppercase">
                  {tech.category}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
