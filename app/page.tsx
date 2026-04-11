import Link from "next/link";

function HeroSection() {
  return (
    <section className="px-6 py-20 lg:px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="animate-slide-in-left">
          <p className="inline-flex items-center rounded-full border border-surface-border bg-surface-dark px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            KODESEC
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] text-secondary md:text-5xl lg:text-6xl">
            Secure Digital Systems. Built Right. Tested Thoroughly.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg font-body">
            We design, develop, and secure web applications and infrastructure with a security-first approach.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="animate-glow inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-7 text-sm font-bold text-background-dark transition-all hover:bg-primary-hover md:text-base"
            >
              Get a Security Assessment
            </Link>
            <Link
              href="/services"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-surface-border bg-surface-dark px-7 text-sm font-bold text-secondary transition-all hover:border-primary md:text-base"
            >
              View Services
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted">
            <span className="rounded-full border border-surface-border bg-card-dark px-3 py-1">OWASP Aligned</span>
            <span className="rounded-full border border-surface-border bg-card-dark px-3 py-1">Secure Development</span>
            <span className="rounded-full border border-surface-border bg-card-dark px-3 py-1">Manual Testing</span>
          </div>
        </div>

        <div className="animate-slide-in-right">
          <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-surface-dark p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent-cyan/20" />
            <div className="relative grid gap-4">
              <div className="rounded-2xl border border-surface-border bg-card-dark p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-primary">Threat Surface</p>
                <p className="mt-2 text-2xl font-black text-secondary">Mapped & Controlled</p>
              </div>
              <div className="rounded-2xl border border-surface-border bg-card-dark p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-accent-cyan">Security Validation</p>
                <p className="mt-2 text-2xl font-black text-secondary">Evidence-Based</p>
              </div>
              <div className="rounded-2xl border border-surface-border bg-card-dark p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-accent-purple">Delivery Outcome</p>
                <p className="mt-2 text-2xl font-black text-secondary">Actionable Remediation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const items = [
    {
      icon: "code",
      title: "Secure Development",
      desc: "Security-first application engineering from architecture to release.",
    },
    {
      icon: "bug_report",
      title: "Penetration Testing",
      desc: "Manual exploitation to find real risks, not scanner noise.",
    },
    {
      icon: "lan",
      title: "Network Security Testing",
      desc: "Internal attack-path validation across services and segmentation.",
    },
    {
      icon: "cloud_sync",
      title: "Cloud & DevOps",
      desc: "Reliable automation, CI/CD hardening, and secure cloud operations.",
    },
  ];

  return (
    <section className="bg-surface-dark px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="animate-fade-in-up text-3xl font-bold text-secondary md:text-4xl">Services</h2>
        <p className="mt-3 max-w-2xl text-muted font-body">Specialized services aligned to modern cyber and engineering needs.</p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item, idx) => (
            <article
              key={item.title}
              className={`animate-fade-in-up rounded-2xl border border-surface-border bg-card-dark p-6 transition-all hover:-translate-y-1 hover:border-primary/50 ${idx === 1 ? "animation-delay-200" : ""} ${idx === 2 ? "animation-delay-400" : ""} ${idx === 3 ? "animation-delay-600" : ""}`}
            >
              <span className="material-symbols-outlined text-primary">{item.icon}</span>
              <h3 className="mt-4 text-xl font-semibold text-secondary">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted font-body">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  const points = [
    "Security-first development approach",
    "Manual testing (not automated only)",
    "Real-world attack simulation",
    "Actionable reporting",
  ];

  return (
    <section className="px-6 py-20 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center">
        <div className="animate-slide-in-left">
          <h2 className="text-3xl font-bold text-secondary md:text-4xl">
            Security Is Not an Add-On - It&apos;s Our Foundation
          </h2>
          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-2xl border border-surface-border bg-surface-dark p-4">
                <span className="material-symbols-outlined text-primary">check_circle</span>
                <span className="text-sm text-muted md:text-base font-body">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-slide-in-right rounded-2xl border border-surface-border bg-card-dark p-6 md:p-8">
          <div className="rounded-2xl border border-surface-border bg-surface-dark p-6">
            <div className="rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-accent-cyan/20 p-6">
              <p className="text-xs uppercase tracking-[0.14em] text-primary">Security Posture</p>
              <p className="mt-3 text-2xl font-black text-secondary">Validated. Prioritized. Hardened.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted font-body">
                We combine secure engineering and offensive testing to reduce practical business risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { icon: "manage_search", title: "Scope & Analysis" },
    { icon: "account_tree", title: "Architecture Review" },
    { icon: "integration_instructions", title: "Secure Development / Testing" },
    { icon: "travel_explore", title: "Exploitation & Validation" },
    { icon: "description", title: "Reporting & Remediation" },
  ];

  return (
    <section className="bg-surface-dark px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-secondary md:text-4xl">Process</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {steps.map((step, idx) => (
            <div key={step.title} className="rounded-2xl border border-surface-border bg-card-dark p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface-dark text-primary">
                <span className="material-symbols-outlined text-base">{step.icon}</span>
              </div>
              <p className="mt-3 text-xs uppercase tracking-wider text-primary">Step {idx + 1}</p>
              <p className="mt-2 text-sm font-medium text-secondary">{step.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedServiceSection() {
  const bullets = ["OWASP Top 10", "Real exploitation", "Proof-of-concept", "Clear remediation"];

  return (
    <section className="px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-7xl rounded-2xl border border-surface-border bg-card-dark p-8 md:p-10">
        <p className="text-xs uppercase tracking-[0.16em] text-primary">Featured Service</p>
        <h2 className="mt-3 text-3xl font-bold text-secondary md:text-4xl">Manual Penetration Testing</h2>
        <p className="mt-4 max-w-3xl text-muted font-body">
          Professional manual assessment focused on real exploitability, severity-backed findings, and practical remediation planning.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {bullets.map((item) => (
            <div key={item} className="rounded-2xl border border-surface-border bg-surface-dark px-4 py-3 text-sm text-secondary">
              <span className="text-primary">✔</span> {item}
            </div>
          ))}
        </div>
        <Link
          href="/contact"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-7 text-sm font-bold text-background-dark transition-all hover:bg-primary-hover md:text-base"
        >
          Request Testing
        </Link>
      </div>
    </section>
  );
}

function TechStackSection() {
  const tech = ["React", "Next.js", "Node.js", "AWS", "Kubernetes", "MongoDB", "PostgreSQL"];

  return (
    <section className="bg-surface-dark px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-secondary md:text-4xl">Tech Stack</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tech.map((item) => (
            <div key={item} className="rounded-2xl border border-surface-border bg-card-dark px-5 py-4 text-center text-sm font-semibold text-secondary transition-all hover:border-primary/40 hover:text-primary">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AudienceSection() {
  const audience = [
    "Startups",
    "SaaS Companies",
    "Enterprises",
    "Security-focused teams",
    "Businesses handling sensitive data",
  ];

  return (
    <section className="px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-secondary md:text-4xl">Who We Work With</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {audience.map((item) => (
            <div key={item} className="rounded-2xl border border-surface-border bg-surface-dark px-5 py-4 text-secondary">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="px-6 pb-20 lg:px-20">
      <div className="mx-auto max-w-7xl rounded-2xl border border-surface-border bg-card-dark p-8 md:p-12">
        <h2 className="text-3xl font-black text-secondary md:text-5xl">
          Don&apos;t Wait for a Breach to Take Security Seriously
        </h2>
        <div className="mt-7 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="animate-glow inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-8 text-sm font-bold text-background-dark transition-all hover:bg-primary-hover md:text-base"
          >
            Get a Security Audit
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-surface-border bg-surface-dark px-8 text-sm font-bold text-secondary transition-all hover:border-primary md:text-base"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="border-t border-surface-border bg-surface-dark px-6 py-10 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg font-black text-secondary">KODESEC</p>
          <p className="text-sm text-muted">Security-focused engineering and testing services.</p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <Link href="/services" className="text-secondary hover:text-primary">Services</Link>
          <Link href="/contact" className="text-secondary hover:text-primary">Contact</Link>
          <a href="mailto:security@kodesec.com" className="text-secondary hover:text-primary">security@kodesec.com</a>
        </div>
        <p className="text-xs text-muted">© {new Date().getFullYear()} KODESEC. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="bg-background-dark">
      <HeroSection />
      <ServicesSection />
      <WhySection />
      <ProcessSection />
      <FeaturedServiceSection />
      <AudienceSection />
      <CtaSection />
    </main>
  );
}
