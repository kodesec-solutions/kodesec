import React from "react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

// Custom UI Primitives
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

// Custom Why-Us Components
import HeroSection from "@/components/why-us/HeroSection";
import TrustCard from "@/components/why-us/TrustCard";
import WhoWeHelp from "@/components/why-us/WhoWeHelp";
import ComparisonTable from "@/components/why-us/ComparisonTable";
import ProcessTimeline from "@/components/why-us/ProcessTimeline";
import PrincipleCard from "@/components/why-us/PrincipleCard";
import TechCategory from "@/components/why-us/TechCategory";
import FAQAccordion from "@/components/why-us/FAQAccordion";
import CTASection from "@/components/why-us/CTASection";


export const metadata: Metadata = {
  title: "Why Choose Kodesec | Secure Software Engineering Partner",
  description: "Discover why startups and growing businesses trust Kodesec as their secure software development, cloud infrastructure, and cybersecurity company partner. We build scalable, resilient platforms with built-in application security from day one.",
  alternates: {
    canonical: "/why-us",
  },
  keywords: [
    "Cybersecurity Company",
    "Software Development Company",
    "Secure Software Development",
    "Cloud Infrastructure Services",
    "DevOps Consulting",
    "Software Engineering Company",
    "Startup Technology Partner",
    "Application Security",
    "DevSecOps",
    "Penetration Testing"
  ],
  openGraph: {
    title: "Why Choose Kodesec | Secure Software Engineering Partner",
    description: "Discover why startups and growing businesses trust Kodesec as their secure software development, cloud infrastructure, and cybersecurity company partner.",
    url: "https://kodesec.com/why-us",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose Kodesec | Secure Software Engineering Partner",
    description: "We help startups and growing businesses design, build, secure, and deploy modern software with engineering excellence and practical cybersecurity expertise."
  }
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
        "name": "Why Kodesec",
        "item": "https://kodesec.com/why-us"
      }
    ]
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://kodesec.com/#organization",
    "name": "Kodesec",
    "url": "https://kodesec.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://kodesec.com/assets/Logo.png"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why should we choose Kodesec instead of hiring freelancers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Freelancers typically work in isolation and may lack the specialized cross-functional skills needed for robust platforms. Kodesec delivers a cohesive squad of senior developers and security researchers, led directly by our technical founders. You get code-level engineering, manual vulnerability testing, and secure infrastructure design in a unified, reliable partnership."
        }
      },
      {
        "@type": "Question",
        "name": "Can you work alongside our existing engineering team?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We act as an extension of your active engineering team. We integrate directly into your workflows—sharing real-time findings in Slack or Discord, creating clean pull requests, writing custom infrastructure configurations, and setting up automated CI/CD checks alongside your developers."
        }
      },
      {
        "@type": "Question",
        "name": "Do you provide end-to-end software development?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we handle the entire product lifecycle. From system architecture mapping and database indexing to frontend interfaces, API designs, DevOps pipelines, secure cloud deployments, and manual penetration testing. One partner handles your code quality, reliability, and security."
        }
      },
      {
        "@type": "Question",
        "name": "How do you integrate security into projects?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We follow a 'Security by Design' philosophy. Security is considered in every architectural planning decision, not checked as a checkbox before release. We verify permission bounds, least-privilege IAM configs, and database access logs. Additionally, our offensive engineers manually test and validate that your runtime systems are secure."
        }
      },
      {
        "@type": "Question",
        "name": "Can you support startups as well as growing businesses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We match the rapid iteration speed and agility needed by seed-stage startups launching their first product, while also meeting the rigorous compliance protocols, scalable architectures, and multi-tenant security requirements of growing series A+ and enterprise platforms."
        }
      },
      {
        "@type": "Question",
        "name": "What industries do you work with?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We focus on technology-centric and high-compliance sectors. This includes SaaS platforms requiring robust multi-tenant session isolation, FinTech companies handling payments and key management services, and cloud-native enterprises requiring high availability and container security."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer long-term support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. We don't just hand off code and leave. We provide ongoing support retainers, active environment monitoring, and recurring security assessments to ensure your software remains secure, stable, and easy to maintain as your business scales."
        }
      }
    ]
  };

  const trustCardsData = [
    {
      title: "Founder-Led Engineering",
      description: "Work directly with experienced founders who stay involved throughout your project—from planning to delivery.",
      icon: "users",
      glowColor: "from-primary/20"
    },
    {
      title: "Security by Design",
      description: "Security is considered from the first architectural decision, not added at the end of development.",
      icon: "shield",
      glowColor: "from-emerald-400/20"
    },
    {
      title: "End-to-End Expertise",
      description: "One team covering software engineering, cybersecurity, cloud infrastructure, DevOps, and quality assurance.",
      icon: "cpu",
      glowColor: "from-cyan-400/20"
    },
    {
      title: "Modern Engineering Practices",
      description: "We use scalable architectures, automation, clean code, and industry best practices to build software that lasts.",
      icon: "code",
      glowColor: "from-purple-400/20"
    },
    {
      title: "Transparent Collaboration",
      description: "Regular communication, clear milestones, and practical recommendations with no unnecessary complexity.",
      icon: "zap",
      glowColor: "from-red-400/20"
    },
    {
      title: "Built for Long-Term Growth",
      description: "We build maintainable systems that are easy to scale, extend, and operate as your business evolves.",
      icon: "workflow",
      glowColor: "from-teal-400/20"
    }
  ];

  const engineeringPrinciples = [
    {
      title: "Security First",
      summary: "Security is integrated into the foundation of our engineering workflow.",
      detail: "We do not treat security as a compliance checkbox. We perform manual threat modeling, code analysis, and authorization checks from the first commit to ensure runtime safety.",
      icon: "shield"
    },
    {
      title: "Scalable Architecture",
      summary: "Systems designed to grow alongside your customer base.",
      detail: "We build event-driven pipelines, serverless or containerized microservices, and partition databases so that your platform scales smoothly from 100 to millions of requests without high cloud costs.",
      icon: "layers"
    },
    {
      title: "Clean & Maintainable Code",
      summary: "Code written for humans to read, not just machines to execute.",
      detail: "We follow clear styling standards, keep dependencies minimal, use strong types, and write comprehensive docs so your internal team can pick up the code and add features with ease.",
      icon: "code"
    },
    {
      title: "Automation by Default",
      summary: "Eliminate manual steps through modern CI/CD automation.",
      detail: "From lint checks and deployment runs to database migrations and infrastructure configurations, we automate every phase to minimize human error and accelerate delivery speed.",
      icon: "workflow"
    },
    {
      title: "Performance & Reliability",
      summary: "Fast load times and high availability for critical resources.",
      detail: "We optimize asset loading, design smart caching strategies, implement strict error boundary handling, and setup health check systems to ensure 99.9% uptime.",
      icon: "activity"
    },
    {
      title: "Continuous Improvement",
      summary: "Constantly monitoring and adapting to changing conditions.",
      detail: "We setup live application telemetry, structure feedback loops with your product team, and run system health checks to refactor bottleneck sections and boost performance.",
      icon: "refresh"
    }
  ];

  return (
    <main className="bg-background-dark overflow-hidden relative min-h-screen">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={orgSchema} />
      <JsonLd schema={faqSchema} />

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators Section */}
      <Section className="py-24 border-t border-white/5 bg-[#0B0F1A]/30">
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
      <Section className="py-24 border-t border-white/5 bg-[#0B0F1A]/30">
        <Container>
          <SectionHeader
            badge="Who We Help"
            title="Helping Businesses Solve Real Engineering Challenges"
            description="We partner with startup founders, CEOs, and engineering teams to solve complex logic challenges, modernize setups, and launch resilient SaaS products."
          />
          <div className="mt-12">
            <WhoWeHelp />
          </div>
        </Container>
      </Section>

      {/* What Makes Us Different Section */}
      <Section className="py-24 border-t border-white/5 bg-[#0B0F1A]/30">
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
      <Section className="py-24 border-t border-white/5 bg-[#0B0F1A]/30">
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
      <Section className="py-24 border-t border-white/5 bg-[#0B0F1A]/30">
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
      <Section className="py-24 border-t border-white/5 bg-[#0B0F1A]/30">
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
      <Section className="py-24 border-t border-white/5 bg-[#0B0F1A]/30">
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