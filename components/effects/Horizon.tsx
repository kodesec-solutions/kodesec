import { cn } from "@/lib/utils";

/** A planet edge lit from behind — used behind closing CTAs. The hero light is <AuroraBars />. */
export function Horizon({ className }: { className?: string }) {
  return <div className={cn("horizon", className)} aria-hidden="true" />;
}
