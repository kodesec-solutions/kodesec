import React from "react";
import Link from "next/link";
import DataFlowVisual from "@/components/DataFlowVisual";
import ThinkStepsTimeline from "@/components/why-us/ThinkStepsTimeline";

// Primitives
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { Badge } from "@/components/ui/badge";

// Icons
import { 
  Shield, 
  Terminal, 
  Cloud, 
  Workflow, 
  Cpu, 
  ChevronRight, 
  ArrowRight, 
  Calendar, 
  Users, 
  Code,
  Zap,
  Sparkles,
  Lock,
  Target,
  Check,
  FileCheck
} from "lucide-react";

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Why Choose Kodesec",
  description: "Discover why SaaS, Fintech, and Enterprise platforms trust KodeSec. Learn about our manual exploit verification, developer partnerships, and zero-scanner-noise methodology.",
  alternates: {
    canonical: "/why-us",
  },
  keywords: ["why KodeSec", "offensive security benefits", "manual pentesting value", "remediation support"],
};

export default function WhyUs() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://kodesec.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Why Kodesec",
        "item": "https://kodesec.com/why-us"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How is KodeSec different from typical security agencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Unlike typical agencies, KodeSec offers direct collaboration with technical founders who are active software engineers. We provide evidence-based, reproducible Proof-of-Concept exploits instead of raw scanner outputs, and deliver code-level patches rather than generic recommendations."
        }
      },
      {
        "@type": "Question",
        "name": "What is manual validation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Manual validation involves our offensive security engineers actively writing scripts to exploit discovered logic flaws, authentication loops, or configuration gaps. This eliminates false positives and demonstrates real business risk."
        }
      },
      {
        "@type": "Question",
        "name": "Does KodeSec help developers patch vulnerabilities?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we integrate secure code blueprints and configuration lints directly into your language or pipeline frameworks to help developers patch quickly, followed by a complimentary re-test to verify the security fixes."
        }
      }
    ]
  };

  const pillars = [
    {
      title: "Security First",
      desc: "Every logic loop and subnet binding is audited from an offensive posture from day one.",
      icon: Shield,
      glow: "hover:shadow-[0_0_25px_rgba(54,226,123,0.15)] hover:border-primary/30"
    },
    {
      title: "Founder-Led Delivery",
      desc: "You collaborate directly with senior cybersecurity architects and builders, not account executives.",
      icon: Users,
      glow: "hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] hover:border-cyan-500/30"
    },
    {
      title: "Unified Engineering",
      desc: "We understand authorization flows, database key encryption, and infrastructure lints alike.",
      icon: Code,
      glow: "hover:shadow-[0_0_25px_rgba(192,132,252,0.15)] hover:border-purple-500/30"
    },
    {
      title: "Practical Outcomes",
      desc: "We deliver concrete code patches and configuration templates, not generic 200-page copy-paste PDF noise.",
      icon: Zap,
      glow: "hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] hover:border-red-500/30"
    }
  ];

  const compareRows = [
    {
      factor: "Direct Collaboration",
      typical: "Friction-heavy communication through non-technical sales account managers.",
      kodesec: "Direct Access to technical founders handling your security architecture."
    },
    {
      factor: "Vulnerability Verification",
      typical: "Copy-paste automated tool results filled with noisy false positives.",
      kodesec: "Manual validation with reproducible Proof-of-Concept exploit code."
    },
    {
      factor: "Remediation Value",
      typical: "Generic recommendations like 'Upgrade software packages' or 'Harder passwords'.",
      kodesec: "Implementation-grade code patches and customized configuration changes."
    },
    {
      factor: "Team Skillsets",
      typical: "Segregated auditors who understand compliance standards but do not code.",
      kodesec: "Unified developers who actively write secure software and build platforms."
    },
    {
      factor: "Turnaround Speed",
      typical: "Slow enterprise scheduling cycles, contract friction, and static reporting.",
      kodesec: "Startup agility, live Slack/Discord integration, and rapid scopes."
    }
  ];

  const partners = [
    { title: "SaaS Startups", desc: "Multi-tenant logic segregation, session isolation, and tenant cross-access verification.", icon: Sparkles },
    { title: "FinTech Platforms", desc: "API authentication flows, KMS cryptographical key layers, and mTLS gateways.", icon: Lock },
    { title: "Cloud-Native Brands", desc: "Kubernetes cluster security, least-privilege AWS IAM configs, and IaC lints.", icon: Cloud },
    { title: "Scaling Dev Teams", desc: "Automating static scanning (SAST/DAST) gates directly inside active git pipelines.", icon: Workflow },
    { title: "Security-Conscious Org", desc: "Offensive red-teaming simulations, lateral migration mapping, and AD auditing.", icon: Target }
  ];

  // Founder matrix mapping checkmarks
  const matrixHeaders = ["Capability", "Alex", "Liam", "Sofia", "Marcus"];
  const matrixData = [
    { discipline: "Software Engineering", alex: true, liam: false, sofia: false, marcus: true },
    { discipline: "Cloud Infrastructure", alex: false, liam: true, sofia: false, marcus: false },
    { discipline: "DevOps & Pipelines", alex: false, liam: false, sofia: true, marcus: false },
    { discipline: "Security Assessments", alex: true, liam: true, sofia: true, marcus: true },
    { discipline: "Secure Development", alex: true, liam: false, sofia: false, marcus: true }
  ];

  const principles = [
    { title: "Security by Design", desc: "Defenses are engineered directly into the core code layout, not added as a final checkbox prior to release.", icon: Shield },
    { title: "Evidence Over Guesswork", desc: "We prove every vulnerability using manual exploitation vectors before listing it on a finding registry.", icon: FileCheck },
    { title: "Simplicity Wins", desc: "We refactor overly complex auth code and permission groups into clean, isolatable micro-architectures.", icon: Cpu },
    { title: "Long-Term Partnerships", desc: "We evolve alongside your engineering team, aligning security loops to support platform growth.", icon: Users }
  ];

  return (
    <main className="bg-background-dark overflow-hidden relative min-h-screen">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={faqSchema} />
      
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <Section className="relative px-6 pt-12 pb-24 md:pt-20 md:pb-32 lg:px-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
              <Badge className="mb-6 animate-pulse">
                THE KODESEC DIFFERENCE
              </Badge>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.05] lg:max-w-xl">
                Why Teams Choose <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-accent-cyan font-black">
                  Kodesec.
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-gray-400 max-w-lg font-medium">
                We bridge the gap between application developers and compliance systems, ensuring security is built directly into runtime systems.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer animate-pulse"
                >
                  Schedule Consultation
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-8 text-sm font-bold text-white transition-all hover:bg-white/[0.06] hover:border-white/20 cursor-pointer"
                >
                  View Our Services
                </Link>
              </div>
            </div>

            {/* Right Visual Mesh */}
            <div className="lg:col-span-6 flex justify-center z-10 w-full">
              <DataFlowVisual />
            </div>

          </div>
        </Container>
      </Section>

      {/* ================= PILLARS ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Core Competencies</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">The Pillars of Our Success</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, idx) => (
              <FeatureCard
                key={idx}
                title={pillar.title}
                description={pillar.desc}
                icon={pillar.icon}
                glowClass={pillar.glow}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= COMPARATIVE MATRIX ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Comparative Analysis</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">KodeSec vs. Typical Agencies</p>
          </div>

          <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-[#0F1424]/60 p-6 md:p-8 backdrop-blur-md overflow-hidden text-left shadow-2xl">
            <div className="space-y-6">
              {compareRows.map((row) => (
                <div key={row.factor} className="grid md:grid-cols-12 gap-4 border-b border-white/5 pb-6 last:border-b-0 last:pb-0">
                  <div className="md:col-span-3 text-sm font-black text-white">{row.factor}</div>
                  <div className="md:col-span-4 text-xs text-gray-500 leading-relaxed font-medium">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-red-400 block mb-1">Traditional Agencies</span>
                    {row.typical}
                  </div>
                  <div className="md:col-span-5 text-xs text-emerald-100 leading-relaxed font-medium">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-primary block mb-1">KodeSec Delivery</span>
                    {row.kodesec}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= ENGAGEMENT CYCLE ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#101525]/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Engagement Cycle</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">How We Think</p>
          </div>

          <ThinkStepsTimeline />
        </Container>
      </Section>

      {/* ================= IDEAL PARTNERS SECTION ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Who We Help</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Ideal Partners</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {partners.map((partner, idx) => {
              const IconComp = partner.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/5 bg-[#0F1424]/40 p-6 flex flex-col justify-between items-start text-left transition-all hover:border-primary/20 hover:shadow-[0_0_20px_rgba(54,226,123,0.04)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.02] border border-white/10 text-primary mb-5">
                    <IconComp size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white tracking-tight">{partner.title}</h3>
                    <p className="mt-2 text-[10px] text-gray-400 leading-relaxed font-medium">{partner.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ================= EXPERTISE MATRIX ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#101525]/30">
        <Container className="max-w-4xl">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Technical Coverage</h2>
            <p className="mt-3 text-3xl font-black text-white tracking-tight">Founder Expertise Matrix</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-[#0B0F1A]/85 overflow-hidden shadow-2xl">
            {/* Headers */}
            <div className="grid grid-cols-5 border-b border-white/10 bg-white/[0.02] font-mono text-[9px] font-bold text-gray-400 tracking-wider text-center">
              {matrixHeaders.map((header, idx) => (
                <div key={idx} className={`p-4 ${idx === 0 ? "text-left border-r border-white/5 font-black text-white" : "border-r border-white/5 last:border-r-0"}`}>
                  {header.toUpperCase()}
                </div>
              ))}
            </div>

            {/* Matrix Data Rows */}
            {matrixData.map((row, rowIdx) => (
              <div key={rowIdx} className="grid grid-cols-5 border-b border-white/5 last:border-b-0 text-center font-sans text-xs">
                <div className="p-4 border-r border-white/5 text-left font-black text-white bg-white/[0.01]">
                  {row.discipline}
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center">
                  {row.alex ? <Check className="text-primary h-4.5 w-4.5" /> : <span className="text-gray-700 font-mono">-</span>}
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center">
                  {row.liam ? <Check className="text-primary h-4.5 w-4.5" /> : <span className="text-gray-700 font-mono">-</span>}
                </div>
                <div className="p-4 border-r border-white/5 flex items-center justify-center">
                  {row.sofia ? <Check className="text-primary h-4.5 w-4.5" /> : <span className="text-gray-700 font-mono">-</span>}
                </div>
                <div className="p-4 flex items-center justify-center">
                  {row.marcus ? <Check className="text-primary h-4.5 w-4.5" /> : <span className="text-gray-700 font-mono">-</span>}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= CONNECT WITH THE TEAM ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5">
        <Container className="max-w-4xl rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#101525] to-[#0A0D18] p-8 md:p-16 relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          <h2 className="text-3xl font-black text-white sm:text-5xl leading-tight tracking-tight">
            Ready to secure your releases?
          </h2>
          
          <p className="mt-4 text-sm text-gray-400 max-w-lg leading-relaxed font-medium">
            Contact Kodesec security architects for high-fidelity penetration testing, infrastructure hardening, and secure development advisory.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/contact?type=assessment"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
            >
              Get Security Assessment
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/contact?type=consultation"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-8 text-sm font-bold text-white transition-all hover:bg-white/[0.06] hover:border-white/20 cursor-pointer"
            >
              Book Scoping Call
            </Link>
          </div>
        </Container>
      </Section>
    </main>
  );
}