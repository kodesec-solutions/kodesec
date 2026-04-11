export default function FeaturedProject() {
  return (
    <section className="bg-background-dark px-6 py-16 lg:px-20">
      <div className="mx-auto grid w-full max-w-[1200px] gap-8 rounded-3xl border border-surface-border bg-surface-dark p-6 md:p-8 lg:grid-cols-2 lg:p-10">
        <div className="animate-slide-in-left space-y-4">
          <p className="text-primary text-sm font-semibold tracking-[0.22em]">FEATURED CASE STUDY</p>
          <h2 className="text-secondary text-3xl font-semibold leading-tight md:text-4xl">
            Enterprise Cloud Migration Hardening for Fintech Platform
          </h2>
          <p className="text-muted leading-relaxed">
            A fast-growing fintech team moved to multi-cloud infrastructure and needed assurance
            that speed would not compromise security controls.
          </p>

          <div className="space-y-3 pt-2">
            <div>
              <h3 className="text-secondary text-sm font-semibold uppercase tracking-wide">Problem</h3>
              <p className="text-muted mt-1 text-sm leading-relaxed">
                Inconsistent cloud policies and exposed internal interfaces increased breach risk
                during production scale-up.
              </p>
            </div>
            <div>
              <h3 className="text-secondary text-sm font-semibold uppercase tracking-wide">Solution</h3>
              <p className="text-muted mt-1 text-sm leading-relaxed">
                KODESEC delivered attack-path simulation, IAM hardening, and secure deployment
                controls across CI/CD and infrastructure.
              </p>
            </div>
            <div>
              <h3 className="text-secondary text-sm font-semibold uppercase tracking-wide">Outcome</h3>
              <p className="text-muted mt-1 text-sm leading-relaxed">
                Reduced critical attack surface, improved compliance readiness, and gave the
                engineering team a repeatable secure release model.
              </p>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-surface-border bg-card-dark p-6">
          <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary opacity-20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary opacity-20 blur-3xl" />
          <div className="relative z-10 space-y-4">
            <div className="rounded-xl border border-surface-border bg-surface-dark p-4">
              <p className="text-secondary text-sm font-semibold">Security Coverage</p>
              <p className="text-muted mt-1 text-sm">Cloud IAM, runtime controls, and deployment pipeline validation.</p>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-dark p-4">
              <p className="text-secondary text-sm font-semibold">Delivery Model</p>
              <p className="text-muted mt-1 text-sm">Sprint-based testing with direct engineering collaboration and remediation playbooks.</p>
            </div>
            <div className="rounded-xl border border-surface-border bg-surface-dark p-4">
              <p className="text-secondary text-sm font-semibold">Business Impact</p>
              <p className="text-muted mt-1 text-sm">Safer rollout velocity and stronger trust from enterprise stakeholders.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
