import React from 'react';
import Link from 'next/link';

export default function WhyUs() {
  return (
    <div className="bg-background-light dark:bg-[#112117] min-h-screen font-display">
      {/* HeroSection */}
      <section className="w-full px-4 py-12 md:px-10 md:py-20 lg:py-24">
        <div className="mx-auto max-w-[1300px] flex flex-col items-center">
          <div className="relative flex min-h-[480px] w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[2.5rem] bg-[#1b3224] p-8 text-center shadow-2xl shadow-primary/5 ring-1 ring-white/10 md:p-16">
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-overlay" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBuZZdmknJlgbsXGy3w4ERokbKt9BCch04cA1xBqzxMWpifKhFhAjrfyVHAgKnReHl9C7zBQHYGWM37hDl749EMY0Y7ZmRpO50YR2K9bUPfTJVzbw8o_7yr-BOEJOFso3xgmfstzadcokPimi1Kb516vgxZ6WR9g2KcbYsSyKi14V6K98ZIjFXfG6U-PGSd1ZzYIF2xySkkI0t6WKpgt0HrDX6enXIvlDNtEIB0n_Vl5GWCaTMcA23KweyJDIpWWuwWA5Cfod3BUkmd")'}}></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#112117] via-transparent to-transparent"></div>
            <div className="relative z-10 flex flex-col gap-6 max-w-2xl">
              <div className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-1.5 backdrop-blur-sm mx-auto">
                <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Trusted by Industry Leaders</span>
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                Built for <span className="text-primary">Security</span>.<br />Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Growth</span>.
              </h1>
              <p className="text-base text-gray-300 md:text-lg max-w-xl mx-auto leading-relaxed font-body">
                Bridging the gap between startup agility and enterprise-grade security. We deliver secure, scalable solutions for modern businesses who refuse to compromise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                <Link href="/contact" className="flex h-12 items-center justify-center rounded-full bg-primary px-8 text-base font-bold text-[#122118] transition-all hover:bg-white hover:scale-105">
                  Start a Project
                </Link>
                <button className="flex h-12 items-center justify-center rounded-full border border-surface-border bg-surface-dark/50 px-8 text-base font-bold text-white transition-all hover:bg-surface-border hover:scale-105 backdrop-blur-sm">
                  Our Principles
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FeatureSection: Hybrid Approach */}
      <section className="w-full px-4 py-12 md:px-10">
        <div className="mx-auto flex max-w-[1300px] flex-col gap-10 md:gap-16">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                Startup Mindset,<br /><span className="text-primary">Enterprise Discipline</span>
              </h2>
              <p className="text-lg text-gray-400 leading-relaxed font-body">
                In today's threat landscape, speed shouldn't come at the cost of safety. We combine the rapid innovation of a startup with the rigor and compliance of a Fortune 500 company.
              </p>
              <div className="mt-4 flex flex-col gap-4">
                <div className="flex items-start gap-4 rounded-xl border border-surface-border bg-surface-dark/50 p-4 transition-all hover:border-primary/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">rocket_launch</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-white">Agile Execution</h3>
                    <p className="text-sm text-gray-400 font-body">Rapid iteration and deployment cycles. We ship features fast, but never break things.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-xl border border-surface-border bg-surface-dark/50 p-4 transition-all hover:border-primary/50">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined">shield_lock</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold text-white">Compliance Ready</h3>
                    <p className="text-sm text-gray-400 font-body">Built to meet SOC2, ISO 27001, and GDPR standards from the very first commit.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center lg:h-full min-h-[300px]">
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-surface-border bg-[#0d1612]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
                <div className="flex h-full flex-col justify-between p-6">
                  <div className="flex justify-between items-center text-gray-500 border-b border-white/5 pb-4 mb-4">
                    <span className="text-xs font-mono">kodesec-security-protocol.sh</span>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                    </div>
                  </div>
                  <div className="space-y-3 font-mono text-sm">
                    <div className="flex gap-3">
                      <span className="text-gray-600">01</span>
                      <span className="text-purple-400">import</span> <span className="text-white">SecurityContext</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-600">02</span>
                      <span className="text-blue-400">const</span> <span className="text-primary">deploy</span> <span className="text-white">=</span> <span className="text-blue-400">async</span> <span className="text-white">() =&gt; &#123;</span>
                    </div>
                    <div className="flex gap-3 pl-8 border-l border-white/10">
                      <span className="text-gray-600">03</span>
                      <span className="text-white">await</span> <span className="text-yellow-300">PenetrationTest.run();</span>
                    </div>
                    <div className="flex gap-3 pl-8 border-l border-white/10">
                      <span className="text-gray-600">04</span>
                      <span className="text-white">return</span> <span className="text-green-400">Secure.build();</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-gray-600">05</span>
                      <span className="text-white">&#125;</span>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-xs text-primary">
                    <span className="material-symbols-outlined text-sm animate-pulse">circle</span>
                    <span>System Secure. All checks passed.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Core Philosophy */}
      <section className="w-full px-4 py-12 md:px-10">
        <div className="mx-auto max-w-[1300px]">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1a2b3a] via-[#0f2a2e] to-[#1a1f3a] p-8 md:p-12">
            <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1 space-y-6">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary border border-primary/20">
                  Core Philosophy
                </div>
                <h2 className="text-3xl font-bold text-white md:text-4xl">Security-by-Design</h2>
                <p className="text-gray-400 leading-relaxed font-body">
                  Security isn't an afterthought or a patch applied at the end. At Kodesec, it is embedded in the architecture, the code, and the culture. Every line of code is written with a defense-in-depth mentality.
                </p>
                <ul className="space-y-3 mt-4">
                  {[
                    'Automated vulnerability scanning',
                    'Zero-trust architecture principles',
                    'Regular third-party auditing'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20">
                        <span className="material-symbols-outlined text-primary text-sm">check</span>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative h-64 w-64 md:h-80 md:w-80">
                  {/* Outer rotating dashed circle */}
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/10 animate-spin-slow"></div>
                  
                  {/* Middle rotating solid circle */}
                  <div className="absolute inset-8 rounded-full border border-white/5 animate-reverse-spin"></div>
                  
                  {/* Inner circle with lock icon */}
                  <div className="absolute inset-16 rounded-full bg-[#0a1520]/95 flex items-center justify-center backdrop-blur-sm shadow-2xl shadow-primary/20">
                    <span className="material-symbols-outlined text-7xl text-primary" style={{fontSize: '100px'}}>lock</span>
                  </div>
                  
                  {/* Small icon badges positioned around */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a1520] border border-white/10 p-2.5 rounded-xl shadow-lg">
                    <span className="material-symbols-outlined text-gray-400 text-base">encrypted</span>
                  </div>
                  <div className="absolute bottom-8 right-5 translate-x-2 bg-[#0a1520] border border-white/10 p-2.5 rounded-xl shadow-lg">
                    <span className="material-symbols-outlined text-gray-400 text-base">key</span>
                  </div>
                  <div className="absolute bottom-8 left-5 -translate-x-2 bg-[#0a1520] border border-white/10 p-2.5 rounded-xl shadow-lg">
                    <span className="material-symbols-outlined text-gray-400 text-base">fingerprint</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Values & Partnership */}
      <section className="w-full px-4 py-16 md:px-10">
        <div className="mx-auto max-w-[1300px] flex flex-col gap-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white md:text-4xl">More Than Just Code</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-body">We build relationships based on transparency and shared success.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: 'diamond', title: 'Quality-Driven', desc: "We don't just ship; we polish. Our QA process is rigorous, ensuring your product is robust, scalable, and delightful to use." },
              { icon: 'visibility', title: 'Transparent Comms', desc: "No black boxes. You get direct access to engineers, clear roadmaps, and honest weekly updates on progress and blockers." },
              { icon: 'handshake', title: 'Long-term Partner', desc: "We grow as you scale. From MVP to IPO, our team adapts to your changing needs, providing continuity and institutional knowledge." }
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col gap-4 rounded-[2rem] border border-surface-border bg-surface-dark p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#122118] text-white border border-surface-border transition-colors">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-gray-400 font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="w-full px-4 pb-20 pt-10 md:px-10">
        <div className="mx-auto max-w-[1300px] border-t-1 border-surface-border pt-10">
          <p className="text-center text-sm font-medium text-gray-500 mb-8 uppercase tracking-widest">Built on Standards</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
            {[
              { icon: 'verified', text: 'SOC2 Type II' },
              { icon: 'gpp_good', text: 'ISO 27001' },
              { icon: 'policy', text: 'GDPR Compliant' },
              { icon: 'cloud_done', text: 'CSA Star' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 font-bold text-xl text-white">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="w-full px-4 py-10 md:px-10 md:pb-20">
        <div className="mx-auto max-w-[960px]">
          <div className="relative overflow-hidden rounded-[3rem] bg-primary px-6 py-16 text-center text-[#122118] md:px-16">
            <div className="relative z-10 flex flex-col items-center gap-6">
              <h2 className="text-3xl font-black leading-tight tracking-tight md:text-5xl">Ready to Secure Your Future?</h2>
              <p className="max-w-xl text-lg font-medium text-[#122118]/80 font-body">Join the forward-thinking companies that trust Kodesec for their most critical infrastructure.</p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link href="/contact" className="flex h-14 min-w-[200px] cursor-pointer items-center justify-center rounded-full bg-[#122118] px-8 text-lg font-bold text-white transition-transform hover:scale-105">
                  Book a Strategy Call
                </Link>
                <Link href="/services" className="flex h-14 min-w-[200px] cursor-pointer items-center justify-center rounded-full border-2 border-[#122118] px-8 text-lg font-bold text-[#122118] transition-transform hover:bg-[#122118]/10">
                  View Case Studies
                </Link>
              </div>
            </div>
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>
            <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-white/20 blur-3xl"></div>
            <div className="absolute inset-0 opacity-10 bg-cyber-grid"></div>
          </div>
        </div>
      </section>
    </div>
  );
}