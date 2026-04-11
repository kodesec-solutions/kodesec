"use client";

import { useEffect, useMemo, useState } from "react";

type PolicySection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

function PrivacyHero({ lastUpdated }: { lastUpdated: string }) {
  return (
    <section className="px-6 py-20 lg:px-20">
      <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
        <p className="inline-flex items-center rounded-full border border-surface-border bg-surface-dark px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Legal
        </p>
        <h1 className="mt-6 text-4xl font-black text-secondary md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg font-body">
          Your privacy and data security are important to us. This policy explains how
          KODESEC collects, uses, and protects your information.
        </p>
        <p className="mt-4 text-sm text-muted">
          Last updated: <span className="text-primary">{lastUpdated}</span>
        </p>
      </div>
    </section>
  );
}

function PrivacySidebar({
  sections,
  activeId,
}: {
  sections: PolicySection[];
  activeId: string;
}) {
  return (
    <aside className="hidden lg:block lg:sticky lg:top-28 h-fit">
      <nav className="rounded-2xl border border-surface-border bg-surface-dark p-4">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Sections
        </p>
        <ul className="space-y-1">
          {sections.map((section) => {
            const isActive = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block rounded-xl px-3 py-2 text-sm transition-all ${
                    isActive
                      ? "bg-card-dark text-primary border border-surface-border"
                      : "text-muted hover:text-secondary hover:bg-card-dark"
                  }`}
                >
                  {section.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

function PrivacyContent({ sections }: { sections: PolicySection[] }) {
  return (
    <div className="space-y-12">
      {sections.map((section, index) => (
        <article
          key={section.id}
          id={section.id}
          className={`animate-fade-in-up scroll-mt-28 rounded-2xl border border-surface-border bg-card-dark p-6 md:p-8 ${
            index === 1
              ? "animation-delay-200"
              : index === 2
              ? "animation-delay-400"
              : index === 3
              ? "animation-delay-600"
              : ""
          }`}
        >
          <h2 className="text-2xl font-bold text-secondary">{section.title}</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted md:text-base font-body">
            {section.content}
          </div>
        </article>
      ))}
    </div>
  );
}

export default function PrivacyPolicyPage() {
  const sections = useMemo<PolicySection[]>(
    () => [
      {
        id: "introduction",
        title: "Introduction",
        content: (
          <>
            <p>
              This Privacy Policy explains how <span className="text-primary">KODESEC</span>
              {" "}collects, uses, and safeguards information when you use our website or
              engage our services.
            </p>
            <p>
              We are committed to maintaining trust through responsible data handling,
              transparent communication, and security-focused operational practices.
            </p>
          </>
        ),
      },
      {
        id: "information-we-collect",
        title: "Information We Collect",
        content: (
          <>
            <p>We may collect the following categories of information:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="text-secondary">Personal data:</span> name, email address,
                company name, and related contact details.
              </li>
              <li>
                <span className="text-secondary">Usage data:</span> browser information,
                device details, and interactions with our website.
              </li>
              <li>
                <span className="text-secondary">Communication data:</span> inquiries,
                support messages, and project-related correspondence.
              </li>
            </ul>
          </>
        ),
      },
      {
        id: "how-we-use-information",
        title: "How We Use Information",
        content: (
          <ul className="list-disc space-y-2 pl-5">
            <li>Provide and deliver requested services and consultations.</li>
            <li>Improve service quality, reliability, and user experience.</li>
            <li>Communicate project updates, responses, and essential notices.</li>
            <li>Support security monitoring, fraud prevention, and risk mitigation.</li>
          </ul>
        ),
      },
      {
        id: "data-protection",
        title: "Data Protection",
        content: (
          <>
            <p>
              We apply layered safeguards to protect data, including encrypted
              transmission, secure storage controls, and restricted access based on
              operational need.
            </p>
            <p>
              Access to sensitive data is limited to authorized personnel under
              confidentiality and security obligations.
            </p>
          </>
        ),
      },
      {
        id: "data-sharing",
        title: "Data Sharing",
        content: (
          <>
            <p>
              KODESEC <span className="text-primary">does not sell personal data</span>.
            </p>
            <p>Information may only be shared when necessary for:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Service delivery through trusted operational providers.</li>
              <li>Compliance with legal obligations or lawful requests.</li>
              <li>Protection of rights, security, and system integrity.</li>
            </ul>
          </>
        ),
      },
      {
        id: "cookies",
        title: "Cookies",
        content: (
          <>
            <p>
              Our website may use cookies and similar technologies to enhance
              functionality, measure performance, and improve user experience.
            </p>
            <p>
              You can control cookie preferences through your browser settings,
              though some features may be impacted when cookies are disabled.
            </p>
          </>
        ),
      },
      {
        id: "user-rights",
        title: "User Rights",
        content: (
          <>
            <p>Depending on applicable laws, you may have the right to:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request correction of inaccurate or outdated information.</li>
              <li>Request deletion of personal data where legally applicable.</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the details below.
            </p>
          </>
        ),
      },
      {
        id: "data-retention",
        title: "Data Retention",
        content: (
          <>
            <p>
              We retain information only for as long as needed to fulfill service,
              legal, and operational requirements.
            </p>
            <p>
              When retention is no longer required, data is securely deleted or
              anonymized based on internal policy.
            </p>
          </>
        ),
      },
      {
        id: "security-measures",
        title: "Security Measures",
        content: (
          <>
            <p>
              As a cybersecurity-focused company, we apply practical security controls
              such as secure communication channels, encrypted handling practices,
              and continuous security-oriented workflows.
            </p>
            <p>
              While no method is fully risk-free, we continuously improve controls
              to maintain robust protection standards.
            </p>
          </>
        ),
      },
      {
        id: "contact-information",
        title: "Contact Information",
        content: (
          <>
            <p>
              For privacy questions or data-related requests, contact us at:
            </p>
            <p>
              <a
                href="mailto:hello@kodesec.solutions"
                className="text-primary hover:underline"
              >
                hello@kodesec.solutions
              </a>
            </p>
          </>
        ),
      },
    ],
    []
  );

  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const node = document.getElementById(section.id);
      if (!node) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(section.id);
            }
          });
        },
        {
          rootMargin: "-35% 0px -55% 0px",
          threshold: 0.01,
        }
      );

      observer.observe(node);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  return (
    <main className="min-h-screen bg-background-dark">
      <PrivacyHero lastUpdated="April 11, 2026" />

      <section className="px-6 pb-20 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[260px_1fr]">
          <PrivacySidebar sections={sections} activeId={activeId} />
          <PrivacyContent sections={sections} />
        </div>
      </section>
    </main>
  );
}
