"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Why should we choose Kodesec instead of hiring freelancers?",
    answer: "Freelancers typically work in isolation and may lack the specialized cross-functional skills needed for robust platforms. Kodesec delivers a cohesive squad of senior developers and security researchers, led directly by our technical founders. You get code-level engineering, manual vulnerability testing, and secure infrastructure design in a unified, reliable partnership.",
  },
  {
    question: "Can you work alongside our existing engineering team?",
    answer: "Yes. We act as an extension of your active engineering team. We integrate directly into your workflows—sharing real-time findings in Slack or Discord, creating clean pull requests, writing custom infrastructure configurations, and setting up automated CI/CD checks alongside your developers.",
  },
  {
    question: "Do you provide end-to-end software development?",
    answer: "Yes, we handle the entire product lifecycle. From system architecture mapping and database indexing to frontend interfaces, API designs, DevOps pipelines, secure cloud deployments, and manual penetration testing. One partner handles your code quality, reliability, and security.",
  },
  {
    question: "How do you integrate security into projects?",
    answer: "We follow a 'Security by Design' philosophy. Security is considered in every architectural planning decision, not checked as a checkbox before release. We verify permission bounds, least-privilege IAM configs, and database access logs. Additionally, our offensive engineers manually test and validate that your runtime systems are secure.",
  },
  {
    question: "Can you support startups as well as growing businesses?",
    answer: "Absolutely. We match the rapid iteration speed and agility needed by seed-stage startups launching their first product, while also meeting the rigorous compliance protocols, scalable architectures, and multi-tenant security requirements of growing series A+ and enterprise platforms.",
  },
  {
    question: "What industries do you work with?",
    answer: "We focus on technology-centric and high-compliance sectors. This includes SaaS platforms requiring robust multi-tenant session isolation, FinTech companies handling payments and key management services, and cloud-native enterprises requiring high availability and container security.",
  },
  {
    question: "Do you offer long-term support?",
    answer: "Yes. We don't just hand off code and leave. We provide ongoing support retainers, active environment monitoring, and recurring security assessments to ensure your software remains secure, stable, and easy to maintain as your business scales.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleIndex(idx);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-white/5 bg-[#0F1424]/40 backdrop-blur-md overflow-hidden transition-colors duration-300 hover:border-primary/20"
          >
            {/* Header Trigger */}
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              aria-controls={`faq-content-${idx}`}
              id={`faq-trigger-${idx}`}
              onClick={() => toggleIndex(idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="flex items-center justify-between p-5 md:p-6 text-left cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-2xl"
            >
              <h3 className="text-sm md:text-base font-bold text-white pr-4">
                {faq.question}
              </h3>
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.02] border border-white/5 text-gray-400 group-hover:text-white transition-colors duration-300">
                {isOpen ? <Minus size={12} /> : <Plus size={12} />}
              </div>
            </div>

            {/* Content Panel */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-content-${idx}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${idx}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6 border-t border-white/5 pt-4 text-xs md:text-sm text-gray-300 font-medium leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
