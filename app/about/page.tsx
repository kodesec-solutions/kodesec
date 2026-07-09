import React from "react";
import Link from "next/link";
import NetworkGraph from "@/components/NetworkGraph";
import FounderStoryTimeline from "@/components/about/FounderStoryTimeline";
import LifecycleWorkflow from "@/components/about/LifecycleWorkflow";

// Primitives
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { FeatureCard } from "@/components/ui/feature-card";
import { Card } from "@/components/ui/card";
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
  Lock, 
  Activity, 
  Users, 
  BookOpen, 
  MessageSquare,
  Mail,
  Zap
} from "lucide-react";

// Config data
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { aboutConfig, teamConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Our Team",
  description: "Meet the founders and engineering architects of KodeSec. We are a small, highly technical, and founder-led cyber engineering team.",
  alternates: {
    canonical: "/about",
  },
  keywords: ["KodeSec team", "security engineers", "Yeaser Alam Reshad", "Mian Al Ruhaniyat", "Nafiul Vai", "Ashikul Islam"],
};

export default function AboutPage() {
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
        "name": "About",
        "item": "https://kodesec.com/about"
      }
    ]
  };

  const personSchemas = teamConfig.founders.map((founder) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    "name": founder.name,
    "jobTitle": founder.role,
    "worksFor": {
      "@type": "Organization",
      "name": "Kodesec",
      "url": "https://kodesec.com"
    },
    "sameAs": [
      founder.linkedin,
      founder.github
    ]
  }));

  return (
    <main className="bg-background-dark overflow-hidden relative min-h-screen">
      <JsonLd schema={breadcrumbSchema} />
      {personSchemas.map((schema, idx) => (
        <JsonLd key={idx} schema={schema} />
      ))}
      
      {/* Decorative ambient lights */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <Section className="relative px-6 pt-28 pb-24 md:pt-36 md:pb-32 lg:px-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left z-10 w-full min-w-0">
              <Badge variant="default" className="mb-6 animate-pulse">
                FOUNDER-LED CYBER ENGINEERING
              </Badge>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.05] lg:max-w-xl">
                Four Engineers. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-accent-cyan font-black">
                  One Mission.
                </span>
              </h1>

              <p className="mt-6 text-base leading-relaxed text-gray-400 max-w-lg font-medium">
                Building secure, resilient digital platforms from architecture to release. We are intentionally small, highly technical, and founder-driven.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
                >
                  Schedule Consultation
                  <ChevronRight size={16} />
                </Link>
                <Link
                  href="/contact?type=consultation"
                  className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-muted/40 px-8 text-sm font-bold text-foreground transition-all hover:bg-muted hover:border-border cursor-pointer"
                >
                  Book Scope Call
                </Link>
              </div>
            </div>

            {/* Right Clustered Mesh Simulator */}
            <div className="lg:col-span-6 flex justify-center z-10 w-full min-w-0">
              <NetworkGraph />
            </div>

          </div>
        </Container>
      </Section>

      {/* ================= WHY WE STARTED KODESEC ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-border bg-card/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Founder Story</h2>
            <p className="mt-3 text-3xl font-black text-foreground sm:text-4xl tracking-tight">Why We Started Kodesec</p>
          </div>

          <FounderStoryTimeline />
        </Container>
      </Section>

      {/* ================= MEET THE FOUNDERS ================= */}
      <Section id="founders-section" className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Leadership</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Meet The Founders</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {teamConfig.founders.map((f) => (
              <div
                key={f.name}
                className="group relative rounded-[2rem] border border-white/5 bg-[#101525]/85 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/20 hover:shadow-[0_0_20px_rgba(54,226,123,0.05)] hover:-translate-y-1 flex flex-col justify-between text-left"
              >
                <div>
                  {/* Avatar Photo Container */}
                  <div className="relative mb-6 h-44 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/10 group-hover:border-primary/30 transition-all duration-300">
                    {f.image ? (
                      <img
                        src={f.image}
                        alt={f.name}
                        className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-2xl font-black font-mono text-primary/40 bg-muted">
                        {f.avatar}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>

                  <h3 className="text-xl font-black text-foreground tracking-tight">{f.name}</h3>
                  <p className="text-xs font-mono text-primary mt-1 font-bold">{f.role}</p>

                  <p className="mt-4 text-xs text-muted-foreground leading-relaxed font-medium min-h-[70px]">
                    {f.bio}
                  </p>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {f.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 rounded border border-border bg-muted/40 text-[9px] font-mono font-bold text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Badges / Links */}
                <div className="mt-8 pt-4 border-t border-border flex items-center gap-3">
                  <a 
                    href={f.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all"
                  >
                    <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href={`mailto:${f.email}`}
                    className="p-2 rounded-lg bg-muted border border-border text-muted-foreground hover:text-foreground hover:border-primary/20 transition-all"
                  >
                    <Mail size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= EXPERTISE AREAS ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Expertise</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Our Focus Areas</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aboutConfig.expertiseAreas.map((area, idx) => (
              <FeatureCard
                key={idx}
                title={area.title}
                description={area.desc}
                icon={area.icon}
                glowClass={area.glow}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= CORE PRINCIPLES ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Philosophy</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Our Core Principles</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aboutConfig.principles.map((pr, idx) => {
              const IconComp = pr.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-border bg-card/85 p-6 flex flex-col items-start text-left transition-all hover:border-primary/20 hover:shadow-[0_0_20px_rgba(54,226,123,0.05)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-muted border border-border mb-5">
                    <IconComp className="h-5.5 w-5.5 text-primary" />
                  </div>
                  <h3 className="text-base font-black text-foreground tracking-tight">{pr.title}</h3>
                  <p className="mt-3 text-[11px] text-muted-foreground leading-relaxed font-medium">{pr.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ================= HOW WE WORK ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 bg-[#0B0F1A]/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Lifecycle</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">How We Deliver Work</p>
          </div>

          <LifecycleWorkflow />
        </Container>
      </Section>

      {/* ================= CONNECT WITH THE TEAM ================= */}
      <Section className="py-24 px-6 lg:px-20 relative z-10 border-t border-border">
        <Container className="max-w-5xl rounded-[2.5rem] border border-border bg-card-gradient p-8 md:p-16 relative overflow-hidden shadow-2xl flex flex-col items-center text-center">
          
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Icon Badge */}
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
            <MessageSquare className="h-6 w-6 text-primary animate-pulse" />
          </div>

          <h2 className="text-3xl font-black text-foreground sm:text-5xl leading-tight tracking-tight max-w-2xl">
            Collaborate Directly with Technical Owners
          </h2>
          
          <p className="mt-4 text-sm text-muted-foreground max-w-lg leading-relaxed font-medium">
            No sales calls. Speak directly with the engineers designing, deployment, and testing your digital defenses.
          </p>

          {/* Connect Founders Badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3 mb-8">
            {teamConfig.founders.map((f) => (
              <a
                key={f.name}
                href={`mailto:${f.email}`}
                className="flex items-center gap-2 border border-border bg-muted/40 hover:border-primary/40 hover:bg-muted transition-all px-4 py-2 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-mono text-[9px] font-bold">
                  {f.avatar}
                </span>
                {f.name}
              </a>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 w-full sm:w-auto">
            <Link
              href="/contact?type=consultation"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)] cursor-pointer"
            >
              Schedule Consultation
              <ChevronRight size={16} />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-muted/40 px-8 text-sm font-bold text-foreground transition-all hover:bg-muted hover:border-border cursor-pointer"
            >
              General Inquiry
            </Link>
          </div>

        </Container>
      </Section>

    </main>
  );
}
