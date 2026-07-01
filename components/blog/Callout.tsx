import * as React from "react"
import { AlertTriangle, Info, Lightbulb, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "tip" | "warning" | "success"
  title?: string
}

export function Callout({ children, className, type = "info", title, ...props }: CalloutProps) {
  const icons = {
    info: <Info className="h-5 w-5 text-cyan-400 shrink-0" />,
    tip: <Lightbulb className="h-5 w-5 text-primary shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />,
    success: <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
  }

  const styles = {
    info: "border-cyan-500/20 bg-cyan-500/5 text-cyan-100",
    tip: "border-primary/20 bg-primary/5 text-emerald-100",
    warning: "border-yellow-500/20 bg-yellow-500/5 text-yellow-100",
    success: "border-emerald-500/20 bg-emerald-500/5 text-emerald-100"
  }

  return (
    <div
      className={cn(
        "my-6 flex gap-4 rounded-2xl border p-5 text-sm leading-relaxed backdrop-blur-sm",
        styles[type],
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{icons[type]}</div>
      <div className="flex-1 space-y-1">
        {title && <h5 className="font-bold text-white font-mono uppercase tracking-wider text-xs">{title}</h5>}
        <div className="text-gray-300 font-medium font-sans">{children}</div>
      </div>
    </div>
  )
}
export default Callout
