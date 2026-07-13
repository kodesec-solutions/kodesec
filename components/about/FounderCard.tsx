"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Shield, Cloud, Terminal, Cpu } from "lucide-react";
import { TeamMember } from "@/config/site";

function LinkedinIcon({ size = 15, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface FounderCardProps {
  founder: TeamMember;
  index: number;
}

// Map founder roles/names to specific glowing styles and icons
const themeStyles = [
  {
    glow: "hover:shadow-[0_0_40px_rgba(54,226,123,0.15)] hover:border-primary/40",
    accentText: "text-primary",
    accentBg: "bg-primary/10 border-primary/20",
    accentBorder: "border-primary/20",
    icon: Shield,
    colorName: "Green (Security)",
    gradient: "from-primary/20 via-transparent to-transparent"
  },
  {
    glow: "hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:border-cyan-500/40",
    accentText: "text-cyan-400",
    accentBg: "bg-cyan-500/10 border-cyan-500/20",
    accentBorder: "border-cyan-500/20",
    icon: Cloud,
    colorName: "Cyan (Cloud & DevOps)",
    gradient: "from-cyan-500/20 via-transparent to-transparent"
  },
  {
    glow: "hover:shadow-[0_0_40px_rgba(239,68,68,0.15)] hover:border-red-500/40",
    accentText: "text-red-400",
    accentBg: "bg-red-500/10 border-red-500/20",
    accentBorder: "border-red-500/20",
    icon: Terminal,
    colorName: "Red (Network & Pentesting)",
    gradient: "from-red-500/20 via-transparent to-transparent"
  },
  {
    glow: "hover:shadow-[0_0_40px_rgba(192,132,252,0.15)] hover:border-purple-500/40",
    accentText: "text-purple-400",
    accentBg: "bg-purple-500/10 border-purple-500/20",
    accentBorder: "border-purple-500/20",
    icon: Cpu,
    colorName: "Purple (Backend & Systems)",
    gradient: "from-purple-500/20 via-transparent to-transparent"
  }
];

export default function FounderCard({ founder, index }: FounderCardProps) {
  const style = themeStyles[index % themeStyles.length];
  const DisciplineIcon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative rounded-[2.5rem] border border-white/5 bg-[#0F1424]/40 p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between text-left ${style.glow}`}
    >
      {/* Dynamic Glow Flare */}
      <div className={`absolute -inset-px rounded-[2.5rem] bg-gradient-to-tr ${style.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10`} />

      <div>
        {/* Photo Container */}
        <div className="relative mb-6 h-56 w-full overflow-hidden rounded-[1.75rem] border border-white/5 bg-black/20 transition-all duration-500 group-hover:border-white/10">
          {founder.image ? (
            <Image
              src={founder.image}
              alt={founder.name}
              fill
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : null}
          

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Core Specialty Icon Badge */}
          <div className={`absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-xl border backdrop-blur-md ${style.accentBg}`}>
            <DisciplineIcon className={`h-5.5 w-5.5 ${style.accentText}`} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <h3 className="text-xl font-black text-white tracking-tight leading-none group-hover:text-white transition-colors">
            {founder.name}
          </h3>
        </div>

        <p className={`text-xs font-mono font-bold uppercase tracking-wider mt-2.5 ${style.accentText}`}>
          {founder.role}
        </p>

        {/* Short Biography */}
        <p className="mt-4 text-xs text-gray-400 leading-relaxed font-medium min-h-[72px] line-clamp-4">
          {founder.bio}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {founder.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg border border-white/5 bg-white/[0.02] text-[9px] font-mono font-bold text-gray-400 group-hover:border-white/10 group-hover:text-gray-300 transition-all"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Social / Email Links */}
      <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-3">
        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-gray-500 hover:text-white hover:border-white/15 transition-all"
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon size={15} />
        </a>
        <a
          href={`mailto:${founder.email}`}
          className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-gray-500 hover:text-white hover:border-white/15 transition-all"
          aria-label="Send Email"
        >
          <Mail size={15} />
        </a>
      </div>
    </motion.div>
  );
}
