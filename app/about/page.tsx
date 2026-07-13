import React from "react";
import type { Metadata } from "next";

// Custom Page Components
import HeroSection from "@/components/about/HeroSection";
import StoryTimeline from "@/components/about/StoryTimeline";
import FounderCard from "@/components/about/FounderCard";
import ExpertiseCard from "@/components/about/ExpertiseCard";
import ProcessTimeline from "@/components/about/ProcessTimeline";
import ValueCard from "@/components/about/ValueCard";
import TechnologyGrid from "@/components/about/TechnologyGrid";
import FAQAccordion from "@/components/about/FAQAccordion";
import CTASection from "@/components/about/CTASection";

// Primitives & Icons
import { Container } from "@/components/ui/container";
import JsonLd from "@/components/JsonLd";
import { teamConfig } from "@/config/site";
import {
  Code,
  Shield,
  Users,
  Layers,
  Zap,
  BookOpen
} from "lucide-react";

// SEO Configurations
export const metadata: Metadata = {
  title: "About Kodesec | Secure Software Development & Cybersecurity Company",
  description: "Meet the founder-led engineering team at Kodesec. We specialize in secure software development, cybersecurity assessments, cloud infrastructure, and DevOps consulting.",
  alternates: {
    canonical: "https://kodesec.com/about",
  },
  keywords: [
    "About Kodesec",
    "Software Engineering Company",
    "Cybersecurity Company",
    "Cloud Infrastructure Services",
    "DevOps Consulting",
    "Quality Assurance Services",
    "Startup Technology Partner",
    "Secure Software Development",
    "Founder-led Engineering Team"
  ],
  openGraph: {
    title: "About Kodesec | Secure Software Development & Cybersecurity",
    description: "Meet the founder-led engineering team at Kodesec. We integrate software design, operations, quality testing, and cybersecurity audit loops into a unified practice.",
    url: "https://kodesec.com/about",
    siteName: "Kodesec",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "About Kodesec | Secure Software Development & Cybersecurity",
    description: "Meet the founder-led engineering team at Kodesec. We integrate software design, operations, quality testing, and cybersecurity audit loops into a unified practice."
  }
};

// Section 4 (Expertise Areas) data containing exact target SEO keywords
const expertiseData = [
  {
    title: "Design & Engineering",
    description: "Helping startups design scalable architectures and deliver modern web and mobile applications as a trusted secure software development partner.",
    outcomes: [
      "ASVS-compliant systems and cryptographic APIs",
      "Scalable multi-tenant databases and isolation logic",
      "High-performance type-safe codebases using TypeScript",
      "Clean UI/UX layout prototypes engineered for speed"
    ],
    iconName: "code",
    link: "/services/design-engineering",
    glowClass: "hover:border-primary/20 hover:shadow-[0_0_30px_rgba(54,226,123,0.06)]"
  },
  {
    title: "Network & Cyber Security",
    description: "Operating as an elite cybersecurity company providing comprehensive manual penetration testing, threat mapping, and validation services.",
    outcomes: [
      "Manual application and cloud API pentesting",
      "Compliance audits (SOC2 & GDPR readiness alignments)",
      "Proof-of-concept exploit maps to guide developers",
      "Actionable security reports without scanner noise"
    ],
    iconName: "shield",
    link: "/services/cybersecurity",
    glowClass: "hover:border-red-500/20 hover:shadow-[0_0_30px_rgba(239,68,68,0.06)]"
  },
  {
    title: "Cloud & DevOps",
    description: "Providing expert DevOps consulting and cloud infrastructure services to securely manage, automate, and scale modern platform operations.",
    outcomes: [
      "Infrastructure as Code validation loops (Terraform)",
      "Hardened Kubernetes namespace boundaries",
      "Secure CI/CD automated vulnerability checkpoints",
      "Zero-downtime high-availability multi-region setups"
    ],
    iconName: "cloud",
    link: "/services/cloud-devops",
    glowClass: "hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)]"
  },
  {
    title: "Quality Assurance",
    description: "Offering premium quality assurance services to safeguard systems against regressions and guarantee flawless user workflows.",
    outcomes: [
      "Playwright end-to-end automated testing scripts",
      "CI/CD build pipeline regression gate integrations",
      "Robust API payload load testing and validations",
      "Edge-case manual testing plans for release blocks"
    ],
    iconName: "check",
    link: "/services/quality-assurance",
    glowClass: "hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(192,132,252,0.06)]"
  }
];

