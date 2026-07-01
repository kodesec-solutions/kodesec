import React from "react";
import Link from "next/link";
import AttackGraph from "@/components/AttackGraph";
import ProcessTimeline from "@/components/services/ProcessTimeline";

// Primitives
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
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
  FileText, 
  Server, 
  ShieldCheck
} from "lucide-react";

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

// Config data
import { servicesData } from "@/app/data/services";

export const metadata: Metadata = {
  title: "Security & Software Development Services Catalog",
  description: "Browse KodeSec's professional cybersecurity, penetration testing, secure app development, cloud hardening, and software QA capabilities.",
  alternates: {
    canonical: "/services",
  },
  keywords: [
    "cybersecurity services",
    "penetration testing services",
    "secure development catalog",
    "DevSecOps consultancy",
    "Active Directory security assessment",
  ],
};

const iconMap: Record<string, any> = {
  "secure-application-development": CodeIcon,
  "manual-website-penetration-testing": Terminal,
  "network-infrastructure-penetration-testing": Server,
  "infrastructure-automation-cloud-solutions": Workflow,
  "website-vulnerability-scan-manual-verification": Shield,
  "active-directory-security-assessment": ShieldCheck,
  "application-qa-testing": Cpu,
};

function CodeIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export default function Services() {
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
        "name": "Services",
        "item": "https://kodesec.com/services"
      }
    ]
  };

  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Kodesec Cybersecurity & Software Engineering Services",
    "itemListElement": servicesData.map((service, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "item": {
        "@type": "Service",
        "name": service.title.split(" - ")[0],
        "description": service.shortPositioning.split(". ")[0] + ".",
        "url": `https://kodesec.com/services/${service.slug}`
      }
    }))
  };

  const industries = [
    {
      name: "SaaS",
      focus: "Multi-tenant logic segregation",
      compliance: "SOC2 Alignment",
      glow: "hover:shadow-[0_0_20px_rgba(54,226,123,0.06)] hover:border-primary/20"
    },
    {
      name: "FinTech",
      focus: "Ledger and billing validation",
      compliance: "PCI-DSS Scopes",
      glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.06)] hover:border-cyan-500/20"
    },
    {
      name: "Healthcare",
      focus: "HIPAA PHI access audits",
      compliance: "HIPAA Compliant",
      glow: "hover:shadow-[0_0_20px_rgba(192,132,252,0.06)] hover:border-purple-500/20"
    },
    {
      name: "Enterprise",
      focus: "Kubernetes IAM/RBAC hardening",
      compliance: "ISO 27001 Controls",
      glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:border-white/20"
    },
    {
      name: "E-commerce",
      focus: "API gateway & payment audits",
      compliance: "OWASP Top 10 Protected",
      glow: "hover:shadow-[0_0_20px_rgba(244,63,94,0.06)] hover:border-rose-500/20"
    }
  ];

  const trustPillars = [
    {
      title: "OWASP Aligned",
      desc: "Methodology strictly mapped to OWASP ASVS v4.0 and Top 10 standards.",
      icon: ShieldCheck,
      color: "text-primary"
    },
    {
      title: "Manual Exploitation Focus",
      desc: "Our offensive engineers manually exploit business logic, leaving scanners behind.",
      icon: Terminal,
      color: "text-red-400"
    },
    {
      title: "Security-First Engineering",
      desc: "We write clean patch advisory code blocks directly in your target language.",
      icon: Cpu,
      color: "text-cyan-400"
    },
    {
      title: "Evidence-Based Reports",
      desc: "No automated copy-paste scanner sheets. Every finding is backed by a verified PoC.",
      icon: FileText,
      color: "text-purple-400"
    }
  ];

  return (
    <main className="bg-background-dark overflow-hidden relative min-h-screen">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceListSchema} />
      
      {/* Dynamic Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <Section className="relative px-6 pt-28 pb-24 md:pt-36 md:pb-32 lg:px-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10 w-full min-w-0">
              <Badge className="mb-6 animate-pulse">
                CYBERSECURITY OUTCOMES DELIVERED
              </Badge>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.05] lg:max-w-xl">
                Security Services <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-accent-cyan font-black">
                  Built for Devs.
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-gray-400 max-w-lg font-medium">
                From secure software architecture to offensive penetration testing and DevSecOps pipelines. We evaluate systems from an attacker&apos;s perspective.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
                <a
                  href="#services-grid"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
                >
                  Explore Offerings
                  <ArrowRight size={16} />
                </a>
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-muted/40 px-8 text-sm font-bold text-foreground transition-all hover:bg-muted hover:border-border cursor-pointer"
                >
                  <Calendar size={16} />
                  Book Scope Consultation
                </Link>
              </div>
            </div>

            {/* Right Attack Graph Simulator */}
            <div className="lg:col-span-6 flex justify-center z-10 w-full min-w-0">
              <AttackGraph />
            </div>

          </div>
        </Container>
      </Section>

      {/* ================= SERVICES GRID ================= */}
      <Section id="services-grid" className="py-24 px-6 lg:px-20 relative z-10 border-t border-border bg-card/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Service Matrix</h2>
            <p className="mt-3 text-3xl font-black text-foreground sm:text-4xl tracking-tight">Our Core Audits & Engineering</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {servicesData.map((service, idx) => {
              const IconComp = iconMap[service.slug] || Shield;
              const glows = [
                "hover:shadow-[0_0_30px_rgba(54,226,123,0.15)] hover:border-primary/30",
                "hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:border-cyan-500/30",
                "hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:border-red-500/30",
                "hover:shadow-[0_0_30px_rgba(192,132,252,0.15)] hover:border-purple-500/30"
              ];
              const glowClass = glows[idx % glows.length];
              const colors = ["text-primary", "text-cyan-400", "text-red-400", "text-purple-400"];
              const iconColor = colors[idx % colors.length];

              return (
                <div
                  key={service.slug}
                  className={`group relative rounded-[2rem] border border-border bg-card/45 p-8 backdrop-blur-md transition-all duration-300 ${glowClass} flex flex-col justify-between text-left`}
                >
                  <div>
                    {/* Top Header */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted border border-border">
                        <IconComp className={`h-7 w-7 ${iconColor}`} />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest bg-muted px-2.5 py-1 rounded border border-border">
                        SERVICE 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {service.title.split(" - ")[0]}
                    </h3>
                    <p className="mt-3.5 text-xs text-muted-foreground leading-relaxed font-medium">
                      {service.shortPositioning.split(". ")[0]}.
                    </p>

                    {/* Capability Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {service.keyApproach.slice(0, 3).map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2.5 py-1 rounded-full border border-border bg-muted/40 text-[10px] font-mono font-bold text-muted-foreground truncate max-w-[200px]"
                        >
                          #{tag.split(" ")[0]} {tag.split(" ").slice(1, 3).join(" ")}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-3 justify-between items-center">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex h-10 items-center justify-center gap-1 text-xs font-mono font-bold text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                    >
                      View Details
                      <ArrowRight size={12} />
                    </Link>
                    <Link
                      href="/contact?type=assessment"
                      className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-muted border border-border px-5 text-xs font-bold text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all cursor-pointer"
                    >
                      Scope Assessment
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ================= INDUSTRIES SECTION ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-border bg-card/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Sector Experience</h2>
            <p className="mt-3 text-3xl font-black text-foreground sm:text-4xl tracking-tight">Compliance & Target Alignment</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {industries.map((ind, idx) => (
              <div
                key={ind.name}
                className={`group rounded-2xl border border-border bg-card/85 p-5 flex flex-col justify-between transition-all duration-300 ${ind.glow} hover:-translate-y-1 text-left`}
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-primary tracking-wider block">
                    0{idx + 1}
                  </span>
                  <h3 className="mt-3 text-lg font-black text-foreground tracking-tight">{ind.name}</h3>
                  <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed font-medium">{ind.focus}</p>
                </div>
                <div className="mt-6 border-t border-border pt-3">
                  <span className="text-[9px] font-mono text-muted-foreground/60 uppercase tracking-widest block">Audit Compliance</span>
                  <span className="text-xs font-bold font-mono text-foreground block mt-0.5">{ind.compliance}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= DELIVERY PROCESS ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-border">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Delivery Framework</h2>
            <p className="mt-3 text-3xl font-black text-foreground sm:text-4xl tracking-tight">Our Security Engagement Lifecycle</p>
          </div>

          <ProcessTimeline />
        </Container>
      </Section>

      {/* ================= TRUST SECTION ================= */}
      <Section className="py-24 border-t border-border bg-card/30 relative z-10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Our Standards</h2>
            <p className="mt-3 text-3xl font-black text-foreground sm:text-4xl tracking-tight">Quality Outcomes, Zero Scanner Noise</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-border bg-card/85 p-6 flex flex-col items-start text-left transition-all hover:border-primary/20 group hover:shadow-[0_0_20px_rgba(54,226,123,0.05)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted border border-border mb-5">
                    <IconComp className={`h-5.5 w-5.5 ${pillar.color}`} />
                  </div>
                  <h3 className="text-base font-black text-foreground tracking-tight">{pillar.title}</h3>
                  <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed font-medium">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ================= FINAL CTA SECTION ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-border">
        <Container className="max-w-5xl rounded-[2.5rem] border border-border bg-card-gradient p-8 md:p-16 relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Shield Badge */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <Shield className="h-6 w-6 text-primary animate-pulse" />
          </div>

          <h2 className="text-3xl font-black text-foreground sm:text-5xl leading-tight tracking-tight max-w-2xl">
            Ready to Improve Your Security Posture?
          </h2>
          
          <p className="mt-4 text-sm text-muted-foreground max-w-lg leading-relaxed font-medium">
            Deploy defensive capabilities and offensive validations. Select Request Assessment to kick off or schedule a general scope call.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/contact?type=assessment"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
            >
              Request Assessment
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/contact?type=consultation"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-muted/40 px-8 text-sm font-bold text-foreground transition-all hover:bg-muted hover:border-border cursor-pointer"
            >
              <Calendar size={16} />
              Book Consultation
            </Link>
          </div>

        </Container>
      </Section>

    </main>
  );
}