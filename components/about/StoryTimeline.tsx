"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Cloud, Terminal, CheckCircle2, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/container";

interface StoryStep {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  solution: string;
  icon: any;
  color: string;
}

const storySteps: StoryStep[] = [
  {
    year: "Step 01",
    title: "The Fragmented Status Quo",
    subtitle: "Scattered Vendors, Divided Focus",
    description: "In the traditional landscape, companies routinely hire separate agencies for custom software development, cloud infrastructure design, quality testing, and cybersecurity. Each vendor focuses on its own narrow silo.",
    problem: "❌ Misaligned priorities: developers push code fast, DevOps sets up default configs, testers look for bugs post-release, and security acts as an audit bottleneck at the very end.",
    solution: "💡 The insight: real security and speed can only exist when engineering, operations, testing, and defensive security are engineered together from line one.",
    icon: Terminal,
    color: "from-red-500/20 to-orange-500/20 text-red-400 border-red-500/30",
  },
  {
    year: "Step 02",
    title: "Aligning The Disciplines",
    subtitle: "Four Specialized Competencies",
    description: "We realized that code reliability, cloud scalability, testing coverage, and offensive security audits must overlap. We began aligning frameworks to form a singular DevSecOps lifecycle.",
    problem: "❌ Siloed teams produce handoff latency, cloud misconfigurations, untested edge cases, and vulnerable code structures.",
    solution: "💡 The convergence: mapping out a unified software delivery cycle where every architecture choice is threat-modeled, and QA tests match production security postures.",
    icon: Cloud,
    color: "from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/30",
  },
  {
    year: "Step 03",
    title: "Founding Kodesec",
    subtitle: "A Unified Engineering Team",
    description: "Kodesec was founded by Yaser, Mian, Nafiul, and Ashikul to bridge these massive gaps. By combining Design & Engineering, Cyber Security, DevOps, and QA into one collective brain, we eliminate vendor friction.",
    problem: "❌ Startup founders waste time managing 3+ contracts, and technical debt builds up due to poor communication between vendors.",
    solution: "💡 The Kodesec model: direct developer-to-client collaboration with technical owners. We design, code, automate, test, and protect your digital platforms under one roof.",
    icon: Shield,
    color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
  },
  {
    year: "Step 04",
    title: "Authentic Delivery",
    subtitle: "Zero Middlemen, Direct Access",
    description: "Today, we run Kodesec as a highly technical, founder-led consultancy. When you work with us, you speak directly with the engineers writing the code, hardening the servers, and auditing the APIs.",
    problem: "❌ Traditional IT agencies shield developers with layers of sales reps and non-technical account managers.",
    solution: "💡 Our promise: 100% transparency, direct Slack/Discord channels to active founders, code-level recommendations, and zero inflated corporate overhead.",
    icon: CheckCircle2,
    color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
  }
];

export default function StoryTimeline() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 px-4 lg:px-20 bg-background-dark/50 border-t border-white/5 relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
            Our Origin Story
          </span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight leading-none">
            Why We Started Kodesec
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
            Modern businesses struggle with the complexity of maintaining separate vendors for code development, cloud setups, quality testing, and cyber protection. We united to fix this.
          </p>
        </div>

        {/* Story Interactive Layout */}
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Left Vertical Timeline Selector */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {storySteps.map((step, idx) => {
              const IconComp = step.icon;
              return (
                <button
                  key={step.title}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group cursor-pointer
                    ${activeStep === idx
                      ? "border-primary bg-primary/[0.03] shadow-[0_0_30px_rgba(54,226,123,0.06)]"
                      : "border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Step Icon */}
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-gradient-to-br ${step.color}`}>
                      <IconComp size={20} />
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-bold text-gray-500 group-hover:text-primary transition-colors block">
                        {step.year}
                      </span>
                      <span className={`text-base font-black tracking-tight ${activeStep === idx ? "text-white" : "text-gray-400 group-hover:text-gray-200"}`}>
                        {step.title}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={16}
                    className={`transition-all duration-300 ${activeStep === idx ? "text-primary translate-x-1" : "text-gray-600 group-hover:text-gray-400"}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Detailed Narrative Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-8 md:p-10 flex flex-col justify-between min-h-[420px] shadow-[0_20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
              >
                {/* Visual decorative flare */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full bg-gradient-to-br ${storySteps[activeStep].color} blur-[60px] opacity-20`} />

                <div className="relative z-10 text-left">
                  <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                    {storySteps[activeStep].year} — CONVERGENCE CHRONICLE
                  </span>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-2">
                    {storySteps[activeStep].subtitle}
                  </h3>

                  <p className="mt-4 text-sm text-gray-400 leading-relaxed font-sans font-medium">
                    {storySteps[activeStep].description}
                  </p>

                  {/* Problem & Solution block */}
                  <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-start gap-3">
                      <p className="text-xs md:text-sm text-gray-400 leading-relaxed font-medium">
                        {storySteps[activeStep].problem}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-semibold">
                        {storySteps[activeStep].solution}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/5 pt-6 flex items-center justify-between font-mono text-[10px] text-gray-500">
                  <span>KODESEC ALIGNMENT PATH</span>
                  <span>STAGE 0{activeStep + 1} / 04</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
