"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function CTASection() {
  return (
    <section className="py-20 px-4 lg:px-20 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,226,123,0.1),transparent_75%)] pointer-events-none" />

      <Container className="relative z-10 max-w-5xl rounded-3xl border border-white/10 bg-[#0D121F]/90 p-8 md:p-16 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center">
        
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6 text-primary shrink-0">
          <MessageSquare className="h-6 w-6" />
        </div>

        <h2 className="text-3xl font-heading font-bold text-white sm:text-5xl leading-tight tracking-tight max-w-2xl">
          Let&apos;s Build Something <span className="text-gradient-emerald">Secure & Scalable</span>.
        </h2>
        
        <p className="mt-6 text-xs sm:text-sm text-gray-400 max-w-lg leading-relaxed font-sans">
          Whether you&apos;re launching a new product, strengthening your infrastructure, or improving software quality, we&apos;d love to help.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact?type=consultation"
            className="btn-primary"
          >
            <span>Book Consultation</span>
            <ChevronRight size={16} className="shrink-0" />
          </Link>
          <Link
            href="/contact"
            className="btn-secondary"
          >
            <span>Contact Us</span>
          </Link>
        </div>

      </Container>
    </section>
  );
}
