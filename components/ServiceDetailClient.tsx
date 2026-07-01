"use client";

import React, { useState } from "react";
import Link from "next/link";
import ServiceVisualizer from "./ServiceVisualizer";
import { 
  Shield, 
  Terminal, 
  Calendar, 
  ChevronRight, 
  AlertTriangle,
  ShieldCheck,
  FileText,
  Activity
} from "lucide-react";
import type { ServiceContent } from "@/app/data/services";

interface ServiceDetailClientProps {
  service: ServiceContent;
}

export default function ServiceDetailClient({ service }: ServiceDetailClientProps) {
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const workflowSteps = [
    { name: "Discover", label: "01", desc: "Perimeter scanning and threat surface mapping." },
    { name: "Analyze", label: "02", desc: "Manual logic checks and vulnerability auditing." },
    { name: "Secure", label: "03", desc: "Deploying patches and hot-fixing configurations." },
    { name: "Validate", label: "04", desc: "Running safe exploit payloads to confirm fix." },
    { name: "Deliver", label: "05", desc: "Issuing compliance-grade deliverables & reports." }
  ];

  const includedFeatures = [
    { title: "Threat Modeling", desc: "Deconstruct system architectures into detailed data flows." },
    { title: "Architecture Review", desc: "Deep validation of identity, authorization, and network boundaries." },
    { title: "Secure Coding Advisory", desc: "Source code auditing to eliminate logic holes and algorithmic bugs." },
    { title: "DevSecOps Integration", desc: "Automating security validation gates inside active release loops." },
    { title: "Manual Validation", desc: "Targeted payload injections to verify exploit risks without false reports." },
    { title: "Actionable Reporting", desc: "CVSS-rated CVE analysis with complete, drop-in remediation patches." }
  ];

  const deliverables = [
    { title: "Executive Report", desc: "High-level risk dashboard for leadership and compliance stakeholder review.", icon: FileText },
    { title: "Developer Patch Map", desc: "Technical breakdown including precise code coordinates and patch blocks.", icon: Terminal },
    { title: "Active Risk Dashboard", desc: "Dynamic vulnerability tracking and remediation verification portal.", icon: Activity },
    { title: "Re-Test Validation", desc: "Complimentary manual testing of patches to certify active security fixes.", icon: ShieldCheck }
  ];

  return (
    <main className="bg-background-dark overflow-hidden relative">
      
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative px-6 pt-12 pb-24 md:pt-20 md:pb-32 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10 w-full min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-mono font-bold tracking-wider text-primary mb-6 animate-pulse">
                <span className="h-2 w-2 rounded-full bg-primary block"></span>
                PRODUCT SPECIFICATION SHEET
              </div>

              {/* Title */}
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.05] lg:max-w-xl">
                {service.title.split(" - ")[0]}
              </h1>

              {/* Short Positioning */}
              <p className="mt-6 text-sm md:text-base leading-relaxed text-gray-400 max-w-lg font-medium">
                {service.shortPositioning.split(". ").slice(0, 2).join(". ") + "."}
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
                <Link
                  href="/contact?type=assessment"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
                >
                  Request Assessment Scope
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-8 text-sm font-bold text-white transition-all hover:bg-white/[0.06] hover:border-white/20 cursor-pointer"
                >
                  <Calendar size={16} />
                  Book Call
                </Link>
              </div>
            </div>

            {/* Right Visual: Service-specific visualization */}
            <div className="lg:col-span-6 flex justify-center z-10 w-full min-w-0">
              <ServiceVisualizer slug={service.slug} />
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHAT'S INCLUDED ================= */}
      <section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Core Coverage</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Capabilities Included in Scope</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {includedFeatures.map((feat) => (
              <div
                key={feat.title}
                className="group relative rounded-3xl border border-white/5 bg-[#0F1424]/40 p-6 backdrop-blur-md transition-all hover:border-primary/20 hover:shadow-[0_0_20px_rgba(54,226,123,0.05)] text-left"
              >
                <h3 className="text-base font-black text-white group-hover:text-primary transition-colors">{feat.title}</h3>
                <p className="mt-3 text-xs text-gray-400 leading-relaxed font-medium">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WORKFLOW VISUALIZATION ================= */}
      <section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Engagement Loop</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Delivery Workflow</p>
          </div>

          <div className="relative">
            {/* Connecting progress line on Desktop */}
            <div className="absolute top-[48px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-primary via-cyan-400 to-primary hidden lg:block opacity-20" />

            <div className="grid gap-6 lg:grid-cols-5 relative">
              {workflowSteps.map((step, idx) => (
                <div 
                  key={step.name}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left group cursor-pointer"
                >
                  <div className={`relative flex h-24 w-24 items-center justify-center rounded-full border transition-all duration-300 mb-5 bg-[#0F1424] 
                    ${activeWorkflowStep === idx 
                      ? "border-primary shadow-[0_0_20px_rgba(54,226,123,0.3)] scale-110" 
                      : "border-white/5 group-hover:border-white/20"}`}
                  >
                    <span className={`text-xl font-black font-mono ${activeWorkflowStep === idx ? "text-primary scale-115" : "text-gray-400"}`}>
                      {step.label}
                    </span>
                    {activeWorkflowStep === idx && (
                      <span className="absolute inset-[-4px] rounded-full border border-primary/30 animate-ping opacity-60" />
                    )}
                  </div>
                  <h3 className={`text-lg font-black ${activeWorkflowStep === idx ? "text-primary" : "text-white"}`}>
                    {step.name}
                  </h3>
                  <p className="mt-2 text-xs text-gray-400 leading-relaxed max-w-[160px] mx-auto lg:mx-0 font-medium">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROBLEMS WE SOLVE ================= */}
      {service.problems && service.problems.length > 0 && (
        <section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#101525]/30">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Risk Mitigation</h2>
              <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Core Vulnerabilities Prevented</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {service.problems.map((prob, idx) => (
                <div 
                  key={idx}
                  className="relative rounded-3xl border border-white/5 bg-[#0B0F1A]/90 p-6 flex flex-col justify-between text-left hover:border-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.04)] group transition-all"
                >
                  {/* Warning Glow Corner */}
                  <div className="absolute top-0 right-0 h-8 w-8 rounded-tr-3xl border-t border-r border-transparent group-hover:border-red-500/20 transition-all duration-300 pointer-events-none" />
                  
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-5">
                      <AlertTriangle size={18} />
                    </div>
                    <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors">{prob.title}</h3>
                    <p className="mt-3 text-xs text-gray-400 leading-relaxed font-medium">{prob.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= TECHNOLOGY COVERAGE ================= */}
      {service.technologies && service.technologies.length > 0 && (
        <section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Stack Coverage</h2>
              <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Supported Technologies & Tooling</p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {service.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2.5 rounded-full border border-white/5 bg-[#0F1424]/40 text-xs font-bold font-mono tracking-wide text-gray-400 transition-all hover:text-white hover:border-primary/40 hover:bg-[#0F1424]/80 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= DELIVERABLES ================= */}
      <section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#101525]/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Artifacts</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">What We Deliver</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {deliverables.map((deliv, idx) => {
              const IconComp = deliv.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/5 bg-[#0B0F1A]/80 p-6 flex flex-col items-start text-left transition-all hover:border-primary/20 group hover:shadow-[0_0_20px_rgba(54,226,123,0.05)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/10 mb-5">
                    <IconComp className="h-5.5 w-5.5 text-primary" />
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-primary transition-all">{deliv.title}</h3>
                  <p className="mt-3 text-[11px] text-gray-400 leading-relaxed font-medium">{deliv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= METRICS AND STANDARDS ================= */}
      {service.badges && service.badges.length > 0 && (
        <section className="py-16 border-t border-white/5 bg-[#0B0F1A]/80 relative z-10">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gray-500 mb-8">
              COMPLIANCE ALIGNMENTS & BADGES
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {service.badges.map((badge, idx) => (
                <span 
                  key={idx}
                  className="px-5 py-3 rounded-full border border-primary/20 bg-primary/5 text-xs font-bold font-mono tracking-wider text-primary flex items-center gap-2 hover:border-primary/50 transition-colors"
                >
                  <ShieldCheck size={14} />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= CASE STUDY PREVIEW ================= */}
      {service.caseStudy && (
        <section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#101525]/30">
          <div className="mx-auto max-w-4xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Outcome</h2>
              <p className="mt-3 text-3xl font-black text-white tracking-tight">Customer Outcomes & Case Study</p>
            </div>

            {/* Outcome Card */}
            <div className="rounded-3xl border border-white/10 bg-[#0B0F1A]/90 p-8 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center text-left hover:border-primary/30 transition-all shadow-xl">
              <div className="space-y-3.5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                  {service.caseStudy.industry}
                </span>
                <h3 className="text-xl font-black text-white tracking-tight">{service.caseStudy.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium max-w-md font-sans">
                  {service.caseStudy.desc}
                </p>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8 flex flex-col items-start shrink-0 min-w-[180px]">
                <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono">Measurable Result</span>
                <span className="text-2xl font-black font-mono tracking-tight mt-1 text-primary">{service.caseStudy.metric}</span>
                <p className="text-[10px] text-gray-400 leading-snug font-medium mt-2 font-mono">Audit Outcome Sealed</p>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* ================= FINAL CTA SECTION ================= */}
      <section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5">
        <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#101525] to-[#0A0D18] p-8 md:p-16 relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Shield Icon */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <Shield className="h-6 w-6 text-primary animate-pulse" />
          </div>

          <h2 className="text-3xl font-black text-white sm:text-5xl leading-tight tracking-tight max-w-2xl">
            Ready to Secure Your Systems Before Attackers Find Them?
          </h2>
          
          <p className="mt-4 text-sm text-gray-400 max-w-lg leading-relaxed font-medium">
            Contact Kodesec security architects for high-fidelity penetration testing, infrastructure hardening, and secure development advisory.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/contact?type=assessment"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
            >
              Request Assessment
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-8 text-sm font-bold text-white transition-all hover:bg-white/[0.06] hover:border-white/20 cursor-pointer"
            >
              <Calendar size={16} />
              Schedule Consultation
            </Link>
          </div>

        </div>
      </section>

    </main>
  );
}
