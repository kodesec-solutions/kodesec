import { SolutionContent } from "./types";

export const cloudDevops: SolutionContent = {
  slug: "cloud-devops",
  title: "Cloud & DevOps",
  tagline: "Deploying, automating, and scaling modern cloud platforms",
  description: "Helping teams deploy, automate and scale modern infrastructure.",
  longDescription: "We build robust infrastructure-as-code platforms, manage container networks, and automate build/release cycles to ensure high availability and security.",
  themeColor: "purple",
  iconName: "Cloud",
  capabilities: [
    {
      title: "Cloud Infrastructure",
      description: "Designing secure, scalable multi-region cloud networks.",
      outcome: "Reduced cloud spend and automatic failover structures.",
      iconName: "Server"
    },
    {
      title: "DevOps",
      description: "Automating configurations, backups, and scaling operations.",
      outcome: "Consistent environments across staging, testing, and production.",
      iconName: "Workflow"
    },
    {
      title: "CI/CD",
      description: "Building automated testing and container release pipelines.",
      outcome: "Deployment frequency increased from weeks to minutes.",
      iconName: "Zap"
    },
    {
      title: "Kubernetes",
      description: "Configuring container orchestration with strict network isolation.",
      outcome: "Secure, highly available pod orchestration at scale.",
      iconName: "Cpu"
    },
    {
      title: "Infrastructure as Code",
      description: "Provisioning platforms using Terraform, Pulumi, or Ansible.",
      outcome: "Zero manual configuration drift across infrastructure.",
      iconName: "Code"
    },
    {
      title: "Monitoring & Alerts",
      description: "Setting up central logs, metrics dashboards, and alerts.",
      outcome: "Under 5-minute Mean Time to Detect (MTTD) incidents.",
      iconName: "Activity"
    }
  ],
  challenges: [
    "Migrate applications to containerized Kubernetes setups",
    "Automate build, test, and release cycles securely",
    "Prevent cloud security misconfigurations and config drifts",
    "Reduce infrastructure latency and scale traffic load"
  ],
  process: [
    {
      label: "01",
      title: "Discovery",
      description: "Cloud resource audit.",
      detail: "We audit current servers, IAM accounts, network settings, and cloud expenditures."
    },
    {
      label: "02",
      title: "Architecture",
      description: "Topology blueprinting.",
      detail: "We design secure mTLS architectures, private subnets, and IAM permission maps."
    },
    {
      label: "03",
      title: "Infrastructure",
      description: "Writing IaC configurations.",
      detail: "We write modular Terraform scripts to programmatically deploy and control the resources."
    },
    {
      label: "04",
      title: "DevSecOps",
      description: "Automation pipelines.",
      detail: "We create secure CI/CD pipelines, adding security checks (SAST, secrets scanner, image signature check)."
    },
    {
      label: "05",
      title: "Monitoring",
      description: "Alerts and dashboards.",
      detail: "We configure Grafana, Prometheus, and Slack alarms to track resource usage and alerts."
    }
  ],
  technologies: [
    { name: "AWS", category: "Cloud", glow: "hover:shadow-[0_0_20px_rgba(255,153,0,0.3)] hover:border-[#FF9900]/40" },
    { name: "Kubernetes", category: "Containers", glow: "hover:shadow-[0_0_20px_rgba(50,109,230,0.3)] hover:border-[#326DE6]/40" },
    { name: "Terraform", category: "IaC", glow: "hover:shadow-[0_0_20px_rgba(118,63,227,0.3)] hover:border-[#763FE3]/40" },
    { name: "Docker", category: "Containers", glow: "hover:shadow-[0_0_20px_rgba(36,150,237,0.3)] hover:border-[#2496ED]/40" },
    { name: "GitHub Actions", category: "CI/CD", glow: "hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border-white/30" },
    { name: "GCP", category: "Cloud", glow: "hover:shadow-[0_0_20px_rgba(66,133,244,0.3)] hover:border-[#4285F4]/40" }
  ],
  deliverables: [
    {
      title: "Terraform Infrastructure Modules",
      description: "Clean, documented, version-controlled Infrastructure-as-Code directories."
    },
    {
      title: "DevSecOps CI/CD Pipelines",
      description: "Fully automated GitHub Actions configurations with integrated build, test, scan, and deploy jobs."
    },
    {
      title: "Grafana & Monitoring Dashboards",
      description: "Real-time metrics visualization showing CPU, RAM, error logs, and performance thresholds."
    }
  ],
  featuredProject: {
    title: "Global Cloud Migration",
    description: "Successfully migrated legacy on-premise infrastructure of a global supply chain enterprise to a highly secure, multi-region AWS Kubernetes setup with zero downtime.",
    clientRole: "Supply Chain Enterprise",
    metrics: [
      { value: "45%", label: "Cloud Spend Reduced" },
      { value: "10x", label: "Faster Deployments" }
    ]
  },
  faq: [
    {
      question: "Do you support multi-cloud configurations?",
      answer: "Yes. We design cloud-agnostic Terraform models and configure Kubernetes frameworks so they can run identically across AWS, Google Cloud Platform (GCP), and Microsoft Azure."
    },
    {
      question: "What is DevSecOps and why is it important?",
      answer: "DevSecOps bakes security checks directly into the developer workflow. Rather than auditing code once a year, we run automated tools on every git commit, alerting developers about vulnerabilities immediately."
    }
  ],
  seo: {
    title: "Cloud & DevOps Services",
    description: "Automate, scale, and secure your cloud infrastructure with Terraform, Kubernetes, and optimized CI/CD pipelines.",
    keywords: ["devops", "cloud infrastructure", "kubernetes", "terraform", "CI/CD", "AWS GCP"]
  }
};
