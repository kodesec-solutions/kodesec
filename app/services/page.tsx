import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import JsonLd from "@/components/JsonLd";
import { getServices } from "@/lib/content/loaders";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Security, Software, Cloud, DevOps & QA Services",
  description:
    "Penetration testing, secure software development, cloud, DevOps and QA services — five practices, one security-first team.",
  path: "/services",
});

export default function ServicesPage() {
  const services = getServices();
  const count = services.reduce((n, s) => n + s.subservices.length, 0);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Services", path: "/services" }])} />
      <PageHero
        crumbs={[{ name: "Services" }]}
        eyebrow={`${services.length} practices · ${count} services`}
        title="Your complete security and engineering team"
        lead="From penetration testing to the software, cloud and pipelines you ship on — every service built and delivered security-first."
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/book" className="btn btn-primary">
            Book a scoping call <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/pricing" className="btn btn-ghost">
            Engagement models
          </Link>
        </div>
      </PageHero>

      <section className="pb-20">
        <div className="container-kd max-w-[1320px]">
          <ServiceGrid services={services} />
        </div>
      </section>

      <Section className="border-t border-line">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Not sure where to start?"
            title="Tell us the problem. We'll pick the service."
            lead="A free 30-minute scoping call with an engineer — you'll leave with a plan and a fixed quote."
          />
          <Link href="/book" className="btn btn-primary shrink-0">
            Book a call <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
