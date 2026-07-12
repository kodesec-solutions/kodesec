import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "./badge"

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
        "max-w-3xl mb-16 flex flex-col",
        align === "center" && "mx-auto text-center items-center",
        align === "left" && "text-left items-start",
        align === "right" && "ml-auto text-right items-end",
        className
      )}
      {...props}
    >
      {badge && (
        <Badge variant="default" className="mb-4 animate-pulse">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm md:text-base text-gray-400 leading-relaxed max-w-2xl font-medium">
          {description}
        </p>
      )}
    </div>
  )
}
