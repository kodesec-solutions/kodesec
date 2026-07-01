import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  grid?: boolean
  ambientGlows?: Array<{
    colorClass: string
    positionClass: string
    blurClass?: string
    sizeClass?: string
  }>
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, grid = false, ambientGlows, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("relative overflow-hidden z-10", className)}
        {...props}
      >
        {/* Decorative Grid Overlay */}
        {grid && (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />
        )}

        {/* Radial Ambient Lights */}
        {ambientGlows?.map((glow, idx) => (
          <div
            key={idx}
            className={cn(
              "absolute rounded-full pointer-events-none -z-10",
              glow.colorClass,
              glow.positionClass,
              glow.sizeClass || "w-[50%] h-[50%]",
              glow.blurClass || "blur-[120px]"
            )}
          />
        ))}

        {children}
      </section>
    )
  }
)
Section.displayName = "Section"

export { Section }
