"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

interface TechItem {
  name: string;
  glow: string;
}

interface TechCategory {
  title: string;
  desc: string;
  items: TechItem[];
  colorClass: string;
}

const categories: TechCategory[] = [
  {
    title: "Frontend Development",
    desc: "Building blazing-fast, secure, and accessible user interfaces.",
    colorClass: "hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.06)]",
    items: [
      { name: "React", glow: "group-hover/item:text-cyan-400" },
      { name: "Next.js", glow: "group-hover/item:text-white" },
      { name: "TypeScript", glow: "group-hover/item:text-blue-400" },
      { name: "Tailwind CSS", glow: "group-hover/item:text-teal-400" },
      { name: "Framer Motion", glow: "group-hover/item:text-pink-400" }
    ]
  },
  {
    title: "Backend Engineering",
    desc: "Robust APIs, zero-trust auth modules, and modular database access layers.",
    colorClass: "hover:border-emerald-500/30 hover:shadow-[0_0_30px_rgba(16,185,129,0.06)]",
    items: [
      { name: "Node.js", glow: "group-hover/item:text-emerald-400" },
      { name: "NestJS", glow: "group-hover/item:text-red-400" },
      { name: "Go", glow: "group-hover/item:text-cyan-400" },
      { name: "PostgreSQL", glow: "group-hover/item:text-blue-400" },
      { name: "Redis", glow: "group-hover/item:text-red-500" }
    ]
  },
  {
    title: "Cloud Infrastructure",
    desc: "Multi-tenant virtualization configurations and secure cloud boundaries.",
    colorClass: "hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.06)]",
    items: [
      { name: "AWS", glow: "group-hover/item:text-orange-400" },
      { name: "Google Cloud", glow: "group-hover/item:text-red-400" },
      { name: "Azure", glow: "group-hover/item:text-blue-400" },
      { name: "Cloudflare", glow: "group-hover/item:text-amber-500" }
    ]
  },
  {
    title: "DevOps & IaC",
    desc: "Hardened automated CI/CD security pipelines and IaC blueprints.",
    colorClass: "hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.06)]",
    items: [
      { name: "Kubernetes", glow: "group-hover/item:text-blue-400" },
      { name: "Docker", glow: "group-hover/item:text-cyan-400" },
      { name: "Terraform", glow: "group-hover/item:text-purple-400" },
      { name: "GitHub Actions", glow: "group-hover/item:text-white" }
    ]
  },
  {
    title: "Cyber & Network Security",
    desc: "Manual penetration testing tools, scanning gates, and verification suites.",
    colorClass: "hover:border-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.06)]",
    items: [
      { name: "OWASP ASVS", glow: "group-hover/item:text-emerald-400" },
      { name: "Burp Suite", glow: "group-hover/item:text-orange-400" },
      { name: "ZAP Scanner", glow: "group-hover/item:text-blue-400" },
      { name: "Nmap / Gobuster", glow: "group-hover/item:text-red-400" },
      { name: "Trivy / Snyk", glow: "group-hover/item:text-purple-400" }
    ]
  },
  {
    title: "Quality Assurance",
    desc: "Comprehensive automated browser checks, visual comparisons, and regression runs.",
    colorClass: "hover:border-yellow-500/30 hover:shadow-[0_0_30px_rgba(234,179,8,0.06)]",
    items: [
      { name: "Playwright", glow: "group-hover/item:text-emerald-400" },
      { name: "Jest", glow: "group-hover/item:text-red-400" },
      { name: "Supertest", glow: "group-hover/item:text-blue-400" },
      { name: "Cypress", glow: "group-hover/item:text-teal-400" }
    ]
  }
];

export default function TechnologyGrid() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  return (
    <section className="py-24 px-4 lg:px-20 bg-background-dark/50 border-t border-white/5 relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
            Ecosystem Layout
          </span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight leading-none">
            Our Technology Stack
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto font-medium">
            We don't buy into proprietary black boxes. We build and protect your applications using industry-leading, standard, and community-audited tools.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onMouseEnter={() => setHoveredCategory(idx)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={`rounded-3xl border border-white/5 bg-[#0F1424]/30 p-6 md:p-8 backdrop-blur-md transition-all duration-300 flex flex-col justify-between text-left ${category.colorClass}`}
            >
              <div>
                <h3 className="text-base font-black text-white tracking-tight leading-snug group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="mt-3 text-xs text-gray-400 leading-relaxed font-sans font-medium">
                  {category.desc}
                </p>
              </div>

              {/* Technologies list inside Category */}
              <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                {category.items.map((tech) => (
                  <div
                    key={tech.name}
                    className="group/item flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03] transition-all cursor-default"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover/item:bg-primary transition-colors shrink-0" />
                    <span className={`text-[10px] font-mono font-bold text-gray-400 transition-colors ${tech.glow}`}>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
