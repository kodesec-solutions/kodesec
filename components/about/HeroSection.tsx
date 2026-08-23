"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import NetworkGraph from "@/components/NetworkGraph";

export default function HeroSection() {
  return (
    <section className="relative px-4 pt-32 pb-24 md:pt-40 md:pb-36 lg:px-20 overflow-hidden">
      {/* Background Gradients 
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
      */}
      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start text-left min-w-0"
          >
            <span className="px-3.5 py-1.5 text-[10px] font-mono font-bold tracking-widest text-primary border border-primary/20 bg-primary/10 rounded-full uppercase mb-6 whitespace-nowrap">
              Engineering & Security
            </span>

            <h1 className="text-4xl font-heading font-bold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1] max-w-xl">
              Built by Engineers.{" "}
              <span className="block text-gradient-emerald">
                Driven by Security.
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-400 max-w-lg font-sans">
              Kodesec is a founder-led engineering and cybersecurity company helping startups and growing businesses design, build, secure, deploy, and scale modern digital products.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
              <Link
                href="/contact?type=consultation"
                className="btn-primary"
              >
                <span>Book Free Consultation</span>
                <ChevronRight size={16} className="shrink-0" />
              </Link>
              <a
                href="#expertise"
                className="btn-secondary"
              >
                <span>Explore Our Solutions</span>
                <ArrowRight size={16} className="shrink-0" />
              </a>
            </div>
          </motion.div>

          {/* Right Visual Mesh Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 flex justify-center w-full min-w-0"
          >
            <NetworkGraph />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
