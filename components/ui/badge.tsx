import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-mono font-bold tracking-wider uppercase border select-none transition-all",
  {
    variants: {
      variant: {
        default: "border-primary/20 bg-primary/5 text-primary",
        cyan: "border-cyan-500/20 bg-cyan-500/5 text-cyan-400",
        purple: "border-purple-500/20 bg-purple-500/5 text-purple-400",
        secondary: "border-white/10 bg-white/[0.02] text-white hover:bg-white/[0.05]",
        outline: "border-white/15 bg-transparent text-gray-400 hover:text-white",
        destructive: "border-red-500/20 bg-red-500/5 text-red-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
