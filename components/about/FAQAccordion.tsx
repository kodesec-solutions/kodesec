"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Why choose a founder-led company?",
    answer: "Working with a founder-led team gives you direct access to technical owners. There are no account managers, sales scripts, or layers of communication. Decisions are fast, technical specifications are understood immediately, and the engineers writing your code are directly accountable for the final outcomes."
  },
  {
    question: "Can we work with your existing engineering team?",
    answer: "Absolutely. We routinely integrate with existing developer squads to act as specialized cloud, testing, or cybersecurity extensions. We can pair-program, run architecture reviews, write custom CI/CD pipelines, audit databases, or run manual penetration tests alongside your in-house developers."
  },
  {
    question: "Do you only work with startups?",
    answer: "While early-stage and growing startups are our core partners, we also work with scale-ups, CTOs of mid-sized organizations, and technical teams in larger firms who need senior-level engineering specialists who can deploy secure applications quickly."
  },
  {
    question: "Can you handle end-to-end software projects?",
    answer: "Yes, our team brings together the exact disciplines needed for end-to-end delivery: clean custom code architecture (Design & Engineering), secure deployment patterns (Cloud & DevOps), robust integration checks (Quality Assurance), and deep vulnerability scanning (Cyber Security)."
  },
  {
    question: "Do you provide long-term support?",
    answer: "Yes. We don't believe in handing over code and disappearing. We provide long-term retainer agreements, secure cloud operations support, regular code maintenance, recurring penetration tests, and vulnerability patching as threat vectors evolve."
  },
  {
    question: "How do you integrate security into development?",
    answer: "Security is integrated at the blueprint stage, not just checked right before launch. We threat-model requirements during planning, enforce zero-trust access parameters during coding, inject automatic SAST/secrets scanners in your CI/CD pipelines, and validate the system with manual offensive exploits."
  }
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 lg:px-20 bg-background-dark/30 border-t border-white/5 relative">
      <Container className="max-w-4xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/5 px-3 py-1 rounded-full">
            Help Desk
          </span>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl tracking-tight leading-none">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed max-w-xl mx-auto font-medium">
            Find quick answers about how we operate, who we collaborate with, and how we deliver engineering and security solutions.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden
                  ${isOpen
                    ? "border-primary bg-primary/[0.02] shadow-[0_0_20px_rgba(54,226,123,0.04)]"
                    : "border-white/5 bg-[#0F1424]/30 hover:border-white/10"
                  }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors"
                >
                  <span className={`text-base font-bold tracking-tight transition-colors ${isOpen ? "text-white" : "text-gray-300"}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-300 shrink-0 ml-4 ${isOpen ? "transform rotate-180 text-primary" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-white/[0.02]">
                        <p className="text-sm text-gray-400 leading-relaxed font-sans font-medium pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
