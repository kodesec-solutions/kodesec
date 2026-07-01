import type { Metadata } from "next";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectShowcase from "@/components/projects/ProjectShowcase";
import CTASection from "@/components/projects/CTASection";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Case Studies & Portfolio",
  description: "Browse KodeSec's portfolio of secure application engineering and offensive security pentests. Discover how we secure digital assets for growth platforms.",
  alternates: {
    canonical: "/projects",
  },
  keywords: ["KodeSec case studies", "penetration testing portfolio", "secure development case studies", "remediation outcomes"],
};

export default function ProjectsPage() {
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
        "name": "Case Studies",
        "item": "https://kodesec.com/projects"
      }
    ]
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <ProjectsHero />
      <ProjectShowcase />
      <CTASection />
    </>
  );
}
