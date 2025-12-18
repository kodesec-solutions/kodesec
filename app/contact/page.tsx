export default function ContactPage() {
  return (
    <div className="flex-grow flex flex-col relative min-h-screen font-display">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none"></div>
      <div className="layout-container flex flex-col flex-grow items-center justify-center pt-8 pb-16 px-4 md:px-10 lg:px-40">
        <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Hero Text & Contact Info */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32 pt-6">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 w-fit">
                <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary text-xs font-bold tracking-wider uppercase">
                  Contact Us
                </span>
              </div>
              <h1 className="text-white text-4xl sm:text-5xl font-black leading-[1.1] tracking-tight">
                Let’s build something{" "}
                <span className="text-primary">secure</span> together.
              </h1>
              <p className="text-gray-400 text-lg font-normal leading-relaxed max-w-[500px] font-body">
                Reach out for a consultation on security audits, custom
                development, or quality assurance. We respond within 24 hours.
              </p>
            </div>
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-full bg-surface-dark border border-surface-border flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Email Us
                  </p>
                  <a
                    href="mailto:hello@kodesec.solutions"
                    className="text-white text-lg font-medium hover:text-primary transition-colors"
                  >
                    hello@kodesec.solutions
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="size-12 rounded-full bg-surface-dark border border-surface-border flex items-center justify-center text-primary group-hover:border-primary transition-colors">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                    Headquarters
                  </p>
                  <p className="text-white text-lg font-medium">
                    Dhaka , Bangladesh
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="#"
                  className="size-10 flex items-center justify-center rounded-full bg-surface-dark border border-surface-border text-slate-400 hover:text-primary hover:border-primary transition-all"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                  </svg>
                </a>
                <a
                  href="#"
                  className="size-10 flex items-center justify-center rounded-full bg-surface-dark border border-surface-border text-slate-400 hover:text-primary hover:border-primary transition-all"
                >
                  <svg
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>
                  </svg>
                </a>
              </div>
            </div>
            {/* Trust Badge */}
            <div className="mt-8 flex items-center gap-3 py-3 px-4 bg-surface-dark/50 border border-white/5 rounded-xl w-fit">
              <span className="material-symbols-outlined text-primary text-xl">
                lock
              </span>
              <span className="text-xs text-gray-400 font-medium">
                256-bit Encrypted Transmission
              </span>
            </div>
          </div>
          {/* Right Column: Form */}
          <div className="bg-surface-dark rounded-3xl p-6 sm:p-10 shadow-xl border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none"></div>
            <form
              className="flex flex-col gap-6 relative z-10"
              
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col flex-1">
                  <span className="text-gray-300 text-sm font-medium pb-2">
                    Full Name
                  </span>
                  <input
                    className="w-full rounded-xl bg-[#151e2e] border-surface-border text-white placeholder-gray-500 h-12 px-4 transition-all"
                    placeholder="Enter your name"
                    type="text"
                  />
                </label>
                <label className="flex flex-col flex-1">
                  <span className="text-gray-300 text-sm font-medium pb-2">
                    Work Email
                  </span>
                  <input
                    className="w-full rounded-xl bg-[#151e2e] border-surface-border text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-all"
                    placeholder="name@company.com"
                    type="email"
                  />
                </label>
              </div>
              <label className="flex flex-col flex-1">
                <span className="text-gray-300 text-sm font-medium pb-2">
                  Company Name
                </span>
                <input
                  className="w-full rounded-xl bg-[#151e2e] border-surface-border text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 transition-all"
                  placeholder="Your Company Ltd."
                  type="text"
                />
              </label>
              <div className="flex flex-col gap-2">
                <span className="text-gray-300 text-sm font-medium">
                  Service Needed
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Cybersecurity",
                    "App Dev",
                    "QA Testing",
                    "Audit",
                    "Other",
                  ].map((service, idx) => (
                    <label key={idx} className="cursor-pointer">
                      <input
                        type="radio"
                        name="service"
                        className="peer sr-only"
                        defaultChecked={idx === 0}
                      />
                      <div className="h-10 flex items-center justify-center rounded-full border border-surface-border bg-[#151e2e] text-gray-400 text-sm font-medium peer-checked:border-primary peer-checked:text-primary peer-checked:bg-primary/10 transition-all hover:bg-surface-border/50">
                        {service}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex flex-col flex-1">
                <span className="text-gray-300 text-sm font-medium pb-2">
                  Message
                </span>
                <textarea
                  className="w-full rounded-xl bg-[#151e2e] border-surface-border text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary min-h-[140px] p-4 resize-y transition-all"
                  placeholder="Tell us more about your project goals, timeline, and security requirements..."
                ></textarea>
              </label>
              <button
                type="button"
                className="mt-2 w-full flex items-center justify-center gap-2 h-14 rounded-full bg-primary hover:bg-primary/90 text-[#122118] text-base font-bold transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 group"
              >
                <span>Send Secure Message</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                  send
                </span>
              </button>
              <p className="text-center text-xs text-gray-500 mt-2">
                By submitting this form, you agree to our{" "}
                <a href="#" className="underline hover:text-primary">
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
