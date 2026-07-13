"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Shield, Activity, ArrowRight, ArrowLeft, ChevronRight, Mail, Check, Calendar } from "lucide-react";

export default function SecurityEstimator() {
  const [ctaMode, setCtaMode] = useState<"general" | "estimator">("general");
  const [estimatorStep, setEstimatorStep] = useState(1);
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [selectedScale, setSelectedScale] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleReset = () => {
    setCtaMode("general");
    setEstimatorStep(1);
    setSelectedTarget(null);
    setSelectedScale(null);
    setSubmitted(false);
    setEmail("");
  };

  return (
    <div className="relative z-10 grid gap-12 lg:grid-cols-12 items-center">
      {/* Left Content Column */}
      <div className="lg:col-span-6 text-left flex flex-col items-start">
        {/* Shield Icon */}
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
          <Shield className="h-6 w-6 text-primary animate-pulse" />
        </div>

        <h2 className="text-3xl font-black text-white sm:text-5xl leading-tight tracking-tight">
          Ready to Secure Your Next Release?
        </h2>
        
        <p className="mt-4 text-sm text-gray-400 leading-relaxed font-medium max-w-md">
          Configure your custom cybersecurity program dynamically or connect with Kodesec security architects directly to evaluate your posture.
        </p>

        {ctaMode === "general" ? (
          <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
            <button
              onClick={() => setCtaMode("estimator")}
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
            >
              <Activity size={16} />
              Launch Package Builder
            </button>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-8 text-sm font-bold text-white transition-all hover:bg-white/[0.06] hover:border-white/20 cursor-pointer"
            >
              Contact Direct
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="mt-8 border-t border-white/5 pt-6 w-full max-w-md">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-gray-500 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft size={12} />
              Back to General Options
            </button>
          </div>
        )}
      </div>

      {/* Right Estimator Column */}
      <div className="lg:col-span-6 w-full">
        {ctaMode === "general" ? (
          <div className="rounded-3xl border border-white/5 bg-[#0F1424]/50 p-6 backdrop-blur-xl flex flex-col gap-4 text-left shadow-lg">
            <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-wider">Fast-Track Compliance</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-medium">
              Looking for a quick turnaround? Start our dynamic package configuration to map security scope, target timeline, and budget metrics in under 60 seconds.
            </p>
            <button
              onClick={() => setCtaMode("estimator")}
              className="mt-2 w-full inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-bold text-white hover:bg-white/[0.06] hover:border-white/20 transition-all cursor-pointer"
            >
              Start Estimator Tool
              <ChevronRight size={14} />
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#0F1424]/80 p-6 md:p-8 backdrop-blur-2xl text-left shadow-2xl min-h-[340px] flex flex-col justify-between">
            {/* Estimator Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">Step {estimatorStep} of 3</span>
              <div className="flex gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${estimatorStep >= 1 ? "bg-primary" : "bg-white/10"}`}></span>
                <span className={`h-1.5 w-1.5 rounded-full ${estimatorStep >= 2 ? "bg-primary" : "bg-white/10"}`}></span>
                <span className={`h-1.5 w-1.5 rounded-full ${estimatorStep >= 3 ? "bg-primary" : "bg-white/10"}`}></span>
              </div>
            </div>

            {/* Step content */}
            {estimatorStep === 1 && (
              <div className="space-y-4 flex-1">
                <h4 className="text-base font-black text-white">What is your primary security target?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { id: "webapp", label: "Web Apps & APIs", desc: "OWASP Top 10 focus" },
                    { id: "cloud", label: "Cloud & IAM", desc: "AWS/Azure drift audit" },
                    { id: "devsecops", label: "DevSecOps CI/CD", desc: "Automated pipelines" },
                    { id: "code", label: "Secure Dev Advisory", desc: "Zero-trust builds" }
                  ].map((target) => (
                    <button
                      key={target.id}
                      type="button"
                      onClick={() => setSelectedTarget(target.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${selectedTarget === target.id ? "bg-primary/5 border-primary text-primary" : "border-white/5 bg-white/[0.01] hover:border-white/20 text-gray-400 hover:text-white"}`}
                    >
                      <p className="text-xs font-bold">{target.label}</p>
                      <p className="text-[10px] opacity-75 mt-0.5 font-medium">{target.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    disabled={!selectedTarget}
                    onClick={() => setEstimatorStep(2)}
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-primary px-6 text-xs font-bold text-[#0B0F1A] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-light transition-all cursor-pointer"
                  >
                    Next Step
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {estimatorStep === 2 && (
              <div className="space-y-4 flex-1">
                <h4 className="text-base font-black text-white">Select your system or team scale:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  {[
                    { id: "startup", label: "Startup / MVP", desc: "Rapid validation" },
                    { id: "mid", label: "Growth / SaaS", desc: "IAM & cloud scale" },
                    { id: "enterprise", label: "Enterprise", desc: "SOC2 / ISO compl." }
                  ].map((scale) => (
                    <button
                      key={scale.id}
                      type="button"
                      onClick={() => setSelectedScale(scale.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[5.5rem] ${selectedScale === scale.id ? "bg-primary/5 border-primary text-primary" : "border-white/5 bg-white/[0.01] hover:border-white/20 text-gray-400 hover:text-white"}`}
                    >
                      <p className="text-xs font-bold">{scale.label}</p>
                      <p className="text-[10px] opacity-75 mt-1 font-medium">{scale.desc}</p>
                    </button>
                  ))}
                </div>
                <div className="pt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setEstimatorStep(1)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 px-5 text-xs font-bold text-white hover:bg-white/5 transition-all cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={!selectedScale}
                    onClick={() => setEstimatorStep(3)}
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-primary px-6 text-xs font-bold text-[#0B0F1A] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-light transition-all cursor-pointer"
                  >
                    Build Estimate
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {estimatorStep === 3 && !submitted && (
              <div className="space-y-4 flex-1">
                <h4 className="text-base font-black text-white">Recommended Cybersecurity Scope:</h4>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-gray-300 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-mono">Scope Target</span>
                    <span className="font-bold text-white uppercase tracking-wider font-mono text-right">
                      {selectedTarget === "webapp" && "Web App & API pentest"}
                      {selectedTarget === "cloud" && "Cloud configuration security"}
                      {selectedTarget === "devsecops" && "DevSecOps audit & scan"}
                      {selectedTarget === "code" && "Secure development pipeline"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-mono">Assessment Tier</span>
                    <span className="font-bold text-white uppercase tracking-wider font-mono text-right">
                      {selectedScale === "startup" && "Startup Speedrun"}
                      {selectedScale === "mid" && "SaaS Deep-Dive"}
                      {selectedScale === "enterprise" && "Enterprise Compliance"}
                    </span>
                  </div>
                  <div className="border-t border-white/5 pt-2 flex justify-between items-center font-bold text-primary">
                    <span className="font-mono">Est. Security Team</span>
                    <span className="font-mono text-right">
                      {selectedScale === "startup" && "2 Engineers"}
                      {selectedScale === "mid" && "4 Engineers"}
                      {selectedScale === "enterprise" && "6 Engineers + Compliance Lead"}
                    </span>
                  </div>
                </div>

                {/* Lead form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (email) setSubmitted(true);
                  }}
                  className="mt-4 space-y-2"
                >
                  <label className="text-[10px] font-mono font-bold text-gray-500 uppercase block">Send Scope Report to Email:</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-10 px-4 rounded-xl border border-white/10 bg-white/[0.01] text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-all"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-5 text-xs font-bold text-[#0B0F1A] hover:bg-primary-light transition-all cursor-pointer"
                    >
                      <Mail size={14} />
                      Send Plan
                    </button>
                  </div>
                </form>
              </div>
            )}

            {submitted && (
              <div className="space-y-4 flex-1 flex flex-col justify-center items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary mb-2">
                  <Check size={28} />
                </div>
                <h4 className="text-lg font-black text-white">Security Package Saved!</h4>
                <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-medium">
                  Your custom plan details have been dispatched to <strong className="text-white font-semibold font-mono">{email}</strong>. Our security lead will follow up within 12 hours.
                </p>
                <Link
                  href="/contact?type=consultation"
                  className="mt-2 inline-flex h-9 items-center justify-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-5 text-xs font-bold text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Calendar size={12} />
                  Choose Calendar Time
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
