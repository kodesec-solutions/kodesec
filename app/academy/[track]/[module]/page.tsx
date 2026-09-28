import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { LevelChip } from "@/components/academy/Badges";
import { AcademySidebar } from "@/components/academy/AcademySidebar";
import { LessonStatus, TrackProgress } from "@/components/academy/ProgressWidgets";
import JsonLd from "@/components/JsonLd";
import { getAcademy, getTrack } from "@/lib/content/loaders";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ track: string; module: string }> };

export function generateStaticParams() {
  return getAcademy().flatMap((t) => t.modules.map((m) => ({ track: t.slug, module: m.slug })));
}
export const dynamicParams = false;

function find(trackSlug: string, moduleSlug: string) {
  const track = getTrack(trackSlug);
  const mod = track?.modules.find((m) => m.slug === moduleSlug);
  return track && mod ? { track, mod } : null;
}

export async function generateMetadata({ params }: Props) {
  const { track, module } = await params;
  const f = find(track, module);
  if (!f) return {};
  return buildMetadata({ title: `${f.mod.title} — ${f.track.title}`, description: f.mod.summary, path: f.mod.href });
}

export default async function ModulePage({ params }: Props) {
  const { track: t, module: m } = await params;
  const f = find(t, m);
  if (!f) notFound();
  const { track, mod } = f;
  const hrefs = mod.lessons.map((l) => l.href);

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Academy", path: "/academy" },
          { name: track.title, path: track.href },
          { name: mod.title, path: mod.href },
        ])}
      />
      <PageHero
        crumbs={[{ name: "Academy", path: "/academy" }, { name: track.title, path: track.href }, { name: mod.title }]}
        eyebrow={`${track.title} · module`}
        title={mod.title}
        lead={mod.summary}
      >
        {hrefs[0] && (
          <Link href={hrefs[0]} className="btn btn-primary mt-8">
            Start module <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </PageHero>
      <div className="container-kd grid gap-10 pb-24 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">
            <AcademySidebar track={track} currentHref={mod.href} />
          </div>
        </aside>
        <ol className="space-y-3 lg:col-span-6">
          {mod.lessons.map((l, i) => (
            <li key={l.href}>
              <Link href={l.href} className="card card-hover group block p-6">
                <div className="flex items-center gap-3">
                  <LessonStatus href={l.href} />
                  <span className="font-mono text-xs text-fg-3">Lesson {i + 1}</span>
                  <LevelChip level={l.level} className="ml-auto" />
                </div>
                <h2 className="mt-3 text-lg font-semibold text-fg group-hover:text-brand">{l.title}</h2>
                {l.objectives.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-fg-2">
                    {l.objectives.map((o) => (
                      <li key={o} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-brand" /> {o}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 font-mono text-xs text-fg-3">{l.duration}</p>
              </Link>
            </li>
          ))}
        </ol>
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">{hrefs.length > 0 && <TrackProgress title={mod.title} hrefs={hrefs} />}</div>
        </aside>
      </div>
    </>
  );
}
