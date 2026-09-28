import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, CircleAlert } from "lucide-react";
import { Horizon } from "@/components/effects/Aurora";
import { AuroraBars } from "@/components/effects/AuroraBars";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { ServiceMedia } from "@/components/services/ServiceMedia";
import { ACCENT } from "@/components/services/accent";
import JsonLd from "@/components/JsonLd";
import { getServices, getSubService } from "@/lib/content/loaders";
import { ORG_ID, SITE_URL, breadcrumbLd, buildMetadata, faqLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string; sub: string }> };

export function generateStaticParams() {
  return getServices().flatMap((s) => s.subservices.map((sub) => ({ slug: s.slug, sub: sub.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug, sub } = await params;
  const f = getSubService(slug, sub);
  if (!f) return {};
  return buildMetadata({
    title: f.sub.title,
    description: `${f.sub.summary}`.slice(0, 165),
    path: `/services/${slug}/${sub}`,
  });
}

export default async function SubServicePage({ params }: Props) {
  const { slug, sub: subSlug } = await params;
  const f = getSubService(slug, subSlug);
  if (!f) notFound();
  const { service: s, sub } = f;
  const services = getServices();
  const a = ACCENT[s.accent];
  const path = `/services/${s.slug}/${sub.slug}`;
  const bookHref = `/book?service=${s.slug}`;
  const media = sub.media ?? s.highlights[0]?.media ?? s.media;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Services", path: "/services" },
            { name: s.title, path: `/services/${s.slug}` },
            { name: sub.title, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${SITE_URL}${path}#service`,
            name: sub.title,
            description: sub.summary,
            serviceType: s.title,
            provider: { "@id": ORG_ID },
            areaServed: ["GB", "BD", "Worldwide"],
            url: `${SITE_URL}${path}`,
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: sub.title,
              itemListElement: sub.offerings.map((o) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: o } })),
            },
          },
          ...(s.faq.length ? [faqLd(s.faq)] : []),
        ]}
      />

      {/* ------------------------------------------------ hero */}
      <section data-theme="dark" className="relative isolate overflow-hidden bg-bg pb-16 pt-32 md:pb-24 md:pt-40">
        <AuroraBars intensity="soft" />
        <div className="container-kd relative grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Breadcrumbs
              items={[
                { name: "Home", path: "/" },
                { name: "Services", path: "/services" },
                { name: s.title, path: `/services/${s.slug}` },
                { name: sub.title },
              ]}
            />
            <p className="mt-8 flex items-center gap-2 text-base font-semibold text-fg">
              <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg", a.head)}>
                <Icon name={sub.icon} className="h-4 w-4" />
              </span>
              kodesec<span className={a.text}>/{s.label}</span>
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] text-fg sm:text-5xl">{sub.title}</h1>
            <p className="mt-6 text-base leading-relaxed text-fg-2 md:text-lg">{sub.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={bookHref} className="btn btn-primary">
                Book a scoping call <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                See pricing
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className={cn("rounded-[22px] border border-line-2 p-1.5", a.glow)}>
              <ServiceMedia src={media} alt={sub.title} priority />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ problems we solve */}
      {sub.problems.length > 0 && (
        <Section className="border-t border-line">
          <SectionHeading eyebrow="Problems we solve" title="Is this you?" />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {sub.problems.map((p) => (
              <div key={p} data-reveal className="card flex gap-4 p-6">
                <CircleAlert className={cn("mt-0.5 h-5 w-5 shrink-0", a.text)} />
                <p className="text-[15px] leading-relaxed text-fg">{p}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* ------------------------------------------------ what's included */}
      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="What's included" title="Everything in this service" />
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {sub.offerings.map((o) => (
              <li key={o} data-reveal className="flex items-center gap-3 rounded-xl border border-line bg-card p-5">
                <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full", a.head)}>
                  <Check className="h-4 w-4" />
                </span>
                <span className="font-medium text-fg">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ------------------------------------------------ process */}
      {s.process.length > 0 && (
        <Section className="border-t border-line">
          <SectionHeading eyebrow="Process" title="How the engagement runs" />
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-5">
            {s.process.map((p, i) => (
              <li key={p.title} className="bg-bg p-6">
                <span className={cn("font-mono text-xs", a.text)}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-semibold text-fg">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-2">{p.description}</p>
              </li>
            ))}
          </ol>
        </Section>
      )}

      {/* ------------------------------------------------ deliverables + benefits */}
      <Section className="border-t border-line">
        <div className="grid gap-12 lg:grid-cols-2">
          {s.deliverables.length > 0 && (
            <div>
              <SectionHeading eyebrow="Deliverables" title="What you receive" />
              <ul className="mt-8 space-y-3">
                {s.deliverables.map((d) => (
                  <li key={d.title} className="card flex gap-4 p-5">
                    <Check className={cn("mt-0.5 h-5 w-5 shrink-0", a.text)} />
                    <span>
                      <span className="block font-medium text-fg">{d.title}</span>
                      <span className="mt-1 block text-sm leading-relaxed text-fg-2">{d.description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {s.highlights.length > 0 && (
            <div>
              <SectionHeading eyebrow="Benefits" title="Why teams choose Kodesec" />
              <ul className="mt-8 space-y-3">
                {s.highlights.map((h) => (
                  <li key={h.title} className="card p-5">
                    <span className="block font-medium text-fg">{h.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-fg-2">{h.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      {/* ------------------------------------------------ technologies */}
      {s.technologies.length > 0 && (
        <Section className="border-t border-line">
          <SectionHeading eyebrow="Technologies" title="Tools & platforms" />
          <ul className="mt-8 flex flex-wrap gap-2">
            {s.technologies.map((t) => (
              <li key={t} className="rounded-full border border-line-2 px-4 py-2 text-sm text-fg-2">
                {t}
              </li>
            ))}
          </ul>
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

      {s.subservices.length > 1 && (
        <Section className="border-t border-line">
          <SectionHeading eyebrow={`More in ${s.title}`} title="Related services" />
          <div className="mt-10">
            <ServiceGrid services={services} only={s.slug} exclude={sub.slug} />
          </div>
        </Section>
      )}

      <section className="relative isolate overflow-hidden border-t border-line pb-40 pt-24 md:pb-52">
        <div className="container-kd relative z-10 text-center">
          <h2 className="mx-auto max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
            <span className="text-gradient">Talk to us about {sub.title.toLowerCase()}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-fg-2">A free 30-minute scoping call with an engineer. Fixed quote within 48 hours.</p>
          <Link href={bookHref} className="btn btn-primary mt-9">
            Book a call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <Horizon />
      </section>
    </>
  );
}
