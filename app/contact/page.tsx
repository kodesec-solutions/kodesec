import React from "react";
import Link from "next/link";
import NetworkGraph from "@/components/NetworkGraph";
import ContactForm from "@/components/contact/ContactForm";

// Primitives
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

// Icons
import { 
  Mail, 
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
    <main className="bg-transparent min-h-screen text-white relative overflow-hidden">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={contactPageSchema} />

      {/* HERO SECTION */}
      <Section className="pt-12 pb-16 relative z-10 bg-transparent">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest whitespace-nowrap">
                  Direct Specialist Channel
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-tight">
                Architect Your <br className="hidden sm:inline" />
                <span className="text-gradient-emerald">Security Pipeline</span>
              </h1>

              <p className="text-sm sm:text-base text-gray-400 font-sans leading-relaxed max-w-xl">
                Collaborate directly with our senior development and offensive security leads. No non-technical account reps.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#contact-form-section"
                  className="btn-primary"
                >
                  <span>Contact Form</span>
                  <ChevronRight size={16} className="shrink-0" />
                </a>
                <a
                  href={`mailto:${socialLinksConfig.email}`}
                  className="btn-secondary"
                >
                  <Mail size={16} className="text-primary shrink-0" />
                  <span>Email Team</span>
                </a>
              </div>
            </div>

            {/* Right Visual Network Graph Panel */}
            <div className="lg:col-span-6 flex justify-center w-full min-w-0">
              <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#0D121F]/80 p-1 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
                  <span className="text-primary font-bold">ACTIVE_SIMULATION.EXE</span>
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-white/20" />
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                </div>
                <div className="h-[280px] w-full flex items-center justify-center relative bg-black/20">
                  <NetworkGraph />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FORM SECTION */}
      <Section id="contact-form-section" className="py-16 relative z-10 bg-transparent">
        <Container>
          <ContactForm />
        </Container>
      </Section>

      {/* ONBOARDING TIMELINE */}
      <Section className="py-20 relative z-10 bg-transparent">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Lifecycle</h2>
            <p className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">Onboarding Timeline</p>
            <p className="text-xs text-gray-400 font-sans">What to expect after submitting your scoping details.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 relative">
            {contactConfig.timelineSteps.map((step) => (
              <div
                key={step.num}
                className="relative rounded-3xl border border-white/10 bg-[#0D121F]/80 p-6 text-left flex flex-col justify-between min-h-[170px] hover:border-primary/40 transition-all duration-300 group"
              >
                <div>
                  <span className="text-2xl font-bold font-mono text-primary group-hover:scale-110 transition-transform inline-block">
                    {step.num}
                  </span>
                  <h4 className="text-sm font-heading font-bold text-white mt-3 group-hover:text-primary transition-colors">{step.name}</h4>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed font-sans">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* RESPONSE COMMITMENT BADGES */}
      <Section className="py-16 relative z-10 bg-transparent">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {contactConfig.onboardingBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="rounded-3xl border border-white/10 bg-[#0D121F]/80 p-6 flex gap-4 text-left items-start transition-all duration-300 hover:border-primary/40">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading font-bold text-white">{badge.title}</h4>
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed font-sans">{badge.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <Section className="py-20 relative z-10 bg-transparent">
        <Container className="max-w-4xl rounded-3xl border border-white/10 bg-[#0D121F]/90 p-8 md:p-14 relative overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6 text-primary shrink-0">
            <Sparkles className="h-6 w-6 animate-pulse" />
          </div>

          <h2 className="text-3xl font-heading font-bold text-white sm:text-4xl leading-tight tracking-tight max-w-xl">
            Prefer talking directly with the team?
          </h2>
          
          <p className="mt-4 text-xs text-gray-400 max-w-md leading-relaxed font-sans">
            Skip the intake form. Schedule an introductory call, drop us an email, or connect via LinkedIn.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 w-full sm:w-auto">
            <Link href="/contact?type=consultation#contact-form-section" className="btn-primary">
              Book a Call
            </Link>
            <a href={`mailto:${socialLinksConfig.email}`} className="btn-secondary">
              Send an Email
            </a>
            <a href={socialLinksConfig.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
              LinkedIn Connect
            </a>
          </div>
        </Container>
      </Section>
    </main>
  );
}
