import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, label, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full text-left">
        {label && (
          <span className="text-xs font-mono font-bold text-gray-400">
            {label}
          </span>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 text-gray-500 pointer-events-none">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "h-11 w-full rounded-xl border border-white/10 bg-[#0B0F1A]/50 px-4 text-xs text-white placeholder:text-gray-600 focus:border-primary focus:outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              error && "border-red-500/50 focus:border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && (
          <span className="text-[11px] font-mono text-red-400 mt-0.5">
            {error}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
