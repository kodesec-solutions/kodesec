"use client";

import React, { useState } from "react";
import { Rocket, RefreshCw, Lock, Cloud, GitBranch, CheckSquare, Users } from "lucide-react";
import ScenarioCard from "./ScenarioCard";

const scenarios = [
  {
    title: "Launching a new SaaS product",
    description: "Build robust multi-tenant architectures with complete data isolation and secure API layers from the first release.",
    icon: Rocket,
  },
  {
    title: "Modernizing legacy software",
    description: "Safely refactor outdated monolith platforms into modular, secure, and modern microservices.",
    icon: RefreshCw,
  },
  {
    title: "Improving application security",
    description: "Audit logic loops, identify authorization issues, and implement threat modeling to prevent breaches.",
    icon: Lock,
  },
  {
    title: "Migrating to cloud infrastructure",
    description: "Design secure VPC networks, setup least-privilege IAM rules, and deploy Kubernetes clusters.",
    icon: Cloud,
  },
  {
    title: "Automating deployments",
    description: "Build continuous integration and delivery pipelines with automated vulnerability gates.",
    icon: GitBranch,
  },
  {
    title: "Improving software quality",
    description: "Set up comprehensive end-to-end and unit testing frameworks to ensure code resilience.",
    icon: CheckSquare,
  },
  {
    title: "Scaling engineering teams",
    description: "Establish clean code standards, automation, and documentation that allow new engineers to onboard quickly.",
    icon: Users,
  },
];

export default function WhoWeHelp() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
      {scenarios.map((sc, idx) => (
        <ScenarioCard
          key={idx}
          title={sc.title}
          description={sc.description}
          icon={sc.icon}
          active={activeIndex === idx}
          onHover={() => setActiveIndex(idx)}
        />
      ))}
    </div>
  );
}
