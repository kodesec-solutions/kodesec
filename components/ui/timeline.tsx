import * as React from "react"
import { cn } from "@/lib/utils"

export interface TimelineStep {
  label: string // e.g. "01"
  title: string
  desc: string
  detail?: string
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: TimelineStep[]
  activeStep?: number
  onStepClick?: (index: number) => void
  interactive?: boolean
  direction?: "horizontal" | "vertical"
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, steps, activeStep = 0, onStepClick, interactive = false, direction = "horizontal", ...props }, ref) => {
    if (direction === "horizontal") {
      return (
        <div ref={ref} className={cn("relative w-full", className)} {...props}>
          {/* Desktop timeline line */}
          <div className="absolute top-[45px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-primary via-cyan-400 to-purple-400 opacity-25 hidden lg:block" />
          
          <div className="grid gap-8 lg:grid-cols-5 relative">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep
              const isPast = idx < activeStep
              return (
                <div
                  key={idx}
                  onClick={() => interactive && onStepClick?.(idx)}
                  className={cn(
                    "flex flex-col items-center lg:items-start text-center lg:text-left group",
                    interactive ? "cursor-pointer" : ""
                  )}
                >
                  {/* Step Bubble */}
                  <div
                    className={cn(
                      "flex h-20 w-20 items-center justify-center rounded-3xl border text-xl font-black font-mono transition-all duration-300 mb-6",
                      isActive
                        ? "border-primary bg-primary/10 text-primary shadow-[0_0_25px_rgba(54,226,123,0.25)] scale-105"
                        : isPast
                        ? "border-primary/50 bg-primary/5 text-primary-dark"
                        : "border-white/5 bg-[#0F1424]/40 text-gray-500 hover:border-white/20 hover:text-white"
                    )}
                  >
                    {step.label}
                  </div>

                  <h3
                    className={cn(
                      "text-base font-black tracking-tight transition-colors",
                      isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                    )}
                  >
                    {step.title}
                  </h3>
                  
                  <p className="mt-2.5 text-xs text-gray-400 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    // Vertical Timeline layout
    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        {steps.map((step, idx) => {
          const isActive = idx === activeStep
          return (
            <div
              key={idx}
              onClick={() => interactive && onStepClick?.(idx)}
              className={cn(
                "flex gap-4 p-4 rounded-2xl border text-left transition-all duration-200",
                interactive ? "cursor-pointer" : "",
                isActive
                  ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(54,226,123,0.08)]"
                  : "border-white/5 bg-white/[0.01] hover:border-white/10"
              )}
            >
              <span
                className={cn(
                  "text-xs font-bold font-mono mt-0.5",
                  isActive ? "text-primary font-black" : "text-gray-500"
                )}
              >
                {step.label}
              </span>
              <div>
                <h4
                  className={cn(
                    "text-sm font-bold",
                    isActive ? "text-white" : "text-gray-400"
                  )}
                >
                  {step.title}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {step.desc}
                </p>
                {step.detail && isActive && (
                  <p className="mt-2.5 text-xs text-gray-400 leading-relaxed animate-fade-in">
                    {step.detail}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
Timeline.displayName = "Timeline"

export { Timeline }
