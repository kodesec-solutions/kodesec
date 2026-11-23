import { MapPin, Star } from "lucide-react";
import type { Site } from "@/lib/content/schemas";

type Item = Site["testimonials"][number];

/** One client review: project, stars, quote, then who said it. Static and quiet by design. */
function Review({ t }: { t: Item }) {
  return (
    <figure className="flex h-full flex-col p-7 lg:p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-eyebrow uppercase tracking-[0.12em] text-fg-3">{t.project}</span>
        <span className="flex shrink-0 items-center gap-0.5" role="img" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, n) => (
            <Star key={n} aria-hidden="true" className={n < t.rating ? "h-3.5 w-3.5 fill-warn text-warn" : "h-3.5 w-3.5 text-line-2"} />
          ))}
        </span>
      </div>

      <blockquote className="mt-6 flex-1">
        <p className="text-body-sm leading-relaxed text-fg-2 sm:text-base">&ldquo;{t.quote}&rdquo;</p>
      </blockquote>

      <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={t.photo}
          alt={`${t.name}, ${t.role} at ${t.company}`}
          width={96}
          height={96}
          loading="lazy"
          style={{ objectPosition: t.focus ?? "50% 40%" }}
          className="h-12 w-12 shrink-0 rounded-full border border-line-2 object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-body-sm font-semibold text-fg">{t.name}</p>
          <p className="truncate text-eyebrow text-fg-2">
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
          <img src={t.companyLogo} alt="" aria-hidden="true" className="ml-auto h-9 w-9 shrink-0 rounded-lg bg-white object-contain p-1" />
        )}
      </figcaption>
    </figure>
  );
}

/** Client reviews in one bordered panel: 3 across on desktop, 2 on tablets, stacked on phones. */
export default function Testimonials({ items }: { items: Item[] }) {
  if (items.length === 0) return null;
  return (
    <div data-reveal className="mt-14 overflow-hidden rounded-2xl border border-line bg-bg-2/60">
      <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3 [&>*]:bg-bg-2">
        {items.map((t) => (
          <Review key={t.name} t={t} />
        ))}
      </div>
    </div>
  );
}
