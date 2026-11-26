import { Bug, LayoutTemplate, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import type { Site } from "@/lib/content/schemas";

type Item = Site["testimonials"][number];

/** An icon that says what kind of work the review is about. */
function ProjectIcon({ project }: { project: string }) {
  const p = project.toLowerCase();
  const cls = "h-4 w-4";
  if (/compliance|audit|report/.test(p)) return <ShieldCheck className={cls} />;
  if (/pen ?test|penetration|qa|quality/.test(p)) return <Bug className={cls} />;
  if (/website|redesign|design|web app|platform/.test(p)) return <LayoutTemplate className={cls} />;
  return <Sparkles className={cls} />;
}

/** One client review: what we did (animated tag), the quote, then who said it. */
function Review({ t, index }: { t: Item; index: number }) {
  return (
    <figure className="kd-review group flex h-full flex-col" style={{ "--kd-i": index } as React.CSSProperties}>
      <div className="kd-proj">
        <span className="kd-proj-icon" aria-hidden="true">
          <ProjectIcon project={t.project} />
        </span>
        <span className="kd-proj-text" title={t.project}>
          {t.project}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7 pt-6 lg:p-8 lg:pt-7">
        <blockquote className="flex-1">
          <p className="text-body-sm leading-relaxed text-fg-2 sm:text-base">&ldquo;{t.quote}&rdquo;</p>
        </blockquote>

        <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={t.photo}
            alt={`${t.name}, ${t.role} at ${t.company}`}
            width={144}
            height={144}
            loading="lazy"
            style={{ objectPosition: t.focus ?? "50% 40%" }}
            className="h-16 w-16 shrink-0 rounded-full border-2 border-brand/50 object-cover shadow-glow lg:h-[4.5rem] lg:w-[4.5rem]"
          />
          <div className="min-w-0">
            <p className="truncate text-body-sm font-semibold text-fg sm:text-base">{t.name}</p>
            <p className="truncate text-caption text-fg-2">
              {t.role}, {t.company}
            </p>
            {t.location && (
              <p className="mt-1 flex items-center gap-1 text-eyebrow text-fg-3">
                <MapPin aria-hidden="true" className="h-3 w-3 text-brand" /> {t.location}
              </p>
            )}
          </div>
          {t.companyLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={t.companyLogo} alt="" aria-hidden="true" className="ml-auto h-10 w-10 shrink-0 rounded-lg bg-white object-contain p-1" />
          )}
        </figcaption>
      </div>
    </figure>
  );
}

/** Client reviews in one bordered panel: 3 across on desktop, 2 on tablets, stacked on phones. */
export default function Testimonials({ items }: { items: Item[] }) {
  if (items.length === 0) return null;
  return (
    <div data-reveal className="mt-14 overflow-hidden rounded-2xl border border-line bg-bg-2/60">
      <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3 [&>*]:bg-bg-2">
        {items.map((t, i) => (
          <Review key={t.name} t={t} index={i} />
        ))}
      </div>
    </div>
  );
}
