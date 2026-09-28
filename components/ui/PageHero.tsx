import { AuroraBars } from "@/components/effects/AuroraBars";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

/** Inner-page hero: soft aurora, breadcrumbs, H1 and lead. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumbs?: { name: string; path?: string }[];
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative isolate overflow-hidden pb-16 pt-32 md:pb-20 md:pt-40", className)}>
      <AuroraBars intensity="soft" />
      <div className="container-kd relative">
        {crumbs && <Breadcrumbs items={[{ name: "Home", path: "/" }, ...crumbs]} />}
        {eyebrow && <p className={cn("eyebrow", crumbs && "mt-8")}>{eyebrow}</p>}
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
          <span className="text-gradient">{title}</span>
        </h1>
        {lead && <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-2 md:text-lg">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
