"use client";

import React, { useState } from "react";
import { aboutConfig } from "@/config/site";
import { ChevronRight } from "lucide-react";

export default function FounderStoryTimeline() {
  const [activeStoryStep, setActiveStoryStep] = useState(4);
  const storySteps = aboutConfig.storySteps;
  const storyDetails = aboutConfig.storyPathDetails;

  return (
    <div className="grid gap-10 lg:grid-cols-12 items-center text-left">
      {/* Timeline selector */}
      <div className="lg:col-span-5 space-y-3">
        {storySteps.map((step, idx) => (
          <button
            key={step.name}
            onClick={() => setActiveStoryStep(idx)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer 
              ${activeStoryStep === idx 
                ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(54,226,123,0.08)]" 
                : "border-white/5 bg-white/[0.01] hover:border-white/10"}`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold font-mono ${activeStoryStep === idx ? "text-primary font-black" : "text-gray-500"}`}>
                {step.label}
              </span>
              <span className={`text-sm font-bold ${activeStoryStep === idx ? "text-white" : "text-gray-400"}`}>
                {step.name}
              </span>
            </div>
            <ChevronRight size={14} className={activeStoryStep === idx ? "text-primary" : "text-gray-500"} />
          </button>
        ))}
      </div>

      {/* Display Panel */}
      <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0F1424]/60 p-6 md:p-8 backdrop-blur-md min-h-[200px] flex flex-col justify-between text-left">
        <div>
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
            DISCIPLINE CONVERGENCE LOOP
          </span>
          
          <h3 className="mt-4 text-2xl font-black text-white tracking-tight">
            {storySteps[activeStoryStep].name}
          </h3>
          
          <p className="mt-3.5 text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
            {storySteps[activeStoryStep].desc}
          </p>

          <p className="mt-4 text-xs text-gray-400 leading-relaxed font-sans font-medium opacity-85">
            {storyDetails[activeStoryStep]}
          </p>
        </div>

        <div className="mt-8 border-t border-white/5 pt-4 flex items-center justify-between font-mono text-[10px] text-gray-500">
          <span>STORY PATH PROGRESS</span>
          <span>STEP 0{activeStoryStep + 1} / 05</span>
        </div>
      </div>
    </div>
  );
}
