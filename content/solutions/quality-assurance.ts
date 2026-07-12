import { SolutionContent } from "./types";

export const qualityAssurance: SolutionContent = {
  slug: "quality-assurance",
  title: "Quality Assurance",
  tagline: "Continuous testing and software quality engineering",
  description: "Helping teams deliver reliable software through testing and quality engineering.",
  longDescription: "We build robust test automation suites, perform detailed manual checks, and execute API load testing to ensure your software is fast, functional, and bug-free.",
  themeColor: "amber",
  iconName: "CheckCircle",
  capabilities: [
    {
      title: "Manual Testing",
      description: "Exploratory testing, UI checks, and user journey validation.",
      outcome: "Intuitive user experience and zero critical user-facing bugs.",
      iconName: "Search"
    },
    {
      title: "Automation Testing",
      description: "End-to-end automation suites using Playwright, Cypress, or Selenium.",
      outcome: "Automatic regression validation on every codebase update.",
      iconName: "Workflow"
    },
    {
      title: "API Testing",
      description: "Validating API request parameters, response schemas, and authentication flow.",
      outcome: "Extremely reliable backend integrations and data schemas.",
      iconName: "Terminal"
    },
    {
      title: "Performance Testing",
      description: "Load testing APIs and database connections under high concurrency.",
      outcome: "Clear identification of resource leaks and database query bottlenecks.",
      iconName: "Activity"
    },
    {
      title: "Regression Testing",
      description: "Ensuring new code updates do not break existing software features.",
      outcome: "Continuous confidence in shipping major product updates daily.",
      iconName: "RotateCcw"
    }
  ],
  challenges: [
    "Stop user-facing regressions from slipping into production",
    "Replace slow manual QA cycles with fast automated checks",
    "Audit API stability under high client request volume",
    "Ensure responsive UI design behavior across all viewports"
  ],
  process: [
    {
      label: "01",
      title: "Scoping",
      description: "Mapping user flows.",
      detail: "We audit user journeys, define edge cases, and compile test plans."
    },
    {
      label: "02",
      title: "Strategy",
      description: "Selecting test stacks.",
      detail: "We choose appropriate tools (Playwright/Jest), setup targets, and mock datasets."
    },
    {
      label: "03",
      title: "Scripting",
      description: "Writing automation files.",
      detail: "Our engineers write type-safe test scripts to validate UI components, auth cookies, and backend states."
    },
    {
      label: "04",
      title: "Execution",
      description: "Running parallel test checks.",
      detail: "We run test suites concurrently in cloud environments, checking performance and responsiveness."
    },
    {
      label: "05",
      title: "Delivery",
      description: "CI/CD pipeline hookups.",
      detail: "We configure tests to run automatically on every git push, posting reports directly to pull requests."
    }
  ],
  technologies: [
    { name: "Playwright", category: "Automation", glow: "hover:shadow-[0_0_20px_rgba(45,180,94,0.3)] hover:border-[#2DB45E]/40" },
    { name: "Cypress", category: "Automation", glow: "hover:shadow-[0_0_20px_rgba(0,191,125,0.3)] hover:border-[#00BF7D]/40" },
    { name: "Jest", category: "UnitTesting", glow: "hover:shadow-[0_0_20px_rgba(153,76,94,0.3)] hover:border-[#994C5E]/40" },
    { name: "Vitest", category: "UnitTesting", glow: "hover:shadow-[0_0_20px_rgba(255,214,0,0.2)] hover:border-[#FFD600]/40" },
    { name: "k6", category: "LoadTesting", glow: "hover:shadow-[0_0_20px_rgba(120,50,200,0.3)] hover:border-[#7832C8]/40" },
    { name: "Postman", category: "API Testing", glow: "hover:shadow-[0_0_20px_rgba(255,108,47,0.3)] hover:border-[#FF6C2F]/40" }
  ],
  deliverables: [
    {
      title: "Automated Test Suite Repository",
      description: "Maintainable, type-safe Playwright/Jest codebase ready for CI/CD hook integration."
    },
    {
      title: "QA Defect Logs & Scenarios",
      description: "Visual, detailed descriptions of discovered bugs, complete with reproduction logs."
    },
    {
      title: "Performance & Load Benchmarks",
      description: "Thorough performance testing report documenting query thresholds and CPU loads."
    }
  ],
  featuredProject: {
    title: "E-Commerce Checkout Automation",
    description: "Engineered a robust Playwright end-to-end automation suite covering 120 critical payment, coupon, and inventory edge cases, successfully preventing payment flow regressions.",
    clientRole: "Global Retailer",
    metrics: [
      { value: "98%", label: "Core Path Test Coverage" },
      { value: "0", label: "Payment Regressions Post-Launch" }
    ]
  },
  faq: [
    {
      question: "Which test automation frameworks do you recommend?",
      answer: "We recommend Playwright for modern web applications. It runs in parallel, supports auto-waiting (eliminating flaky tests), and provides outstanding API testing capabilities alongside UI validation."
    },
    {
      question: "Can you train our in-house developers on maintaining the tests?",
      answer: "Yes. We write clean, self-documenting test code and conduct walk-through walkthroughs to hand over the automation setup smoothly."
    }
  ],
  seo: {
    title: "Quality Assurance & Testing Services",
    description: "Deliver reliable software with automated E2E testing, API verification, and load tests powered by Playwright.",
    keywords: ["quality assurance", "manual testing", "test automation", "playwright Cypress", "load testing"]
  }
};
