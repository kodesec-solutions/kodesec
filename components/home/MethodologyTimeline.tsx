"use client";

import React, { useState } from "react";
import { homeConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export default function MethodologyTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = homeConfig.steps;

  return (
    <div className="relative">
      {/* Desktop timeline path line */}
      <div className="absolute top-[45px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-primary via-cyan-400 to-purple-400 hidden lg:block opacity-25" />

      <div className="grid gap-8 lg:grid-cols-5 relative">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          return (
            <div 
              key={idx}
              onMouseEnter={() => setActiveStep(idx)}
              className="flex flex-col items-center lg:items-start text-center lg:text-left group cursor-pointer"
            >
              {/* Step Bubble */}
              <div 
                className={cn(
                  "relative flex h-20 w-20 items-center justify-center rounded-3xl border text-xl font-black font-mono transition-all duration-300 mb-6 bg-[#0F1424]",
                  isActive 
                    ? "border-primary bg-primary/10 text-primary shadow-[0_0_25px_rgba(54,226,123,0.2)] scale-105" 
                    : "border-white/5 text-gray-500 hover:border-white/20 hover:text-white"
                )}
              >
                {step.label}
                {isActive && (
                  <span className="absolute inset-[-4px] rounded-[1.8rem] border border-primary/25 animate-ping opacity-60 pointer-events-none" />
                )}
              </div>

              <h3 className={cn("text-base font-black tracking-tight transition-colors", isActive ? "text-white" : "text-gray-300 group-hover:text-white")}>
                {step.title}
              </h3>
              
              <p className="mt-2.5 text-xs text-gray-400 leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
