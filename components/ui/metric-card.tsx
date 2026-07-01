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
          "relative p-6 flex flex-col justify-between group hover:border-primary/20 hover:shadow-[0_0_20px_rgba(54,226,123,0.05)]",
          className
        )}
        glow={glowClass}
        {...props}
      >
        {/* Accent glow corner */}
        <div className="absolute top-0 right-0 h-8 w-8 rounded-tr-3xl border-t border-r border-transparent group-hover:border-primary/20 transition-all duration-300 pointer-events-none" />

        <div>
          <span className="text-4xl sm:text-5xl font-black text-white tracking-tight bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent group-hover:to-primary transition-all duration-300 font-mono">
            {value}
          </span>
          <h4 className="mt-2 text-xs font-mono font-bold text-primary uppercase tracking-wider">
            {label}
          </h4>
        </div>
        {description && (
          <p className="mt-4 text-xs text-gray-400 leading-relaxed font-medium">
            {description}
          </p>
        )}
      </Card>
    )
  }
)
MetricCard.displayName = "MetricCard"

export { MetricCard }
