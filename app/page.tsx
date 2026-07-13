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
import { Badge } from "@/components/ui/badge";

// Solutions Component & Content
import SolutionCard from "@/components/solutions/SolutionCard";
import { solutions } from "@/content/solutions";

// Icons
import { 
  Shield, 
  Terminal, 
  Cloud, 
  Cpu, 
  ChevronRight, 
  Calendar, 
  CheckCircle2, 
  Lock,
  Zap
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
  // Rendered from content tier

  return (
    <main className="bg-background-dark overflow-hidden relative">
      <JsonLd schema={localBusinessSchema} />
      {/* Global CSS Inject for scrolling marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
      `}} />

      {/* Radial Ambient Lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-accent-purple/5 blur-[120px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <Section className="pt-28 pb-24 md:pt-36 md:pb-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10 w-full min-w-0">
              <Badge variant="default" className="mb-6 animate-pulse">
                KODESEC ENTERPRISE SHIELD
              </Badge>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.05] lg:max-w-xl">
                Build Faster. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-accent-cyan font-black">
                  Ship Securely.
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-gray-400 max-w-lg font-medium">
                Cybersecurity, DevSecOps, and Secure Development services engineered for modern businesses, fintechs, and SaaS platforms.
              </p>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-full">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
                >
                  Get Security Assessment
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/contact?type=consultation"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-6 text-sm font-bold text-white transition-all hover:bg-white/[0.06] hover:border-white/20 cursor-pointer"
                >
                  <Calendar size={16} />
                  Book Consultation
                </Link>
              </div>

              {/* Bullet Trust indicators */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono text-gray-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-primary" />
                  OWASP Aligned
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-primary" />
                  Zero-Trust Architectures
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-primary" />
                  Manual Exploit Delivery
                </div>
              </div>
            </div>

            {/* Right Visual: Security Dashboard Widget */}
            <div className="lg:col-span-6 flex justify-center z-10 w-full min-w-0">
              <SecurityDashboard />
            </div>

          </div>
        </Container>
      </Section>

      {/* ================= TRUST BAR ================= */}
      <section className="py-10 border-y border-white/5 bg-[#0B0F1A]/50 relative z-10">
        <Container className="overflow-hidden">
          <p className="text-center text-xs font-mono font-bold uppercase tracking-[0.2em] text-secondary mb-6">
            TRUSTED FOR COMPLIANCE AND SECURITY ALIGNMENT
          </p>
          
          <div className="relative w-full flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <div className="animate-marquee flex gap-16 items-center whitespace-nowrap">
              {/* Set 1 */}
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Lock size={16} className="text-primary" />OWASP FOUNDATION</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Cloud size={16} className="text-cyan-400" />AWS CERTIFIED</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Cpu size={16} className="text-purple-400" />KUBERNETES SECURE</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Zap size={16} className="text-sky-400" />DOCKER HARDENED</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Terminal size={16} className="text-foreground" />GITHUB COMPLIANT</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Shield size={16} className="text-primary" />SOC2 TYPE II</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><CheckCircle2 size={16} className="text-emerald-400" />ISO 27001 AUDITED</span>

              {/* Set 2 */}
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Lock size={16} className="text-primary" />OWASP FOUNDATION</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Cloud size={16} className="text-cyan-400" />AWS CERTIFIED</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Cpu size={16} className="text-purple-400" />KUBERNETES SECURE</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Zap size={16} className="text-sky-400" />DOCKER HARDENED</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Terminal size={16} className="text-foreground" />GITHUB COMPLIANT</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><Shield size={16} className="text-primary" />SOC2 TYPE II</span>
              <span className="text-sm font-mono font-black text-secondary flex items-center gap-2 tracking-widest shrink-0"><CheckCircle2 size={16} className="text-emerald-400" />ISO 27001 AUDITED</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ================= "HOW WE HELP" SECTION ================= */}
      <Section className="py-24 relative z-10 border-t border-white/5 bg-card/10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">How We Help</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Outcome-Driven Core Solutions</p>
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

      {/* ================= METRICS SECTION ================= */}
      <Section className="py-20 border-y border-white/5 bg-[#101525]/40 backdrop-blur-sm relative z-10">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* ================= PROCESS SECTION ================= */}
      <Section className="py-24 relative z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Methodology</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Our Security Pipeline Lifecycle</p>
          </div>

          <MethodologyTimeline />
        </Container>
      </Section>

      {/* ================= CASE STUDIES ================= */}
      <Section className="py-24 border-t border-white/5 bg-[#101525]/30 relative z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Case Studies</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Proven Security Outcomes</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {homeConfig.securityInsights.map((study, idx) => {
              const borderColors = [
                "hover:border-primary/30 hover:shadow-[0_0_20px_rgba(54,226,123,0.08)]",
                "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(34,211,238,0.08)]",
                "hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(192,132,252,0.08)]"
              ];
              const accentColor = ["text-primary", "text-cyan-400", "text-purple-400"];

              return (
                <div 
                  key={idx} 
                  className={`rounded-3xl border border-white/5 bg-[#101525]/85 p-6 flex flex-col justify-between transition-all duration-300 ${borderColors[idx]}`}
                >
                  <div className="text-left">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-white/5 text-gray-500 border border-white/5">
                      {study.category}
                    </span>
                    
                    <h3 className="mt-5 text-lg font-black text-white tracking-tight">{study.title}</h3>
                    
                    <div className="mt-6 space-y-3.5 border-t border-white/5 pt-4 text-xs font-medium">
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

                  <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-left">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-gray-500 font-mono block">{study.source}</span>
                      <span className={`text-lg font-black font-mono tracking-tight mt-0.5 block ${accentColor[idx]}`}>{study.stat}</span>
                    </div>
                    <p className="text-[10px] text-gray-300 leading-snug font-medium max-w-[130px] text-right">
                      {study.source}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ================= TECHNOLOGY ECOSYSTEM ================= */}
      <Section className="py-24 relative z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Ecosystem</h2>
            <p className="mt-3 text-3xl font-black text-foreground sm:text-4xl tracking-tight">Security Integrations</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {homeConfig.techEcosystem.map((tech) => (
              <div
                key={tech.name}
                className="px-5 py-3.5 rounded-full border border-border bg-card/40 text-sm font-bold font-mono tracking-wide text-muted-foreground transition-all duration-300 cursor-default hover:text-foreground hover:bg-card"
              >
                <span className="text-muted-foreground/50 mr-1.5 opacity-60">#</span>
                {tech.name}
                <span className="text-[10px] bg-muted border border-border text-muted-foreground px-1.5 py-0.5 rounded-full ml-2 opacity-80 group-hover:opacity-100 font-sans font-medium">
                  {tech.category}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= TESTIMONIALS ================= */}
      <Section className="py-24 border-y border-border bg-card/30 relative z-10">
        <Container>
          <div className="text-center mb-10">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Testimonials</h2>
          </div>

          <TestimonialCarousel />
        </Container>
      </Section>

      {/* ================= FINAL CTA SECTION ================= */}
      <Section id="cta" className="py-24 relative z-10">
        <Container className="max-w-6xl rounded-3xl border border-border bg-card-gradient p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <SecurityEstimator />
        </Container>
      </Section>
    </main>
  );
}
