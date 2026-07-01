import * as React from "react"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "./container"

export interface CTAAction {
  label: string
  href: string
  variant?: "primary" | "secondary"
  icon?: LucideIcon
  external?: boolean
}

export interface CTASectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string
  description?: string
  actions?: CTAAction[]
  badge?: string
  icon?: LucideIcon
}

const CTASection = React.forwardRef<HTMLElement, CTASectionProps>(
  ({ className, title, description, actions, badge, icon: Icon, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("py-24 px-6 lg:px-20 relative z-10 border-t border-white/5", className)}
        {...props}
      >
        <Container className="max-w-4xl">
          <div className="relative rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#101525] to-[#0A0D18] p-8 md:p-16 overflow-hidden shadow-2xl flex flex-col items-center text-center">
            {/* Ambient glows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,226,123,0.08),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none -z-10" />

            {/* Badge or Icon */}
            {Icon && (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                <Icon className="h-6 w-6 text-primary animate-pulse" />
              </div>
            )}

            {badge && (
              <span className="inline-flex rounded-full border border-primary/20 bg-primary/5 px-4 py-1 text-xs font-mono font-bold tracking-wider text-primary mb-6 uppercase">
                {badge}
              </span>
            )}

            <h2 className="text-3xl font-black text-white sm:text-4xl leading-tight tracking-tight max-w-xl">
              {title}
            </h2>

            {description && (
              <p className="mt-4 text-sm text-gray-400 max-w-md leading-relaxed font-medium">
                {description}
              </p>
            )}

            {actions && actions.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-4 w-full sm:w-auto">
                {actions.map((act, idx) => {
                  const ActIcon = act.icon
                  const isPrimary = act.variant === "primary" || !act.variant

                  const linkClass = cn(
                    "w-full sm:w-auto inline-flex h-12 items-center justify-center gap-2 rounded-full text-sm font-bold transition-all cursor-pointer",
                    isPrimary
                      ? "bg-primary px-8 text-[#0B0F1A] hover:bg-primary-light hover:shadow-[0_0_20px_rgba(54,226,123,0.4)]"
                      : "border border-white/10 bg-white/[0.02] px-8 text-white hover:bg-white/[0.06] hover:border-white/20"
                  )

                  if (act.external) {
                    return (
                      <a
                        key={idx}
                        href={act.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {ActIcon && <ActIcon size={16} />}
                        {act.label}
                      </a>
                    )
                  }

                  return (
                    <Link key={idx} href={act.href} className={linkClass}>
                      {ActIcon && <ActIcon size={16} />}
                      {act.label}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </Container>
      </section>
    )
  }
)
CTASection.displayName = "CTASection"

export { CTASection }
