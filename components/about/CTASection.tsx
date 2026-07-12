"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function CTASection() {
  // Let's create an array of floats to animate subtle particles
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15
  }));

  return (
    <section className="py-28 px-4 lg:px-20 relative overflow-hidden bg-background-dark border-t border-white/5">
      {/* Mesh gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
      
      {/* Animated Glowing Orbs */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-accent-cyan/5 blur-[150px] pointer-events-none"
      />

      {/* Floating Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          animate={{
            y: ["0%", "-150%", "0%"],
            opacity: [0, 0.4, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          className="rounded-full bg-primary pointer-events-none"
        />
      ))}

      <Container className="relative z-10 max-w-5xl rounded-[2.5rem] border border-white/5 bg-[#0F1424]/40 p-8 md:p-16 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.4)] flex flex-col items-center text-center">
        
        {/* Animated Icon Badge */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-8"
        >
          <MessageSquare className="h-6 w-6 text-primary" />
        </motion.div>

        <h2 className="text-3xl font-black text-white sm:text-5xl leading-[1.1] tracking-tight max-w-2xl">
          Let's Build Something Secure, Scalable, and Ready for Growth.
        </h2>
        
        <p className="mt-6 text-sm md:text-base text-gray-400 max-w-lg leading-relaxed font-medium">
          Whether you're launching a new product, strengthening your infrastructure, or improving software quality, we'd love to help.
        </p>

        {/* Action buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/contact?type=consultation"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.3)] cursor-pointer"
          >
            Book Consultation
            <ChevronRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 text-sm font-bold text-white transition-all hover:bg-white/10 hover:border-white/20 cursor-pointer"
          >
            Contact Us
          </Link>
        </div>

      </Container>
    </section>
  );
}
