export default function FeaturedProject() {
  return (
    <section className="bg-[#030609] px-6 py-16 lg:px-20 relative z-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-3xl border border-white/10 bg-[#0D121F]/80 backdrop-blur-xl p-6 md:p-10 lg:grid-cols-2 shadow-2xl hover:border-primary/40 transition-all duration-300">
        
        <div className="space-y-5 text-left">
          <p className="text-primary text-xs font-mono font-bold uppercase tracking-widest">
            FEATURED CASE STUDY
          </p>
          <h2 className="text-white text-3xl font-heading font-bold leading-tight md:text-4xl">
            Enterprise Cloud Migration Hardening for Fintech Platform
          </h2>
          <p className="text-gray-400 text-xs font-sans leading-relaxed">
            A fast-growing fintech team moved to multi-cloud infrastructure and needed assurance
            that speed would not compromise compliance and security controls.
          </p>

          <div className="space-y-4 pt-2 border-t border-white/10">
            <div>
              <h3 className="text-primary text-xs font-mono font-bold uppercase tracking-wider">Problem</h3>
              <p className="text-gray-300 mt-1 text-xs font-sans leading-relaxed">
                Inconsistent cloud policies and exposed internal interfaces increased breach risk
                during rapid production scale-up.
              </p>
            </div>
            <div>
              <h3 className="text-primary text-xs font-mono font-bold uppercase tracking-wider">Solution</h3>
              <p className="text-gray-300 mt-1 text-xs font-sans leading-relaxed">
                KODESEC delivered attack-path simulation, IAM hardening, and secure deployment
                controls across CI/CD and infrastructure.
              </p>
            </div>
            <div>
              <h3 className="text-primary text-xs font-mono font-bold uppercase tracking-wider">Outcome</h3>
              <p className="text-gray-300 mt-1 text-xs font-sans leading-relaxed">
                Reduced critical attack surface by 94%, improved compliance readiness, and gave the
                engineering team a repeatable secure release model.
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0A0E17] p-6 flex flex-col justify-center gap-4">
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-white text-xs font-heading font-bold">Security Coverage</p>
            <p className="text-gray-400 mt-1 text-xs font-sans">Cloud IAM, runtime controls, and deployment pipeline validation.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-white text-xs font-heading font-bold">Delivery Model</p>
            <p className="text-gray-400 mt-1 text-xs font-sans">Sprint-based testing with direct engineering collaboration and remediation playbooks.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
            <p className="text-white text-xs font-heading font-bold">Business Impact</p>
            <p className="text-gray-400 mt-1 text-xs font-sans">Safer rollout velocity and stronger trust from enterprise stakeholders.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
