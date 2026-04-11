type TermsSection = {
  title: string;
  body: React.ReactNode;
};

function TermsHero({ lastUpdated }: { lastUpdated: string }) {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
        <p className="inline-flex items-center rounded-full border border-surface-border bg-surface-dark px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Legal
        </p>
        <h1 className="mt-6 text-4xl font-black text-secondary md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg font-body">
          These terms govern your use of KODESEC services. By using our services,
          you agree to these terms.
        </p>
        <p className="mt-4 text-sm text-muted">
          Last updated: <span className="text-primary">{lastUpdated}</span>
        </p>
      </div>
    </section>
  );
}

function TermsContent({ sections }: { sections: TermsSection[] }) {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-4xl rounded-2xl border border-surface-border bg-card-dark p-6 md:p-8 lg:p-10">
        <div className="space-y-10">
          {sections.map((section, index) => (
            <article
              key={section.title}
              className={`animate-fade-in-up border-b border-surface-border pb-8 last:border-b-0 last:pb-0 ${
                index === 1
                  ? "animation-delay-200"
                  : index === 2
                  ? "animation-delay-400"
                  : index === 3
                  ? "animation-delay-600"
                  : ""
              }`}
            >
              <h2 className="text-2xl font-bold text-secondary">
                <span className="mr-2 text-primary">{index + 1}.</span>
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted md:text-base font-body">
                {section.body}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function TermsOfServicePage() {
  const sections: TermsSection[] = [
    {
      title: "Introduction",
      body: (
        <>
          <p>
            These Terms of Service form a legal agreement between you and
            <span className="text-primary"> KODESEC</span>. By accessing or using our
            website or services, you confirm acceptance of these terms.
          </p>
          <p>
            If you do not agree with any part of these terms, please discontinue use
            of our services.
          </p>
        </>
      ),
    },
    {
      title: "Services Overview",
      body: (
        <>
          <p>KODESEC provides professional technology and security services, including:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Cybersecurity assessments and security consulting</li>
            <li>Secure application development</li>
            <li>Manual penetration testing and validation</li>
            <li>Infrastructure automation and cloud-related support</li>
          </ul>
        </>
      ),
    },
    {
      title: "User Responsibilities",
      body: (
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide accurate and complete information when requested.</li>
          <li>Use services in compliance with applicable laws and regulations.</li>
          <li>Not misuse systems, tools, or service outputs for harmful purposes.</li>
        </ul>
      ),
    },
    {
      title: "Acceptable Use",
      body: (
        <ul className="list-disc space-y-2 pl-5">
          <li>No illegal activities or unlawful conduct.</li>
          <li>No unauthorized access attempts against systems or networks.</li>
          <li>No abusive, deceptive, or malicious use of KODESEC services.</li>
        </ul>
      ),
    },
    {
      title: "Intellectual Property",
      body: (
        <>
          <p>
            All proprietary materials, systems, branding, and content provided by
            KODESEC remain the intellectual property of KODESEC unless otherwise
            agreed in writing.
          </p>
          <p>
            Unauthorized copying, distribution, modification, or reuse is prohibited.
          </p>
        </>
      ),
    },
    {
      title: "Confidentiality",
      body: (
        <>
          <p>
            Both parties agree to protect confidential and sensitive information
            disclosed during service engagement.
          </p>
          <p>
            Confidential information shall not be shared with unauthorized parties
            except where legally required.
          </p>
        </>
      ),
    },
    {
      title: "Payments and Billing",
      body: (
        <>
          <p>
            Services may be billed based on project scope, milestones, or custom
            engagement terms.
          </p>
          <p>
            Pricing is typically customized based on technical requirements and
            complexity. Billing terms are defined in service agreements or proposals.
          </p>
        </>
      ),
    },
    {
      title: "Limitation of Liability",
      body: (
        <>
          <p>
            To the maximum extent permitted by law, KODESEC is not liable for
            indirect, incidental, special, or consequential damages.
          </p>
          <p>
            Services are provided on an <span className="text-primary">as is</span> and
            <span className="text-primary"> as available</span> basis, subject to agreed
            scope and service terms.
          </p>
        </>
      ),
    },
    {
      title: "Termination",
      body: (
        <>
          <p>
            KODESEC reserves the right to suspend or terminate access to services if
            misuse, policy violation, or security risk is detected.
          </p>
          <p>
            Clients may also terminate engagements subject to applicable contractual
            and billing obligations.
          </p>
        </>
      ),
    },
    {
      title: "Changes to Terms",
      body: (
        <>
          <p>
            We may update these Terms of Service at any time to reflect legal,
            operational, or service changes.
          </p>
          <p>
            Continued use of our services after updates indicates acceptance of the
            revised terms.
          </p>
        </>
      ),
    },
    {
      title: "Governing Law",
      body: (
        <p>
          These terms are governed by applicable laws of relevant jurisdiction,
          without limiting any mandatory rights available under local law.
        </p>
      ),
    },
    {
      title: "Contact Information",
      body: (
        <p>
          For questions regarding these terms, contact us at
          <a href="mailto:hello@kodesec.solutions" className="ml-1 text-primary hover:underline">
            hello@kodesec.solutions
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-background-dark">
      <TermsHero lastUpdated="April 11, 2026" />
      <TermsContent sections={sections} />
    </main>
  );
}
