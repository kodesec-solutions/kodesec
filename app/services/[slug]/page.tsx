import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Horizon } from "@/components/effects/Aurora";
import { AuroraBars } from "@/components/effects/AuroraBars";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { Prose } from "@/components/content/Prose";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { ServiceMedia } from "@/components/services/ServiceMedia";
import { ACCENT } from "@/components/services/accent";
import JsonLd from "@/components/JsonLd";
import { getService, getServices } from "@/lib/content/loaders";
import { renderMarkdown } from "@/lib/content/markdown";
import { breadcrumbLd, buildMetadata, faqLd, serviceLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return buildMetadata({ title: s.seo.title, description: s.seo.description, path: `/services/${s.slug}` });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const services = getServices();
  const a = ACCENT[s.accent];
  const { html } = await renderMarkdown(s.body);
  const bookHref = `/book?service=${s.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "Services", path: "/services" }, { name: s.title, path: `/services/${s.slug}` }]),
          serviceLd(s),
          ...(s.faq.length ? [faqLd(s.faq)] : []),
        ]}
      />

      {/* ------------------------------------------------ hero (Aikido product layout) */}
      <section data-theme="dark" className="relative isolate overflow-hidden bg-bg pb-16 pt-32 md:pb-24 md:pt-40">
        <AuroraBars intensity="soft" />
        <div className="container-kd relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.title }]} />
            <p className="mt-8 flex items-center gap-2 text-lg font-semibold text-fg">
              <span className="font-bold">kodesec</span>
              <span className={a.text}>/{s.label}</span>
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] text-fg sm:text-5xl lg:text-[3.4rem]">{s.tagline}</h1>
            <p className="mt-6 text-base leading-relaxed text-fg-2 md:text-lg">{s.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={bookHref} className="btn btn-primary">
                Book a scoping call <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#services" className="btn btn-ghost">
                See all {s.subservices.length} services
              </Link>
            </div>
            <p className="mt-4 text-xs text-fg-3">Free 30-minute call · NDA available · Fixed quote in 48h</p>
          </div>
          <div className="lg:col-span-7">
            <div className={cn("rounded-[22px] border border-line-2 p-1.5", a.glow)}>
              <ServiceMedia src={s.media} alt={`${s.title} at Kodesec`} priority />
            </div>
          </div>
        </div>
        {/* stack row, like Aikido's logo strip */}
        <div className="container-kd relative mt-16">
          <p className="text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-3">Tools & platforms we work with</p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {s.technologies.map((t) => (
              <li key={t} className="text-base font-semibold tracking-tight text-fg-3/90">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------ alternating feature rows */}
      <section className="relative py-16 md:py-24">
        <div className="container-kd space-y-16 md:space-y-24">
          {s.highlights.map((h, i) => (
            <div key={h.title} className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div data-reveal className={cn(i % 2 === 1 && "md:order-2")}>
                <div className={cn("rounded-[22px] border border-line-2 p-1.5", a.tint)}>
                  <ServiceMedia src={h.media} alt={h.title} />
                </div>
              </div>
              <div data-reveal>
                <h2 className="text-3xl font-semibold leading-tight text-fg md:text-[2.25rem]">{h.title}</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-fg-2 md:text-lg">{h.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------ all sub-services (tinted grid) */}
      <Section id="services" className="scroll-mt-24 border-t border-line">
        <SectionHeading
          eyebrow={`kodesec/${s.label}`}
          title={`Everything in ${s.title}`}
          lead="Pick one service or combine several — every engagement is scoped with you and ends re-verified."
        />
        <div className="mt-12">
          <ServiceGrid services={services} only={s.slug} />
        </div>
      </Section>

      {/* ------------------------------------------------ overview + process */}
      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="How we work" title="From first call to verified result" />
            <Prose html={html} className="mt-6" />
          </div>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:col-span-7">
            {s.process.map((p, i) => (
              <li key={p.title} className="flex gap-5 bg-bg p-6">
                <span className={cn("font-mono text-sm", a.text)}>{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-semibold text-fg">{p.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-fg-2">{p.description}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* ------------------------------------------------ deliverables */}
      {s.deliverables.length > 0 && (
        <Section className="border-t border-line">
          <SectionHeading eyebrow="Deliverables" title="What you receive" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {s.deliverables.map((d) => (
              <div key={d.title} className="card p-6">
                <Check className={cn("h-5 w-5", a.text)} />
                <h3 className="mt-4 font-semibold text-fg">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{d.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {s.faq.length > 0 && (
        <Section className="border-t border-line">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="FAQ" title="Questions, answered" />
            </div>
            <div className="lg:col-span-8">
              <Faq items={s.faq} />
            </div>
          </div>
        </Section>
      )}

      <section className="relative isolate overflow-hidden border-t border-line pb-40 pt-24 md:pb-52">
        <div className="container-kd relative text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
            <span className="text-gradient">Let&apos;s scope your {s.title.toLowerCase()} project</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-fg-2">A free 30-minute call. You get a clear plan and a fixed quote.</p>
          <Link href={bookHref} className="btn btn-primary mt-9">
            Book a call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Horizon />
      </section>
    </>
  );
}
