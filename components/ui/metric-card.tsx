import * as React from "react"
import { Card } from "./card"
import { cn } from "@/lib/utils"

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  label: string
  description?: string
  glowClass?: string
}

const MetricCard = React.forwardRef<HTMLDivElement, MetricCardProps>(
  ({ className, value, label, description, glowClass, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "relative p-6 md:p-8 flex flex-col justify-between group bg-[#0D121F]/80 border-white/10 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(54,226,123,0.12)]",
          className
        )}
        glow={glowClass}
        {...props}
      >
        <div>
          <span className="text-4xl sm:text-5xl font-heading font-bold text-white group-hover:text-primary transition-colors tracking-tight block">
            {value}
          </span>
          <h4 className="mt-2 text-xs font-mono font-bold text-primary uppercase tracking-widest">
            {label}
          </h4>
        </div>
        {description && (
          <p className="mt-3 text-xs text-gray-400 font-sans leading-relaxed">
            {description}
          </p>
        )}
      </Card>
    )
  }
)
MetricCard.displayName = "MetricCard"

export { MetricCard }
