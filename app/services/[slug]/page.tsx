import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle, 
  HelpCircle, 
  ShieldCheck, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight 
} from "lucide-react";

import { solutions, getSolutionBySlug } from "@/content/solutions";
import JsonLd from "@/components/JsonLd";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import SolutionHero from "@/components/solutions/SolutionHero";
import SolutionVisualizer from "@/components/solutions/SolutionVisualizer";
import CapabilityCard from "@/components/solutions/CapabilityCard";
import ProcessTimeline from "@/components/solutions/ProcessTimeline";
import TechnologyGrid from "@/components/solutions/TechnologyGrid";
import FAQAccordion from "@/components/solutions/FAQAccordion";

type SolutionDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return solutions.map((sol) => ({ slug: sol.slug }));
}

export async function generateMetadata({ params }: SolutionDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {
      title: "Solution Not Found | Kodesec",
    };
  }

  return {
    title: `${solution.seo.title} | Kodesec Solutions`,
    description: solution.seo.description,
    alternates: {
      canonical: `/services/${solution.slug}`,
    },
    keywords: [
      solution.title.toLowerCase(),
      ...solution.seo.keywords,
      "kodesec solutions",
      "secure development"
    ],
  };
}

export default async function SolutionDetailPage({ params }: SolutionDetailPageProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

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
        "name": "Solutions",
        "item": "https://kodesec.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": solution.title,
        "item": `https://kodesec.com/services/${solution.slug}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://kodesec.com/services/${solution.slug}/#service`,
    "name": solution.title,
    "description": solution.description,
    "provider": {
      "@type": "Organization",
      "@id": "https://kodesec.com/#organization",
      "name": "Kodesec",
      "url": "https://kodesec.com"
    },
    "areaServed": "Worldwide"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": solution.faq.map((q) => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  // Color mapping for highlights
  const textHighlight = {
    primary: "text-primary",
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    amber: "text-amber-400"
  }[solution.themeColor];

  const borderGlow = {
    primary: "hover:border-primary/20 hover:shadow-[0_0_30px_rgba(54,226,123,0.06)]",
    cyan: "hover:border-cyan-500/20 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)]",
    purple: "hover:border-purple-500/20 hover:shadow-[0_0_30px_rgba(192,132,252,0.06)]",
    amber: "hover:border-amber-500/20 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]"
  }[solution.themeColor];

  const badgeColor = {
    primary: "bg-primary/5 text-primary border-primary/20",
    cyan: "bg-cyan-500/5 text-cyan-400 border-cyan-500/20",
    purple: "bg-purple-500/5 text-purple-400 border-purple-500/20",
    amber: "bg-amber-500/5 text-amber-400 border-amber-500/20"
  }[solution.themeColor];

  return (
    <main className="bg-background-dark overflow-hidden relative min-h-screen">
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={faqSchema} />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* ================= HERO SECTION ================= */}
      <Section className="relative px-4 pt-28 pb-20 md:pt-36 md:pb-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left z-10 w-full min-w-0">
              <SolutionHero
                badge={`${solution.title} Solution`}
                title={solution.tagline}
                subtitle={solution.longDescription}
                primaryCtaLabel="Talk to an Lead Engineer"
                primaryCtaHref="/contact"
                secondaryCtaLabel="Schedule Scoping Call"
                secondaryCtaHref="/contact?type=scoping"
                themeColor={solution.themeColor}
              />
            </div>

            {/* Right Visualizer */}
            <div className="lg:col-span-5 flex justify-center z-10 w-full min-w-0">
              <SolutionVisualizer slug={solution.slug} />
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= BUSINESS CHALLENGES ================= */}
      <Section className="py-20 border-t border-white/5 bg-card/5 relative z-10">
        <Container className="max-w-4xl">
          <div className="p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-8 items-center text-left">
            <div className="md:w-1/3">
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase block mb-2 ${textHighlight}`}>
                Target Problems
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight leading-none">
                We help businesses that need to...
              </h3>
            </div>
            
            <div className="md:w-2/3 grid gap-4 w-full">
              {solution.challenges.map((challenge, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-4 rounded-xl border border-white/5 bg-black/40 hover:bg-black/60 transition-all"
                >
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full border shrink-0 text-xs font-bold font-mono ${badgeColor}`}>
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= CAPABILITIES ================= */}
      <Section className="py-20 border-t border-white/5 relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Capabilities</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Structured Expertise Area</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
            {solution.capabilities.map((cap, idx) => (
              <CapabilityCard
                key={cap.title}
                capability={cap}
                themeColor={solution.themeColor}
                index={idx}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= PROCESS ================= */}
      <Section className="py-20 border-t border-white/5 bg-black/20 relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Methodology</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Operational Roadmap</p>
          </div>

          <ProcessTimeline steps={solution.process} themeColor={solution.themeColor} />
        </Container>
      </Section>

      {/* ================= TECHNOLOGY CLOUD ================= */}
      <Section className="py-20 border-t border-white/5 relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Ecosystem</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">Technologies Integrated</p>
          </div>

          <TechnologyGrid technologies={solution.technologies} />
        </Container>
      </Section>

      {/* ================= DELIVERABLES ================= */}
      <Section className="py-20 border-t border-white/5 bg-card/10 relative z-10">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">Deliverables</h2>
            <p className="mt-3 text-3xl font-black text-white sm:text-4xl tracking-tight">What You Receive</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
            {solution.deliverables.map((item, idx) => (
              <div 
                key={item.title} 
                className={`p-6 rounded-2xl border border-white/5 bg-black/40 flex flex-col text-left transition-all duration-300 ${borderGlow}`}
              >
                <div className={`p-2.5 rounded-xl border w-fit ${badgeColor} mb-4`}>
                  <CheckCircle className="h-5 w-5" />
                </div>
                <h4 className="text-base font-bold text-white tracking-tight leading-none mb-3">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================= FEATURED PROJECT / CASE STUDY ================= */}
      <Section className="py-20 border-t border-white/5 bg-[#050811] relative z-10">
        <Container className="max-w-4xl">
          <div className={`p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col md:flex-row gap-8 items-center text-left ${borderGlow}`}>
            <div className="md:w-3/5">
              <span className={`text-[10px] font-mono font-bold tracking-widest uppercase block mb-3 ${textHighlight}`}>
                Case Study Highlight
              </span>
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">
                {solution.featuredProject.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-medium mb-6">
                {solution.featuredProject.description}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-mono font-bold">
                <span>CLIENT ROLE:</span>
                <span className="text-white">{solution.featuredProject.clientRole}</span>
              </div>
            </div>
            
            <div className="md:w-2/5 grid grid-cols-2 gap-4 w-full text-center">
              {solution.featuredProject.metrics.map((m, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-white/5 bg-black/40 flex flex-col justify-center">
                  <span className={`text-3xl font-black tracking-tight ${textHighlight}`}>
                    {m.value}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1.5 leading-tight">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* ================= FAQ ================= */}
      <Section className="py-20 border-t border-white/5 bg-black/10 relative z-10">
        <Container className="max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="text-xs font-mono font-bold tracking-widest text-primary uppercase">FAQ</h2>
            <p className="mt-3 text-3xl font-black text-white tracking-tight">Frequently Asked Questions</p>
          </div>

          <FAQAccordion items={solution.faq} themeColor={solution.themeColor} />
        </Container>
      </Section>

      {/* ================= CTA ================= */}
      <Section className="py-20 border-t border-white/5 bg-card/10 relative z-10">
        <Container className="max-w-4xl">
          <div className="p-8 md:p-12 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-transparent text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_120%,rgba(54,226,123,0.06),transparent_50%)]" />
            
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-4">
              Redesign Your Infrastructure Boundaries
            </h3>
            
            <p className="text-sm text-gray-400 max-w-lg mx-auto leading-relaxed mb-8">
              Let&apos;s map out security gaps, configure automatic checking pipelines, and release E2E automated frameworks built for modern products.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-[#0B0F1A] hover:bg-primary-light transition-all hover:shadow-[0_0_20px_rgba(54,226,123,0.3)] cursor-pointer"
              >
                Initiate Project Scoping
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