// Section 6 (Principles) data
const principlesData = [
  {
    title: "Security First",
    desc: "We analyze threat boundaries and threat-model your software before writing the first line of code.",
    iconName: "shield",
    glow: "hover:border-red-500/20 hover:shadow-[0_0_20px_rgba(239,68,68,0.05)]"
  },
  {
    title: "Scalable Architecture",
    desc: "We build systems ready for long-term growth, prioritizing modular code structures and clean databases.",
    iconName: "layers",
    glow: "hover:border-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.05)]"
  },
  {
    title: "Engineering Excellence",
    desc: "We write clean, readable, documented, and type-safe code that developers enjoy maintaining.",
    iconName: "code",
    glow: "hover:border-primary/20 hover:shadow-[0_0_20px_rgba(54,226,123,0.05)]"
  },
  {
    title: "Automation by Default",
    desc: "We eliminate human error by automated testing pipelines, IaC setups, and CI/CD security check gates.",
    iconName: "zap",
    glow: "hover:border-yellow-500/20 hover:shadow-[0_0_20px_rgba(234,179,8,0.05)]"
  },
  {
    title: "Continuous Learning",
    desc: "We constantly research threat profiles, security paradigms, and optimization models to lead tech circles.",
    iconName: "book",
    glow: "hover:border-purple-500/20 hover:shadow-[0_0_20px_rgba(192,132,252,0.05)]"
  },
  {
    title: "Transparent Collaboration",
    desc: "No sales layers or corporate gatekeepers. You speak directly with the engineers delivering your sprint.",
    iconName: "users",
    glow: "hover:border-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.05)]"
  }
];

// Section 8 (Values) data
const valueData = [
  {
    title: "Founder-led collaboration",
    description: "Collaborate directly with active technical owners, ensuring clear alignment and speed without intermediary sales agents.",
    iconName: "users",
    glowColor: "from-primary/20 to-transparent"
  },
  {
    title: "Direct communication",
    description: "Instant chat channels to active developers. No corporate accounts managers or client relationship layers.",
    iconName: "message",
    glowColor: "from-cyan-500/20 to-transparent"
  },
  {
    title: "Transparent recommendations",
    description: "Honest technical diagnostics. We don't sell bloated scopes, over-engineered features, or licensing fees.",
    iconName: "compass",
    glowColor: "from-yellow-500/20 to-transparent"
  },
  {
    title: "Practical engineering solutions",
    description: "We don't just dump automated scanning reports. We write developer-level code fixes and secure config scripts.",
    iconName: "cpu",
    glowColor: "from-purple-500/20 to-transparent"
  },
  {
    title: "Long-term partnerships",
    description: "We align our design specifications with your multi-year strategy, ensuring stable growth cycles.",
    iconName: "activity",
    glowColor: "from-blue-500/20 to-transparent"
  },
  {
    title: "Security integrated from Day 1",
    description: "Defenses are woven directly into backend functions, storage modules, and network topology from start.",
    iconName: "shield",
    glowColor: "from-red-500/20 to-transparent"
  }
];

