import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Bell } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { LevelChip, RoleChips } from "@/components/academy/Badges";
import { AcademySidebar } from "@/components/academy/AcademySidebar";
import { LessonStatus, TrackProgress } from "@/components/academy/ProgressWidgets";
import JsonLd from "@/components/JsonLd";
import { getAcademy, getTrack } from "@/lib/content/loaders";
import { breadcrumbLd, buildMetadata, courseLd } from "@/lib/seo";

type Props = { params: Promise<{ track: string }> };

export function generateStaticParams() {
  return getAcademy().map((t) => ({ track: t.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { track } = await params;
  const t = getTrack(track);
  if (!t) return {};
  return buildMetadata({
    title: `${t.title} — Free Course`,
    description: t.summary,
    path: t.href,
    noindex: t.status === "coming-soon" && t.lessonCount === 0,
  });
}

export default async function TrackPage({ params }: Props) {
  const { track: slug } = await params;
  const track = getTrack(slug);
  if (!track) notFound();
  const hrefs = track.modules.flatMap((m) => m.lessons.map((l) => l.href));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Academy", path: "/academy" }, { name: track.title, path: track.href }]),
          ...(track.lessonCount ? [courseLd(track)] : []),
        ]}
      />
      <PageHero
        crumbs={[{ name: "Academy", path: "/academy" }, { name: track.title }]}
        eyebrow={track.status === "coming-soon" ? "Track · coming soon" : `Track · ${track.lessonCount} lessons`}
        title={track.title}
        lead={track.summary}
      >
        <div className="mt-7 flex flex-wrap gap-1.5">
          <RoleChips roles={track.roles} />
        </div>
        {hrefs[0] && (
          <Link href={hrefs[0]} className="btn btn-primary mt-8">
            Start the first lesson <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </PageHero>

      <div className="container-kd grid gap-10 pb-24 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-28">
            <AcademySidebar track={track} currentHref={track.href} />
          </div>
        </aside>

        <div className="space-y-6 lg:col-span-6">
          {track.modules.length === 0 && (
            <div className="card p-8">
              <Bell className="h-5 w-5 text-brand" />
              <h2 className="mt-4 text-lg font-semibold text-fg">Lessons are being written</h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">
                This track is in progress. Follow us on LinkedIn to hear when the first module goes live, or start with a
                published track in the meantime.
              </p>
              <Link href="/academy" className="btn btn-ghost btn-sm mt-6">
                Browse tracks
              </Link>
            </div>
          )}
          {track.modules.map((m, i) => (
            <section key={m.slug} className="card overflow-hidden">
              <div className="border-b border-line p-6 md:p-7">
                <p className="font-mono text-xs text-brand">Module {String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-xl font-semibold text-fg">
                  <Link href={m.href} className="hover:text-brand">
                    {m.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{m.summary}</p>
              </div>
              <ol className="divide-y divide-line">
                {m.lessons.map((l, j) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-tint/[0.02] md:px-7">
                      <LessonStatus href={l.href} />
                      <span className="font-mono text-xs text-fg-3">{String(j + 1).padStart(2, "0")}</span>
                      <span className="min-w-0 flex-1 text-sm font-medium text-fg group-hover:text-brand">{l.title}</span>
                      <LevelChip level={l.level} className="hidden sm:inline-flex" />
                      <span className="hidden font-mono text-xs text-fg-3 sm:block">{l.duration}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <aside className="lg:col-span-3">
          <div className="space-y-4 lg:sticky lg:top-28">
            {hrefs.length > 0 && <TrackProgress title={track.title} hrefs={hrefs} />}
            <div className="card p-6">
              <p className="font-semibold text-fg">Want this tested on your app?</p>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">The people who write these lessons run real penetration tests.</p>
              <Link href="/book?service=cybersecurity" className="btn btn-ghost btn-sm mt-5">
                Book a call <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
