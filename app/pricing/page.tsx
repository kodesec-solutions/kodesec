import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Faq } from "@/components/ui/Faq";
import { Icon } from "@/components/ui/Icon";
import JsonLd from "@/components/JsonLd";
import { getPricing, getServices } from "@/lib/content/loaders";
import { breadcrumbLd, buildMetadata, faqLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Pricing",
  description:
    "Scoped, fixed-quote pricing for penetration tests, secure engineering projects and security retainers. Book a free scoping call to get your quote.",
  path: "/pricing",
});

export default function PricingPage() {
  const pricing = getPricing();
  const services = getServices();
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "Pricing", path: "/pricing" }]), ...(pricing.faq.length ? [faqLd(pricing.faq)] : [])]} />
      <PageHero crumbs={[{ name: "Pricing" }]} eyebrow="Pricing" title={pricing.intro.title} lead={pricing.intro.subtitle} />

      <Section className="pt-4 md:pt-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {pricing.models.map((m) => (
            <div
              key={m.id}
              className={cn(
                "card relative flex flex-col p-7 md:p-8",
                m.highlight && "border-brand/40 bg-gradient-to-b from-brand/[0.07] to-transparent shadow-glow",
              )}
            >
              {m.highlight && <span className="chip chip-brand absolute -top-3 left-7 bg-bg">Most chosen</span>}
              <h2 className="text-xl font-semibold text-fg">{m.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{m.description}</p>
              <div className="mt-7 border-y border-line py-6">
                <p className="text-3xl font-semibold tracking-tight text-fg">{m.from ? `From ${m.from}` : "Custom quote"}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-fg-3">{m.unit}</p>
              </div>
              <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-fg-3">Best for</p>
              <p className="mt-1 text-sm text-fg">{m.bestFor}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {m.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-fg-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href={`/book?plan=${m.id}`} className={cn("btn mt-8 w-full", m.highlight ? "btn-brand" : "btn-ghost")}>
                {m.cta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-fg-3">
          Every quote is fixed and written. No surprise invoices, and an NDA before any technical details are shared.
        </p>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="By service" title="Get a quote for a specific service" />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s) => (
            <Link key={s.slug} href={`/book?service=${s.slug}`} className="card card-hover group flex items-center gap-4 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line-2 bg-surface text-brand">
                <Icon name={s.icon} className="h-[18px] w-[18px]" />
              </span>
              <span className="text-sm font-medium text-fg">{s.title}</span>
              <ArrowRight className="ml-auto h-4 w-4 text-fg-3 transition group-hover:translate-x-0.5 group-hover:text-brand" />
            </Link>
          ))}
        </div>
      </Section>

      {pricing.faq.length > 0 && (
        <Section className="border-t border-line">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="FAQ" title="Pricing questions" />
            </div>
            <div className="lg:col-span-8">
              <Faq items={pricing.faq} />
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
