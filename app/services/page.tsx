import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/app/data/services';

export default function Services() {
  const serviceIcons = ['verified_user', 'cloud_sync', 'policy', 'lan'];
  const servicePillars = [
    {
      icon: 'deployed_code',
      title: 'Secure Application Development',
      desc: 'Cybersecurity-first web and platform engineering from architecture to secure production launch.'
    },
    {
      icon: 'settings_suggest',
      title: 'Infrastructure Automation',
      desc: 'Automated provisioning, deployment, and cloud operations for speed, consistency, and scale.'
    },
    {
      icon: 'web_traffic',
      title: 'Manual Web Pentesting',
      desc: 'Controlled exploitation testing to uncover real web vulnerabilities with actionable fixes.'
    },
    {
      icon: 'router',
      title: 'Network Pentesting',
      desc: 'Internal security assessment for lateral movement, privilege escalation, and segmentation risks.'
    }
  ];

  const technologyChips = Array.from(
    new Set(servicesData.flatMap((service) => service.technologies ?? []))
  ).slice(0, 14);

  const getServicePreview = (text: string) => {
    if (text.length <= 190) return text;
    return `${text.slice(0, 187)}...`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-6 lg:px-20 py-12 lg:py-24 flex justify-center overflow-hidden font-display">
        <div className="flex flex-col max-w-[1200px] w-full gap-10">
          <div className="rounded-[2.5rem] bg-surface-dark p-8 lg:p-16 relative overflow-hidden min-h-[500px] flex flex-col justify-center items-start">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3hsnGhLxUfRSz0lPhrt4kMDIpSJlm_MXgfVk4vHWD-LISBAGoKSM-P4HW3pWLDbHBn9KDkNkw5SIb06BLYiaP6cU1stqZQe8CxbQNfZqq2d2aVOnVSygJjNtWNesOA4C1HT5MKMI-LFPQHJZH_HQ2lPvDtpbMigz9OumOvTSrccKEWdr5v4aMxmiZYFA3w4B9dZ4ZnUFwokEipz9my7vL8LpYlWSDRcXBL09xQiVpH-HKFObJocmJNoKdht6wievL1Dm60vVdOUr2")'}}></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/80 to-transparent z-0"></div>
            <div className="relative z-10 max-w-2xl flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 w-fit">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary text-xs font-bold tracking-wide uppercase">KODESEC Service Portfolio</span>
              </div>
              <h1 className="text-white text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Cybersecurity <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Services</span>
              </h1>
              <p className="text-gray-400 text-lg lg:text-xl font-light max-w-xl leading-relaxed font-body">
                Security-led engineering, infrastructure automation, and penetration testing services designed to protect modern applications and internal environments.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/contact" className="bg-primary hover:bg-primary-hover text-background-dark font-bold text-base px-8 py-3.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(54,226,123,0.3)]">
                  Start Securing Now
                </Link>
                <Link href="#service-list" className="bg-surface-border/50 hover:bg-surface-border text-white font-medium text-base px-8 py-3.5 rounded-full backdrop-blur-sm transition-all border border-white/10">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Secure Section */}
      <section className="px-6 lg:px-20 py-12 flex justify-center font-display">
        <div className="flex flex-col max-w-[1200px] w-full">
          <div className="flex flex-col gap-4 mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">What We Deliver</h2>
            <p className="text-gray-400 text-lg max-w-2xl font-body">Four focused services that strengthen your application and infrastructure security posture end to end.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicePillars.map((item, idx) => (
              <div key={idx} className="group flex flex-col gap-4 p-6 rounded-2xl bg-surface-dark/90 border border-surface-border transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_14px_35px_rgba(0,0,0,0.28)]">
                <div className="size-12 rounded-xl bg-background-dark border border-surface-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section id="service-list" className="px-6 lg:px-20 py-16 flex justify-center bg-surface-dark/30 border-y border-surface-border font-display">
        <div className="flex flex-col max-w-[1200px] w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">Our Cybersecurity Services</h2>
              <p className="text-gray-400 text-lg font-body">Choose a service to view complete scope, approach, and delivery details.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex gap-5 p-6 rounded-2xl bg-background-dark border border-surface-border hover:border-primary/40 transition-all hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(0,0,0,0.3)]"
              >
                <div className="shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary text-3xl">{serviceIcons[idx] ?? 'shield'}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-xl font-bold group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-body">{getServicePreview(service.shortPositioning)}</p>
                  <span className="text-primary text-sm font-semibold mt-2 inline-flex items-center gap-1">
                    Explore service
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Standards */}
      <section className="px-6 lg:px-20 py-20 flex justify-center font-display">
        <div className="flex flex-col items-center max-w-[1200px] w-full text-center">
          <h2 className="text-white text-2xl font-bold mb-10">Frameworks, Standards & Platforms We Work With</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {technologyChips.map((tech, idx) => (
              <div key={idx} className="px-6 py-3 rounded-full border border-surface-border bg-surface-dark text-gray-300 font-semibold text-sm flex items-center gap-2 hover:border-primary/50 hover:text-white transition-colors cursor-default">
                <span className="material-symbols-outlined text-primary text-lg">memory</span> {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 lg:px-20 pb-24 flex justify-center font-display">
        <div className="w-full max-w-[1200px]">
          <div className="rounded-[2rem] p-[1px] bg-gradient-to-r from-primary/50 via-cyan-300/40 to-white/20 relative overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
            <div className="relative rounded-[2rem] bg-[radial-gradient(circle_at_14%_20%,rgba(54,226,123,0.2),transparent_45%),radial-gradient(circle_at_85%_75%,rgba(34,211,238,0.16),transparent_42%),linear-gradient(135deg,#0b111f_0%,#0e1a2c_55%,#12142b_100%)] p-8 md:p-12 lg:p-14 overflow-hidden">
              <div className="absolute -top-14 -right-10 w-56 h-56 rounded-full border border-white/10 bg-white/5 blur-2xl" />
              <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-full border border-primary/20 bg-primary/10 blur-2xl" />

              <div className="relative z-10 grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
                <div className="text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 mb-5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-primary text-xs font-bold tracking-[0.16em] uppercase">Security Engagement</span>
                  </div>
                  <h2 className="text-white text-3xl md:text-5xl font-bold leading-[1.08] max-w-3xl">
                    Let&apos;s define your security scope and ship with confidence.
                  </h2>
                  <p className="mt-5 text-gray-300 text-base md:text-lg max-w-2xl font-body leading-relaxed">
                    From secure development to infrastructure automation and penetration testing, we deliver practical security outcomes your team can implement fast.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-background-dark font-bold text-base px-8 py-3.5 rounded-full transition-all shadow-lg shadow-primary/20"
                    >
                      Book a Consultation
                      <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white font-semibold text-base px-8 py-3.5 rounded-full transition-all"
                    >
                      Request Security Assessment
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
                  {[
                    { icon: 'schedule', title: 'Fast Kickoff', text: 'Scope alignment and engagement planning without friction.' },
                    { icon: 'verified', title: 'Actionable Reports', text: 'Clear findings, real risk context, and remediation guidance.' },
                    { icon: 'shield_lock', title: 'Security-First Delivery', text: 'Built for resilience, scale, and long-term maintainability.' }
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
                      <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-primary">{item.icon}</span>
                        <div>
                          <p className="text-white font-semibold text-sm">{item.title}</p>
                          <p className="text-gray-400 text-xs leading-relaxed mt-1">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}