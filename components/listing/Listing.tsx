"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Calendar, Rss, Search } from "lucide-react";
import { DotCover } from "./DotCover";
import { cn } from "@/lib/utils";

/**
 * Aikido-style listing (blog + academy): big heading, FEATURED pill + search + RSS row,
 * a wide featured card, then a two-column grid. Search filters everything client-side.
 */

export type ListingItem = {
  href: string;
  title: string;
  description: string;
  /** e.g. "Sep 21, 2026" — shown with a calendar icon */
  date?: string;
  /** e.g. category, "3 lessons", "Coming soon" */
  meta?: string;
  cover?: string | null;
  coverAlt?: string;
  /** label for the generated dot cover when there's no image */
  coverLabel: string;
  /** extra searchable text */
  keywords?: string;
};

export default function Listing({
  heading,
  featuredLabel = "Featured",
  featured,
  items,
  searchOnly = [],
  filters,
  rss,
  searchPlaceholder = "Search",
  empty = "Nothing matches your search.",
}: {
  heading: string;
  featuredLabel?: string;
  featured?: ListingItem | null;
  items: ListingItem[];
  /** extra items that appear only in search results (e.g. individual lessons) */
  searchOnly?: ListingItem[];
  /** category/track pills shown above the grid */
  filters?: { label: string; href: string; active?: boolean }[];
  rss?: string;
  searchPlaceholder?: string;
  empty?: string;
}) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const all = useMemo(() => [...(featured ? [featured] : []), ...items, ...searchOnly], [featured, items, searchOnly]);
  const results = useMemo(
    () =>
      query
        ? all.filter((i) => [i.title, i.description, i.meta, i.keywords].filter(Boolean).join(" ").toLowerCase().includes(query))
        : items,
    [query, all, items],
  );

  return (
    <div className="container-kd pb-24 pt-32 md:pt-40">
      <h1 className="text-5xl font-semibold tracking-tight text-fg md:text-7xl">{heading}</h1>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
        <span className="rounded-md border border-line-2 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-fg">
          {query ? "Results" : featuredLabel}
        </span>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <label className="relative flex-1 sm:w-80 sm:flex-none">
            <span className="sr-only">{searchPlaceholder}</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={searchPlaceholder}
              className="h-11 w-full rounded-full border border-line-2 bg-card-2 pl-5 pr-11 text-sm text-fg outline-none transition placeholder:text-fg-3 focus:border-brand/60"
            />
            <Search className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-2" />
          </label>
          {rss && (
            <a href={rss} aria-label="RSS feed" className="flex h-11 w-11 shrink-0 items-center justify-center text-fg-2 hover:text-brand">
              <Rss className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>

      {!query && featured && (
        <div className="mt-6">
          <FeaturedCard item={featured} />
        </div>
      )}

      {!query && filters && filters.length > 0 && (
        <nav aria-label="Filter" className="mt-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              aria-current={f.active ? "page" : undefined}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                f.active ? "border-fg bg-fg text-bg" : "border-line-2 text-fg-2 hover:border-fg-3 hover:text-fg",
              )}
            >
              {f.label}
            </Link>
          ))}
        </nav>
      )}

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-5 md:grid-cols-2">
          {results.map((i) => (
            <li key={i.href}>
              <Card item={i} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-fg-2">{query ? empty : ""}</p>
      )}
    </div>
  );
}

function Meta({ item }: { item: ListingItem }) {
  if (!item.date && !item.meta) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-fg-2">
      {item.date && (
        <span className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-fg-3" /> {item.date}
        </span>
      )}
      {item.date && item.meta && <span className="h-1 w-1 rounded-full bg-fg-2" />}
      {item.meta && <span>{item.meta}</span>}
    </p>
  );
}

function Cover({ item, className }: { item: ListingItem; className?: string }) {
  return item.cover ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={item.cover} alt={item.coverAlt ?? ""} loading="lazy" decoding="async" className={cn("h-full w-full object-cover", className)} />
  ) : (
    <DotCover label={item.coverLabel} seed={item.href} className={cn("h-full w-full", className)} />
  );
}

function FeaturedCard({ item }: { item: ListingItem }) {
  return (
    <article className="group relative grid gap-6 rounded-lg border border-line-2 bg-card p-5 transition-colors hover:border-fg-3 md:grid-cols-2 md:p-5">
      <div className="flex flex-col p-1 md:py-2">
        <Meta item={item} />
        <h2 className="mt-4 text-2xl font-semibold leading-snug text-fg md:text-[1.75rem]">
          <Link href={item.href} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h2>
        <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-fg-2">{item.description}</p>
        <span
          aria-hidden="true"
          className="mt-8 flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-fg-3 text-fg-2 transition group-hover:border-brand group-hover:text-brand md:mt-auto"
        >
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      <div className="aspect-[16/9] overflow-hidden rounded-lg bg-card-2 md:aspect-auto md:min-h-[300px]">
        <Cover item={item} className="transition duration-500 group-hover:scale-[1.02]" />
      </div>
    </article>
  );
}

function Card({ item }: { item: ListingItem }) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-line-2 bg-card p-5 transition-colors hover:border-fg-3">
      <div className="aspect-[16/9] overflow-hidden rounded-lg bg-card-2">
        <Cover item={item} className="transition duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="mt-5 flex flex-1 flex-col">
        <Meta item={item} />
        <h3 className="mt-3 text-lg font-semibold leading-snug text-fg md:text-xl">
          <Link href={item.href} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-2">{item.description}</p>
      </div>
    </article>
  );
}
