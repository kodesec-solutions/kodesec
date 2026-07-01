"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function ThinkStepsTimeline() {
  const [activeThinkStep, setActiveThinkStep] = useState(0);

  const thinkSteps = [
    { name: "Goals", label: "01", title: "Understand Business Goals", desc: "Identify sensitive ledger systems, database assets, and critical access gates." },
    { name: "Architecture", label: "02", title: "Understand Architecture", desc: "Deconstruct cluster boundaries, service accounts, and API auth pathways." },
    { name: "Identify Risk", label: "03", title: "Identify Risk Profiles", desc: "Run threat modeling and discover potential lateral injection channels." },
    { name: "Validate", label: "04", title: "Validate Findings", desc: "Execute proof-of-concept exploits to confirm active vulnerability exposure." },
    { name: "Remediate", label: "05", title: "Deliver Remediation", desc: "Deliver direct developer lints, configuration patches, and re-test parameters." }
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-12 items-start text-left">
      {/* Timeline sidebar selectors */}
      <div className="lg:col-span-5 space-y-3">
        {thinkSteps.map((step, idx) => (
          <button
            key={step.name}
            onClick={() => setActiveThinkStep(idx)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer 
              ${activeThinkStep === idx 
                ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(54,226,123,0.08)]" 
                : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"}`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold font-mono ${activeThinkStep === idx ? "text-primary font-black" : "text-gray-500"}`}>
                {step.label}
              </span>
              <span className={`text-sm font-bold ${activeThinkStep === idx ? "text-white" : "text-gray-400"}`}>
                {step.name}
              </span>
            </div>
            <ChevronRight size={14} className={activeThinkStep === idx ? "text-primary" : "text-gray-500"} />
          </button>
        ))}
      </div>

      {/* Display Panel */}
      <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-[#0F1424]/60 p-6 md:p-8 backdrop-blur-md min-h-[220px] flex flex-col justify-between text-left">
        <div>
          <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
            OUTCOME PATH STAGE 0{activeThinkStep + 1}
          </span>
          
          <h3 className="mt-4 text-2xl font-black text-white tracking-tight">
            {thinkSteps[activeThinkStep].title}
          </h3>
          
          <p className="mt-3.5 text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
            {thinkSteps[activeThinkStep].desc}
          </p>

          <p className="mt-4 text-xs text-gray-400 leading-relaxed font-sans font-medium opacity-85">
            {activeThinkStep === 0 && "We align security boundaries with your operational priorities. If you are a Fintech, we prioritize transaction gateways. If you are SaaS, we secure tenant isolation borders."}
            {activeThinkStep === 1 && "We analyze how authorization is inherited across microservices, validating authentication tokens and cloud IAM bounds."}
            {activeThinkStep === 2 && "We draft data flows and identify exploit pathways, mapping out where bad inputs or privilege overrides could bypass validation."}
            {activeThinkStep === 3 && "Our engineers attempt to exploit the identified risks manually, confirming the vulnerabilities exist and showing proof of breach."}
            {activeThinkStep === 4 && "We write precise developer lints, config variables, and secure API templates. We re-test and lock the vulnerability completely."}
          </p>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 flex items-center justify-between">
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${i <= activeThinkStep ? "bg-primary" : "bg-white/10"}`} 
              />
            ))}
          </div>
          <button
            onClick={() => setActiveThinkStep((prev) => (prev + 1) % 5)}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 text-[10px] font-bold text-white hover:bg-white/10 transition-all cursor-pointer font-mono"
          >
            NEXT
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}
