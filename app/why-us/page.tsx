import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/app/data/services';

export default function WhyUs() {
  const totalCapabilities = servicesData.reduce(
    (total, service) => total + service.scopeFeatures.length,
    0
  );

  const trustPrinciples = [
    {
      icon: 'visibility',
      title: 'Transparent by Default',
      desc: 'No black-box execution. You see scope, findings, risks, and remediation priorities in clear language.'
    },
    {
      icon: 'verified_user',
      title: 'Security-First Execution',
      desc: 'We build and assess with threat awareness from day one, not as a final checkbox before delivery.'
    },
    {
      icon: 'fact_check',
      title: 'Evidence Over Assumptions',
      desc: 'Findings are validated, reproducible, and mapped to practical remediation paths your team can execute.'
    },
    {
      icon: 'lan',
      title: 'Engineering + Ops Alignment',
      desc: 'Development, infrastructure, and security controls are aligned to support stable and scalable growth.'
    }
  ];

  const engagementModel = [
    {
      title: 'Context and Risk Alignment',
      desc: 'We begin by understanding business priorities, technical architecture, and the most likely attack paths.'
    },
    {
      title: 'Controlled Technical Execution',
      desc: 'Whether development, infrastructure automation, or pentesting, execution follows defined scope and controls.'
    },
    {
      title: 'Actionable Reporting',
      desc: 'You receive structured findings with severity rationale, business impact, and implementation-focused guidance.'
    },
    {
      title: 'Hardening and Validation',
      desc: 'We support remediation verification so fixes are effective and risk is measurably reduced.'
    }
  ];

  const compareRows = [
    {
      point: 'Approach',
      typical: 'Generic checklist execution',
      kodesec: 'Threat-aware, context-driven engagement'
    },
    {
      point: 'Reporting',
      typical: 'Long reports with low actionability',
      kodesec: 'Clear prioritization with practical remediation'
    },
    {
      point: 'Delivery Style',
      typical: 'Fragmented dev and security handoff',
      kodesec: 'Integrated development, infrastructure, and security'
    },
    {
      point: 'Business Value',
      typical: 'Compliance-only outcomes',
      kodesec: 'Security posture improvement with operational impact'
    }
  ];

  return (
    <div className="bg-background-dark min-h-screen font-display">
      {/* Hero Narrative */}
      <section className="w-full px-4 py-14 md:px-10 md:py-20">
        <div className="mx-auto max-w-[1300px]">
          <div className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-[linear-gradient(145deg,#101820_0%,#12252e_42%,#14172a_100%)] p-7 md:p-10 lg:p-14">
            <div className="absolute -left-28 -top-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-cyan-300/10 blur-3xl" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5">
                  <span className="material-symbols-outlined text-sm text-primary">workspace_premium</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Trust and Execution</span>
                </div>

                <h1 className="mt-6 text-4xl md:text-6xl font-black leading-[1.03] text-white">
                  Why Clients Choose
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-300">KODESEC as a Long-Term Partner</span>
                </h1>

                <p className="mt-6 max-w-3xl text-base md:text-lg leading-relaxed text-gray-300 font-body">
                  Choosing a cybersecurity and engineering partner is about confidence. We earn that confidence through transparent delivery, validated technical depth, and measurable risk reduction across application, infrastructure, and internal network environments.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-[#132218] transition-all hover:bg-primary-hover">
                    Start With a Consultation
                  </Link>
                  <Link href="/services" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-base font-bold text-white transition-all hover:bg-white/10">
                    Review Service Scope
                  </Link>
                </div>
              </div>

              <aside className="rounded-[1.4rem] border border-white/10 bg-black/25 p-5 md:p-6 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.14em] text-primary font-semibold">Client Confidence Snapshot</p>
                <div className="mt-4 grid gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-2xl font-black text-white">4</p>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Specialized Service Tracks</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-2xl font-black text-white">{totalCapabilities}+</p>
                    <p className="text-xs uppercase tracking-wider text-gray-400 mt-1">Security and Delivery Capabilities</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-gray-200 leading-relaxed font-body">Structured methodology with controlled testing boundaries, verified findings, and remediation-first reporting.</p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Principles */}
      <section className="w-full px-4 py-12 md:px-10">
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What Builds Trust in Our Engagements</h2>
            <p className="mt-3 text-gray-400 max-w-3xl font-body">These principles shape how we deliver and why clients continue working with us beyond a single project cycle.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trustPrinciples.map((item) => (
              <article key={item.title} className="rounded-[1.4rem] border border-white/10 bg-surface-dark/55 p-6 transition-all hover:border-primary/40 hover:-translate-y-1">
                <div className="h-11 w-11 rounded-xl bg-primary/12 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed font-body">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="w-full px-4 py-6 md:px-10 md:py-10">
        <div className="mx-auto max-w-[1300px] rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,#0f1726_0%,#111c30_55%,#0e1622_100%)] p-7 md:p-10">
          <div className="mb-8">
            <div>
              <p className="text-primary text-xs tracking-[0.16em] uppercase font-semibold">Our Method</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">How We Turn Security Into Outcomes</h2>
            </div>
          </div>
          <div className="space-y-4">
            {engagementModel.map((item, idx) => (
              <div key={item.title} className="grid md:grid-cols-[90px_1fr] gap-4 rounded-2xl border border-white/10 bg-black/20 p-5">
                <div className="text-primary font-black text-3xl leading-none">{String(idx + 1).padStart(2, '0')}</div>
                <div>
                  <h3 className="text-white text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-gray-400 leading-relaxed font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="w-full px-4 py-12 md:px-10">
        <div className="mx-auto max-w-[1300px] rounded-[1.8rem] border border-white/10 bg-surface-dark/50 overflow-hidden">
          <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.03]">
            <div className="p-4 text-sm font-semibold text-gray-300">Decision Factor</div>
            <div className="p-4 text-sm font-semibold text-gray-500">Typical Vendor</div>
            <div className="p-4 text-sm font-semibold text-primary">KODESEC</div>
          </div>
          {compareRows.map((row) => (
            <div key={row.point} className="grid grid-cols-3 border-b border-white/10 last:border-b-0">
              <div className="p-4 text-sm font-semibold text-white">{row.point}</div>
              <div className="p-4 text-sm text-gray-500 font-body">{row.typical}</div>
              <div className="p-4 text-sm text-gray-200 font-body">{row.kodesec}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Links */}
      <section className="w-full px-4 pb-14 md:px-10">
        <div className="mx-auto max-w-[1300px]">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Service Tracks We Execute</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {servicesData.map((service, idx) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:border-primary/40 transition-colors">
                <p className="text-xs uppercase tracking-wider text-primary">Track {idx + 1}</p>
                <p className="mt-1 text-sm font-semibold text-white leading-snug">{service.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full px-4 pb-20 md:px-10">
        <div className="mx-auto max-w-[1180px]">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[radial-gradient(circle_at_0%_0%,rgba(54,226,123,0.2),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(34,211,238,0.2),transparent_43%),linear-gradient(135deg,#101426_0%,#131d33_55%,#182018_100%)] p-7 md:p-10 lg:p-12">
            <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:26px_26px]" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
              <div>
                <p className="text-primary text-xs uppercase tracking-[0.16em] font-semibold">Build Confidence Before You Commit</p>
                <h2 className="mt-3 text-3xl md:text-5xl font-black text-white leading-[1.06]">
                  Make the Right Security Decision.
                  <br />
                  Start With a Clear, Scoped Engagement.
                </h2>
                <p className="mt-4 max-w-2xl text-gray-300 text-base md:text-lg leading-relaxed font-body">
                  Tell us your objectives and constraints. We will map the right service path, define boundaries, and provide a delivery plan your team can trust.
                </p>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-[#122118] transition-all hover:bg-primary-hover">
                    Request a Scoped Plan
                  </Link>
                  <Link href="/services" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-base font-bold text-white transition-all hover:bg-white/10">
                    Compare All Services
                  </Link>
                </div>
              </div>

              <div className="grid gap-3 lg:pt-2">
                {[
                  { icon: 'shield_lock', label: 'Security-first delivery from day one' },
                  { icon: 'target', label: 'Scope, timeline, and risk priorities defined upfront' },
                  { icon: 'approval', label: 'Validated findings and remediation-focused outcomes' }
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-white flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">{item.icon}</span>
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}