import React from "react";
import Link from "next/link";
import SecurityDashboard from "@/components/SecurityDashboard";
import MethodologyTimeline from "@/components/home/MethodologyTimeline";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import SecurityEstimator from "@/components/home/SecurityEstimator";

// Primitives
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { MetricCard } from "@/components/ui/metric-card";

// Solutions Component & Content
import SolutionCard from "@/components/solutions/SolutionCard";
import { solutions } from "@/content/solutions";

// Icons
import { 
  Shield, 
  Terminal, 
  CheckCircle2, 
  ArrowRight,
  Code2
} from "lucide-react";

// Config data
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { homeConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Kodesec | Cybersecurity & Software Engineering",
  description: "KodeSec delivers secure software development, offensive penetration testing, and QA validation. We build zero-trust platforms and execute compliance audits.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "cybersecurity firm",
    "software development agency",
    "penetration testing",
    "secure coding",
    "web application security",
    "Kubernetes hardening",
  ],
};

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://kodesec.com/#localbusiness",
    "name": "Kodesec",
    "image": "https://kodesec.com/assets/Logo.png",
    "url": "https://kodesec.com",
    "telephone": "",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <div className="bg-transparent overflow-hidden relative text-white">
      <JsonLd schema={localBusinessSchema} />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 z-10">
        <Container className="max-w-6xl">
          
          {/* Centered Symmetrical Header */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-[#0D121F]/90 backdrop-blur-md">
              <span className="text-xs font-mono font-bold tracking-widest text-gray-300 uppercase whitespace-nowrap">
                Make your Digital world secure
              </span>
            </div>

            {/* Main Title (Boraq.io & Apple style) */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight leading-[1.08]">
              Innovating for a <br className="hidden sm:inline" />
              <span className="text-gradient-emerald">Secure Tomorrow</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 font-sans leading-relaxed">
              We architect zero-trust cloud infrastructure, execute offensive penetration testing, and engineer high-resilience software designed for modern digital scale.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?type=consultation" className="btn-primary">
                <span>Start a Project</span>
                <ArrowRight size={16} className="shrink-0" />
              </Link>
              <Link href="/projects" className="btn-secondary">
                <Code2 size={16} className="text-primary shrink-0" />
                <span>View Our Work</span>
              </Link>
            </div>
          </div>
          {/* Compliance & Trust Bar */}
          <div className="mt-14 pt-8">
            <p className="text-center text-[11px] font-mono font-bold text-gray-500 uppercase tracking-widest mb-6">
              Compliant & Audited Standards
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
              <span className="text-xs font-mono font-bold text-gray-300 flex items-center gap-2 tracking-wider whitespace-nowrap">
                <Terminal size={16} className="text-primary shrink-0" /> GITHUB COMPLIANT
              </span>
              <span className="text-xs font-mono font-bold text-gray-300 flex items-center gap-2 tracking-wider whitespace-nowrap">
                <Shield size={16} className="text-primary shrink-0" /> SOC2 TYPE II
              </span>
              <span className="text-xs font-mono font-bold text-gray-300 flex items-center gap-2 tracking-wider whitespace-nowrap">
                <CheckCircle2 size={16} className="text-primary shrink-0" /> ISO 27001 AUDITED
              </span>
            </div>
          </div>

        </Container>
      </section>

      {/* ================= OUTCOME-DRIVEN SOLUTIONS SECTION ================= */}
      <Section className="py-20 relative z-10 bg-transparent">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
              Core Capabilities
            </h2>
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Outcome-Driven Security Solutions
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {solutions.map((sol, idx) => (
              <SolutionCard
                key={sol.slug}
                solution={sol}
                index={idx}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= METRICS STATS SECTION ================= */}
      <Section className="py-16 bg-transparent relative z-10">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {homeConfig.metrics.map((metric, idx) => (
              <MetricCard
                key={idx}
                value={metric.value}
                label={metric.label}
                description={metric.desc}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= METHODOLOGY PROCESS SECTION ================= */}
      <Section className="py-20 relative z-10 bg-transparent">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
              Methodology
            </h2>
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Our Security Pipeline Lifecycle
            </p>
          </div>

          <MethodologyTimeline />
        </Container>
      </Section>

      {/* ================= CASE STUDIES SECTION ================= */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
              Case Studies
            </h2>
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Proven Security Outcomes
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {homeConfig.securityInsights.map((study, idx) => (
              <div 
                key={idx} 
                className="rounded-3xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(54,226,123,0.1)] group"
              >
                <div className="text-left">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {study.category}
                  </span>
                  
                  <h3 className="mt-5 text-lg font-heading font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                    {study.title}
                  </h3>
                  
                  <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-xs">
                    <div>
                      <span className="text-gray-500 uppercase tracking-wider font-mono text-[9px] block">Insight</span>
                      <p className="text-gray-300 mt-1 leading-relaxed font-sans">{study.insight}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 uppercase tracking-wider font-mono text-[9px] block">Remediation</span>
                      <p className="text-gray-300 mt-1 leading-relaxed font-sans">{study.remediation}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-left">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">{study.source}</span>
                    <span className="text-lg font-bold font-mono tracking-tight text-primary mt-0.5 block">{study.stat}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= TECH ECOSYSTEM ================= */}
      <Section className="py-20 relative z-10 bg-transparent">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
              Ecosystem
            </h2>
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Security Integrations & Stack
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {homeConfig.techEcosystem.map((tech) => (
              <div
                key={tech.name}
                className="px-5 py-3 rounded-full border border-white/10 bg-[#0D121F]/80 text-xs font-mono font-medium tracking-wide text-gray-300 transition-all duration-300 cursor-default hover:border-primary/40 hover:text-white"
              >
                <span className="text-primary mr-1.5">#</span>
                {tech.name}
                <span className="text-[10px] bg-white/5 border border-white/10 text-gray-400 px-2 py-0.5 rounded-full ml-2 font-sans">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= TESTIMONIALS ================= */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
              Testimonials
            </h2>
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Trusted by Engineering Leaders
            </p>
          </div>

          <TestimonialCarousel />
        </Container>
      </Section>

      {/* ================= FINAL CTA ESTIMATOR SECTION ================= 
      <Section id="cta" className="py-20 relative z-10 bg-transparent">
        <Container className="max-w-5xl rounded-3xl border border-white/10 bg-[#0D121F]/90 p-8 md:p-14 relative overflow-hidden shadow-2xl backdrop-blur-xl">
          <SecurityEstimator />
        </Container>
      </Section>*/}
    </div>
  );
}
