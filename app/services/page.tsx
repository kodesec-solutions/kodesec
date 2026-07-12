"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Users, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  Code
} from "lucide-react";
import { motion } from "framer-motion";

// Components
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import SolutionHero from "@/components/solutions/SolutionHero";
import SolutionVisualizer from "@/components/solutions/SolutionVisualizer";
import ProcessTimeline from "@/components/solutions/ProcessTimeline";
import TechnologyGrid from "@/components/solutions/TechnologyGrid";
import { solutions } from "@/content/solutions";

export default function ServicesHub() {
  // Aggregate all unique technologies from individual solutions
  const allTechnologies = solutions.flatMap((s) => s.technologies);
  const uniqueTechnologies = allTechnologies.filter(
    (tech, index, self) => self.findIndex((t) => t.name === tech.name) === index
  );

  // General Engagement Process steps
  const engagementSteps = [
    {
      label: "01",
      title: "Discovery",
      description: "Scope and threat profiling.",
      detail: "We align on boundaries, review high-level system structures, and map technical objectives to compliance needs."
    },
    {
      label: "02",
      title: "Architecture",
      description: "System modeling & staging.",
      detail: "Our leads construct threat models, map data flows, and design secure infrastructure blueprints."
    },
    {
      label: "03",
      title: "Implementation",
      description: "Secure sprints execution.",
      detail: "We write clean, modular Next.js/Node services, provision Terraform configs, and set up test automation suites."
    },
    {
      label: "04",
      title: "Validation",
      description: "Offensive validation tests.",
      detail: "We execute manual penetration tests and E2E simulation suites, validating that defenses hold."
    },
    {
      label: "05",
      title: "Delivery",
      description: "Compliant rollout & handover.",
      detail: "We deploy production-grade code, deliver remediation summaries, and conduct re-testing after patch resolution."
    }
  ];

  // Why choose cards
  const whyChooseUs = [
    {
      title: "Founder-Led Delivery",
      description: "Coordinate directly with Senior Next.js Architects, AWS Certified Cloud leads, and Security authorities. No middlemen or sales scripts.",
      icon: Users,
      glow: "hover:shadow-[0_0_30px_rgba(54,226,123,0.1)] hover:border-primary/30"
    },
    {
      title: "Zero Scanner Noise",
      description: "We don't copy-paste automated scans. Every security report contains manually validated proof-of-concept exploits, and E2E tests target real user states.",
      icon: ShieldCheck,
      glow: "hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] hover:border-cyan-500/30"
    },
    {
      title: "Developer Patch Maps",
      description: "We don't just document defects. We supply clean React code blocks, Terraform IaC structures, and Playwright automation configurations ready to deploy.",
      icon: Terminal,
      glow: "hover:shadow-[0_0_30px_rgba(192,132,252,0.1)] hover:border-purple-500/30"
    }
  ];

  return (
    <main className="bg-background-dark overflow-hidden relative min-h-screen">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <Section className="relative px-4 pt-28 pb-20 md:pt-36 md:pb-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <SolutionHero
                badge="Kodesec capabilities"
                title="Solutions for Building Secure Digital Products"
                subtitle="We integrate secure system design, offensive penetration audits, DevSecOps pipelines, and E2E test suites into a single content-driven delivery framework."
                primaryCtaLabel="Explore Solutions"
                primaryCtaHref="#solutions-grid"
                secondaryCtaLabel="Book Consultation"
                secondaryCtaHref="/contact"
                themeColor="primary"
              />
            </div>

            {/* Right Visual (Interactive design-engineering demo) */}
            <div className="lg:col-span-5 flex justify-center z-10 w-full min-w-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-full"
              >
                <SolutionVisualizer slug="design-engineering" />
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= FOUR SOLUTIONS GRID ================= */}
      <Section id="solutions-grid" className="py-20 border-t border-white/5 bg-card/10 relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Core Capability Hub</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Our Four Solutions Areas</p>
            <p className="mt-4 text-sm text-gray-400">
              Designed to help founders, CTOs, and engineering leaders build fast while maintaining bulletproof security boundaries.
            </p>
          </div>

          {/* Sequential detailed solution cards with mini visualizers */}
          <div className="space-y-16">
            {solutions.map((sol, idx) => {
              const IconComp = sol.themeColor === "primary" ? Code : sol.themeColor === "cyan" ? ShieldCheck : sol.themeColor === "purple" ? Zap : Terminal;
              const isEven = idx % 2 === 0;

              const borderGlow = {
                primary: "hover:border-primary/30 hover:shadow-[0_0_30px_rgba(54,226,123,0.1)]",
                cyan: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]",
                purple: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(192,132,252,0.1)]",
                amber: "hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
              }[sol.themeColor];

              const textColor = {
                primary: "text-primary",
                cyan: "text-cyan-400",
                purple: "text-purple-400",
                amber: "text-amber-400"
              }[sol.themeColor];

              return (
                <motion.div
                  key={sol.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={`grid gap-8 items-center lg:grid-cols-12 p-6 md:p-10 rounded-3xl border border-white/5 bg-white/[0.01] transition-all duration-300 ${borderGlow}`}
                >
                  {/* Left Column (Details) */}
                  <div className={`lg:col-span-7 flex flex-col text-left ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`p-2 rounded-xl bg-white/5 border border-white/10 ${textColor}`}>
                        <IconComp size={18} />
                      </span>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-gray-500 uppercase">
                        SOLUTION 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                      {sol.title}
                    </h3>
                    
                    <p className="mt-2.5 text-xs font-mono font-bold text-gray-400 leading-normal">
                      {sol.tagline}
                    </p>

                    <p className="mt-4 text-sm text-gray-400 leading-relaxed font-medium">
                      {sol.description}
                    </p>

                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-white/5 pt-4">
                      {sol.capabilities.slice(0, 4).map((cap) => (
                        <li key={cap.title} className="text-xs text-gray-300 flex items-start gap-2">
                          <CheckCircle2 size={14} className={`${textColor} mt-0.5 shrink-0`} />
                          <div>
                            <span className="font-bold text-white block leading-snug">{cap.title}</span>
                            <span className="text-[10px] text-gray-500 leading-tight">{cap.outcome}</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Link
                        href={`/services/${sol.slug}`}
                        className={`inline-flex items-center gap-1.5 text-xs font-extrabold font-mono tracking-wider ${textColor} hover:underline`}
                      >
                        Explore Details
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

      {/* ================= ENGAGEMENT PROCESS ================= */}
      <Section className="py-20 bg-black/20 border-t border-white/5 relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Our Process</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">The Engagement Timeline</p>
            <p className="mt-4 text-sm text-gray-400">
              How we collaborate to identify requirements, structure architecture, build, test, and sign-off.
            </p>
          </div>

          <ProcessTimeline steps={engagementSteps} themeColor="primary" />
        </Container>
      </Section>

      {/* ================= TECHNOLOGIES ================= */}
      <Section className="py-20 border-t border-white/5 relative z-10 bg-card/5">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Ecosystem</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Technology & Security Stack</p>
            <p className="mt-4 text-sm text-gray-400">
              Modern tooling and secure architectures integrated into our development and testing loops.
            </p>
          </div>

          <TechnologyGrid technologies={uniqueTechnologies} />
        </Container>
      </Section>

      {/* ================= WHY CHOOSE KODESEC ================= */}
      <Section className="py-20 border-t border-white/5 bg-[#050811] relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Why Kodesec</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Built for Engineering Leaders</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {whyChooseUs.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`p-6 rounded-2xl border border-white/5 bg-white/[0.01] flex flex-col items-start text-left transition-all duration-300 ${item.glow}`}
                >
                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-primary mb-5">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-white tracking-tight leading-none mb-3">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ================= FINAL CTA ================= */}
      <Section className="py-20 border-t border-white/5 bg-card/10 relative z-10">
        <Container className="max-w-4xl">
          <div className="p-8 md:p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(54,226,123,0.06),transparent_50%)]" />
            
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-4">
              Secure Your Digital Product Today
            </h3>
            
            <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed mb-8">
              Discuss your engineering topology, scoping requirements, and timelines directly with our senior development and security authority leads.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-[#0B0F1A] hover:bg-primary-light transition-all hover:shadow-[0_0_20px_rgba(54,226,123,0.3)] cursor-pointer"
              >
                Get Started
                <ArrowRight size={16} />
              </Link>
              
              <Link
                href="/contact?type=consultation"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-8 text-sm font-bold text-white transition-all hover:bg-white/[0.06] hover:border-white/20 cursor-pointer"
              >
                <Calendar size={16} />
                Book Free Consultation
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}