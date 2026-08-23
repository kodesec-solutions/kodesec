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

const icons = [Shield, Cloud, Terminal, Cpu];

export default function FounderCard({ founder, index }: FounderCardProps) {
  const DisciplineIcon = icons[index % icons.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative rounded-[2rem] border border-white/10 bg-[#0D121F]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(54,226,123,0.12)] hover:-translate-y-2 flex flex-col justify-between text-left"
    >
      <div>
        {/* Photo Container */}
        <div className="relative mb-6 h-56 w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/40 transition-all duration-500 group-hover:border-primary/30">
          {founder.image ? (
            <Image
              src={founder.image}
              alt={founder.name}
              fill
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : null}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

          {/* Core Specialty Icon Badge */}
          <div className="absolute top-4 right-4 h-10 w-10 flex items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary backdrop-blur-md">
            <DisciplineIcon className="h-5 w-5" />
          </div>
        </div>

        <h3 className="text-xl font-heading font-bold text-white tracking-tight group-hover:text-primary transition-colors">
          {founder.name}
        </h3>

        <p className="text-xs font-mono font-bold uppercase tracking-widest mt-2 text-primary">
          {founder.role}
        </p>

        {/* Short Biography */}
        <p className="mt-4 text-xs text-gray-400 font-sans leading-relaxed min-h-[72px] line-clamp-4">
          {founder.bio}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {founder.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono font-medium text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Social / Email Links */}
      <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-3">
        <a
          href={founder.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-primary hover:border-primary/30 transition-all"
          aria-label="LinkedIn Profile"
        >
          <LinkedinIcon size={15} />
        </a>
        <a
          href={`mailto:${founder.email}`}
          className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-primary hover:border-primary/30 transition-all"
          aria-label="Send Email"
        >
          <Mail size={15} />
        </a>
      </div>
    </motion.div>
  );
}
