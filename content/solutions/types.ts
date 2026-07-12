export interface SolutionCapability {
  title: string;
  description: string;
  outcome: string;
  iconName: string; // lucide icon name (e.g. "Cpu", "Shield")
}

export interface SolutionProcessStep {
  label: string;
  title: string;
  description: string;
  detail: string;
}

export interface SolutionTechnology {
  name: string;
  category: string;
  glow: string;
}

export interface SolutionDeliverable {
  title: string;
  description: string;
}

export interface SolutionCaseStudyMetric {
  value: string;
  label: string;
}

export interface SolutionCaseStudy {
  title: string;
  description: string;
  clientRole: string;
  metrics: SolutionCaseStudyMetric[];
}

export interface SolutionFaq {
  question: string;
  answer: string;
}

export interface SolutionContent {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  themeColor: "primary" | "cyan" | "purple" | "amber";
  iconName: string;
  capabilities: SolutionCapability[];
  challenges: string[];
  process: SolutionProcessStep[];
  technologies: SolutionTechnology[];
  deliverables: SolutionDeliverable[];
  featuredProject: SolutionCaseStudy;
  faq: SolutionFaq[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
