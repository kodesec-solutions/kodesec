import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, servicesData } from "@/app/data/services";
import type { ServiceContent } from "@/app/data/services";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Kodesec",
    };
  }

  return {
    title: `${service.title} | Kodesec Services`,
    description: service.shortPositioning,
  };
}

function ServiceHero({ service }: { service: ServiceContent }) {
  return (
    <section className="px-6 lg:px-20 py-14 lg:py-20 bg-background-dark">
      <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-[1.15fr_0.85fr] items-center">
        <div className="animate-slide-in-left">
          <p className="inline-flex rounded-full border border-surface-border bg-surface-dark px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Service
          </p>
          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black leading-[1.04] text-secondary">
            {service.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base md:text-lg text-muted leading-relaxed font-body">
            {service.shortPositioning}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {(service.technologies ?? []).slice(0, 6).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-surface-border bg-surface-dark px-3 py-1.5 text-xs text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="animate-slide-in-right">
          <div className="relative rounded-3xl border border-surface-border bg-card-dark p-6 md:p-8 overflow-hidden">
            <div className="absolute -left-10 -top-12 h-40 w-40 rounded-full bg-primary/20 blur-3xl animate-float-up" />
            <div className="absolute -right-10 -bottom-12 h-44 w-44 rounded-full bg-primary/15 blur-3xl animate-float-up animation-delay-400" />
            <div className="relative grid gap-3">
              <div className="rounded-2xl border border-surface-border bg-surface-dark p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-primary">Security Priority</p>
                <p className="mt-2 text-xl font-black text-secondary">Risk Reduced by Design</p>
              </div>
              <div className="rounded-2xl border border-surface-border bg-surface-dark p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-primary">Delivery Focus</p>
                <p className="mt-2 text-xl font-black text-secondary">Practical and Scalable</p>
              </div>
              <div className="rounded-2xl border border-surface-border bg-surface-dark p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-primary">Engagement Model</p>
                <p className="mt-2 text-xl font-black text-secondary">Evidence-Driven Execution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueStrip() {
  const values = [
    "Faster deployments",
    "Secure infrastructure",
    "Scalable systems",
    "Reduced operational risk",
  ];

  return (
    <section className="px-6 lg:px-20 pb-10 bg-background-dark">
      <div className="mx-auto max-w-7xl rounded-2xl border border-surface-border bg-surface-dark p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {values.map((value, index) => (
            <div key={value} className="inline-flex items-center gap-2">
              <span className="text-primary text-sm">✔</span>
              <span className="text-sm text-secondary">{value}</span>
              {index < values.length - 1 && (
                <span className="hidden md:inline-block mx-2 h-4 w-px bg-surface-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeDo({ service }: { service: ServiceContent }) {
  return (
    <section className="px-6 lg:px-20 py-10 bg-background-dark">
      <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-start">
        <div className="animate-slide-in-left">
          <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">What We Do</p>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary">Structured Security Delivery with Clear Priorities</h2>
          <p className="mt-4 text-muted leading-relaxed font-body">
            We execute this service through a security-first framework that emphasizes
            predictability, measurable outcomes, and technical clarity.
          </p>
        </div>
        <ul className="animate-slide-in-right space-y-3">
          {service.keyApproach.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-1 text-primary">•</span>
              <span className="text-secondary leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceProcess({ service }: { service: ServiceContent }) {
  const processSteps = service.keyApproach.slice(0, 5);

  return (
    <section className="px-6 lg:px-20 py-12 bg-background-dark">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">How We Work</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary">Process Timeline</h2>

        <div className="mt-8 relative">
          <div className="hidden lg:block absolute left-0 right-0 top-[48px] h-px bg-surface-border" />
          <div className="grid gap-8 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <div key={step} className="animate-fade-in-up relative">
                <div className="flex items-center gap-4 lg:block">
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface-dark text-primary text-sm font-bold lg:mx-auto">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 lg:mt-5">
                    <h3 className="text-lg font-semibold text-secondary">{step}</h3>
                    <p className="mt-2 text-sm text-muted leading-relaxed font-body">
                      {index === 0
                        ? "Define the scope and risk boundaries before work begins."
                        : index === 1
                        ? "Review architecture for strengths, gaps, and attack surface."
                        : index === 2
                        ? "Execute secure development or controlled testing in scope."
                        : index === 3
                        ? "Validate findings through safe exploitation and evidence."
                        : "Deliver clear reporting with remediation guidance."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceFeatures({ service }: { service: ServiceContent }) {
  return (
    <section className="px-6 lg:px-20 py-10 bg-background-dark">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">Features / Capabilities</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary">Core Capability Coverage</h2>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {service.scopeFeatures.map((feature) => (
            <div key={feature} className="flex items-start gap-3 py-1">
              <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">done</span>
              <div>
                <h3 className="text-secondary font-semibold leading-snug">{feature}</h3>
                <p className="text-sm text-muted font-body">Designed for reliability, security, and operational clarity.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceBenefits({ service }: { service: ServiceContent }) {
  return (
    <section className="px-6 lg:px-20 py-12 bg-background-dark">
      <div className="mx-auto max-w-7xl rounded-3xl border border-surface-border bg-gradient-to-r from-surface-dark via-card-dark to-surface-dark p-7 md:p-10">
        <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">What You Get</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary">Clear, Practical Value</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {service.whatYouGet.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="text-primary mt-1">✔</span>
              <p className="text-secondary leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack({ service }: { service: ServiceContent }) {
  const tech = service.technologies ?? [];

  const groups = {
    Infrastructure: tech.filter((t) => /(Terraform|Ansible|Kubernetes|Docker|CI\/CD)/i.test(t)),
    Cloud: tech.filter((t) => /(AWS|Azure|GCP|Vercel)/i.test(t)),
    Security: tech.filter((t) => /(OWASP|Burp|Nmap|Nessus|Metasploit|Testing|Exploitation|Validation|ASVS)/i.test(t)),
    Development: tech.filter((t) => /(React|Next|Node|Express|Mongo|Postgre|MySQL|GitHub)/i.test(t)),
  };

  const used = new Set(Object.values(groups).flat());
  const misc = tech.filter((t) => !used.has(t));

  if (misc.length > 0) {
    groups.Security = [...groups.Security, ...misc];
  }

  return (
    <section className="px-6 lg:px-20 py-10 bg-background-dark">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">Technology Stack</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-bold text-secondary">Tools and Platforms</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {Object.entries(groups)
            .filter(([, items]) => items.length > 0)
            .map(([group, items]) => (
              <div key={group}>
                <p className="text-sm font-semibold text-primary mb-3">{group}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-surface-border bg-surface-dark px-3 py-1.5 text-xs text-secondary transition-all hover:border-primary hover:text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCTA({ service }: { service: ServiceContent }) {
  return (
    <section className="px-6 lg:px-20 pt-10 pb-24 bg-background-dark">
      <div className="mx-auto max-w-7xl rounded-3xl border border-surface-border bg-card-dark p-8 md:p-12 text-center relative overflow-hidden">
        <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -right-14 -bottom-14 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-black text-secondary leading-[1.08] max-w-4xl mx-auto">
            Build Secure, Scalable Infrastructure with Confidence
          </h2>
          <p className="mt-4 text-muted max-w-2xl mx-auto leading-relaxed font-body">
            Move forward with a clear security-first strategy, expert execution, and practical outcomes.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={service.delivery.primaryHref}
              className="animate-glow inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm md:text-base font-bold text-background-dark transition-all hover:bg-primary-hover"
            >
              Get Consultation
            </Link>
            <Link
              href={service.delivery.secondaryHref ?? "/contact"}
              className="inline-flex h-12 items-center justify-center rounded-full border border-surface-border bg-surface-dark px-8 text-sm md:text-base font-bold text-secondary transition-all hover:border-primary hover:text-primary"
            >
              Talk to Experts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <ServiceHero service={service} />
      <ValueStrip />
      <WhatWeDo service={service} />
      <ServiceProcess service={service} />
      <ServiceFeatures service={service} />
      <ServiceBenefits service={service} />
      {service.technologies && service.technologies.length > 0 && (
        <TechStack service={service} />
      )}
      <ServiceCTA service={service} />
    </>
  );
}
