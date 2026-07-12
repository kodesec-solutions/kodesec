"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function HeroSection() {
  return (
    <section className="relative px-4 pt-32 pb-24 md:pt-40 md:pb-36 lg:px-20 overflow-hidden bg-background-dark">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start text-left min-w-0"
          >
            <span className="px-3 py-1 text-[10px] font-mono font-bold tracking-widest text-primary border border-primary/20 bg-primary/5 rounded-full uppercase mb-6">
              Engineering × Security
            </span>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.1] max-w-xl">
              Built by Engineers.{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-cyan to-accent-purple">
                Driven by Security.
              </span>{" "}
              Focused on Success.
            </h1>

            <p className="mt-6 text-base md:text-lg leading-relaxed text-gray-400 max-w-lg font-medium">
              Kodesec is a founder-led engineering and cybersecurity company helping startups and growing businesses design, build, secure, deploy, and scale modern digital products.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
              <Link
                href="/contact?type=consultation"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.3)] cursor-pointer"
              >
                Book Free Consultation
                <ChevronRight size={16} />
              </Link>
              <a
                href="#expertise"
                className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 cursor-pointer"
              >
                Explore Our Solutions
                <ArrowRight size={16} className="group-hover/button:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Right Animated Diagram Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex justify-center w-full min-w-0"
          >
            <div className="relative w-full max-w-[500px] aspect-square rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl p-6 flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              {/* Subtle pulsing background glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-accent-cyan/5 to-accent-purple/5 animate-pulse-ring rounded-[2rem] pointer-events-none" />
              
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full text-gray-500 stroke-current fill-none stroke-[1.5]"
              >
                {/* Connecting Topology Lines */}
                <motion.path
                  d="M100 100 L200 200 M300 100 L200 200 M100 300 L200 200 M300 300 L200 200 M200 60 L200 200 M200 340 L200 200"
                  stroke="rgba(255,255,255,0.06)"
                  strokeDasharray="4 4"
                />
                
                {/* Animated Pulsing Signal Paths */}
                <motion.path
                  d="M100 100 L200 200"
                  stroke="url(#grad-primary)"
                  strokeWidth="2"
                  strokeDasharray="10 150"
                  animate={{ strokeDashoffset: [-160, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M300 100 L200 200"
                  stroke="url(#grad-cyan)"
                  strokeWidth="2"
                  strokeDasharray="10 150"
                  animate={{ strokeDashoffset: [-160, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M100 300 L200 200"
                  stroke="url(#grad-purple)"
                  strokeWidth="2"
                  strokeDasharray="10 150"
                  animate={{ strokeDashoffset: [0, -160] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
                />
                <motion.path
                  d="M300 300 L200 200"
                  stroke="url(#grad-primary)"
                  strokeWidth="2"
                  strokeDasharray="10 150"
                  animate={{ strokeDashoffset: [0, -160] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                {/* Concentric rings around center */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="55"
                  stroke="rgba(34, 211, 238, 0.2)"
                  strokeDasharray="5 10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                  cx="200"
                  cy="200"
                  r="75"
                  stroke="rgba(192, 132, 252, 0.15)"
                  strokeDasharray="10 15"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                />

                {/* Nodes with Floating Animation */}
                {/* 1. Cloud node (Top Center) */}
                <motion.g
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <circle cx="200" cy="60" r="24" fill="#0F1424" stroke="rgba(34, 211, 238, 0.4)" />
                  <path
                    d="M192 64 a 4 4 0 0 1 8 0 a 5 5 0 0 1 10 -2 a 4 4 0 0 1 -2 8 l -16 0 a 4 4 0 0 1 0 -6 Z"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                  />
                  <text x="200" y="98" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="monospace">CLOUD</text>
                </motion.g>

                {/* 2. Engineering workflow (Top Left) */}
                <motion.g
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <circle cx="100" cy="100" r="24" fill="#0F1424" stroke="rgba(192, 132, 252, 0.4)" />
                  {/* Code brackets */}
                  <path d="M94 96 l-6 4 l6 4 M106 96 l6 4 l-6 4 M102 94 l-4 12" stroke="#c084fc" strokeWidth="1.5" />
                  <text x="100" y="138" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="monospace">BUILD</text>
                </motion.g>

                {/* 3. API connections (Top Right) */}
                <motion.g
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <circle cx="300" cy="100" r="24" fill="#0F1424" stroke="rgba(54, 226, 123, 0.4)" />
                  <path d="M292 100 h16 M296 95 l-4 5 l4 5 M304 95 l4 5 l-4 5" stroke="#36e27b" strokeWidth="1.5" />
                  <text x="300" y="138" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="monospace">API</text>
                </motion.g>

                {/* 4. Network topology (Bottom Left) */}
                <motion.g
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <circle cx="100" cy="300" r="24" fill="#0F1424" stroke="rgba(54, 226, 123, 0.4)" />
                  <circle cx="94" cy="296" r="3" fill="#36e27b" />
                  <circle cx="106" cy="296" r="3" fill="#36e27b" />
                  <circle cx="100" cy="306" r="3" fill="#36e27b" />
                  <path d="M94 296 L100 306 L106 296 Z" stroke="rgba(54, 226, 123, 0.5)" strokeWidth="1" />
                  <text x="100" y="338" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="monospace">NETWORK</text>
                </motion.g>

                {/* 5. System architecture (Bottom Right) */}
                <motion.g
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                >
                  <circle cx="300" cy="300" r="24" fill="#0F1424" stroke="rgba(192, 132, 252, 0.4)" />
                  <rect x="290" y="292" width="20" height="16" rx="2" stroke="#c084fc" strokeWidth="1.5" />
                  <path d="M290 300 h20 M297 308 v-8" stroke="#c084fc" strokeWidth="1" />
                  <text x="300" y="338" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="monospace">ARCH</text>
                </motion.g>

                {/* 6. QA Gateway (Bottom Center) */}
                <motion.g
                  animate={{ y: [0, 7, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                  <circle cx="200" cy="340" r="24" fill="#0F1424" stroke="rgba(34, 211, 238, 0.4)" />
                  <path d="M194 340 l4 4 l8 -8" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="200" y="378" textAnchor="middle" fill="#9ca3af" fontSize="9" fontFamily="monospace">QA</text>
                </motion.g>

                {/* Center Security Shield Node */}
                <motion.g
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <circle cx="200" cy="200" r="38" fill="url(#center-glow)" stroke="rgba(54, 226, 123, 0.3)" strokeWidth="2" />
                  {/* Shield Path */}
                  <path
                    d="M192 190 h16 c2 0 4 2 4 4 v8 c0 8 -8 14 -12 16 c-4 -2 -12 -8 -12 -16 v-8 c0 -2 2 -4 4 -4 Z"
                    fill="rgba(54, 226, 123, 0.1)"
                    stroke="#36e27b"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <text x="200" y="250" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="1">SECURE</text>
                </motion.g>

                {/* SVG Gradients definitions */}
                <defs>
                  <linearGradient id="grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#36e27b" stopOpacity="1" />
                    <stop offset="100%" stopColor="#36e27b" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad-cyan" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="grad-purple" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="1" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="rgba(54, 226, 123, 0.2)" />
                    <stop offset="70%" stopColor="rgba(15, 20, 36, 0.9)" />
                    <stop offset="100%" stopColor="#0B0F1A" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
