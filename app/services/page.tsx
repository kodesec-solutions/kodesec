import React from 'react';
import Link from 'next/link';

export default function Services() {
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
                <span className="text-primary text-xs font-bold tracking-wide uppercase">Cyber Defense Systems</span>
              </div>
              <h1 className="text-white text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Cybersecurity <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Services</span>
              </h1>
              <p className="text-gray-400 text-lg lg:text-xl font-light max-w-xl leading-relaxed font-body">
                Protecting your digital assets from modern threats with cutting-edge defense strategies and real-time monitoring.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-primary hover:bg-primary-hover text-background-dark font-bold text-base px-8 py-3.5 rounded-full transition-all hover:shadow-[0_0_20px_rgba(54,226,123,0.3)]">
                  Start Securing Now
                </button>
                <button className="bg-surface-border/50 hover:bg-surface-border text-white font-medium text-base px-8 py-3.5 rounded-full backdrop-blur-sm transition-all border border-white/10">
                  View Plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Secure Section */}
      <section className="px-6 lg:px-20 py-12 flex justify-center font-display">
        <div className="flex flex-col max-w-[1200px] w-full">
          <div className="flex flex-col gap-4 mb-12">
            <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">What We Secure</h2>
            <p className="text-gray-400 text-lg max-w-2xl font-body">Comprehensive protection layers for every aspect of your digital ecosystem.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'web', title: 'Web Applications', desc: 'Securing frontend interfaces and backend logic from injection and XSS.' },
              { icon: 'cloud', title: 'Cloud Infrastructure', desc: 'Hardening AWS, Azure, and GCP environments against misconfigurations.' },
              { icon: 'hub', title: 'APIs & Microservices', desc: 'Ensuring secure data exchange and authentication protocols.' },
              { icon: 'database', title: 'Database Integrity', desc: 'Protecting critical data stores with advanced encryption.' }
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col gap-4 p-6 rounded-2xl bg-surface-dark transition-all duration-300">
                <div className="size-12 rounded-xl bg-background-dark border border-surface-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-colors">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div>
                  <h3 className="text-white text-lg font-bold mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="px-6 lg:px-20 py-16 flex justify-center bg-surface-dark/30 border-y border-surface-border font-display">
        <div className="flex flex-col max-w-[1200px] w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight">Our Cybersecurity Services</h2>
              <p className="text-gray-400 text-lg font-body">Proactive measures to identify and neutralize risks.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: 'policy', title: 'Vulnerability Assessment', desc: 'Automated and manual scanning of your systems to identify known security loopholes before attackers do.' },
              { icon: 'bug_report', title: 'Penetration Testing', desc: 'Simulated cyberattacks on your computer system to check for exploitable vulnerabilities.' },
              { icon: 'code', title: 'Secure Code Review', desc: 'Line-by-line analysis of your source code to uncover security flaws in the development phase.' },
              { icon: 'verified_user', title: 'Compliance Support', desc: 'Assistance with SOC2, GDPR, HIPAA, and ISO 27001 standards to ensure regulatory adherence.' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-5 p-6 rounded-2xl bg-background-dark border border-surface-border hover:border-primary/30 transition-all">
                <div className="shrink-0 mt-1">
                  <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-body">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Standards */}
      <section className="px-6 lg:px-20 py-20 flex justify-center font-display">
        <div className="flex flex-col items-center max-w-[1200px] w-full text-center">
          <h2 className="text-white text-2xl font-bold mb-10">Built on Industry Standards & Tools</h2>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {[
              { icon: 'shield', text: 'OWASP Top 10' },
              { icon: 'gpp_good', text: 'ISO 27001' },
              { icon: 'lock', text: 'NIST Framework' },
              { icon: 'security_update_good', text: 'GDPR Compliant' },
              { icon: 'terminal', text: 'Burp Suite' }
            ].map((item, idx) => (
              <div key={idx} className="px-6 py-3 rounded-full border border-surface-border bg-surface-dark text-gray-300 font-semibold text-sm flex items-center gap-2 hover:border-primary/50 hover:text-white transition-colors cursor-default">
                <span className="material-symbols-outlined text-primary text-lg">{item.icon}</span> {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 lg:px-20 pb-24 flex justify-center font-display">
        <div className="w-full max-w-[100%]">
          <div className="bg-gradient-to-br from-[#1a4d3a] via-[#0f2a2e] to-[#1a1f3a] rounded-[2rem] p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10">
              <span className="material-symbols-outlined text-[200px] lg:text-[100px] text-primary" style={{fontSize: '400px'}}>lock</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-white text-3xl md:text-5xl font-bold max-w-2xl leading-tight">Ready to fortify your business against cyber threats?</h2>
              <p className="text-gray-300 text-lg max-w-xl font-body">Get a comprehensive security audit tailored to your infrastructure today.</p>
              <Link href="/contact">
                <button className="mt-4 bg-primary hover:bg-primary-hover text-background-dark font-bold text-lg px-10 py-4 rounded-full transition-all shadow-lg shadow-primary/20">
                  Request Security Audit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}