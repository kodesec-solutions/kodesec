import React from "react";
import HeroSection from "@/components/about/HeroSection";
import StoryTimeline from "@/components/about/StoryTimeline";
import FounderCard from "@/components/about/FounderCard";
import ExpertiseCard from "@/components/about/ExpertiseCard";
import ProcessTimeline from "@/components/about/ProcessTimeline";
import TechnologyGrid from "@/components/about/TechnologyGrid";
import ValueCard from "@/components/about/ValueCard";
import FAQAccordion from "@/components/about/FAQAccordion";
import CTASection from "@/components/about/CTASection";
import { Container } from "@/components/ui/container";

import { teamConfig } from "@/config/site";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { 
  Shield, 
  Layers, 
  Code, 
  Zap, 
  BookOpen, 
  Users 
} from "lucide-react";

export const metadata: Metadata = {
  title: "About KodeSec | Security Architects & Software Engineers",
  description: "Learn about KodeSec's mission: delivering high-resilience engineering, zero-trust cloud platforms, and offensive security testing.",
  alternates: {
    canonical: "/about",
  },
  keywords: ["about KodeSec", "cybersecurity firm history", "software engineering leaders", "zero trust principles"],
};

const expertiseData = [
  {
    title: "Offensive Penetration Testing",
    description: "Manual threat modeling and vulnerability exploitation to discover security flaws before attackers do.",
    outcomes: ["Zero false positives", "Remediation pull requests", "Compliance readiness"],
    iconName: "shield",
    link: "/services/cybersecurity",
    glowClass: "hover:border-primary/40"
  },
  {
    title: "Secure Application Development",
    description: "Building production-grade web applications, REST/GraphQL APIs, and microservices with security baked in.",
    outcomes: ["Clean architecture", "OWASP ASVS compliance", "High performance"],
    iconName: "code",
    link: "/services/design-engineering",
    glowClass: "hover:border-primary/40"
  },
  {
    title: "Cloud & DevSecOps Hardening",
    description: "Architecting zero-trust Kubernetes clusters, Terraform infrastructure, and automated CI/CD security scanning.",
    outcomes: ["Infrastructure as code", "SOC2 compliance", "Zero downtime"],
    iconName: "layers",
    link: "/services/cloud-devops",
    glowClass: "hover:border-primary/40"
  },
  {
    title: "Automated QA & Reliability",
    description: "End-to-end integration testing, load validation, and continuous test automation pipelines.",
    outcomes: ["99.9% uptime", "Automated regression checks", "Bug-free releases"],
    iconName: "zap",
    link: "/services/quality-assurance",
    glowClass: "hover:border-primary/40"
  }
];

const principlesData = [
  {
    title: "Security First Architecture",
    desc: "We integrate security into the initial blueprint, rather than treating it as an afterthought.",
    iconName: "shield"
  },
  {
    title: "Scalable Modular Design",
    desc: "Every service is decoupled to ensure smooth growth, maintainability, and clean maintenance.",
    iconName: "layers"
  },
  {
    title: "Maintainable Clean Code",
    desc: "We write clean, strictly-typed code with clear inline documentation for seamless handovers.",
    iconName: "code"
  },
  {
    title: "Automation by Default",
    desc: "Eliminating manual deployment errors through strict CI/CD pipelines and IaC blueprints.",
    iconName: "zap"
  },
  {
    title: "Transparent Communication",
    desc: "Direct communication channels with active software and offensive security specialists.",
    iconName: "users"
  },
  {
    title: "Continuous Verification",
    desc: "Automated regression suites and continuous security auditing on every commit.",
    iconName: "book"
  }
];

const valueData = [
  {
    title: "Founder-Led Commitment",
    description: "Work directly with technical co-founders who take full responsibility for product delivery.",
    iconName: "users",
    glowColor: "hover:border-primary/40"
  },
  {
    title: "Zero False Positives",
    description: "Every vulnerability report is manually verified and paired with actionable code fixes.",
    iconName: "shield",
    glowColor: "hover:border-primary/40"
  },
  {
    title: "Speed to Production",
    description: "Rapid iteration cycles with security gates configured directly inside your Git workflow.",
    iconName: "zap",
    glowColor: "hover:border-primary/40"
  }
];

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
        "name": "About Us",
        "item": "https://kodesec.com/about"
      }
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kodesec",
    "url": "https://kodesec.com",
    "logo": "https://kodesec.com/assets/Logo.png",
    "description": "Founder-led technology partner specializing in secure software engineering, offensive penetration testing, and DevSecOps automation.",
    "foundingDate": "2024",
    "founders": teamConfig.founders.map(f => ({
      "@type": "Person",
      "name": f.name
    }))
  };

  return (
    <main className="bg-transparent min-h-screen relative overflow-hidden text-white">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={organizationSchema} />

      {/* SECTION 1: Hero */}
      <HeroSection />

      {/* SECTION 2: Our Story */}
      <StoryTimeline />

      {/* SECTION 3: Leadership 
      <section className="py-20 px-4 lg:px-20 bg-transparent relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/10 px-3.5 py-1 rounded-full inline-block">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Meet the Founders
            </h2>
            <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto">
              We are an early-stage, founder-led engineering partner. You collaborate directly with active security and software specialists.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
            {teamConfig.founders.map((founder, idx) => (
              <FounderCard key={founder.name} founder={founder} index={idx} />
            ))}
          </div>
        </Container>
      </section>*/}

      {/* SECTION 4: Core Expertise */}
      <section id="expertise" className="py-20 px-4 lg:px-20 bg-transparent relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/10 px-3.5 py-1 rounded-full inline-block">
              Core Expertise
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Our Disciplines
            </h2>
            <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto">
              We converge design, cloud operations, offensive security, and automated quality controls into a unified engineering pipeline.
            </p>
          </div>

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

      {/* SECTION 6: Engineering Principles */}
      <section className="py-20 px-4 lg:px-20 bg-transparent relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/10 px-3.5 py-1 rounded-full inline-block">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Our Engineering Principles
            </h2>
            <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto">
              Guiding our architecture decisions with security, automation, reliability, and extreme technical clarity.
            </p>
          </div>

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
                  className="group rounded-3xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl p-6 md:p-8 flex flex-col items-start text-left transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(54,226,123,0.12)]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary mb-5 group-hover:bg-primary group-hover:text-black transition-all">
                    <IconComp className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="text-base font-heading font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                    {pr.title}
                  </h3>
                  <p className="mt-3 text-xs text-gray-400 font-sans leading-relaxed">
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

      {/* SECTION 8: Value Propositions */}
      <section className="py-20 px-4 lg:px-20 bg-transparent relative">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/10 px-3.5 py-1 rounded-full inline-block">
              Value Propositions
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Why Engineering Teams Trust Us
            </h2>
            <p className="text-sm text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto">
              We build long-term partnerships based on clean code, direct engineer channels, and verifiable safety gates.
            </p>
          </div>

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

      {/* SECTION 9: FAQ */}
      <FAQAccordion />

      {/* SECTION 10: Call To Action */}
      <CTASection />
    </main>
  );
}
