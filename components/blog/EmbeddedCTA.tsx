import * as React from "react"
import Link from "next/link"
import { Shield, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface EmbeddedCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  buttonLabel?: string
  href?: string
}

export function EmbeddedCTA({
  className,
  title = "Secure Your Infrastructure Before Attackers Exploit It",
  description = "Get a high-fidelity manual penetration test from our founder-led cyber engineering team.",
  buttonLabel = "Request Scoping Call",
  href = "/contact?type=assessment",
  ...props
}: EmbeddedCTAProps) {
  return (
    <div
      className={cn(
        "my-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#0F1424]/90 via-[#0B0F1A]/95 to-[#131926]/90 p-8 shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-6 justify-between items-center text-left hover:border-primary/20 transition-all",
        className
      )}
      {...props}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(54,226,123,0.08),transparent_50%)] pointer-events-none" />
      
      <div className="flex gap-4 items-start relative z-10">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
          <Shield className="h-6 w-6 animate-pulse" />
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-black text-white tracking-tight leading-snug">{title}</h4>
          <p className="text-xs text-gray-400 leading-relaxed font-medium max-w-md font-sans">{description}</p>
        </div>
      </div>

      <div className="shrink-0 w-full md:w-auto relative z-10">
        <Link
          href={href}
          className="w-full md:w-auto inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-xs font-bold text-[#0B0F1A] transition-all hover:bg-primary-light hover:shadow-[0_0_15px_rgba(54,226,123,0.3)]"
        >
          <span>{buttonLabel}</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
export default EmbeddedCTA
