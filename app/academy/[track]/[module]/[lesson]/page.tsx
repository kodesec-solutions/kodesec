import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, ListTree, Target } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Prose } from "@/components/content/Prose";
import { Toc } from "@/components/content/Toc";
import { LevelChip, RoleChips } from "@/components/academy/Badges";
import { AcademySidebar } from "@/components/academy/AcademySidebar";
import { MarkComplete, TrackProgress } from "@/components/academy/ProgressWidgets";
import JsonLd from "@/components/JsonLd";
import { getAcademy, getLesson, getAllLessons } from "@/lib/content/loaders";
import { renderMarkdown } from "@/lib/content/markdown";
import { formatDate } from "@/lib/format";
import { breadcrumbLd, buildMetadata, lessonLd } from "@/lib/seo";

type Props = { params: Promise<{ track: string; module: string; lesson: string }> };

export function generateStaticParams() {
  return getAcademy().flatMap((t) =>
    t.modules.flatMap((m) => m.lessons.map((l) => ({ track: t.slug, module: m.slug, lesson: l.slug }))),
  );
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { track, module, lesson } = await params;
  const f = getLesson(track, module, lesson);
  if (!f) return {};
  const desc = f.lesson.objectives.length
    ? `Learn to ${f.lesson.objectives[0].charAt(0).toLowerCase()}${f.lesson.objectives[0].slice(1)}. A free ${f.lesson.level} lesson from the Kodesec Academy ${f.track.title} track.`
    : `A free ${f.lesson.level} lesson from the Kodesec Academy ${f.track.title} track.`;
  return buildMetadata({ title: f.lesson.title, description: desc.slice(0, 165), path: f.lesson.href, type: "article" });
}

export default async function LessonPage({ params }: Props) {
  const { track: t, module: m, lesson: l } = await params;
  const f = getLesson(t, m, l);
  if (!f) notFound();
  const { track, module: mod, lesson, prev, next } = f;
  const source = lesson.video ? `${lesson.video}\n\n${lesson.body}` : lesson.body;
  const { html, toc } = await renderMarkdown(source);
  const hrefs = track.modules.flatMap((x) => x.lessons.map((y) => y.href));
  const prereqs = lesson.prerequisites
    .map((slug) => getAllLessons().find((x) => x.slug === slug))
    .filter((x) => !!x);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Academy", path: "/academy" },
            { name: track.title, path: track.href },
            { name: mod.title, path: mod.href },
            { name: lesson.title, path: lesson.href },
          ]),
          lessonLd(lesson, track),
        ]}
      />

      {/* Academy sub-bar */}
      <div className="border-b border-line bg-bg-2/60 pt-[5.25rem] md:pt-24">
        <div className="container-kd flex h-12 items-center gap-6 overflow-x-auto font-mono text-[0.72rem] uppercase tracking-[0.12em] text-fg-3">
          <Link href="/academy" className="shrink-0 hover:text-fg">
            Academy
          </Link>
          <Link href={track.href} className="shrink-0 text-fg-2 hover:text-fg">
            {track.title}
          </Link>
          <span className="shrink-0 text-brand">{mod.title}</span>
        </div>
      </div>

      <div className="container-kd grid gap-10 py-10 lg:grid-cols-12 lg:py-12">
        {/* Left: topic tree */}
        <aside className="lg:col-span-3">
          <details className="card group p-4 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-medium text-fg [&::-webkit-details-marker]:hidden">
              <ListTree className="h-4 w-4 text-brand" /> Lessons in {track.title}
            </summary>
            <div className="mt-4">
              <AcademySidebar track={track} currentHref={lesson.href} />
            </div>
          </details>
          <div className="sticky top-28 hidden max-h-[calc(100dvh-8rem)] overflow-y-auto pb-6 pr-2 lg:block">
            <AcademySidebar track={track} currentHref={lesson.href} />
          </div>
        </aside>

        {/* Center: lesson */}
        <article className="min-w-0 lg:col-span-6">
          <Breadcrumbs
            items={[
              { name: "Academy", path: "/academy" },
              { name: track.title, path: track.href },
              { name: mod.title, path: mod.href },
            ]}
          />
          <h1 className="mt-6 text-3xl font-semibold leading-tight text-fg md:text-[2.6rem]">{lesson.title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <LevelChip level={lesson.level} />
            <span className="chip">
              <Clock className="h-3 w-3" /> {lesson.duration}
            </span>
            <RoleChips roles={lesson.roles} />
          </div>

          {(lesson.objectives.length > 0 || prereqs.length > 0) && (
            <div className="card mt-8 grid gap-6 p-6 sm:grid-cols-2">
              {lesson.objectives.length > 0 && (
                <div className={prereqs.length ? "" : "sm:col-span-2"}>
                  <p className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-fg-3">
                    <Target className="h-3.5 w-3.5 text-brand" /> You will learn to
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-fg-2">
                    {lesson.objectives.map((o) => (
                      <li key={o} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-brand" /> {o}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {prereqs.length > 0 && (
                <div>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-fg-3">Before this lesson</p>
                  <ul className="mt-3 space-y-2 text-sm">
                    {prereqs.map((p) => (
                      <li key={p.href}>
                        <Link href={p.href} className="text-brand hover:underline">
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <Prose html={html} className="mt-10" />

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.1em] text-fg-3">Last updated {formatDate(lesson.updated)}</p>

          <div className="mt-8">
            <MarkComplete href={lesson.href} nextHref={next?.href} />
          </div>

          <nav aria-label="Lesson navigation" className="mt-6 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link href={prev.href} className="card card-hover p-5">
                <span className="flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-3">
                  <ArrowLeft className="h-3 w-3" /> Previous
                </span>
                <span className="mt-2 block text-sm font-medium text-fg">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={next.href} className="card card-hover p-5 text-right">
                <span className="flex items-center justify-end gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-3">
                  Next <ArrowRight className="h-3 w-3" />
                </span>
                <span className="mt-2 block text-sm font-medium text-fg">{next.title}</span>
              </Link>
            )}
          </nav>
        </article>

        {/* Right: progress, TOC, CTA */}
        <aside className="lg:col-span-3">
          <div className="space-y-6 lg:sticky lg:top-28">
            <TrackProgress title={track.title} hrefs={hrefs} />
            <Toc items={toc} className="hidden lg:block" />
            <div className="card p-6">
              <p className="font-semibold text-fg">Put it into practice</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">
                Want us to look for this in your product? Our team tests for it in real engagements.
              </p>
              <Link href="/book?service=cybersecurity" className="btn btn-brand btn-sm mt-5">
                Book a call <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
