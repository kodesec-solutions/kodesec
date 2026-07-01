import * as React from "react"
import { Card } from "./card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  icon?: LucideIcon
  iconColorClass?: string
  glowClass?: string
  tags?: string[]
  bullets?: string[]
}

const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ className, title, description, icon: Icon, iconColorClass = "text-primary", glowClass, tags, bullets, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn("group p-6 hover:-translate-y-1.5 duration-300", className)}
        glow={glowClass}
        {...props}
      >
        {/* Top Glowing Ball */}
        <div className="absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-white/20 transition-all group-hover:scale-150 group-hover:bg-primary" />

        {/* Icon */}
        {Icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
            <Icon className={cn("h-6 w-6", iconColorClass)} />
          </div>
        )}

        {/* Title & Desc */}
        <h3 className="text-lg font-black text-white tracking-tight">{title}</h3>
        <p className="mt-2.5 text-xs text-gray-400 leading-relaxed font-medium">{description}</p>

        {/* Bullets if any */}
        {bullets && bullets.length > 0 && (
          <ul className="mt-6 space-y-2 border-t border-white/5 pt-4 text-xs font-medium font-mono text-gray-300">
            {bullets.map((b, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                <span className="truncate">{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tags if any */}
        {tags && tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded border border-white/5 bg-white/[0.01] text-[9px] font-mono font-bold text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card>
    )
  }
)
FeatureCard.displayName = "FeatureCard"

export { FeatureCard }
