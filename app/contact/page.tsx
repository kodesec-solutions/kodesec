import React from "react";
import Link from "next/link";
import NetworkGraph from "@/components/NetworkGraph";
import ContactForm from "@/components/contact/ContactForm";

// Primitives
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

// Icons
import { 
  Mail, 
  Calendar, 
  ChevronRight, 
  Sparkles
} from "lucide-react";

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { contactConfig, socialLinksConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Our Security Architects",
  description: "Get in touch directly with technical founders at KodeSec. Request a manual penetration test, secure code audit, or cloud infrastructure hardening.",
  alternates: {
    canonical: "/contact",
  },
  keywords: ["contact KodeSec", "hire penetration testing team", "secure developer consultation", "scoping security review"],
};

export default function ContactPage() {
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
        "name": "Contact",
        "item": "https://kodesec.com/contact"
      }
    ]
  };

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://kodesec.com/contact/#contactpage",
    "url": "https://kodesec.com/contact",
    "name": "Contact Kodesec Team",
    "description": "Secure communication channel to coordinate penetration testing audits and software validation.",
    "publisher": {
      "@id": "https://kodesec.com/#organization"
    }
  };

  return (
    <main className="bg-background-dark overflow-hidden relative min-h-screen">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={contactPageSchema} />
      {/* Background decorations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />

      {/* ================= 1. HERO SECTION ================= */}
      <Section className="relative px-6 pt-28 pb-20 md:pt-36 md:pb-28 lg:px-20 z-10">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left w-full min-w-0">
              <Badge className="mb-6 animate-pulse">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping mr-2"></span>
                ACCESS TO ACTIVE ENGINEERS
              </Badge>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.05]">
                Let's Build Something<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-accent-cyan font-black">
                  Secure Together
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-gray-400 max-w-lg font-medium">
                Whether you are launching a product, securing cloud networks, or planning an audit, we are ready to assist.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
                <a
                  href="#contact-form-section"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
                >
                  Contact Form
                  <ChevronRight size={16} />
                </a>
                <a
                  href={`mailto:${socialLinksConfig.email}`}
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-8 text-sm font-bold text-white transition-all hover:bg-white/[0.06] hover:border-white/20 cursor-pointer"
                >
                  <Mail size={16} />
                  Email Team
                </a>
              </div>
            </div>

            {/* Right Visual Network Graph Panel */}
            <div className="lg:col-span-6 flex justify-center w-full min-w-0">
              <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0F1424]/60 p-1 backdrop-blur-md overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-border font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                  <span>ACTIVE_SIMULATION.EXE</span>
                  <div className="flex gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <div className="h-[280px] w-full flex items-center justify-center relative bg-black/10">
                  <NetworkGraph />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= FORM SECTION & SELECTOR ================= */}
      <Section id="contact-form-section" className="py-16 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]/30">
        <Container>
          <ContactForm />
        </Container>
      </Section>

      {/* ================= 5. WHAT HAPPENS NEXT ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase">Lifecycle</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Onboarding Timeline</p>
            <p className="mt-2 text-sm text-white/50">What to expect after submitting your scoping details.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 relative">
            {contactConfig.timelineSteps.map((step) => (
              <div
                key={step.num}
                className="relative rounded-3xl border border-white/5 bg-[#101525]/85 p-6 text-left flex flex-col justify-between min-h-[160px] hover:border-accent-cyan/20 transition-all duration-300"
              >
                <div>
                  <span className="text-2xl font-black font-mono text-accent-cyan/20 transition-colors">
                    {step.num}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-3">{step.name}</h4>
                  <p className="text-xs text-white/50 mt-2 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= 6. RESPONSE COMMITMENT ================= */}
      <Section className="py-20 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]/30">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {contactConfig.onboardingBadges.map((badge, idx) => {
              const Icon = badge.icon;
              const borderStyles = [
                "hover:border-primary/20",
                "hover:border-cyan-500/20",
                "hover:border-purple-500/20"
              ];
              const iconColors = [
                "bg-primary/10 text-primary",
                "bg-cyan-500/10 text-cyan-400",
                "bg-purple-500/10 text-purple-400"
              ];
              
              return (
                <div key={idx} className={`rounded-3xl border border-border bg-card/85 p-6 flex gap-4 text-left items-start transition-all duration-300 ${borderStyles[idx]}`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconColors[idx]}`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{badge.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed font-medium">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ================= 8. FINAL CTA ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-border">
        <Container className="max-w-4xl rounded-[2.5rem] border border-border bg-card-gradient p-8 md:p-16 relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Icon Badge */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
          </div>

          <h2 className="text-3xl font-black text-foreground sm:text-4xl leading-tight tracking-tight max-w-xl">
            Prefer talking directly with the team?
          </h2>
          
          <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed font-medium">
            Skip the intake form. Schedule an introductory call, drop us an email, or connect via LinkedIn.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
            >
              Book a Call
            </Link>
            <a
              href={`mailto:${socialLinksConfig.email}`}
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-muted/40 px-8 text-sm font-bold text-foreground transition-all hover:bg-muted hover:border-border cursor-pointer"
            >
              Send an Email
            </a>
            <a
              href={socialLinksConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-muted/40 px-8 text-sm font-bold text-foreground transition-all hover:bg-muted hover:border-border cursor-pointer"
            >
              LinkedIn Connect
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
