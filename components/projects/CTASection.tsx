import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-[#030609] px-6 pb-24 pt-16 lg:px-20 relative z-10">
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0D121F] p-8 md:p-14 shadow-2xl backdrop-blur-xl">
        <div className="relative rounded-2xl border border-white/10 p-8 bg-[#0A0E17] text-left">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(54,226,123,0.08),transparent_70%)] pointer-events-none" />

          <h2 className="text-white text-3xl font-heading font-bold leading-tight md:text-4xl">
            Let&apos;s Secure Your Next Project
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl text-xs sm:text-sm font-sans leading-relaxed">
            Bring your architecture, product, and infrastructure goals. We will help you deliver
            with security engineered in from day one.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              <span>Start a Project</span>
            </Link>
            <Link href="/contact" className="btn-secondary">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
