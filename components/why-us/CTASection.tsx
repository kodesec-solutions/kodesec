"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Calendar, MessageSquare } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 px-6 lg:px-20 relative z-10 overflow-hidden bg-transparent">
      <Container className="max-w-5xl">
        <div className="relative rounded-3xl border border-white/10 bg-[#0D121F]/90 p-8 md:p-16 overflow-hidden shadow-2xl flex flex-col items-center text-center backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,226,123,0.1),transparent_75%)] pointer-events-none" />

          <h2 className="text-3xl font-heading font-bold text-white sm:text-5xl leading-tight tracking-tight max-w-2xl">
            Let&apos;s Build Something{" "}
            <span className="text-gradient-emerald">
              Secure & Scalable
            </span>
          </h2>
          
          <p className="mt-6 text-xs sm:text-sm text-gray-400 max-w-lg leading-relaxed font-sans">
            Whether you&apos;re starting a new product or modernizing an existing infrastructure, we&apos;d love to discuss how we can help.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 w-full sm:w-auto z-10">
            <Link href="/contact?type=consultation" className="btn-primary">
              <span>Book Consultation</span>
              <Calendar className="size-4 shrink-0" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              <span>Contact Us</span>
              <MessageSquare className="size-4 shrink-0" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
