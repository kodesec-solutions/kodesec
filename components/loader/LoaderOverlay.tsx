"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "@/public/assets/Logo.png";

interface LoaderOverlayProps {
  onComplete: () => void;
}

export default function LoaderOverlay({ onComplete }: LoaderOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1800; // ms

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(calculatedProgress);

      if (calculatedProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 500);
        }, 200);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  const getStatusText = () => {
    if (progress < 30) return "INITIALIZING SECURITY CORE";
    if (progress < 65) return "VERIFYING ENCRYPTION PROTOCOLS";
    if (progress < 90) return "ESTABLISHING SECURE PIPELINE";
    return "SYSTEM READY";
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isExiting ? { opacity: 0, scale: 0.98, filter: "blur(6px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030609] text-white select-none overflow-hidden"
    >
      {/* Ambient background glow & grid lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,226,123,0.08)_0%,transparent_65%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Main Single-Screen Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        
        {/* Brand Shield & Logo Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mb-6"
        >
          {/* Subtle pulsating aura ring */}
          <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-xl animate-pulse" />
          
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-[#0D121F]/90 p-4 shadow-[0_0_30px_rgba(54,226,123,0.15)] backdrop-blur-xl">
            <Image
              src={Logo}
              alt="Kodesec Shield"
              width={48}
              height={58}
              priority
              className="h-12 w-auto object-contain"
            />
          </div>
        </motion.div>

        {/* Brand Name & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-1 mb-8"
        >
          <h1 className="text-2xl font-heading font-bold tracking-tight text-white flex items-center justify-center gap-2">
            KODESEC
          </h1>
          <p className="text-xs font-sans font-medium text-gray-400 tracking-wider">
            Engineering Secure Digital Products
          </p>
        </motion.div>

        {/* Sleek Modern Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full space-y-3"
        >
          {/* Progress Bar Track */}
          <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden border border-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary/70 via-primary to-emerald-400 shadow-[0_0_12px_rgba(54,226,123,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Status Text & Percentage Display */}
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 px-0.5">
            <span className="text-[10px] tracking-widest uppercase text-primary font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              {getStatusText()}
            </span>
            <span className="font-bold text-white text-xs">
              {progress}%
            </span>
          </div>
        </motion.div>

      </div>

      {/* Modern Bottom Tech Monogram */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-8 text-[10px] font-mono tracking-widest text-gray-500 uppercase"
      >
        KODESEC OS // SECURE BUILD v1.0
      </motion.div>
    </motion.div>
  );
}
