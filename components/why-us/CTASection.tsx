"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Calendar, MessageSquare } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 px-6 lg:px-20 relative z-10 border-t border-white/5 overflow-hidden">
      {/* Background Animated Gradient */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-cyan-500/5 to-purple-500/10 animate-pulse pointer-events-none -z-10" />

      <Container className="max-w-5xl">
        <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#101525]/80 to-[#0A0D18]/90 p-8 md:p-16 overflow-hidden shadow-2xl flex flex-col items-center text-center backdrop-blur-xl">
          {/* Subtle Particles / Floating blobs */}
          <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-primary/40 animate-ping" />
          <div className="absolute bottom-12 right-12 w-3 h-3 rounded-full bg-cyan-400/30 animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-purple-400/50 animate-bounce" />

          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,226,123,0.08),transparent_75%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />

          <h2 className="text-3xl font-extrabold text-white sm:text-5xl leading-tight tracking-tight max-w-2xl">
            Let&apos;s Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400 font-black">
              Secure, Scalable,
            </span>{" "}
            and Ready for Growth
          </h2>
          
          <p className="mt-6 text-sm md:text-base text-gray-400 max-w-lg leading-relaxed font-medium">
            Whether you&apos;re starting a new project or improving an existing one, we&apos;d love to discuss how we can help.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 w-full sm:w-auto z-10">
            <a href="/contact?type=consultation" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full font-bold cursor-pointer bg-primary text-black hover:bg-primary/95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(54,226,123,0.35)] transition-all">
                Book Consultation
                <Calendar className="size-4" />
              </Button>
            </a>
            <a href="/contact" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-full font-bold cursor-pointer border-white/10 hover:bg-white/[0.03] text-white flex items-center justify-center gap-2 transition-all">
                Contact Us
                <MessageSquare className="size-4" />
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
