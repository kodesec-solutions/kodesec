"use client";

import { useMemo, useState } from "react";
import ProjectsHero from "@/app/components/projects/ProjectsHero";
import ProjectFilters from "@/app/components/projects/ProjectFilters";
import ProjectGrid from "@/app/components/projects/ProjectGrid";
import FeaturedProject from "@/app/components/projects/FeaturedProject";
import CTASection from "@/app/components/projects/CTASection";
import { ProjectCaseStudy, ProjectCategory } from "@/app/components/projects/types";

const categories: ProjectCategory[] = [
  "All",
  "Penetration Testing",
  "Secure Development",
  "Cloud & DevOps",
  "Network Security",
];

const projectCases: ProjectCaseStudy[] = [
  {
    id: "saas-security-assessment",
    category: "Penetration Testing",
    title: "Web Application Security Assessment for SaaS Platform",
    description:
      "Manual and automated testing uncovered critical vulnerabilities before enterprise onboarding.",
    highlights: [
      "Identified critical vulnerabilities",
      "Improved system security",
      "Delivered actionable report",
    ],
    overview:
      "Comprehensive assessment of authentication, session controls, and data exposure paths in a multi-tenant SaaS product.",
    scope: "External application perimeter, API endpoints, and user role boundaries.",
    approach:
      "Threat modeling, exploit validation, and prioritized remediation guidance with developer handoff.",
    tools: ["Burp Suite", "OWASP ZAP", "Nuclei", "Manual Exploitation"],
    results:
      "Eliminated high-risk vectors and established a repeatable testing baseline for future releases.",
  },
  {
    id: "secure-dev-finance-app",
    category: "Secure Development",
    title: "Secure Development Program for Financial Operations Portal",
    description:
      "Integrated secure coding checkpoints into delivery sprints without slowing product velocity.",
    highlights: [
      "Shift-left security model",
      "Reduced code-level risk",
      "Faster compliant delivery",
    ],
    overview:
      "Application engineering initiative focused on secure architecture and preventative controls.",
    scope: "Frontend, API services, and deployment workflows across core product modules.",
    approach:
      "Secure design reviews, code threat analysis, and CI/CD policy enforcement with developer training.",
    tools: ["SAST", "Dependency Scanning", "GitHub Actions", "Policy-as-Code"],
    results:
      "Reduced exploitable findings pre-release and improved audit readiness across product teams.",
  },
  {
    id: "cloud-posture-hardening",
    category: "Cloud & DevOps",
    title: "Cloud Security Hardening for Multi-Region Product Stack",
    description:
      "Strengthened cloud posture with hardened IAM and infrastructure controls for scale-stage growth.",
    highlights: [
      "Hardened IAM controls",
      "Secured CI/CD pipelines",
      "Reduced cloud misconfigurations",
    ],
    overview:
      "Security uplift project for cloud-native services handling sensitive customer workflows.",
    scope: "Identity policies, infrastructure templates, runtime environments, and deployment chain.",
    approach:
      "Configuration benchmarking, attack-path analysis, and automated policy checks in deployment gates.",
    tools: ["Terraform", "Cloud Security Posture Management", "IaC Scanners", "SIEM"],
    results:
      "Lowered cloud exposure risk and established consistent security controls across environments.",
  },
  {
    id: "internal-network-assessment",
    category: "Network Security",
    title: "Internal Network Penetration Testing for Enterprise Campus",
    description:
      "Simulated adversarial movement to validate segmentation, privilege controls, and resilience.",
    highlights: [
      "Validated segmentation gaps",
      "Strengthened access control",
      "Improved incident readiness",
    ],
    overview:
      "Red-team style network assessment for critical internal systems and high-value assets.",
    scope: "Core network zones, directory services, privileged endpoints, and lateral movement controls.",
    approach:
      "Controlled exploitation with detection validation and mitigation mapping to critical attack paths.",
    tools: ["Nmap", "Nessus", "BloodHound", "Manual Network Testing"],
    results:
      "Improved containment controls and reduced blast radius for potential internal compromise.",
  },
];

function TrustSection() {
  return (
    <section className="bg-background-dark px-6 py-16 lg:px-20">
      <div className="mx-auto w-full max-w-[1200px] rounded-3xl border border-surface-border bg-surface-dark p-8 md:p-10">
        <h2 className="text-secondary text-3xl font-semibold leading-tight md:text-4xl">
          Trusted to Secure Critical Systems
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            "Security-first approach",
            "Real-world attack simulation",
            "Industry-standard methodologies",
          ].map((point, index) => (
            <div
              key={point}
              className="animate-fade-in-up rounded-2xl border border-surface-border bg-card-dark p-4 text-sm font-medium text-secondary"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {`\u2714 ${point}`}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");

  const projects = useMemo(() => projectCases, []);

  return (
    <>
      <ProjectsHero />
      <ProjectFilters
        activeCategory={activeCategory}
        categories={categories}
        onChange={setActiveCategory}
      />
      <ProjectGrid projects={projects} activeCategory={activeCategory} />
      <FeaturedProject />
      <TrustSection />
    </>
  );
}
