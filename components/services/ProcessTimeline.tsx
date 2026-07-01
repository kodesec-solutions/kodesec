"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function ProcessTimeline() {
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  const processSteps = [
    { name: "Scope", label: "01", desc: "Mapping target threat profile and boundaries.", detail: "We define precise technical boundaries, target repositories, APIs, IP subnets, and compliance frameworks to minimize scanning overlap and maximize exploitation accuracy." },
    { name: "Assess", label: "02", desc: "Executing audits and exploit attempts.", detail: "Our engineers run manual vulnerability audits, fuzzing, code reviews, and container checks, simulating real-world malicious actor workflows." },
    { name: "Validate", label: "03", desc: "Proving exploit impact without noise.", detail: "We construct safe Proof-of-Concepts (PoCs) to validate logic bypasses, SQL injections, or privilege escalation vectors, eliminating false positives entirely." },
    { name: "Report", label: "04", desc: "Delivering actionable remediation plans.", detail: "We publish a detailed developer-friendly report complete with severity scores (CVSS v3), precise code location maps, and exact patching code blocks." },
    { name: "Remediate", label: "05", desc: "Code help and final check validation.", detail: "We pair with your developers to verify patches, resolve cloud drift configurations, and run a complimentary re-test to certify compliance." }
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start text-left">
      {/* Steps Nav */}
      <div className="lg:col-span-5 space-y-3">
        {processSteps.map((step, idx) => (
          <button
            key={step.name}
            onClick={() => setActiveProcessStep(idx)}
            className={`w-full flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer gap-2
              ${activeProcessStep === idx 
                ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(54,226,123,0.08)]" 
                : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]"}`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold font-mono ${activeProcessStep === idx ? "text-primary font-black" : "text-gray-500"}`}>
                {step.label}
              </span>
              <span className={`text-sm font-bold ${activeProcessStep === idx ? "text-white" : "text-gray-400"}`}>
                {step.name}
              </span>
            </div>
            <span className={`text-[10px] font-mono font-medium sm:text-right ${activeProcessStep === idx ? "text-primary" : "text-gray-500"}`}>
              {step.desc}
            </span>
          </button>
        ))}
      </div>

      {/* Step Detail display panel */}
      <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0F1424]/60 p-6 md:p-8 backdrop-blur-md min-h-[220px] flex flex-col justify-between text-left">
        <div>
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
            METHODOLOGY STAGE 0{activeProcessStep + 1}
          </span>
          
          <h3 className="mt-4 text-2xl font-black text-white tracking-tight">
            {processSteps[activeProcessStep].name}
          </h3>
          
          <p className="mt-3.5 text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
            {processSteps[activeProcessStep].detail}
          </p>
        </div>

        {/* Progress visual bar */}
        <div className="mt-8 border-t border-white/5 pt-6 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i <= activeProcessStep ? "bg-primary" : "bg-white/10"}`} 
              />
            ))}
          </div>
          <button
            onClick={() => setActiveProcessStep((prev) => (prev + 1) % 5)}
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
