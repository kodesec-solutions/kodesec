"use client";

import React from "react";
import { Check, X } from "lucide-react";

export interface ComparisonRow {
  feature: string;
  typical: string;
  kodesec: string;
}

const comparisonData: ComparisonRow[] = [
  {
    feature: "Implementation Approach",
    typical: "Generic implementation and checkbox delivery.",
    kodesec: "Solution-first engineering focused on code quality and robustness.",
  },
  {
    feature: "Security Integration",
    typical: "Security checked after development is complete.",
    kodesec: "Security designed and integrated from day one of architecture planning.",
  },
  {
    feature: "Partnership Model",
    typical: "Multiple disconnected outsourcing vendors.",
    kodesec: "One unified multidisciplinary engineering and security partner.",
  },
  {
    feature: "Operational Focus",
    typical: "Short-term focus on project completion.",
    kodesec: "Long-term dedication to code scalability and platform success.",
  },
  {
    feature: "Visibility & Collaboration",
    typical: "Limited visibility and slow, structured communication.",
    kodesec: "Transparent communication with direct, live developer-to-developer access.",
  },
  {
    feature: "Architecture Quality",
    typical: "Short-term quick patches that pile up technical debt.",
    kodesec: "Scalable architecture designed for maintainability and extension.",
  },
];

export default function ComparisonTable() {
  return (
    <div className="w-full">
      {/* Desktop view: Table layout */}
      <div className="hidden md:block overflow-hidden rounded-3xl border border-white/5 bg-[#0F1424]/40 backdrop-blur-md shadow-2xl">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="p-6 text-sm font-bold text-gray-400 font-mono tracking-wider uppercase">FEATURE</th>
              <th className="p-6 text-sm font-bold text-gray-400 font-mono tracking-wider uppercase w-1/3">TYPICAL VENDOR</th>
              <th className="p-6 text-sm font-bold text-primary font-mono tracking-wider uppercase w-1/3">KODESEC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {comparisonData.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.01] transition-colors duration-200">
                <td className="p-6 text-sm font-semibold text-white">
                  {row.feature}
                </td>
                <td className="p-6 text-xs text-gray-400 leading-relaxed font-medium">
                  <div className="flex items-start gap-2">
                    <X className="size-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{row.typical}</span>
                  </div>
                </td>
                <td className="p-6 text-xs text-gray-200 leading-relaxed font-medium bg-primary/[0.01]">
                  <div className="flex items-start gap-2">
                    <Check className="size-4 text-primary shrink-0 mt-0.5" />
                    <span className="font-semibold text-white">{row.kodesec}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view: Stacked card comparison blocks */}
      <div className="grid gap-6 md:hidden">
        {comparisonData.map((row, idx) => (
          <div 
            key={idx} 
            className="rounded-2xl border border-white/5 bg-[#0F1424]/40 p-5 backdrop-blur-md flex flex-col gap-4 text-left"
          >
            <h4 className="text-sm font-bold text-white border-b border-white/5 pb-2">
              {row.feature}
            </h4>
            <div className="space-y-3">
              {/* Typical Vendor */}
              <div className="flex items-start gap-2.5">
                <X className="size-4.5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-gray-500 font-bold block uppercase tracking-wider">TYPICAL VENDOR</span>
                  <p className="text-xs text-gray-400 mt-0.5 font-medium leading-relaxed">{row.typical}</p>
                </div>
              </div>
              {/* Kodesec */}
              <div className="flex items-start gap-2.5">
                <Check className="size-4.5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-mono text-primary font-bold block uppercase tracking-wider">KODESEC</span>
                  <p className="text-xs text-gray-200 mt-0.5 font-semibold leading-relaxed">{row.kodesec}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
