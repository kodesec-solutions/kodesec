"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Shield, Cloud, Terminal, Database } from "lucide-react";

export default function HeroIllustration() {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const pulseVariant = {
    animate: {
      scale: shouldReduceMotion ? 1 : [1, 1.05, 1],
      opacity: shouldReduceMotion ? 0.8 : [0.7, 0.9, 0.7],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const lineFlowVariant = {
    animate: {
      strokeDashoffset: shouldReduceMotion ? 0 : [0, -40],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear" as const,
      },
    },
  };

  return (
    <div className="relative w-full max-w-lg aspect-square lg:aspect-auto lg:h-[450px] rounded-3xl border border-white/10 bg-gradient-to-br from-[#0F1424]/90 to-[#050810]/95 p-6 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between">
      {/* Blueprint Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(54,226,123,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(54,226,123,0.025)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
      
      {/* Glowing Ambient Orbs */}
      <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full bg-primary/10 blur-[60px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-48 h-48 rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none" />

      {/* Header Info */}
      <div className="flex justify-between items-center border-b border-white/5 pb-3 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
          <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">System Blueprint</span>
        </div>
        <span className="text-[9px] font-mono text-gray-500 font-bold">KODESEC SECURE FLOW</span>
      </div>

      {/* Main Diagram Area */}
      <div className="relative flex-1 flex items-center justify-center p-4">
        <svg className="w-full h-full min-h-[250px]" viewBox="0 0 400 300" fill="none">
          {/* Paths connecting stages */}
          {/* Path 1: Source (Code) to Security Gate */}
          <path d="M 60 150 L 160 150" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />
          <motion.path 
            d="M 60 150 L 160 150" 
            stroke="url(#gradient-primary)" 
            strokeWidth="2" 
            strokeDasharray="8 8"
            variants={lineFlowVariant}
            animate="animate"
            strokeLinecap="round"
          />

          {/* Path 2: Security Gate to Cloud Core */}
          <path d="M 200 150 L 300 150" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />
          <motion.path 
            d="M 200 150 L 300 150" 
            stroke="url(#gradient-cyan)" 
            strokeWidth="2" 
            strokeDasharray="8 8"
            variants={lineFlowVariant}
            animate="animate"
            strokeLinecap="round"
          />

          {/* Path 3: Security Gate down to Database */}
          <path d="M 180 170 Q 180 230 300 230" stroke="rgba(255,255,255,0.05)" strokeWidth="4" strokeLinecap="round" />
          <motion.path 
            d="M 180 170 Q 180 230 300 230" 
            stroke="url(#gradient-purple)" 
            strokeWidth="2" 
            strokeDasharray="8 8"
            variants={lineFlowVariant}
            animate="animate"
            strokeLinecap="round"
          />

          {/* Source Node (Terminal / Code) */}
          <g transform="translate(30, 120)">
            <motion.rect
              x="0" y="0" width="60" height="60" rx="12"
              fill="#0F1424" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"
              whileHover={{ scale: 1.05, borderColor: "rgba(54, 226, 123, 0.4)" }}
            />
            <foreignObject x="18" y="18" width="24" height="24">
              <Terminal className="w-6 h-6 text-primary" />
            </foreignObject>
            <text x="30" y="75" fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">01.BUILD</text>
          </g>

          {/* Security Gate Node (Shield / SecOps) */}
          <g transform="translate(150, 120)">
            <motion.rect
              x="0" y="0" width="60" height="60" rx="12"
              fill="#0F1424" stroke="rgba(54, 226, 123, 0.3)" strokeWidth="1.5"
              variants={pulseVariant}
              animate="animate"
              whileHover={{ scale: 1.05, borderColor: "#36e27b" }}
            />
            <foreignObject x="18" y="18" width="24" height="24">
              <Shield className="w-6 h-6 text-primary" />
            </foreignObject>
            <text x="30" y="75" fill="#36e27b" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">02.SECURE</text>
            
            {/* Glowing outer aura for the secure node */}
            <circle cx="30" cy="30" r="35" stroke="rgba(54, 226, 123, 0.1)" strokeWidth="1" strokeDasharray="3 3" />
          </g>

          {/* Cloud Node (Cloud Architecture) */}
          <g transform="translate(290, 120)">
            <motion.rect
              x="0" y="0" width="60" height="60" rx="12"
              fill="#0F1424" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"
              whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.4)" }}
            />
            <foreignObject x="18" y="18" width="24" height="24">
              <Cloud className="w-6 h-6 text-cyan-400" />
            </foreignObject>
            <text x="30" y="75" fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">03.DEPLOY</text>
          </g>

          {/* Database Node (Database / Data Storage) */}
          <g transform="translate(290, 200)">
            <motion.rect
              x="0" y="0" width="60" height="60" rx="12"
              fill="#0F1424" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"
              whileHover={{ scale: 1.05, borderColor: "rgba(192, 132, 252, 0.4)" }}
            />
            <foreignObject x="18" y="18" width="24" height="24">
              <Database className="w-6 h-6 text-purple-400" />
            </foreignObject>
            <text x="30" y="75" fill="#9ca3af" fontSize="9" textAnchor="middle" fontFamily="monospace" fontWeight="bold">04.STORE</text>
          </g>

          {/* Definitions for Gradients */}
          <defs>
            <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="#36e27b" />
            </linearGradient>
            <linearGradient id="gradient-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#36e27b" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
            <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#36e27b" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Footer Console/Terminal Logs */}
      <div className="rounded-2xl border border-white/5 bg-[#070A14] p-4 font-mono text-[10px] leading-relaxed z-10">
        <div className="flex justify-between items-center text-gray-500 font-bold border-b border-white/5 pb-2 mb-2">
          <span>PIPELINE TELEMETRY</span>
          <span className="text-primary font-black">SECURE ENG STATE</span>
        </div>
        <div className="space-y-1 text-gray-400">
          <p className="text-primary"><span className="text-gray-600">❯</span> kodesec --audit-mode active</p>
          <p><span className="text-gray-600">❯</span> code verified: static/dynamic checks passed [100%]</p>
          <p className="text-cyan-400"><span className="text-gray-600">❯</span> cloud vpc environment: isolation secure</p>
        </div>
      </div>
    </div>
  );
}
