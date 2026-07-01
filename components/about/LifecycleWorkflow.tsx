"use client";

import React, { useState } from "react";
import { aboutConfig } from "@/config/site";
import { ChevronRight } from "lucide-react";

export default function LifecycleWorkflow() {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);
  const workflowSteps = aboutConfig.workflowSteps;

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start text-left">
      <div className="lg:col-span-5 space-y-3">
        {workflowSteps.map((step, idx) => (
          <button
            key={step.title}
            onClick={() => setActiveWorkflowStep(idx)}
            className={`w-full flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer gap-2
              ${activeWorkflowStep === idx 
                ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(54,226,123,0.08)]" 
                : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]"}`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold font-mono ${activeWorkflowStep === idx ? "text-primary font-black" : "text-gray-500"}`}>
                {step.label}
              </span>
              <span className={`text-sm font-bold ${activeWorkflowStep === idx ? "text-white" : "text-gray-400"}`}>
                {step.title}
              </span>
            </div>
            <span className={`text-[10px] font-mono font-medium sm:text-right ${activeWorkflowStep === idx ? "text-primary" : "text-gray-500"}`}>
              {step.desc}
            </span>
          </button>
        ))}
      </div>

      <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0F1424]/60 p-6 md:p-8 backdrop-blur-md min-h-[220px] flex flex-col justify-between text-left">
        <div>
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
            OPERATIONAL LIFECYCLE 0{activeWorkflowStep + 1}
          </span>
          <h3 className="mt-4 text-2xl font-black text-white tracking-tight">
            {workflowSteps[activeWorkflowStep].title}
          </h3>
          <p className="mt-3.5 text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
            {workflowSteps[activeWorkflowStep].detail}
          </p>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i <= activeWorkflowStep ? "bg-primary" : "bg-white/10"}`} 
              />
            ))}
          </div>
          <button
            onClick={() => setActiveWorkflowStep((prev) => (prev + 1) % 5)}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 text-[10px] font-bold text-white hover:bg-white/10 transition-all cursor-pointer font-mono"
          >
            NEXT STEP
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
