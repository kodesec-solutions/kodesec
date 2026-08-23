import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string
  title: string
  description?: string
  align?: "left" | "center" | "right"
}

export function SectionHeader({
  className,
  badge,
  title,
  description,
  align = "center",
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-16 flex flex-col space-y-3",
        align === "center" && "mx-auto text-center items-center",
        align === "left" && "text-left items-start",
        align === "right" && "ml-auto text-right items-end",
        className
      )}
      {...props}
    >
      {badge && (
        <span className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase border border-primary/20 bg-primary/10 px-3.5 py-1 rounded-full inline-block">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-heading font-bold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  )
}
