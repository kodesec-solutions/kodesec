"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HeroIllustration from "./HeroIllustration";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden z-10">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none -z-10" />

      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10 max-w-2xl">
            <Badge variant="default" className="mb-6 animate-pulse">
              WHY KODESEC
            </Badge>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1]">
              Why Businesses <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 font-black">
                Choose Kodesec
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-200 font-semibold">
              We help startups and growing businesses design, build, secure, deploy, and improve modern software with engineering excellence and practical cybersecurity expertise.
            </p>

            <p className="mt-4 text-sm md:text-base leading-relaxed text-gray-400 font-medium">
              Whether you're building a new product, strengthening your security posture, modernizing your cloud infrastructure, or improving software quality, Kodesec becomes an extension of your engineering team—not just another vendor.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
              <a href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full font-bold cursor-pointer bg-primary text-black hover:bg-primary/95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(54,226,123,0.35)] transition-all">
                  Book a Free Consultation
                  <Calendar className="size-4" />
                </Button>
              </a>
              <a href="/services" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-full font-bold cursor-pointer border-white/10 hover:bg-white/[0.03] text-white flex items-center justify-center gap-2 transition-all">
                  Explore Our Solutions
                  <ArrowRight className="size-4 group-hover/button:translate-x-1 transition-transform" />
                </Button>
              </a>
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
