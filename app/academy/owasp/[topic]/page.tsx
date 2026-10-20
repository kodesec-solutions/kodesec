import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { AuroraBars } from "@/components/effects/AuroraBars";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  Biz,
  BusinessPicker,
  BusinessProvider,
} from "@/components/owasp/BusinessContext";
import { ExplainerVideo } from "@/components/owasp/ExplainerVideo";
import { BusinessStakes } from "@/components/owasp/BusinessStakes";
import { KnowledgeClip } from "@/components/owasp/KnowledgeClip";
import { RiskMap } from "@/components/owasp/RiskMap";
import { SelfAssessment } from "@/components/owasp/SelfAssessment";
import { CaseFiles } from "@/components/owasp/CaseFiles";
import { ChapterRail } from "@/components/owasp/ChapterRail";
import { LessonProvider } from "@/components/owasp/LessonContext";
import { getOwaspTopic, getOwaspTopics } from "@/lib/content/loaders";
import { businessProfiles } from "@/lib/academy/profiles";
import { hand } from "@/lib/academy/fonts";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return getOwaspTopics().map((t) => ({ topic: t.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const t = getOwaspTopic((await params).topic);
  if (!t) return {};
  return buildMetadata({
    title: t.seo.title,
    description: t.seo.description,
    path: t.href,
    type: "article",
  });
}

export default async function OwaspTopicPage({ params }: Props) {
  const topic = getOwaspTopic((await params).topic);
  if (!topic) notFound();
  const all = getOwaspTopics();
  const i = all.findIndex((t) => t.slug === topic.slug);
  const prev = all[i - 1];
  const next = all[i + 1];
  const chapters = [
    { id: "quick", label: "In 10 seconds", hint: "The short version." },
    { id: "stakes", label: "For your business", hint: "What could leak, and what to ask first." },
    ...(topic.variants ? [{ id: "family", label: "The family", hint: "The common forms of this risk." }] : []),
    { id: "map", label: "Where it hides", hint: "The parts of your site to look at." },
    { id: "cost", label: "What it costs", hint: "Trust, legal, cleanup, fraud." },
    { id: "you", label: "Does it apply to you?", hint: "A few quick taps, then your questions." },
    { id: "case", label: "Real cases", hint: "It happened to big, careful companies." },
    { id: "decide", label: "Your part", hint: "The decisions only you can make." },
    { id: "keep", label: "Remember", hint: "Three things to keep." },
    { id: "owasp", label: "What OWASP says", hint: "What it is and how to stay safe." },
  ];

  return (
    <BusinessProvider profiles={businessProfiles(topic)}>
      <LessonProvider>
        <div className={hand.variable}>
          <ChapterRail chapters={chapters} />
          <JsonLd
            data={breadcrumbLd([
              { name: "Academy", path: "/academy" },
              { name: topic.title, path: topic.href },
            ])}
          />

          {/* 1. Title */}
          <section className="relative isolate overflow-hidden pb-10 pt-32 md:pt-36">
            <AuroraBars intensity="soft" />
            <div className="container-kd relative">
              <Breadcrumbs
                items={[
                  { name: "Home", path: "/" },
                  { name: "Academy", path: "/academy" },
                  { name: topic.title },
                ]}
              />
              <p className="eyebrow mt-8">
                {topic.code} · OWASP Top 10 · {topic.readMinutes} min
              </p>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl md:text-[4.25rem]">
                <span className="text-gradient">{topic.title}.</span>{" "}
                <span className="text-aurora">{topic.question}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-2 md:text-lg">
                {topic.summary}
              </p>
              <BusinessPicker className="mt-8" />
            </div>
          </section>

          {/* 2. The themed explainer video */}
          <section id="simulate" className="container-kd scroll-mt-24 pt-6 md:pt-8">
            <ExplainerVideo topic={topic} theme={topic.theme} />
          </section>

          {/* 3. The short version */}
          <Block id="quick" eyebrow="In 10 seconds" title={topic.quick.title}>
            <CardGrid cards={topic.quick.cards} cols={3} />
          </Block>

          {/* 3b. Through the visitor's own business */}
          <Block id="stakes" eyebrow="For your business" title="What's at stake for you.">
            <BusinessStakes topic={topic} />
          </Block>

          {topic.variants && (
            <Block
              id="family"
              eyebrow="Meet the family"
              title={topic.variants.title}
            >
              <CardGrid cards={topic.variants.cards} cols={4} />
            </Block>
          )}

          {/* 4. Where it hides */}
          <Block
            id="map"
            eyebrow="Where it hides"
            title={topic.map.title}
            lede={topic.map.lede}
          >
            <RiskMap zones={topic.map.zones} />
          </Block>

          {/* 5. What it costs */}
          <Block id="cost" eyebrow="What it costs" title={topic.cost.title}>
            <CardGrid cards={topic.cost.cards} cols={4} />
            {topic.cost.note && (
              <p className="mt-4 rounded-2xl border border-danger/25 bg-danger/[0.06] px-5 py-4 text-[0.97rem] leading-relaxed text-fg-2">
                <Biz text={topic.cost.note} />
              </p>
            )}
          </Block>

          {/* 6. Does it apply to you */}
          <Block
            id="you"
            eyebrow="Does this apply to you?"
            title="Tick what's true. Get your questions."
          >
            <SelfAssessment
              checklist={topic.checklist}
            />
          </Block>

          {/* 7. Real cases */}
          <Block
            id="case"
            eyebrow={
              topic.cases.items.length > 1 ? "Real cases" : "A real case"
            }
            title={topic.cases.title}
          >
            <CaseFiles cases={topic.cases.items} slug={topic.slug} theme={topic.theme} />
          </Block>

          {/* 8. Owner decisions + the developer layer */}
          <Block id="decide" eyebrow="Your part" title={topic.decisions.title}>
            <ol className="mt-8 divide-y divide-line border-y hairline">
              {topic.decisions.items.map((d, n) => (
                <li
                  key={n}
                  className="grid gap-2 py-5 md:grid-cols-[3rem_16rem_1fr] md:gap-6"
                >
                  <span className="font-mono text-sm text-brand">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold text-fg">{d.title}</span>
                  <span className="leading-relaxed text-fg-2">
                    <Biz text={d.text} />
                  </span>
                </li>
              ))}
            </ol>
            {topic.devNotes.length > 0 && (
              <details className="card group mt-6 overflow-hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-medium text-fg [&::-webkit-details-marker]:hidden">
                  For your developer: the technical layer
                  <Plus className="h-5 w-5 flex-none text-brand transition-transform group-open:rotate-45" />
                </summary>
                <ul className="space-y-2 px-6 pb-6 pl-11 text-[0.95rem] leading-relaxed text-fg-2 marker:text-brand list-disc">
                  {topic.devNotes.map((note, n) => (
                    <li key={n}>{note}</li>
                  ))}
                </ul>
              </details>
            )}
          </Block>

          {/* 9. Takeaways */}
          <Block id="keep" eyebrow="Remember" title={topic.takeaways.title}>
            <ul className="mt-8 grid gap-3 md:grid-cols-3">
              {topic.takeaways.items.map((t, n) => (
                <li
                  key={n}
                  className="rounded-r-2xl border-l-2 border-brand bg-card/60 px-5 py-5 leading-relaxed text-fg"
                >
                  <Biz text={t} />
                </li>
              ))}
            </ul>
          </Block>

          {/* 9b. What OWASP says: a slideshow the visitor clicks through */}
          <Block id="owasp" eyebrow="What OWASP says" title="The essentials, slide by slide.">
            <div className="card relative mt-8 aspect-[16/10] overflow-hidden md:aspect-[16/8]">
              <KnowledgeClip slug={topic.slug} code={topic.code} title={topic.title} owasp={topic.owasp} why={topic.quick.cards[1]?.text} />
            </div>
          </Block>

          {/* next / previous lesson */}
          <nav
            aria-label="More lessons"
            className="container-kd mt-20 grid gap-3 pb-6 md:grid-cols-2"
          >
            {prev ? <LessonLink topic={prev} dir="prev" /> : <span />}
            {next && <LessonLink topic={next} dir="next" />}
          </nav>
          <p className="container-kd pb-24 pt-6 text-xs leading-relaxed text-fg-3">
            OWASP is a non-profit that publishes the industry&apos;s standard list of web risks. Safety measures adapted from the{" "}
            <a href={topic.owasp.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-fg-2">
              OWASP Top 10:2025
            </a>{" "}
            (CC BY 3.0). The people and businesses in the examples are made up.
          </p>
        </div>
      </LessonProvider>
    </BusinessProvider>
  );
}

function Block({
  id,
  eyebrow,
  title,
  lede,
  className,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 pt-16 md:pt-20", className)}>
      <div className="container-kd">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-[1.1] text-fg md:text-[2.5rem]">
          {title}
        </h2>
        {lede && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-2 md:text-lg">
            {lede}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

function CardGrid({
  cards,
  cols,
}: {
  cards: { label?: string; title: string; text: string }[];
  cols: 3 | 4;
}) {
  return (
    <div
      className={cn(
        "mt-8 grid gap-3 sm:grid-cols-2",
        cols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4",
      )}
    >
      {cards.map((c, n) => (
        <div key={n} className="card p-6">
          {c.label && (
            <p className="mb-3 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-brand">
              {c.label}
            </p>
          )}
          <h3 className="text-lg font-semibold text-fg">{c.title}</h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-2">
            <Biz text={c.text} />
          </p>
        </div>
      ))}
    </div>
  );
}

function LessonLink({
  topic,
  dir,
}: {
  topic: { href: string; code: string; title: string; tagline: string };
  dir: "prev" | "next";
}) {
  return (
    <Link
      href={topic.href}
      className={cn(
        "card card-hover group flex flex-col gap-2 p-5",
        dir === "next" && "md:items-end md:text-right",
      )}
    >
      <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-wider text-fg-3 group-hover:text-brand">
        {dir === "prev" && <ArrowLeft className="h-3 w-3" />}
        {dir === "prev" ? "Previous" : "Next"} · {topic.code}
        {dir === "next" && <ArrowRight className="h-3 w-3" />}
      </span>
      <span className="text-lg font-semibold text-fg">{topic.title}</span>
      <span className="text-sm text-fg-2">{topic.tagline}</span>
    </Link>
  );
}
