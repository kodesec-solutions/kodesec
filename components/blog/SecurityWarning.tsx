import * as React from "react"
import { ShieldAlert } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SecurityWarningProps extends React.HTMLAttributes<HTMLDivElement> {
  cve?: string
  severity?: "medium" | "high" | "critical"
  threatActor?: string
}

export function SecurityWarning({ children, className, cve, severity = "critical", threatActor, ...props }: SecurityWarningProps) {
  const borderStyles = {
    medium: "border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-500/50 shadow-[0_0_15px_rgba(245,158,11,0.03)]",
    high: "border-red-500/30 bg-red-500/5 hover:border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.05)]",
    critical: "border-red-600/40 bg-red-950/15 hover:border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.08)]"
  }

  const badgeStyles = {
    medium: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
    high: "border-red-500/20 bg-red-500/10 text-red-400",
    critical: "border-red-500/30 bg-red-500/20 text-red-400 font-extrabold animate-pulse"
  }

  return (
    <div
      className={cn(
        "my-8 rounded-2xl border p-6 text-left transition-all duration-300 relative overflow-hidden",
        borderStyles[severity],
        className
      )}
      {...props}
    >
      {/* Mesh lines for threat visualization */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(239,68,68,0.03),transparent_100%)] pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 flex-wrap gap-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h4 className="text-sm font-black text-white font-mono uppercase tracking-wider">SECURITY THREAT ADVISORY</h4>
            {threatActor && <p className="text-[10px] text-gray-500 font-mono">Actor: {threatActor}</p>}
          </div>
        </div>

        <div className="flex gap-2 font-mono text-[10px]">
          {cve && (
            <span className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-gray-300">
              {cve}
            </span>
          )}
          <span className={cn("px-2 py-0.5 rounded border uppercase tracking-wider", badgeStyles[severity])}>
            {severity}
          </span>
        </div>
      </div>

      <div className="font-mono text-xs leading-relaxed text-red-200/90 whitespace-pre-wrap relative z-10">
        {children}
      </div>
    </div>
  )
}
export default SecurityWarning
