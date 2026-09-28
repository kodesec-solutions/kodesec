import Link from "next/link";
import { ArrowRight, CircleDot } from "lucide-react";
import { Horizon } from "@/components/effects/Aurora";
import { AuroraBars } from "@/components/effects/AuroraBars";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { BlogBento } from "@/components/blog/BlogBento";
import ServiceBeam from "@/components/home/ServiceBeam";
import FilmSection from "@/components/home/FilmSection";
import Partnership from "@/components/home/Partnership";
import YouTubePlayer from "@/components/home/YouTubePlayer";
import { parseVideoUrl } from "@/lib/content/markdown";
import { formatDate } from "@/lib/format";
import { getAcademy, getPosts, getServices, getSite } from "@/lib/content/loaders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  description:
    "Kodesec finds the security flaws scanners miss, builds software and cloud platforms that are secure by default, and teaches it all for free in the Kodesec Academy.",
  path: "/",
});

const stack = [
  "AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform", "GitHub Actions", "Node.js",
  "Next.js", "Python", "PostgreSQL", "Linux", "Active Directory", "OWASP ASVS",
];

const principles = [
  { title: "Manual first", text: "Scanners find the obvious. We look for the business-logic and access-control flaws that actually get exploited." },
  { title: "Founder-led", text: "You work directly with the engineers doing the work — no account managers, no hand-offs." },
  { title: "Fix, not just find", text: "Every finding comes with a fix path and a re-test. A report nobody can act on isn't security." },
];

