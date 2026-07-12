import { SolutionContent } from "./types";

export const cybersecurity: SolutionContent = {
  slug: "cybersecurity",
  title: "Network & Cyber Security",
  tagline: "Offensive security and infrastructure hardening",
  description: "Helping organizations secure applications, infrastructure and networks.",
  longDescription: "We help protect your business from threat actors by uncovering logic defects, auditing networks, and implementing zero-trust perimeter defenses.",
  themeColor: "cyan",
  iconName: "Shield",
  capabilities: [
    {
      title: "Penetration Testing",
      description: "Offensive compliance-mapped penetration testing.",
      outcome: "Identify and patch critical vulnerabilities before malicious actors do.",
      iconName: "Terminal"
    },
    {
      title: "Security Assessments",
      description: "Full-spectrum threat profiling and architecture analysis.",
      outcome: "Clear visual mapping of threat surfaces and entry points.",
      iconName: "ShieldAlert"
    },
    {
      title: "Vulnerability Assessment",
      description: "Automated scanning combined with expert manual verification.",
      outcome: "Zero false positives and developer-ready patch guidelines.",
      iconName: "Activity"
    },
    {
      title: "Network Security",
      description: "Securing subnets, load balancers, and network traffic.",
      outcome: "Robust mTLS network isolation and secure VPC routing.",
      iconName: "Server"
    },
    {
      title: "Security Consulting",
      description: "Advising on SOC2, ISO 27001, and HIPAA compliance frameworks.",
      outcome: "Successful security audits and fast certification timelines.",
      iconName: "Users"
    }
  ],
  challenges: [
    "Identify hidden business logic vulnerabilities",
    "Audit infrastructure security and Active Directory controls",
    "Ensure compliance with SOC2 or HIPAA security frameworks",
    "Train development teams in secure coding practices"
  ],
  process: [
    {
      label: "01",
      title: "Discovery",
      description: "Defining boundaries & scoping.",
      detail: "We define precise targets, map out APIs, network boundaries, and compile scope requirements."
    },
    {
      label: "02",
      title: "Assessment",
      description: "Exploiting security gaps.",
      detail: "Our team runs manual and automated exploit scripts, checking business logic and vulnerabilities."
    },
    {
      label: "03",
      title: "Analysis",
      description: "Investigating impact.",
      detail: "We categorize vulnerabilities with CVSS scores, verify impact, and construct safe Proof-of-Concepts (PoCs)."
    },
    {
      label: "04",
      title: "Remediation",
      description: "Active patching advice.",
      detail: "We deliver developer-friendly remediation guides complete with exact code patches and configuration changes."
    },
    {
      label: "05",
      title: "Validation",
      description: "Complimentary re-testing.",
      detail: "Within 30 days, we perform verification audits to ensure patches are fully operational and security gates hold."
    }
  ],
  technologies: [
    { name: "Burp Suite", category: "SecTools", glow: "hover:shadow-[0_0_20px_rgba(242,114,17,0.3)] hover:border-[#F27211]/40" },
    { name: "Nmap", category: "SecTools", glow: "hover:shadow-[0_0_20px_rgba(100,100,255,0.3)] hover:border-[#6464FF]/40" },
    { name: "OWASP ZAP", category: "SecTools", glow: "hover:shadow-[0_0_20px_rgba(54,226,123,0.3)] hover:border-primary/40" },
    { name: "Metasploit", category: "Exploitation", glow: "hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:border-red-500/40" },
    { name: "Wireshark", category: "Analysis", glow: "hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:border-cyan-500/40" },
    { name: "Kali Linux", category: "OS", glow: "hover:shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:border-purple-500/40" }
  ],
  deliverables: [
    {
      title: "Penetration Testing Report",
      description: "Thorough documentation of discovered vulnerabilities, CVSS rankings, and step-by-step reproduction flows."
    },
    {
      title: "Remediation Action Plan",
      description: "Drop-in code updates and system settings files to immediately fix open vectors."
    },
    {
      title: "Attestation of Security",
      description: "A formal compliance certificate to share with clients, partners, and financial auditors."
    }
  ],
  featuredProject: {
    title: "Enterprise SaaS Security Assessment",
    description: "Conducted deep manual penetration testing and logical boundary audits for a SaaS enterprise, patching 8 critical vulnerabilities in payment loops and user authentication flow.",
    clientRole: "Healthcare SaaS Provider",
    metrics: [
      { value: "100%", label: "False Positives Eliminated" },
      { value: "8 Critical", label: "Vulnerabilities Patched" }
    ]
  },
  faq: [
    {
      question: "What makes manual penetration testing better than automated scanners?",
      answer: "Automated scanners only scan for known static code signatures. They completely miss logical flaws, like horizontal privilege escalations or manipulation of checkout values. We simulate human attacker logic to locate these critical design flaws."
    },
    {
      question: "Do you help with re-testing after we apply the patches?",
      answer: "Yes. We offer a complimentary re-test within 30 days of the report delivery to verify that all patches have been successfully applied and are functioning properly."
    }
  ],
  seo: {
    title: "Network & Cyber Security Services",
    description: "Professional offensive security, manual penetration testing, and security assessments to secure your web applications.",
    keywords: ["penetration testing", "cybersecurity", "vulnerability assessment", "zero trust", "network security"]
  }
};
