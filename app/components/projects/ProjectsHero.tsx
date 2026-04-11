import Link from "next/link";

export default function ProjectsHero() {
  return (
    <section className="relative overflow-hidden bg-background-dark px-6 pb-12 pt-14 lg:px-20 lg:pt-20">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 lg:grid-cols-2">
        <div className="animate-slide-in-left space-y-6">
          <p className="text-primary text-sm font-semibold tracking-[0.24em]">OUR WORK</p>
          <h1 className="text-secondary text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
            Real Security. Real Systems. Real Impact.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            We help businesses secure applications, infrastructure, and internal systems through
            real-world testing and engineering.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="#projects-grid"
              className="animate-fade-in-up rounded-full border border-surface-border bg-surface-dark px-6 py-3 text-sm font-semibold text-secondary transition-transform duration-300 hover:-translate-y-0.5"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="animate-fade-in-up animation-delay-200 rounded-full bg-primary px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get Consultation
            </Link>
          </div>
        </div>

        <div className="animate-fade-in-up animation-delay-200 relative h-[300px] overflow-hidden rounded-3xl border border-surface-border bg-surface-dark md:h-[360px] lg:h-[420px]">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 20% 20%, var(--color-primary) 0%, transparent 38%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--color-border-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border-primary) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="absolute left-10 top-10 h-24 w-24 animate-float-up rounded-2xl border border-surface-border bg-card-dark" />
          <div className="absolute bottom-12 right-10 h-20 w-20 animate-float-up animation-delay-200 rounded-full border border-surface-border bg-card-dark" />
          <div className="absolute bottom-24 left-1/2 h-14 w-14 -translate-x-1/2 animate-float-up animation-delay-400 rounded-xl border border-surface-border bg-card-dark" />
        </div>
      </div>
    </section>
  );
}
