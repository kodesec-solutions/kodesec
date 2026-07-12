"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SolutionFaq } from "@/content/solutions/types";

interface FAQAccordionProps {
  items: SolutionFaq[];
  themeColor?: "primary" | "cyan" | "purple" | "amber";
}

export default function FAQAccordion({ items, themeColor = "primary" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const colors = {
    primary: "text-primary border-primary/20",
    cyan: "text-cyan-400 border-cyan-500/20",
    purple: "text-purple-400 border-purple-500/20",
    amber: "text-amber-400 border-amber-500/20"
  }[themeColor];

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  return (
    <div className="space-y-4 text-left">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;

        return (
          <div 
            key={idx}
            className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-white hover:bg-white/[0.02] transition-colors cursor-pointer"
            >
              <span className="text-sm md:text-base leading-snug">{item.question}</span>
              <ChevronDown 
                size={18} 
                className={`transition-transform duration-300 shrink-0 ${isOpen ? `rotate-180 ${colors.split(" ")[0]}` : "text-gray-500"}`} 
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="p-5 pt-0 border-t border-white/5 text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
