"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/ui/container";
import HeroIllustration from "./HeroIllustration";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden z-10">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] blur-[150px] pointer-events-none rounded-full" />

      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10 max-w-2xl">
            <span className="px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-widest text-primary border border-primary/20 bg-primary/10 rounded-full uppercase mb-6 whitespace-nowrap">
              WHY KODESEC
            </span>
            
            <h1 className="text-4xl font-heading font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Why Businesses <br />
              <span className="text-gradient-emerald">
                Choose Kodesec
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-300 font-sans">
              We help startups and growing businesses design, build, secure, deploy, and improve modern software with engineering excellence and practical cybersecurity expertise.
            </p>

            <p className="mt-4 text-xs sm:text-sm leading-relaxed text-gray-400 font-sans">
              Whether you&apos;re building a new product, strengthening your security posture, modernizing your cloud infrastructure, or improving software quality, Kodesec becomes an extension of your engineering team — not just another vendor.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
              <Link href="/contact?type=consultation" className="btn-primary">
                <span>Book a Free Consultation</span>
                <Calendar className="size-4 shrink-0" />
              </Link>
              <Link href="/services" className="btn-secondary">
                <span>Explore Our Solutions</span>
                <ArrowRight className="size-4 shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right Visual Mesh Column */}
          <div className="lg:col-span-5 flex justify-center z-10 w-full">
            <HeroIllustration />
          </div>
        </div>
      </Container>
    </section>
  );
}