export default function AboutPage() {
  // Breadcrumb Schema
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
        "name": "About Us",
        "item": "https://kodesec.com/about"
      }
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kodesec",
    "url": "https://kodesec.com",
    "logo": "https://kodesec.com/assets/logo.png",
    "description": "Kodesec is a founder-led engineering and cybersecurity company helping startups design, build, secure, and scale digital products.",
    "sameAs": [
      "https://linkedin.com/company/kodesec",
      "https://github.com/kodesec"
    ]
  };

  // Person Schemas
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
    <main className="bg-background-dark min-h-screen relative overflow-hidden">
      {/* Schema Injection */}
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={organizationSchema} />
      {personSchemas.map((schema, idx) => (
        <JsonLd key={idx} schema={schema} />
      ))}

      {/* Decorative ambient backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* SECTION 1: Hero */}
      <HeroSection />

      {/* SECTION 2: Our Story */}
      <StoryTimeline />

      {/* SECTION 3: Meet the Founders */}
      <section className="py-24 px-4 lg:px-20 bg-background-dark/30 border-t border-white/5 relative">
        <Container>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
              Leadership
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight leading-none">
              Meet the Founders
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
              We are an early-stage, founder-led technology partner. No account managers or sales representatives. You collaborate directly with active specialists.
            </p>
          </div>

          {/* Dynamic Founder Layout (non-standard grid heights / layout) */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {teamConfig.founders.map((founder, idx) => (
              <FounderCard key={founder.name} founder={founder} index={idx} />
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 4: Our Expertise */}
      <section id="expertise" className="py-24 px-4 lg:px-20 bg-background-dark/50 border-t border-white/5 relative">
        <Container>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
              Core Expertise
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight leading-none">
              Our Disciplines
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
              We converge design, operations, security engineering, and quality controls to establish a highly unified software pipeline.
            </p>
          </div>

          {/* Expertise Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {expertiseData.map((exp, idx) => (
              <ExpertiseCard
                key={exp.title}
                title={exp.title}
                description={exp.description}
                outcomes={exp.outcomes}
                iconName={exp.iconName}
                link={exp.link}
                glowClass={exp.glowClass}
                index={idx}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 5: How We Work */}
      <ProcessTimeline />

      {/* SECTION 6: Our Engineering Principles */}
      <section className="py-24 px-4 lg:px-20 bg-background-dark/50 border-t border-white/5 relative">
        <Container>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
              Core Principles
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight leading-none">
              Our Engineering Principles
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
              Our decisions are guided by a commitment to security, automation, reliability, and extreme technical clarity.
            </p>
          </div>

          {/* Principles Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principlesData.map((pr) => {
              const iconMap = {
                shield: Shield,
                layers: Layers,
                code: Code,
                zap: Zap,
                book: BookOpen,
                users: Users
              };
              const IconComp = iconMap[pr.iconName as keyof typeof iconMap] || Shield;
              return (
                <div
                  key={pr.title}
                  className={`group rounded-3xl border border-white/5 bg-[#0F1424]/40 p-6 flex flex-col items-start text-left transition-all duration-300 ${pr.glow}`}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/5 mb-5 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-300">
                    <IconComp className="h-5.5 w-5.5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-base font-black text-white tracking-tight leading-tight">
                    {pr.title}
                  </h3>
                  <p className="mt-3 text-xs text-gray-400 leading-relaxed font-sans font-medium">
                    {pr.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SECTION 7: Technology Ecosystem */}
      <TechnologyGrid />

      {/* SECTION 8: Why Clients Enjoy Working With Us */}
      <section className="py-24 px-4 lg:px-20 bg-background-dark/30 border-t border-white/5 relative">
        <Container>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
              Value Propositions
            </span>
            <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight leading-none">
              Why Clients Enjoy Working With Us
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
              We build authentic partnerships based on clean code, direct channels, flat-rate scoping, and verifiable safety gates.
            </p>
          </div>

          {/* Value Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {valueData.map((val, idx) => (
              <ValueCard
                key={val.title}
                title={val.title}
                description={val.description}
                iconName={val.iconName}
                glowColor={val.glowColor}
                index={idx}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 9: Frequently Asked Questions */}
      <FAQAccordion />

      {/* SECTION 10: Call To Action */}
      <CTASection />
    </main>
  );
}
