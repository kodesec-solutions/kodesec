"use client";

import React, { useState } from "react";
import { List, ChevronDown, ChevronRight } from "lucide-react";

interface TocItem {
  level: number;
  label: string;
  id: string;
}

interface TableOfContentsDropdownProps {
  items: TocItem[];
}

export default function TableOfContentsDropdown({ items }: TableOfContentsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items || items.length === 0) return null;

  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-[#0D121F]/90 backdrop-blur-xl overflow-hidden shadow-xl transition-all">
      {/* Accordion Header / Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 px-5 text-left bg-white/[0.02] hover:bg-white/[0.05] transition-colors group cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
            <List size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-primary">
                Table of Contents
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-400">
                {items.length} sections
              </span>
            </div>
            <p className="text-xs text-gray-400 font-sans mt-0.5">
              Click to {isOpen ? "hide" : "view"} article outline
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono font-semibold text-gray-400 group-hover:text-white transition-colors hidden sm:inline">
            {isOpen ? "Hide" : "Show outline"}
          </span>
          <div className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-300 group-hover:text-primary transition-colors">
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
            />
          </div>
        </div>
      </button>

      {/* Expandable Links List */}
      {isOpen && (
        <div className="p-4 px-5 border-t border-white/10 bg-[#070B12]/80 space-y-1 text-xs font-sans animate-in fade-in slide-in-from-top-2 duration-200">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg transition-all hover:bg-white/5 hover:text-primary group ${
                item.level === 3 ? "ml-4 text-gray-400" : "text-gray-200 font-medium"
              }`}
            >
              <ChevronRight
                size={12}
                className="text-primary/60 group-hover:text-primary transition-colors shrink-0"
              />
              <span className="truncate">{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
