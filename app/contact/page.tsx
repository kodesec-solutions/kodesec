"use client";

import { useState } from "react";

const serviceOptions = [
  "Penetration Testing",
  "Secure Development",
  "Network Security",
  "Cloud & DevOps",
  "Other",
];

function ContactHero() {
  return (
    <section className="px-6 py-20 lg:px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
        <div className="animate-slide-in-left">
          <p className="inline-flex items-center rounded-full border border-surface-border bg-surface-dark px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Contact Us
          </p>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] text-secondary md:text-5xl lg:text-6xl">
            Let&apos;s Build Something <span className="text-primary">Secure</span> Together
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg font-body">
            Reach out for security testing, secure development, or infrastructure solutions. Our team responds within 24 hours.
          </p>
        </div>

        <div className="animate-slide-in-right">
          <div className="relative overflow-hidden rounded-3xl border border-surface-border bg-card-dark p-6 md:p-8">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl animate-float-up" />
            <div className="absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-accent-cyan/20 blur-3xl animate-float-up animation-delay-400" />
            <div className="relative grid gap-4">
              <div className="rounded-2xl border border-surface-border bg-surface-dark p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-primary">Secure Channel</p>
                <p className="mt-2 text-xl font-black text-secondary">Encrypted Communication</p>
              </div>
              <div className="rounded-2xl border border-surface-border bg-surface-dark p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-accent-cyan">Response Window</p>
                <p className="mt-2 text-xl font-black text-secondary">Within 24 Hours</p>
              </div>
              <div className="rounded-2xl border border-surface-border bg-surface-dark p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-primary">Engagement Style</p>
                <p className="mt-2 text-xl font-black text-secondary">Confidential by Default</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactInfo() {
  return (
    <div className="animate-fade-in-up space-y-4">
      <article className="group rounded-2xl border border-surface-border bg-card-dark p-5 transition-all hover:-translate-y-1 hover:border-primary/50">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border bg-surface-dark text-primary">
            <span className="material-symbols-outlined">mail</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Email</p>
            <a href="mailto:kodesec13@gmail.com" className="mt-1 inline-block text-secondary hover:text-primary transition-colors">
              kodesec13@gmail.com
            </a>
          </div>
        </div>
      </article>

      <article className="group rounded-2xl border border-surface-border bg-card-dark p-5 transition-all hover:-translate-y-1 hover:border-primary/50">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border bg-surface-dark text-primary">
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Location</p>
            <p className="mt-1 text-secondary">Dhaka, Bangladesh</p>
          </div>
        </div>
      </article>

      <article className="group rounded-2xl border border-surface-border bg-card-dark p-5 transition-all hover:-translate-y-1 hover:border-primary/50">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-surface-border bg-surface-dark text-primary">
            <span className="material-symbols-outlined">lock</span>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Trust Badge</p>
            <p className="mt-1 text-secondary">256-bit Encrypted Communication</p>
          </div>
        </div>
      </article>

      <p className="rounded-2xl border border-surface-border bg-surface-dark p-5 text-sm leading-relaxed text-muted font-body">
        We prioritize secure communication. All messages are handled with strict confidentiality.
      </p>

      <div className="flex items-center gap-3 pt-1">
        <a
          href="#"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-card-dark text-muted transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
          aria-label="LinkedIn"
        >
          <span className="material-symbols-outlined text-base">business</span>
        </a>
        <a
          href="#"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-card-dark text-muted transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"
          aria-label="Twitter"
        >
          <span className="material-symbols-outlined text-base">alternate_email</span>
        </a>
      </div>
    </div>
  );
}

function ContactForm() {
  const [selectedService, setSelectedService] = useState(serviceOptions[0]);

  return (
    <div className="animate-slide-in-right relative overflow-hidden rounded-3xl border border-surface-border bg-card-dark p-6 md:p-8 lg:p-10">
      <div className="absolute -left-8 top-8 h-36 w-36 rounded-full bg-primary/20 blur-3xl animate-float-up" />
      <div className="absolute -right-8 bottom-10 h-40 w-40 rounded-full bg-accent-cyan/20 blur-3xl animate-float-up animation-delay-400" />

      <form className="relative z-10 space-y-6 md:space-y-7">
        <div className="grid gap-5 md:gap-6 md:grid-cols-2">
          <label className="space-y-2.5">
            <span className="text-sm text-secondary">Full Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              className="h-12 w-full rounded-xl border border-surface-border bg-surface-dark px-4 text-secondary placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
            />
          </label>

          <label className="space-y-2.5">
            <span className="text-sm text-secondary">Work Email</span>
            <input
              type="email"
              placeholder="name@company.com"
              className="h-12 w-full rounded-xl border border-surface-border bg-surface-dark px-4 text-secondary placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
            />
          </label>
        </div>

        <label className="space-y-2.5">
          <span className="text-sm text-secondary">Organization Name</span>
          <input
            type="text"
            placeholder="Your Organization"
            className="h-12 w-full rounded-xl border border-surface-border bg-surface-dark px-4 text-secondary placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
          />
        </label>

        <div className="space-y-3 pt-4">
          <span className="text-sm text-secondary">Service Needed</span>
          <div className="flex flex-wrap gap-2.5">
            {serviceOptions.map((option) => {
              const active = selectedService === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedService(option)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    active
                      ? "border-primary bg-primary text-background-dark"
                      : "border-surface-border bg-surface-dark text-muted hover:border-primary hover:text-primary"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <label className="space-y-2.5 pt-1">
          <span className="text-sm text-secondary">Message</span>
          <textarea
            placeholder="Tell us about your security requirements, goals, and timeline."
            className="min-h-[140px] w-full rounded-xl border border-surface-border bg-surface-dark p-4 text-secondary placeholder:text-muted focus:border-primary focus:outline-none transition-colors"
          />
        </label>

        <button
          type="button"
          className="animate-glow mt-3 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary text-sm font-bold text-background-dark transition-all hover:bg-primary-dark md:text-base"
        >
          Send Secure Message
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>

        <p className="text-center text-xs text-muted">
          Your data is securely transmitted and never shared.
        </p>
      </form>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-background-dark overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-10" />

      <ContactHero />

      <section className="px-6 pb-20 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="animate-slide-in-left">
            <ContactInfo />
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
