"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SolutionProcessStep } from "@/content/solutions/types";

interface ProcessTimelineProps {
  steps: SolutionProcessStep[];
  themeColor?: "primary" | "cyan" | "purple" | "amber";
}

export default function ProcessTimeline({ steps, themeColor = "primary" }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState(0);

  const colors = {
    primary: {
      text: "text-primary",
      bgActive: "bg-primary/5 border-primary shadow-[0_0_20px_rgba(54,226,123,0.08)]",
      bulletActive: "bg-primary"
    },
    cyan: {
      text: "text-cyan-400",
      bgActive: "bg-cyan-500/5 border-cyan-500 shadow-[0_0_20px_rgba(34,211,238,0.08)]",
      bulletActive: "bg-cyan-400"
    },
    purple: {
      text: "text-purple-400",
      bgActive: "bg-purple-500/5 border-purple-500 shadow-[0_0_20px_rgba(192,132,252,0.08)]",
      bulletActive: "bg-purple-400"
    },
    amber: {
      text: "text-amber-400",
      bgActive: "bg-amber-500/5 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.08)]",
      bulletActive: "bg-amber-400"
    }
  }[themeColor];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start text-left">
      {/* Steps List buttons */}
      <div className="lg:col-span-5 space-y-3">
        {steps.map((step, idx) => (
          <button
            key={step.title}
            onClick={() => setActiveStep(idx)}
            className={`w-full flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer gap-2
              ${activeStep === idx 
                ? colors.bgActive 
                : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]"}`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold font-mono ${activeStep === idx ? `${colors.text} font-black` : "text-gray-500"}`}>
                {step.label || `0${idx + 1}`}
              </span>
              <span className={`text-sm font-bold ${activeStep === idx ? "text-white" : "text-gray-400"}`}>
                {step.title}
              </span>
            </div>
            <span className={`text-[10px] font-mono font-medium sm:text-right ${activeStep === idx ? colors.text : "text-gray-500"}`}>
              {step.description}
            </span>
          </button>
        ))}
      </div>

      {/* Step details display */}
      <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0B0F1A]/60 p-6 md:p-8 backdrop-blur-md min-h-[240px] flex flex-col justify-between text-left relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${colors.text}`}>
              METHODOLOGY STAGE {steps[activeStep].label || `0${activeStep + 1}`}
            </span>
            
            <h3 className="mt-4 text-2xl font-black text-white tracking-tight">
              {steps[activeStep].title}
            </h3>
            
            <p className="mt-4 text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
              {steps[activeStep].detail}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar & Actions */}
        <div className="mt-8 border-t border-white/5 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span 
                key={i} 
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i <= activeStep ? colors.bulletActive : "bg-white/10"}`} 
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 text-[10px] font-bold text-white hover:bg-white/10 transition-all cursor-pointer font-mono"
          >
            NEXT STAGE
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
