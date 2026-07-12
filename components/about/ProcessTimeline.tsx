"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Map, Layers, Code, Shield, RefreshCw, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";

interface Step {
  label: string;
  title: string;
  desc: string;
  detail: string;
  icon: any;
  colorClass: string;
  accentText: string;
}

const steps: Step[] = [
  {
    label: "01",
    title: "Understand",
    desc: "Scope & Threat Profiling",
    detail: "We coordinate deep scoping workshops with your technical team to map API endpoints, database trust boundaries, user roles, and threat horizons. We define precise compliance and design metrics.",
    icon: Search,
    colorClass: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
    accentText: "text-cyan-400",
  },
  {
    label: "02",
    title: "Plan",
    desc: "Architecture Modeling",
    detail: "We lay down secure, highly scalable system architectures, identifying the correct technical stacks, cloud layout topologies, and security posture matrices to fit your long-term roadmap.",
    icon: Map,
    colorClass: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30",
    accentText: "text-blue-400",
  },
  {
    label: "03",
    title: "Design",
    desc: "Zero-Trust Engineering Systems",
    detail: "We architect network layouts, specify container communication rules, map custom authentication flows (OAuth/mTLS), and craft high-fidelity UI systems to map a premium client interface.",
    icon: Layers,
    colorClass: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
    accentText: "text-purple-400",
  },
  {
    label: "04",
    title: "Build",
    desc: "Secure Software Delivery",
    detail: "Our core engineering team writes production-grade, highly performant TypeScript code, provisions modular Infrastructure as Code (Terraform), and connects APIs under strict isolation standards.",
    icon: Code,
    colorClass: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    accentText: "text-emerald-400",
  },
  {
    label: "05",
    title: "Secure",
    desc: "Offensive Audits & Gates",
    detail: "We run offensive exploitation scripts, manual pen-tests, and embed automatic DevSecOps lints directly inside your GitHub deployment loop, blocking any compromised commits before release.",
    icon: Shield,
    colorClass: "from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30",
    accentText: "text-red-400",
  },
  {
    label: "06",
    title: "Improve",
    desc: "Continuous Posture Scaling",
    detail: "We evaluate real-time telemetry, trace latency, fix newly reported CVE vectors, check configurations for drift, and help align your tech stack with compliance certifications like SOC2/GDPR.",
    icon: RefreshCw,
    colorClass: "from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/30",
    accentText: "text-yellow-500",
  }
];

export default function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 px-4 lg:px-20 bg-background-dark/30 border-t border-white/5 relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
            Operational Blueprint
          </span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight leading-none">
            How We Deliver Work
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
            From code boundary analysis to deployment defense gates, we run a repeatable engineering lifecycle designed to secure and scale digital products.
          </p>
        </div>

        {/* 6-Step Stepper Component */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Stepper Buttons (Left Col) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer gap-2
                    ${activeStep === idx
                      ? "border-primary bg-primary/[0.03] shadow-[0_0_20px_rgba(54,226,123,0.06)]"
                      : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono font-bold ${activeStep === idx ? "text-primary font-black" : "text-gray-500"}`}>
                      {step.label}
                    </span>
                    <span className={`text-sm font-bold ${activeStep === idx ? "text-white" : "text-gray-400"}`}>
                      {step.title}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-medium ${activeStep === idx ? "text-primary" : "text-gray-500"}`}>
                      {step.desc}
                    </span>
                    <StepIcon size={14} className={activeStep === idx ? "text-primary" : "text-gray-500"} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Stepper Display Card (Right Col) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-white/5 bg-[#0F1424]/40 p-8 md:p-10 backdrop-blur-md min-h-[300px] flex flex-col justify-between text-left shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
              >
                {/* Glow Background Flare */}
                <div className={`absolute top-0 right-0 w-36 h-36 rounded-full bg-gradient-to-br ${steps[activeStep].colorClass} blur-[70px] opacity-25`} />

                <div className="relative z-10">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-widest ${steps[activeStep].accentText}`}>
                    OPERATIONAL LIFECYCLE 0{activeStep + 1}
                  </span>

                  <h3 className="mt-4 text-2xl md:text-3xl font-black text-white tracking-tight">
                    {steps[activeStep].title}
                  </h3>

                  <p className="mt-4 text-sm text-gray-400 leading-relaxed font-sans font-medium">
                    {steps[activeStep].detail}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  {/* Visual Progress Steps Indicator */}
                  <div className="flex items-center gap-1">
                    {steps.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1 w-5 rounded-full transition-all duration-300 ${i <= activeStep ? "bg-primary" : "bg-white/10"}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 text-[10px] font-bold text-white hover:bg-white/10 transition-all cursor-pointer font-mono"
                  >
                    NEXT STEP
                    <ChevronRight size={12} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
