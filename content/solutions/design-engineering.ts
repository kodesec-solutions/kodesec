import { SolutionContent } from "./types";

export const designEngineering: SolutionContent = {
  slug: "design-engineering",
  title: "Design & Engineering",
  tagline: "Architecting and building secure, scalable digital products",
  description: "Helping businesses design, architect and build scalable digital products.",
  longDescription: "We combine product design, software engineering, and systems architecture to build scalable, high-performance applications that are secure by default.",
  themeColor: "primary",
  iconName: "Code",
  capabilities: [
    {
      title: "System Architecture",
      description: "Designing robust, distributed backend systems and microservices.",
      outcome: "Resilient systems with 99.99% operational uptime.",
      iconName: "Cpu"
    },
    {
      title: "Software Engineering",
      description: "Writing clean, type-safe, maintainable code using modern design patterns.",
      outcome: "Faster feature deployments and minimal technical debt.",
      iconName: "Terminal"
    },
    {
      title: "Secure Application Development",
      description: "Engineering applications fully aligned with OWASP ASVS guidelines.",
      outcome: "Zero high-severity vulnerabilities at application launch.",
      iconName: "Shield"
    },
    {
      title: "API Development",
      description: "Designing fast, secure, well-documented REST & GraphQL APIs.",
      outcome: "Seamless integration with third-party ecosystems.",
      iconName: "Workflow"
    },
    {
      title: "Technical Consulting",
      description: "Aligning product roadmaps with modern engineering standards.",
      outcome: "Optimized infrastructure spend and scaling blueprints.",
      iconName: "Users"
    }
  ],
  challenges: [
    "Build a new SaaS platform from scratch",
    "Modernize legacy application architectures",
    "Improve software security and reliability",
    "Scale engineering team delivery and standards"
  ],
  process: [
    {
      label: "01",
      title: "Discovery",
      description: "Scoping and requirements mapping.",
      detail: "We define precise technical boundaries, map business requirements, and structure system objectives."
    },
    {
      label: "02",
      title: "Architecture",
      description: "Designing the system blueprint.",
      detail: "Our team designs secure database access layers, scalable APIs, and system topologies."
    },
    {
      label: "03",
      title: "Implementation",
      description: "Writing clean, modular code.",
      detail: "We write clean TypeScript, Next.js, and Node.js code with comprehensive unit tests."
    },
    {
      label: "04",
      title: "Validation",
      description: "Audit and security checks.",
      detail: "We run automated SAST and manual code reviews to ensure compliance with standards."
    },
    {
      label: "05",
      title: "Delivery",
      description: "Seamless deployment & handoff.",
      detail: "We deploy to your production environments with clean logs, documentation, and source code transfer."
    }
  ],
  technologies: [
    { name: "TypeScript", category: "Languages", glow: "hover:shadow-[0_0_20px_rgba(49,120,198,0.3)] hover:border-[#3178C6]/40" },
    { name: "Next.js", category: "Frameworks", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border-white/30" },
    { name: "Node.js", category: "Backend", glow: "hover:shadow-[0_0_20px_rgba(67,162,97,0.3)] hover:border-[#43A261]/40" },
    { name: "PostgreSQL", category: "Databases", glow: "hover:shadow-[0_0_20px_rgba(51,103,145,0.3)] hover:border-[#336791]/40" },
    { name: "Go", category: "Languages", glow: "hover:shadow-[0_0_20px_rgba(0,173,216,0.3)] hover:border-[#00ADD8]/40" },
    { name: "GraphQL", category: "API", glow: "hover:shadow-[0_0_20px_rgba(225,0,152,0.3)] hover:border-[#E10098]/40" }
  ],
  deliverables: [
    {
      title: "Production-Ready Codebase",
      description: "Fully typed, linted, and modular Next.js/Node.js source code."
    },
    {
      title: "Architecture & System Diagrams",
      description: "Detailed system topology mapping databases, API routers, and cache layers."
    },
    {
      title: "API Specifications",
      description: "Interactive Swagger/OpenAPI documents for smooth integration."
    }
  ],
  featuredProject: {
    title: "Next-Gen Fintech Core Engine",
    description: "We designed and engineered a secure, multi-tenant billing platform processing millions of transactions daily with bank-grade encryption and mTLS communication.",
    clientRole: "Fintech Platform Provider",
    metrics: [
      { value: "10M+", label: "Daily API Calls" },
      { value: "99.99%", label: "Uptime Achieved" }
    ]
  },
  faq: [
    {
      question: "Do you write documentation for the code you build?",
      answer: "Yes, we provide thorough API documentation, system topology blueprints, and deployment guides to ensure your in-house engineering team can easily inherit the codebase."
    },
    {
      question: "How do you ensure application security during development?",
      answer: "We incorporate automated security scanning (SAST and secrets detection) directly into our repository hooks and design database access layers using strict row-level security parameters."
    }
  ],
  seo: {
    title: "Design & Engineering Services",
    description: "Secure, scalable Next.js and backend software engineering designed to launch SaaS and Fintech platforms.",
    keywords: ["software engineering", "system architecture", "secure development", "API design", "typescript Next.js"]
  }
};
