import Link from "next/link";
import { ArrowRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { AuroraBars } from "@/components/effects/AuroraBars";
import { BusinessPicker, BusinessProvider } from "@/components/owasp/BusinessContext";
import { HowToUse } from "@/components/owasp/HowToUse";
import { TopicGallery, type GalleryTopic } from "@/components/owasp/TopicGallery";
import { getAcademy, getOwaspTopics } from "@/lib/content/loaders";
import { owaspCategories } from "@/lib/content/schemas";
import { businessProfiles } from "@/lib/academy/profiles";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

// TODO(team): review the Academy hero copy.
export const metadata = buildMetadata({
  title: "Kodesec Academy: Web Security for Business Owners",
  description:
    "The OWASP Top 10 web risks, explained for the people who run the business. Short interactive lessons with examples for your kind of business. Free.",
  path: "/academy",
});

export default function AcademyPage() {
  const topics: GalleryTopic[] = getOwaspTopics().map((t) => ({
    slug: t.slug,
    href: t.href,
    code: t.code,
    title: t.title,
    category: t.category,
    readMinutes: t.readMinutes,
    theme: t.theme,
    owasp: t.owasp,
    preview: t.preview,
  }));
  const tracks = getAcademy().filter((t) => t.lessonCount > 0);

  return (
    <BusinessProvider profiles={businessProfiles()}>
      <JsonLd data={breadcrumbLd([{ name: "Academy", path: "/academy" }])} />

      <section className="relative isolate overflow-hidden pb-10 pt-32 md:pt-36">
        <AuroraBars intensity="soft" />
        <div className="relative mx-auto w-full max-w-[1400px] px-4 md:px-6">
          <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow">Kodesec Academy · for business owners</p>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl md:text-6xl">
                <span className="text-gradient">How websites get hacked,</span> <span className="text-aurora">explained for owners.</span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-2">
                The ten risks on the OWASP Top 10, the industry&apos;s standard list. Each is a three-minute lesson, shown through your
                kind of business.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <p className="mb-3 text-xs text-fg-3">Choose your business first. Every lesson adapts to it.</p>
              <BusinessPicker />
            </div>
          </div>
          <HowToUse />
        </div>
      </section>

      <section className="pb-24">
        <div className="mx-auto w-full max-w-[1400px] px-4 md:px-6">
          <TopicGallery topics={topics} categories={owaspCategories} />
          <p className="mt-6 text-xs text-fg-3">
            Safety measures adapted from the{" "}
            <a href="https://top10.owasp.org/2025/" target="_blank" rel="noopener noreferrer" className="underline hover:text-fg-2">
              OWASP Top 10:2025
            </a>{" "}
            (CC BY 3.0).
          </p>
        </div>
      </section>

      {tracks.length > 0 && (
        <section className="border-t hairline py-16">
          <div className="container-kd">
            <p className="eyebrow">For technical teams</p>
            <h2 className="mt-4 text-2xl font-semibold text-fg">Hands-on tracks for developers and engineers</h2>
            <ul className="mt-8 grid gap-3 md:grid-cols-3">
              {tracks.map((t) => (
                <li key={t.slug}>
                  <Link href={t.href} className="card card-hover group flex h-full flex-col p-5">
                    <span className="font-medium text-fg">{t.title}</span>
                    <span className="mt-2 flex-1 text-sm leading-relaxed text-fg-2">{t.summary.split(".")[0]}.</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-fg-3 group-hover:text-brand">
                      {t.lessonCount} lessons <ArrowRight className="h-3 w-3" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </BusinessProvider>
  );
}
