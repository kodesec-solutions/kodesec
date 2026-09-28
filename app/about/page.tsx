import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import JsonLd from "@/components/JsonLd";
import { getPage, getSite } from "@/lib/content/loaders";
import { renderMarkdown } from "@/lib/content/markdown";
import { Prose } from "@/components/content/Prose";
import { PartnerCard } from "@/components/home/Partnership";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Kodesec",
  description: "KODESEC Solutions is a cybersecurity-focused engineering company delivering secure, scalable and reliable technology for startups, SMEs and enterprises.",
  path: "/about",
});

const values = [
  { title: "Honest findings", text: "We report what we can prove. No inflated severities, no padded reports." },
  { title: "Engineers, not salespeople", text: "The person on your scoping call is the person doing the work." },
  { title: "Teach what we know", text: "The Academy exists because a safer internet needs more people who can find and fix these bugs." },
  { title: "Security by default", text: "Everything we build ships with threat models, least privilege and tests." },
];

export default async function AboutPage() {
  const site = getSite();
  const partners = site.partners;
  const page = getPage("about");
  const { html } = page ? await renderMarkdown(page.body) : { html: "" };
  return (
    <>
      <JsonLd data={[breadcrumbLd([{ name: "About", path: "/about" }])]} />
      <PageHero
        crumbs={[{ name: "About" }]}
        eyebrow="About"
        title="Security engineered in, not bolted on"
        lead="KODESEC Solutions is a cybersecurity-focused engineering company delivering secure, scalable, and reliable technology solutions for startups, SMEs, and enterprises."
      />

      {html && (
        <Section className="border-t border-line" id="who-we-are">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="Who we are" title="What we do" />
            </div>
            <div className="lg:col-span-8">
              <Prose html={html} />
            </div>
          </div>
        </Section>
      )}

      {partners.length > 0 && (
        <Section className="border-t border-line" id="partners">
          <SectionHeading eyebrow="Partners" title="Who we build with" lead="We collaborate with teams whose work we trust — and who trust us with the security of theirs." />
          <div className="mt-12 grid max-w-4xl gap-6">
            {partners.map((p) => (
              <PartnerCard key={p.url} partner={p} />
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-line" id="office">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Office" title="Visit or call us" lead="Our registered office is in London. We work with teams across the UK, Bangladesh and worldwide." />
          </div>
          <div className="card p-7 md:p-8 lg:col-span-7">
            <ContactDetails site={site} className="text-base [&_svg]:h-5 [&_svg]:w-5" />
            <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
              <Link href="/book" className="btn btn-sm btn-primary">
                Book a call <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/contact" className="btn btn-sm btn-ghost">
                Send a message
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="How we work" title="What we believe" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {values.map((v, i) => (
            <div key={v.title} className="card p-7">
              <span className="font-mono text-xs text-fg-3">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-fg">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/book" className="btn btn-primary">
            Book a call <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/academy" className="btn btn-ghost">
            Visit the Academy
          </Link>
        </div>
      </Section>
    </>
  );
}
