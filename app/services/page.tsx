"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SolutionHero from "@/components/solutions/SolutionHero";
import SolutionVisualizer from "@/components/solutions/SolutionVisualizer";
import ProcessTimeline from "@/components/solutions/ProcessTimeline";
import TechnologyGrid from "@/components/solutions/TechnologyGrid";
import { solutions } from "@/content/solutions";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Terminal, 
  Code2, 
  ShieldAlert 
} from "lucide-react";
import * as LucideIcons from "lucide-react";

const engagementSteps = [
  {
    label: "PHASE 01",
    title: "Scoping & Threat Modeling",
    description: "Defining exact attack surfaces, architecture boundaries, and business goals.",
    summary: "Defining exact attack surfaces, architecture boundaries, and business goals.",
    detail: "We coordinate with your lead developers to map routes, identify data flows, and build a tailored evaluation blueprint."
  },
  {
    label: "PHASE 02",
    title: "Deep Execution & Testing",
    description: "Manual vulnerability exploitation, code audits, or application architecture delivery.",
    summary: "Manual vulnerability exploitation, code audits, or application architecture delivery.",
    detail: "Our team executes targeted security checks, IaC deployment pipelines, or quality assurance runs with active safety controls."
  },
  {
    label: "PHASE 03",
    title: "Remediation & Patch Verification",
    description: "Delivering actionable pull requests and verifying patch safety.",
    summary: "Delivering actionable pull requests and verifying patch safety.",
    detail: "We do not leave you with unverified automated outputs. We provide verified code fixes and re-test to confirm zero vulnerabilities."
  },
  {
    label: "PHASE 04",
    title: "Continuous Maintenance",
    description: "Ongoing system health tracking, automated CI/CD scans, and periodic audits.",
    summary: "Ongoing system health tracking, automated CI/CD scans, and periodic audits.",
    detail: "Long-term partnership with automated regression checks, active threat monitoring, and on-demand security consultations."
  }
];

const whyChooseUs = [
  {
    title: "Zero False Positives",
    description: "Every finding is manually exploited and validated by senior penetration testers before inclusion in report deliverables.",
    icon: ShieldAlert
  },
  {
    title: "Actionable Patching",
    description: "We supply exact code fixes, pull request patches, and architectural recommendations rather than generic tool output.",
    icon: Code2
  },
  {
    title: "Direct Specialist Access",
    description: "Collaborate directly with senior developers and offensive security leads. No non-technical project handlers.",
    icon: Terminal
  }
];

export default function ServicesPage() {
  const uniqueTechnologies = Array.from(
    new Map(
      solutions.flatMap((s) => s.technologies).map((t) => [t.name, t])
    ).values()
  );

  return (
    <main className="bg-transparent min-h-screen text-white relative overflow-hidden">
      {/* HERO SECTION */}
      <Section className="pt-12 pb-16 relative z-10 bg-transparent">
        <Container>
          <SolutionHero
            badge="Engineering & Cybersecurity Portfolio"
            title="Capabilities & Solutions Portfolio"
            subtitle="Explore our comprehensive engineering disciplines spanning offensive cybersecurity, secure full-stack software development, zero-trust cloud infrastructure, and QA test automation."
            primaryCtaLabel="Get Started"
            primaryCtaHref="/contact"
            secondaryCtaLabel="Book Consultation"
            secondaryCtaHref="/contact?type=consultation"
          />
        </Container>
      </Section>

      {/* SOLUTIONS LIST SHOWCASE */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
              Capability Overview
            </h2>
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Enterprise Solutions Portfolio
            </p>
          </div>

          <div className="space-y-16">
            {solutions.map((sol, idx) => {
              const IconComp = (LucideIcons as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>>)[sol.iconName] || ShieldCheck;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={sol.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 md:p-12 rounded-3xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl hover:border-primary/40 hover:shadow-[0_0_40px_rgba(54,226,123,0.1)] transition-all duration-300"
                >
                  {/* Left Column (Details) */}
                  <div className={`lg:col-span-7 flex flex-col text-left ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                        <IconComp size={20} />
                      </span>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
                        SOLUTION 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight">
                      {sol.title}
                    </h3>
                    
                    <p className="mt-2 text-xs font-mono font-semibold text-primary tracking-wide">
                      {sol.tagline}
                    </p>

                    <p className="mt-4 text-sm text-gray-400 font-sans leading-relaxed">
                      {sol.description}
                    </p>

                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/10 pt-5">
                      {sol.capabilities.slice(0, 4).map((cap) => (
                        <li key={cap.title} className="text-xs text-gray-300 flex items-start gap-2">
                          <CheckCircle2 size={15} className="text-primary mt-0.5 shrink-0" />
                          <div>
                            <span className="font-heading font-bold text-white block leading-snug">{cap.title}</span>
                            <span className="text-[10px] text-gray-400 font-sans leading-tight">{cap.outcome}</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 pt-4">
                      <Link
                        href={`/services/${sol.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-heading font-bold text-primary hover:text-white transition-colors"
                      >
                        Explore Solution Details
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column (Visualizer) */}
                  <div className={`lg:col-span-5 flex justify-center w-full min-w-0 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <SolutionVisualizer slug={sol.slug} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ENGAGEMENT PROCESS */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Our Process</h2>
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">The Engagement Timeline</p>
          </div>

          <ProcessTimeline steps={engagementSteps} themeColor="primary" />
        </Container>
      </Section>

      {/* TECHNOLOGIES */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Ecosystem</h2>
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">Technology & Security Stack</p>
          </div>

          <TechnologyGrid technologies={uniqueTechnologies} />
        </Container>
      </Section>

      {/* WHY CHOOSE KODESEC */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Why Kodesec</h2>
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">Engineered for Technical Authority</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl flex flex-col items-start text-left transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(54,226,123,0.1)]"
                >
                  <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-6">
                    <Icon size={22} />
                  </div>
                  <h4 className="text-lg font-heading font-bold text-white tracking-tight mb-3">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container className="max-w-4xl">
          <div className="p-8 md:p-14 rounded-3xl border border-white/10 bg-[#0D121F]/90 text-center relative overflow-hidden shadow-2xl backdrop-blur-xl">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight mb-4">
              Secure Your Digital Product Today
            </h3>
            
            <p className="text-xs text-gray-400 font-sans max-w-lg mx-auto leading-relaxed mb-8">
              Discuss your engineering topology, scoping requirements, and timelines directly with our senior development and security leads.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="btn-primary w-full sm:w-auto">
                Get Started
                <ArrowRight size={16} />
              </Link>
              
              <Link href="/contact?type=consultation" className="btn-secondary w-full sm:w-auto">
                <Calendar size={16} className="text-primary" />
                Book Free Consultation
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
