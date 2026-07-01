import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-background-dark px-6 pb-24 pt-16 lg:px-20">
      <div className="mx-auto w-full max-w-[1200px] overflow-hidden rounded-3xl border border-surface-border bg-surface-dark p-8 md:p-10 lg:p-12">
        <div
          className="relative rounded-2xl border border-surface-border p-8"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, var(--color-primary) 0%, transparent 40%), radial-gradient(circle at 80% 80%, var(--color-primary) 0%, transparent 35%)",
          }}
        >
          <h2 className="text-secondary text-3xl font-semibold leading-tight md:text-4xl">
            Let&apos;s Secure Your Next Project
          </h2>
          <p className="text-muted mt-4 max-w-2xl text-base leading-relaxed">
            Bring your architecture, product, and infrastructure goals. We will help you deliver
            with security engineered in from day one.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start a Project
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-surface-border bg-card-dark px-6 py-3 text-sm font-semibold text-secondary transition-transform duration-300 hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
