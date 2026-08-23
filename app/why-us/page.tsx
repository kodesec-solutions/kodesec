import React from "react";
import HeroSection from "@/components/why-us/HeroSection";
import TrustCard from "@/components/why-us/TrustCard";
import WhoWeHelp from "@/components/why-us/WhoWeHelp";
import ComparisonTable from "@/components/why-us/ComparisonTable";
import ProcessTimeline from "@/components/why-us/ProcessTimeline";
import PrincipleCard from "@/components/why-us/PrincipleCard";
import TechCategory from "@/components/why-us/TechCategory";
import FAQAccordion from "@/components/why-us/FAQAccordion";
import CTASection from "@/components/why-us/CTASection";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Why Choose KodeSec | Technical Differentiators",
  description: "Discover why engineering leaders choose KodeSec: zero false positive security audits, founder-led developer channels, and production-ready code.",
  alternates: {
    canonical: "/why-us",
  },
  keywords: ["why choose KodeSec", "penetration testing firm comparison", "DevSecOps value proposition", "secure software development partner"],
};

export default function WhyUsPage() {
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
        "name": "Why Us",
        "item": "https://kodesec.com/why-us"
      }
    ]
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kodesec",
    "url": "https://kodesec.com",
    "logo": "https://kodesec.com/assets/Logo.png"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does Kodesec guarantee zero false positives?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Every automated scan finding is manually reviewed, verified, and paired with a remediation pull request before delivery."
        }
      },
      {
        "@type": "Question",
        "name": "Who will I work with during my project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You communicate directly with senior software architects and offensive security engineers, avoiding non-technical account managers."
        }
      }
    ]
  };

  const trustCardsData = [
    {
      title: "Direct Specialist Access",
      description: "You work directly with senior software leads and offensive security engineers — no non-technical sales reps in between.",
      icon: "users",
      glowColor: "hover:border-primary/40"
    },
    {
      title: "Security by Design",
      description: "Security is considered from the first architectural decision, not added at the end of development.",
      icon: "shield",
      glowColor: "hover:border-primary/40"
    },
    {
      title: "End-to-End Expertise",
      description: "One unified team covering software engineering, offensive security, cloud infrastructure, and QA.",
      icon: "cpu",
      glowColor: "hover:border-primary/40"
    },
    {
      title: "Modern Engineering Practices",
      description: "We use scalable architectures, automation pipelines, clean code, and strict industry standards to build software that lasts.",
      icon: "code",
      glowColor: "hover:border-primary/40"
    },
    {
      title: "Transparent Collaboration",
      description: "Direct engineer communication, clear milestones, and practical recommendations with no sales inflation.",
      icon: "zap",
      glowColor: "hover:border-primary/40"
    },
    {
      title: "Built for Enterprise Scale",
      description: "We build maintainable systems that scale smoothly, extend easily, and operate reliably as your workload evolves.",
      icon: "workflow",
      glowColor: "hover:border-primary/40"
    }
  ];

  const engineeringPrinciples = [
    {
      title: "Security First",
      summary: "Security is integrated into the foundation of our engineering workflow.",
      detail: "We do not treat security as a compliance checkbox. We perform threat modeling, code analysis, and authorization checks from the first commit to ensure runtime safety.",
      icon: "shield"
    },
    {
      title: "Scalable Architecture",
      summary: "Systems designed to grow alongside your customer base.",
      detail: "We build event-driven pipelines, containerized microservices, and partition databases so that your platform scales smoothly from hundreds to millions of requests.",
      icon: "layers"
    },
    {
      title: "Clean & Maintainable Code",
      summary: "Code written for humans to read, not just machines to execute.",
      detail: "We follow clear styling standards, keep dependencies minimal, use strong types, and write comprehensive docs so your internal team can iterate with ease.",
      icon: "code"
    },
    {
      title: "Automation by Default",
      summary: "Eliminate manual steps through modern CI/CD automation.",
      detail: "From lint checks and deployment runs to database migrations and infrastructure configs, we automate every phase to minimize human error.",
      icon: "workflow"
    },
    {
      title: "Performance & Reliability",
      summary: "Fast load times and high availability for critical resources.",
      detail: "We optimize asset loading, design smart caching strategies, implement strict error boundary handling, and setup health telemetry to ensure 99.9% uptime.",
      icon: "activity"
    },
    {
      title: "Continuous Improvement",
      summary: "Constantly monitoring and adapting to changing conditions.",
      detail: "We setup live application telemetry, structure feedback loops with your product team, and run system health checks to refactor bottleneck sections.",
      icon: "refresh"
    }
  ];

  return (
    <main className="bg-transparent overflow-hidden relative min-h-screen text-white">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={orgSchema} />
      <JsonLd schema={faqSchema} />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators Section */}
      <Section className="py-20 bg-transparent">
        <Container>
          <SectionHeader
            badge="Differentiators"
            title="Authentic Differentiators"
            description="Instead of fake statistics, we focus on genuine design excellence, rigorous manual checks, and transparent engineer-to-engineer collaboration."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {trustCardsData.map((item, idx) => (
              <TrustCard
                key={idx}
                title={item.title}
                description={item.description}
                icon={item.icon}
                glowColor={item.glowColor}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Who We Help Section */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <SectionHeader
            badge="Who We Help"
            title="Helping Businesses Solve Real Engineering Challenges"
            description="We partner with startup founders, CEOs, and engineering leads to solve complex logic challenges, modernize setups, and launch resilient SaaS products."
          />
          <div className="mt-12">
            <WhoWeHelp />
          </div>
        </Container>
      </Section>

      {/* What Makes Us Different Section */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <SectionHeader
            badge="Comparison"
            title="What Makes Kodesec Different"
            description="A side-by-side comparison of Kodesec's unified solution-first engineering vs. standard checklist outsourcing vendors."
          />
          <div className="mt-12 max-w-4xl mx-auto">
            <ComparisonTable />
          </div>
        </Container>
      </Section>

      {/* How We Work Section */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <SectionHeader
            badge="Our Lifecycle"
            title="How We Work"
            description="Our structured engineering process ensures security, verification, and code performance at every phase of your project lifecycle."
          />
          <div className="mt-12">
            <ProcessTimeline />
          </div>
        </Container>
      </Section>

      {/* Engineering Principles Section */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <SectionHeader
            badge="Principles"
            title="Our Engineering Principles"
            description="We build maintainable, automated systems designed for long-term growth and bulletproof security."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {engineeringPrinciples.map((item, idx) => (
              <PrincipleCard
                key={idx}
                principle={item}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Technology Ecosystem Section */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <SectionHeader
            badge="Ecosystem"
            title="Technology Ecosystem"
            description="We utilize a modern, secure, and production-tested tech stack tailored for application engineering and DevSecOps pipelines."
          />
          <div className="mt-12">
            <TechCategory />
          </div>
        </Container>
      </Section>

      {/* FAQ Section */}
      <Section className="py-20 bg-transparent relative z-10">
        <Container>
          <SectionHeader
            badge="FAQ"
            title="Frequently Asked Questions"
            description="Clear, straightforward answers about partnering with Kodesec."
          />
          <div className="mt-12">
            <FAQAccordion />
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}
