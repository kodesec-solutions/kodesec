import React from "react";
import {
  Shield,
  Terminal,
  Code,
  Cloud,
  Workflow,
  Users,
  BookOpen,
  Zap,
  CheckCircle2,
  MessageSquare,
  Clock
} from "lucide-react"

// Types definitions
export interface NavSubItem {
  name: string
  desc: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

export interface NavItem {
  href: string
  label: string
  isDropdown?: boolean
}

export interface FooterLink {
  label: string
  href: string
  external?: boolean
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface TeamMember {
  name: string
  role: string
  bio: string
  tags: string[]
  linkedin: string
  github: string
  email: string
  avatar: string
  image?: string
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  avatar: string
}

export interface Metric {
  value: string
  label: string
  desc: string
}

export interface Step {
  label: string
  title: string
  desc: string
  detail?: string
}

export interface securityInsights {
  category: string
  title: string
  insight: string
  remediation: string
  stat: string
  source: string
}

export interface TechItem {
  name: string
  category: string
  glow: string
}

export interface InquiryType {
  id: string
  label: string
  desc: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

// ----------------------------------------------------
// Central Site Configurations
// ----------------------------------------------------

export const siteMetadata = {
  title: "Kodesec - Cybersecurity, Development & Quality Testing",
  description: "Professional technology services including web & application development, comprehensive cybersecurity solutions, and quality assurance testing.",
  keywords: [
    "web development", "app development", "cybersecurity", "penetration testing",
    "QA testing", "quality assurance", "software development", "security audits",
    "vulnerability assessment", "Kodesec"
  ]
}

// Navigation & Header Configuration
export const navigationConfig = {
  navItems: [
    { href: "/services", label: "Solutions", isDropdown: true },
    { href: "/why-us", label: "Why Kodesec" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Resources" },
    { href: "/contact", label: "Contact" },
  ] as NavItem[],

  solutionsItems: [
    { name: "Design & Engineering", desc: "Secure digital product design & software building.", href: "/services/design-engineering", icon: Code },
    { name: "Network & Cyber Security", desc: "Offensive compliance security & pentesting.", href: "/services/cybersecurity", icon: Shield },
    { name: "Cloud & DevOps", desc: "Hardened cloud, Kubernetes, and IaC pipelines.", href: "/services/cloud-devops", icon: Cloud },
    { name: "Quality Assurance", desc: "Playwright automation testing & E2E checks.", href: "/services/quality-assurance", icon: CheckCircle2 }
  ] as NavSubItem[]
}

// Footer Configuration
export const footerConfig = {
  tagline: "Building secure digital systems for modern businesses.",
  badgeText: "Security-first development & testing",
  copyright: "© 2026 KODESEC. All rights reserved.",
  sections: [
    {
      title: "Solutions",
      links: [
        { label: "Design & Engineering", href: "/services/design-engineering" },
        { label: "Network & Cyber Security", href: "/services/cybersecurity" },
        { label: "Cloud & DevOps", href: "/services/cloud-devops" },
        { label: "Quality Assurance", href: "/services/quality-assurance" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Why Us", href: "/why-us" },
        { label: "Contact", href: "/contact" },
        { label: "Careers", href: "/careers" }
      ]
    },
    {
      title: "Connect",
      links: [
        { label: "LinkedIn", href: "https://linkedin.com", external: true },
        { label: "Twitter", href: "https://twitter.com", external: true },
        { label: "GitHub", href: "https://github.com", external: true }
      ]
    }
  ] as FooterSection[],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" }
  ] as FooterLink[]
}

// Team Configuration
export const teamConfig = {
  founders: [
    {
      name: "Yaser alam reshad",
      role: "Technical Authority",
      bio: "Yeaser leads offensive manual pentesting and threat model mappings. He is obsessed with uncovering logic defects automated scanners miss.",
      tags: ["Secure Software Architecture", "Cybersecurity Strategy", "Technical Leadership"],
      linkedin: "https://www.linkedin.com/in/yaser-reshad-7b95b53a7",
      github: "https://github.com/yasireshad",
      email: "yasireshad717@gmail.com",
      avatar: "AR",
      image: "/assets/Reshad.jpeg"
    },
    {
      name: "Mian Al Ruhanyat",
      role: "Solutions Architect",
      bio: "Mian Perform Cloud Native Solutions for Modern Web Application using K8s, IaC and Secure Pipelines.",
      tags: ["Kubernetes", "CI/CD", "AWS/Azure/GCP", "Infrastructure Automation"],
      linkedin: "https://www.linkedin.com/in/alruhanyat/",
      github: "https://github.com/alruhanyat",
      email: "alruhanyat994@gmail.com",
      avatar: "MAR",
      image: "/assets/Mian_Al_Ruhaniyat.jpeg"
    },
    {
      name: "Nafiul Islam",
      role: "Security lead ",
      bio: "Nafiul Perform Penetration tests, Identify and validate security vulnerabilities.",
      tags: ["Web & Network Penetration Testing", "Vulnerability Assessment", "Cloud Security"],
      linkedin: "https://www.linkedin.com/in/nafiul-islam359/",
      github: "https://github.com/nafiul-islam359",
      email: "nafiul1224@gmail.com",
      avatar: "NV",
      image: "/assets/Nafiul.jpeg"
    },
    {
      name: "Ashikul Islam",
      role: "Engineering Lead",
      bio: "Ashikul designs zero-trust backend authentication modules, cryptographic storage routines, and mTLS proxy layers for API isolation.",
      tags: ["Backend Engineering", "System Architecture", "Database Design"],
      linkedin: "https://www.linkedin.com/in/ashikul-islam-b848271a9/",
      github: "https://github.com/ashikul-islam",
      email: "md.ashikul4040@gmail.com",
      avatar: "AI",
      image: "/assets/Ashik.png"
    }
  ] as TeamMember[]
}

// Testimonials Configuration
export const testimonialsConfig = [
  {
    quote: "Kodesec's manual pen-testing went far beyond automated scanners. They uncovered deep logic flaws in our OAuth loops before our Series A.",
    author: "Marcus Thorne",
    role: "CTO, PayVelo",
    avatar: "MT"
  },
  {
    quote: "Their DevSecOps advisory transformed our release velocity. Security checks are now fully integrated, automated, and invisible within our commit loop.",
    author: "Sarah Chen",
    role: "VP of Engineering, CloudNet",
    avatar: "SC"
  },
  {
    quote: "Exceptional secure development practice. They designed our multi-tenant database access policies, satisfying compliance frameworks effortlessly.",
    author: "Dr. Aris Vane",
    role: "Head of Security, HealthPulse",
    avatar: "AV"
  }
] as Testimonial[]

// Social Links Configuration
export const socialLinksConfig = {
  linkedin: "https://www.linkedin.com/company/kodesec-solutions/",
  github: "https://github.com",
  twitter: "https://twitter.com",
  email: "contact@kodesec.com"
}

// Home Page Configuration
export const homeConfig = {
  metrics: [
    {
      value: "31%",
      label: "Breaches Start with Software Vulnerabilities",
      desc: "Attackers increasingly exploit unpatched software instead of relying on stolen credentials."
    },
    {
      value: "48%",
      label: "Breaches Involve Ransomware",
      desc: "Nearly half of analyzed breaches included ransomware activity."
    },
    {
      value: "30%",
      label: "Third-Party Involvement",
      desc: "Third-party vendors and supply chains contributed to nearly one-third of investigated breaches."
    },
    {
      value: "43 Days",
      label: "Median Patch Resolution Time",
      desc: "Organizations typically require over a month to fully remediate critical vulnerabilities."
    }
  ] as Metric[],

  steps: [
    { label: "01", title: "Discover", desc: "Scope mapping & threat profiling." },
    { label: "02", title: "Test", desc: "Manual exploits & automated scans." },
    { label: "03", title: "Report", desc: "CVE-rated proof-of-concepts." },
    { label: "04", title: "Remediate", desc: "Active patching & code assistance." },
    { label: "05", title: "Secure", desc: "Final validation & sign-off." }
  ] as Step[],

  securityInsights: [
    {
      category: "Application Security",
      title: "Broken Access Control Remains #1",
      insight:
        "Broken Access Control continues to rank as the most critical web application security risk in the OWASP Top 10.",
      remediation:
        "Enforce server-side authorization, adopt least-privilege access, validate every request, and implement role-based or attribute-based access control.",
      stat: "#1 Risk",
      source: "OWASP Top 10 (2025)"
    },
    {
      category: "Cloud Security",
      title: "Security Misconfiguration Is a Leading Risk",
      insight:
        "Misconfigurations remain one of the most common causes of cloud and application security incidents as modern systems become increasingly configurable.",
      remediation:
        "Harden default configurations, automate infrastructure validation, enforce secure baselines, and continuously monitor configuration drift.",
      stat: "#2 Risk",
      source: "OWASP Top 10 (2025)"
    },
    {
      category: "DevSecOps",
      title: "Shift Security Left",
      insight:
        "Organizations are integrating security throughout the software development lifecycle to identify vulnerabilities before deployment.",
      remediation:
        "Embed SAST, dependency scanning, secrets detection, container scanning, and policy checks directly into CI/CD pipelines.",
      stat: "Shift Left",
      source: "DevSecOps Best Practices"
    }
  ] as securityInsights[],

  techEcosystem: [
    { name: "AWS", category: "Cloud", glow: "hover:shadow-[0_0_20px_rgba(255,153,0,0.3)] hover:border-[#FF9900]/40" },
    { name: "Azure", category: "Cloud", glow: "hover:shadow-[0_0_20px_rgba(0,137,214,0.3)] hover:border-[#0089D6]/40" },
    { name: "Docker", category: "Containers", glow: "hover:shadow-[0_0_20px_rgba(36,150,237,0.3)] hover:border-[#2496ED]/40" },
    { name: "Kubernetes", category: "Orchestration", glow: "hover:shadow-[0_0_20px_rgba(50,109,230,0.3)] hover:border-[#326DE6]/40" },
    { name: "Terraform", category: "IaC", glow: "hover:shadow-[0_0_20px_rgba(118,63,227,0.3)] hover:border-[#763FE3]/40" },
    { name: "React", category: "Frontend", glow: "hover:shadow-[0_0_20px_rgba(97,218,251,0.3)] hover:border-[#61DAFB]/40" },
    { name: "Node.js", category: "Backend", glow: "hover:shadow-[0_0_20px_rgba(67,162,97,0.3)] hover:border-[#43A261]/40" },
    { name: "GitHub Actions", category: "CI/CD", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border-white/30" },
    { name: "OWASP", category: "Standards", glow: "hover:shadow-[0_0_20px_rgba(54,226,123,0.3)] hover:border-primary/40" },
    { name: "Nginx", category: "Servers", glow: "hover:shadow-[0_0_20px_rgba(0,150,94,0.3)] hover:border-[#00965E]/40" },
    { name: "Linux", category: "OS", glow: "hover:shadow-[0_0_20px_rgba(255,214,0,0.2)] hover:border-[#FFD600]/40" }
  ] as TechItem[]
}

// About Page Configuration
export const aboutConfig = {
  storySteps: [
    { name: "Software Engineering", label: "01", desc: "Alex & Marcus build secure financial ledger databases." },
    { name: "Cloud Infrastructure", label: "02", desc: "Liam provisions hardened Kubernetes architectures." },
    { name: "DevOps Automation", label: "03", desc: "Sofia designs secure automated release templates." },
    { name: "Security Auditing", label: "04", desc: "The team unites to run offensive penetration tests." },
    { name: "Kodesec Founded", label: "05", desc: "Intentional engineering-first startup is established." }
  ],
  storyPathDetails: [
    "Alex and Marcus built payment gateway modules, discovering that security is often an afterthought in engineering cycles.",
    "Liam audited IAM boundary configurations at scale, setting up automated infrastructure validation scripts.",
    "Sofia streamlined CI/CD templates, automating vulnerability checkpoints directly within developer workflows.",
    "We realized security testing works best when delivered directly by the software engineers who build systems.",
    "Kodesec was established as a highly specialized, technical engineering agency. No sales middlemen, just technical owners."
  ],
  expertiseAreas: [
    {
      title: "Secure Software Engineering",
      desc: "AES-256 envelope cryptography, secure OAuth authorization states, and ASVS aligned APIs.",
      icon: Code,
      glow: "hover:shadow-[0_0_20px_rgba(54,226,123,0.06)] hover:border-primary/20"
    },
    {
      title: "Cloud & Platform Hardening",
      desc: "Terraform IaC scans, least-privilege AWS IAM architectures, and Kubernetes pod isolation.",
      icon: Cloud,
      glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.06)] hover:border-cyan-500/20"
    },
    {
      title: "DevSecOps Release Gates",
      desc: "CI/CD automated vulnerability lints, container registry signature checks, and credential scans.",
      icon: Workflow,
      glow: "hover:shadow-[0_0_20px_rgba(192,132,252,0.06)] hover:border-purple-500/20"
    },
    {
      title: "Security Assessments",
      desc: "Manual application penetration testing, active directory pivot checks, and lateral route mapping.",
      icon: Terminal,
      glow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.06)] hover:border-red-500/20"
    }
  ],
  principles: [
    { title: "Security First", desc: "Every system is evaluated from an offensive threat vector perspective from day one.", icon: Shield },
    { title: "Practical Solutions", desc: "No copy-paste scanner noise. Every report contains complete drop-in developer patch maps.", icon: Zap },
    { title: "Founder-Led Delivery", desc: "You collaborate directly with the engineers who audit, build, and secure your systems.", icon: Users },
    { title: "Continuous Learning", desc: "Evolving deployment templates and scan loops alongside the global CVE vector maps.", icon: BookOpen }
  ],
  workflowSteps: [
    { label: "01", title: "Understand", desc: "Deep threat profiling and boundary mapping.", detail: "We define precise technical boundaries, target repositories, APIs, and compliance scopes to create a structured security posture goal." },
    { label: "02", title: "Build", desc: "Constructing defenses and configuration.", detail: "Our engineers execute secure coding blueprints, harden IAM layouts, and set up Docker/Kubernetes network segmentation rules." },
    { label: "03", title: "Secure", desc: "Deploying automated validation gates.", detail: "We bake automated secrets detection, dependency audits, and SAST/DAST gateways directly into your active GitHub commit hooks." },
    { label: "04", title: "Validate", desc: "Executing manual pentesting vectors.", detail: "We run offensive exploitation scripts to bypass gates, verifying that our deployed mitigations successfully block threats." },
    { label: "05", title: "Improve", desc: "Continuous monitoring and posture checks.", detail: "We run re-tests, log metrics, align with SOC2 compliance structures, and patch configuration drifts dynamically." }
  ] as Step[]
}

// Contact Page Configuration
export const contactConfig = {
  inquiryTypes: [
    { id: "System Audits", label: "Audits & Testing", desc: "Security reviews and software compliance checks.", icon: Shield },
    { id: "App Engineering", label: "App Development", desc: "Software architecture and engineering services.", icon: Code },
    { id: "Cloud Setup", label: "Cloud Solutions", desc: "Cloud infrastructure and deployment setups.", icon: Cloud },
    { id: "General Inquiry", label: "General Inquiry", desc: "General collaboration or custom scoping call.", icon: Terminal }
  ] as InquiryType[],

  timelineSteps: [
    { num: "01", name: "Submit Inquiry", desc: "Detailed requirements logged under secure parameters." },
    { num: "02", name: "Team Review", desc: "Our core engineers evaluate your project architecture." },
    { num: "03", name: "Scoping Call", desc: "A brief technical alignment call to finalize targets." },
    { num: "04", name: "Proposal Delivery", desc: "Complete roadmap, timelines, and clear flat-rate pricing." },
    { num: "05", name: "Project Kickoff", desc: "Sprints begin immediately. Day 1 setup." }
  ],

  onboardingBadges: [
    { title: "Under 24 Hours Responses", desc: "No marketing scripts. Your incoming emails reach active engineers instantly.", icon: Users },
    { title: "Zero Sales Intermediaries", desc: "We don't employ corporate managers. You coordinate directly with technical delivery team.", icon: MessageSquare },
    { title: "Day 1 Technical Scopes", desc: "Our scoping calls align codebase dependencies, environments, and metrics.", icon: Clock }
  ]
}
