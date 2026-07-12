"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Layers, Code2, ShieldCheck, CloudLightning, ChevronRight } from "lucide-react";

export interface TimelineStep {
  title: string;
  description: string;
  detailedDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const steps: TimelineStep[] = [
  {
    title: "Discovery",
    description: "We understand your business goals, challenges, and technical requirements.",
    detailedDesc: "Our technical founders meet directly with your engineering leaders to map out platform dependencies, legacy code bottlenecks, security targets, and compliance requirements to shape a roadmap.",
    icon: Search,
    color: "text-primary border-primary/20 bg-primary/5",
  },
  {
    title: "Architecture & Planning",
    description: "We design scalable, secure, and maintainable solutions before writing code.",
    detailedDesc: "We map out cloud-native architectures, conduct thorough threat modeling, plan API gateway structures, and document least-privilege policies so everyone aligns on secure patterns from the start.",
    icon: Layers,
    color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
  },
  {
    title: "Implementation",
    description: "We build using modern engineering practices with security integrated throughout development.",
    detailedDesc: "Our senior developers write clean, maintainable code using TypeScript, Go, or Rust, setting up automated security linters, Git pipeline checkpoints, and infrastructure-as-code automation.",
    icon: Code2,
    color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
  },
  {
    title: "Testing & Validation",
    description: "Every solution is verified through quality assurance and security validation.",
    detailedDesc: "We validate logic boundaries via manual pentesting and execute targeted vulnerability checks. We deliver concrete, actionable patch reports rather than automated scanner outputs.",
    icon: ShieldCheck,
    color: "text-red-400 border-red-500/20 bg-red-500/5",
  },
  {
    title: "Deployment & Support",
    description: "We help deploy, monitor, and continuously improve your systems.",
    detailedDesc: "We assist in configuring production rollouts, implement robust cloud runtime monitoring, and provide secure advisory retainers to support long-term feature releases.",
    icon: CloudLightning,
    color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  },
];

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start text-left w-full">
      {/* Sidebar selectors */}
      <div className="lg:col-span-5 space-y-3 w-full">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = activeStep === idx;
          return (
            <button
              key={step.title}
              onClick={() => setActiveStep(idx)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer 
                ${isActive 
                  ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(54,226,123,0.08)]" 
                  : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"}`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-xs font-bold font-mono ${isActive ? "text-primary font-black" : "text-gray-500"}`}>
                  0{idx + 1}
                </span>
                <div className={`p-2 rounded-lg border ${step.color} shrink-0`}>
                  <StepIcon className="size-4" />
                </div>
                <span className={`text-sm font-bold ${isActive ? "text-white" : "text-gray-300"}`}>
                  {step.title}
                </span>
              </div>
              <ChevronRight size={14} className={isActive ? "text-primary translate-x-0.5" : "text-gray-500"} />
            </button>
          );
        })}
      </div>

      {/* Display Panel */}
      <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0F1424]/60 p-6 md:p-8 backdrop-blur-md min-h-[300px] flex flex-col justify-between text-left relative overflow-hidden w-full">
        {/* Glow */}
        <div className="absolute -right-20 -top-20 w-40 h-40 rounded-full bg-primary/5 blur-[50px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
              LIFECYCLE PHASE 0{activeStep + 1}
            </span>
            
            <h3 className="mt-4 text-2xl font-black text-white tracking-tight">
              {steps[activeStep].title}
            </h3>
            
            <p className="mt-3.5 text-sm text-gray-200 leading-relaxed font-semibold">
              {steps[activeStep].description}
            </p>

            <p className="mt-3 text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
              {steps[activeStep].detailedDesc}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 border-t border-white/5 pt-6 flex items-center justify-between z-10">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <span 
                key={i} 
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i <= activeStep ? "bg-primary" : "bg-white/10"}`} 
              />
            ))}
          </div>
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 text-[10px] font-bold text-white hover:bg-white/10 transition-all cursor-pointer font-mono"
          >
            NEXT PHASE
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
