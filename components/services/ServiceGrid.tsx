import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import type { Service } from "@/lib/content/loaders";
import { ACCENT } from "./accent";
import { cn } from "@/lib/utils";

type Sub = Service["subservices"][number];

/**
 * Aikido-style platform grid: one tinted column per service category, each listing its sub-services
 * as cards (icon, name, badge, "Learn more →"). `only` renders a single category as a 3-column grid;
 * `exclude` hides one sub-service (used for "related" lists).
 */
export function ServiceGrid({ services, only, exclude }: { services: Service[]; only?: string; exclude?: string }) {
  if (only) {
    const s = services.find((x) => x.slug === only);
    if (!s) return null;
    const a = ACCENT[s.accent];
    return (
      <div className={cn("rounded-2xl border p-3 md:p-4", a.border, a.tint)}>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {s.subservices
            .filter((sub) => sub.slug !== exclude)
            .map((sub) => (
              <li key={sub.slug}>
                <SubCard serviceSlug={s.slug} sub={sub} accent={s.accent} long />
              </li>
            ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {services.map((s) => {
        const a = ACCENT[s.accent];
        return (
          <section key={s.slug} aria-labelledby={`col-${s.slug}`} className={cn("flex flex-col rounded-2xl border p-2.5", a.border, a.tint)}>
            <Link
              id={`col-${s.slug}`}
              href={`/services/${s.slug}`}
              className={cn("group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold", a.head)}
            >
              <span className="flex items-center gap-2">
                <Icon name={s.icon} className="h-4 w-4" /> {s.title}
              </span>
              <ArrowRight className="h-4 w-4 opacity-60 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
            <ul className="mt-2.5 flex flex-1 flex-col gap-2">
              {s.subservices.map((sub) => (
                <li key={sub.slug}>
                  <SubCard serviceSlug={s.slug} sub={sub} accent={s.accent} />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function SubCard({ serviceSlug, sub, accent, long }: { serviceSlug: string; sub: Sub; accent: Service["accent"]; long?: boolean }) {
  const a = ACCENT[accent];
  return (
    <Link
      href={`/services/${serviceSlug}/${sub.slug}`}
      className="group flex h-full flex-col rounded-xl border border-line bg-card p-4 transition hover:-translate-y-0.5 hover:border-line-2"
    >
      <div className="flex items-start justify-between gap-2">
        <Icon name={sub.icon} className={cn("h-5 w-5 shrink-0", a.text)} />
        {sub.badge && (
          <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide", a.head)}>{sub.badge}</span>
        )}
      </div>
      <h3 className="mt-3 text-[0.95rem] font-semibold leading-snug text-fg">{sub.title}</h3>
      {long && <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-fg-2">{sub.summary}</p>}
      <span className="mt-auto flex items-center justify-between pt-3 text-xs text-fg-3 transition-colors group-hover:text-fg">
        Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