export default function HomePage() {
  const services = getServices();
  const tracks = getAcademy();
  const posts = getPosts().slice(0, 3);
  const firstTrack = tracks.find((t) => t.status === "published");
  const site = getSite();
  const announcement = site.announcement;
  const announcementVideo = announcement.youtube ? (parseVideoUrl(announcement.youtube)?.id ?? null) : null;

  return (
    <>
      {/* ================================================================ HERO */}
      <section data-theme="dark" className="relative isolate overflow-hidden bg-bg pb-20 pt-36 md:pb-28 md:pt-44">
        <AuroraBars />
        {/* centre vignette keeps the headline readable over the bars */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_32%,rgba(3,6,5,0.82),rgba(3,6,5,0.35)_70%,transparent)]" />
        <div className="container-kd relative">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow justify-center">Offensive security · Secure engineering · Free academy</p>
            <h1 className="mt-6 text-[2.4rem] font-semibold leading-[1.05] sm:text-5xl lg:text-[4.3rem]">
              <span className="text-gradient">Engineering security into every layer.</span>
              <br />
              <span className="text-aurora">Deploy with confidence.</span>
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-fg-2 md:text-lg">
              A founder-led team of penetration testers and engineers. We find the flaws scanners miss, build software and
              cloud platforms that are secure by default, and teach it all for free.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/book" className="btn btn-primary">
                Book a scoping call <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/academy" className="btn btn-ghost">
                Explore the Academy
              </Link>
            </div>
            <p className="mt-5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-3">
              Manual testing · Fixed quotes · Every fix re-tested
            </p>
          </div>
        </div>

        {/* Stack marquee */}
        <div className="container-kd relative mt-20">
          <p className="text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-3">
            Tested and built across your stack
          </p>
          <div className="marquee-mask mt-6 overflow-hidden">
            <ul className="flex w-max animate-marquee gap-12">
              {[...stack, ...stack].map((s, i) => (
                <li key={i} className="whitespace-nowrap text-lg font-medium tracking-tight text-fg-3/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ================================================================ SERVICE BEAM */}
      <ServiceBeam services={services.map((s) => ({ slug: s.slug, title: s.title, tagline: s.tagline, icon: s.icon }))} />

      {/* ================================================================ FILM */}
      <FilmSection film={site.film} />

      {/* ================================================================ PARTNERS */}
      <Partnership partners={site.partners} />

      {/* ================================================================ ANNOUNCEMENT (fixed mint band) */}
      <Section tone="light" className="border-t border-black/5">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3">
              <span className="eyebrow">{announcement.label}</span>
              <time dateTime={announcement.date} className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-fg-3">
                {formatDate(announcement.date)}
              </time>
            </p>
            <h2 className="mt-5 text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl md:text-[2.75rem]">{announcement.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-fg-2 md:text-lg">{announcement.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {announcement.cta && (
                <Link href={announcement.cta.href} className="btn bg-[#04160d] text-white hover:bg-[#0b2a1a]">
                  {announcement.cta.label} <ArrowRight className="h-4 w-4" />
                </Link>
              )}
              {announcementVideo && (
                <a
                  href={`https://www.youtube.com/watch?v=${announcementVideo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-black/15 text-fg hover:bg-black/5"
                >
                  Watch on YouTube
                </a>
              )}
            </div>
          </div>
          <div className="lg:col-span-7">
            <YouTubePlayer
              id={announcementVideo}
              title={announcement.title}
              fallbackVideo={site.film.video}
              fallbackPoster={site.film.poster}
            />
          </div>
        </div>
      </Section>

      {/* ================================================================ ACADEMY SHOWCASE */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Kodesec Academy"
              title={
                <>
                  Learn security the way <span className="text-aurora">attackers think</span>
                </>
              }
              lead="Free, structured lessons for red teamers, blue teamers, developers and cloud engineers — written by the people who do this work every day."
            />
            <ul className="mt-8 space-y-3 text-sm text-fg-2">
              {["Structured tracks, modules and lessons", "Real code, real requests, real fixes", "Track your progress as you learn — no account needed"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <CircleDot className="h-4 w-4 text-brand" /> {t}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/academy" className="btn btn-primary">
                Start learning <ArrowRight className="h-4 w-4" />
              </Link>
              {firstTrack && (
                <Link href={firstTrack.href} className="btn btn-ghost">
                  {firstTrack.title} track
                </Link>
              )}
            </div>
          </div>

          <div data-reveal className="card overflow-hidden bg-bg-2/80 p-2">
            <ul className="divide-y divide-line">
              {tracks.map((t) => (
                <li key={t.slug}>
                  <Link href={t.href} className="group flex items-center gap-4 rounded-xl p-4 transition-colors hover:bg-tint/[0.03]">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line-2 bg-surface text-brand">
                      <Icon name={t.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-medium text-fg">
                        {t.title}
                        {t.status === "coming-soon" && <span className="chip h-5 px-1.5 text-[0.6rem]">Soon</span>}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-fg-3">{t.summary}</span>
                    </span>
                    <span className="font-mono text-xs text-fg-3">{t.lessonCount > 0 ? `${t.lessonCount} lessons` : ""}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ================================================================ PRINCIPLES */}
      <Section className="border-t border-line">
        <SectionHeading eyebrow="Why Kodesec" title="Small team. Deep work. No noise." />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {principles.map((p, i) => (
            <div key={p.title} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties} className="card p-7">
              <span className="font-mono text-xs text-fg-3">0{i + 1}</span>
              <h3 className="mt-5 text-lg font-semibold text-fg">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-2">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ================================================================ BLOG */}
      {posts.length > 0 && (
        <Section className="border-t border-line">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Research" title="Latest from the blog" />
            <Link href="/blog" className="btn btn-ghost shrink-0">
              All articles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12">
            <BlogBento posts={posts} />
          </div>
        </Section>
      )}

      {/* ================================================================ CTA */}
      <section className="relative isolate overflow-hidden border-t border-line pb-40 pt-28 md:pb-56">
        <div className="container-kd relative z-10 text-center">
          <p className="eyebrow">Work with us</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] md:text-6xl">
            <span className="text-gradient">Find your weak spots first.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-fg-2">
            Book a free 30-minute scoping call. You&apos;ll leave with a clear plan and a fixed quote — whether or not you
            work with us.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/book" className="btn btn-primary">
              Book a call <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn btn-ghost">
              See pricing
            </Link>
          </div>
        </div>
        <Horizon />
      </section>
    </>
  );
}
