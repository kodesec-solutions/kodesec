"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "cloud" | "devops" | "security" | "qa";
  description: string;
}

const techItems: TechItem[] = [
  // Frontend
  { name: "Next.js", category: "frontend", description: "Built with high-performance SSR components and optimal SEO layout rules." },
  { name: "React", category: "frontend", description: "Dynamic declarative interfaces featuring optimized custom hook structures." },
  { name: "TypeScript", category: "frontend", description: "Robust type safety to catch architectural logic bugs during build phase." },
  { name: "Tailwind CSS", category: "frontend", description: "Utility-first design styling matching premium dark layout requirements." },
  { name: "Framer Motion", category: "frontend", description: "Smooth fluid micro-animations with explicit reduced motion checks." },

  // Backend
  { name: "Go", category: "backend", description: "Highly parallel, minimal memory services written for speed and network performance." },
  { name: "Node.js", category: "backend", description: "Scalable backend orchestration and API integrations using TypeScript." },
  { name: "Rust", category: "backend", description: "Extremely secure, zero-overhead memory-safe modules for ledger tasks." },
  { name: "PostgreSQL", category: "backend", description: "Relational database setup with row-level security and strict connection pooling." },
  { name: "GraphQL", category: "backend", description: "Optimized single-endpoint data fetching layers with query-depth protection." },

  // Cloud
  { name: "AWS", category: "cloud", description: "Secure virtual networks, IAM lease configurations, and managed RDS setups." },
  { name: "GCP", category: "cloud", description: "Container management, custom cloud logging, and Pub/Sub queue topologies." },
  { name: "Vercel", category: "cloud", description: "Zero-config serverless deployments with edge network page optimization." },
  { name: "Docker", category: "cloud", description: "Consistent local environments and immutable production container blocks." },
  { name: "Kubernetes", category: "cloud", description: "Scalable container orchestration with ingress controllers and mTLS gates." },

  // DevOps
  { name: "GitHub Actions", category: "devops", description: "Automated continuous delivery gates running tests on every git push." },
  { name: "Terraform", category: "devops", description: "Declarative Infrastructure-as-Code to version and deploy secure clouds." },
  { name: "Ansible", category: "devops", description: "Repeatable configuration management to provision hardened base servers." },
  { name: "Prometheus", category: "devops", description: "High-fidelity metric recording to trigger threshold alarms." },
  { name: "Datadog", category: "devops", description: "Unified application tracing to debug runtime resource blockages." },

  // Security
  { name: "OWASP standards", category: "security", description: "Strict design matching OWASP Top 10 web and API vulnerability guides." },
  { name: "Burp Suite Pro", category: "security", description: "Manual API exploit validation and request proxy analysis." },
  { name: "Nmap", category: "security", description: "Network port mapping to review firewall exposures and system banners." },
  { name: "Metasploit", category: "security", description: "Offensive exploit simulation to confirm access vectors." },
  { name: "Cryptography (KMS)", category: "security", description: "Least-privilege key management and envelope encryption setups." },

  // Quality Assurance
  { name: "Vitest", category: "qa", description: "Lightning-fast unit testing framework aligned with modern ESM setups." },
  { name: "Playwright", category: "qa", description: "Reliable end-to-end browser tests verifying login and user flows." },
  { name: "Cypress", category: "qa", description: "Interactive browser tests covering complex dashboard states." },
  { name: "Jest", category: "qa", description: "Traditional unit and component test suites with mocks." },
  { name: "SonarQube", category: "qa", description: "Automated code quality gates scanning for bugs and technical debt." },
];

const categories = [
  { id: "all", label: "All Technologies" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "cloud", label: "Cloud" },
  { id: "devops", label: "DevOps" },
  { id: "security", label: "Security" },
  { id: "qa", label: "Quality Assurance" },
];

export default function TechCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === "all"
    ? techItems
    : techItems.filter(item => item.category === selectedCategory);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all border cursor-pointer
              ${selectedCategory === cat.id
                ? "bg-primary border-primary text-black shadow-[0_0_15px_rgba(54,226,123,0.25)]"
                : "border-white/5 bg-white/[0.01] text-gray-400 hover:border-white/10 hover:text-white"
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              key={item.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative group rounded-2xl border border-white/5 bg-[#0F1424]/40 p-5 backdrop-blur-md flex flex-col justify-center items-center text-center transition-all duration-300 hover:border-primary/20 hover:bg-[#0F1424]/60 cursor-pointer h-28"
            >
              <span className="text-sm font-bold text-white group-hover:text-primary transition-colors duration-300">
                {item.name}
              </span>
              
              <span className="mt-1 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                {item.category}
              </span>

              {/* Tooltip description */}
              {hoveredIndex === idx && (
                <div className="absolute bottom-[115%] left-1/2 -translate-x-1/2 w-48 p-3 rounded-xl border border-white/10 bg-[#070A14] text-[10px] text-gray-300 leading-relaxed font-semibold shadow-2xl z-20 pointer-events-none">
                  {item.description}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#070A14]" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
