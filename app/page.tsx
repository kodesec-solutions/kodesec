"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const services = [
    {
      id: 1,
      title: "Cybersecurity",
      description:
        "Advanced penetration testing, security audits, and compliance consulting (SOC2, HIPAA). We find the vulnerabilities before the attackers do.",
      icon: "shield",
      color: "primary",
      colorClass: "text-primary",
      bgClass: "bg-[#36e27b]/10",
      hoverBorder: "hover:border-primary/50",
      svg: (
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="text-primary">
          <path d="M90 20L110 60H150L118 88L130 130L90 108L50 130L62 88L30 60H70L90 20Z" fill="currentColor" opacity="0.3" />
          <circle cx="90" cy="90" r="60" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M90 50V130M60 90H120" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Application Development",
      description:
        "Scalable web, mobile, and cloud-native application development. We build robust systems using modern stacks like React, Node, and Python.",
      icon: "code",
      color: "accent-cyan",
      colorClass: "text-accent-cyan",
      bgClass: "bg-[#22d3ee]/10",
      hoverBorder: "hover:border-accent-cyan/50",
      svg: (
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="text-accent-cyan">
          <rect x="30" y="40" width="120" height="100" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
          <rect x="45" y="60" width="90" height="60" rx="4" fill="currentColor" opacity="0.2" />
          <line x1="50" y1="75" x2="100" y2="75" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="90" x2="120" y2="90" stroke="currentColor" strokeWidth="2" />
          <line x1="50" y1="105" x2="90" y2="105" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Quality Testing",
      description:
        "End-to-end automation and manual QA to ensure flawless performance. We break your app so your users don't have to.",
      icon: "bug_report",
      color: "purple-400",
      colorClass: "text-purple-400",
      bgClass: "bg-purple-400/10",
      hoverBorder: "hover:border-purple-400/50",
      svg: (
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none" className="text-purple-400">
          <circle cx="90" cy="70" r="15" fill="currentColor" opacity="0.3" />
          <ellipse cx="90" cy="110" rx="30" ry="15" fill="currentColor" opacity="0.2" />
          <path d="M70 90Q90 100 110 90" stroke="currentColor" strokeWidth="2" fill="none" />
          <circle cx="75" cy="65" r="3" fill="currentColor" />
          <circle cx="105" cy="65" r="3" fill="currentColor" />
          <path d="M60 80L70 90M110 90L120 80" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  const whyChooseUs = [
    {
      icon: "lock_person",
      title: "Security-First Mindset",
      desc: "Security is embedded in our DNA, not an afterthought. We build secure by default.",
    },
    {
      icon: "engineering",
      title: "Skilled Engineers",
      desc: "A team of senior developers and certified security researchers with years of experience.",
    },
    {
      icon: "rocket_launch",
      title: "Startup Friendly",
      desc: "Agile methodologies and flexible pricing models designed for fast-growing companies.",
    },
    {
      icon: "visibility",
      title: "Transparent Workflow",
      desc: "Full visibility into project progress with weekly sprints and clear milestones.",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Understand",
      desc: "We deep dive into your requirements, business goals, and security constraints to build a roadmap.",
    },
    {
      step: 2,
      title: "Design",
      desc: "Creating scalable architectures and intuitive UI/UX designs that align with industry standards.",
    },
    {
      step: 3,
      title: "Secure & Build",
      desc: "Iterative development with integrated security testing (DevSecOps) at every commit.",
    },
    {
      step: 4,
      title: "Test & Deliver",
      desc: "Rigorous QA, final security audit, and deployment to production with post-launch support.",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero intro
      gsap.fromTo(
        ".hero-anim",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power2.out" }
      );

      // Services cards
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          },
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: i * 0.05,
        });
      });

      // Stat cards
      gsap.utils.toArray<HTMLElement>(".stat-card").forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
          y: 25,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative px-6 md:px-20 lg:px-40 flex flex-1 justify-center py-12 md:py-20 font-display">
        <div className="flex flex-col max-w-[1280px] flex-1">
          <div className="flex flex-col-reverse gap-10 py-4 lg:flex-row lg:items-center">
            {/* Hero Text */}
            <div className="flex flex-col gap-8 flex-1">
              <div className="flex flex-col gap-4 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 w-fit">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-primary text-xs font-bold uppercase tracking-wider">
                    Cybersecurity & Development
                  </span>
                </div>
                <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
                  Secure. Build. Test.
                  <br />
                  <span className=" text-clip-text text-gradient-to-r from-primary to-accent-cyan">
                    Solutions You Can Trust.
                  </span>
                </h1>
                <h2 className="text-gray-400 text-lg font-normal leading-relaxed max-w-[600px] font-body">
                  Cybersecurity, application development, and quality testing
                  services tailored for modern businesses. We secure your
                  infrastructure while building your future.
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-full h-12 px-8 bg-primary hover:bg-primary-hover hover:scale-105 transition-all text-[#0B0F1A] text-base font-bold leading-normal tracking-[0.015em] shadow-[0_0_20px_rgba(54,226,123,0.3)]"
                >
                  <span className="truncate">Get a Free Consultation</span>
                </Link>
                <Link
                  href="/services"
                  className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-full h-12 px-8 bg-transparent border border-gray-600 hover:border-primary hover:text-primary transition-all text-white text-base font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Explore Services</span>
                </Link>
              </div>
              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4 text-gray-500 font-body">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    verified_user
                  </span>
                  <span className="text-sm font-medium">
                    ISO 27001 Standard
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">
                    code
                  </span>
                  <span className="text-sm font-medium">Top 1% Devs</span>
                </div>
              </div>
            </div>
            {/* Hero Image/Animation */}
            <div className="w-full lg:flex-1 aspect-square md:aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden relative group bg-[#0B0F1A]">
              <div className="absolute inset-0 z-10 p-4 sm:p-8 flex items-center justify-center">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2dfcxen7rLPIF0nJLv5iLwXtjVYnI_SdK4x7Ln-lgpckIeMH3OHys9jjSUkFAjezu-lDGkN5Nkd0hrXQEqrnZk3BrggTkjukp0gFCj-l1UcVKB5RTsBq-SXKn8mx5CPWHxDvsTBQjqToi4QTAABKaY_lVe8GhQFKaM859m0q33dLOGvvVAGdI9HduFclS5VO4P5PlEoptfO7edCOo9KoEcocRjHUE2A9nsZfdphhlapfAA6PSnuXoy_VBNKBI6i7N09QRyg-hkGSE"
                  alt="Hero Illustration"
                  width={500}
                  height={500}
                  className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_10px_20px_rgba(54,226,123,0.2)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-6 md:px-20 lg:px-40 py-20 bg-[#131926]/60 font-display">
        <div className="flex flex-col items-center max-w-[1280px] mx-auto w-full">
          <div className="flex flex-col gap-3 text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
              What We Do
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-[800px] mx-auto">
              Comprehensive technology solutions designed to protect and grow
              your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {services.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col rounded-xl bg-[#0f1419] p-8 hover:bg-[#131920] transition-colors duration-300 relative overflow-hidden min-h-[320px]"
              >
                <div className="absolute top-8 right-8 opacity-5 pointer-events-none">
                  {service.svg}
                </div>
                <div className={`w-12 h-12 rounded-lg ${service.bgClass} flex items-center justify-center ${service.colorClass} mb-6`}>
                  <span className="material-symbols-outlined text-2xl">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className={`${service.colorClass} text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all w-fit`}
                >
                  Learn more{" "}
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 md:px-20 lg:px-40 py-20 bg-background-dark font-display">
        <div className="flex flex-col max-w-[1280px] mx-auto w-full">
          <div className="flex flex-col md:flex-row gap-10 md:items-end mb-12 justify-between">
            <div className="flex flex-col gap-4 max-w-[600px]">
              <h2 className="text-white text-3xl md:text-4xl font-black leading-tight">
                Why Choose Kodesec
              </h2>
              <p className="text-gray-400 text-lg font-body">
                We combine technical expertise with a security-first mindset to
                deliver solutions that scale securely.
              </p>
            </div>
            <Link
              href="/why-us"
              className="flex w-fit items-center justify-center rounded-full h-10 px-6 bg-[#1e293b] text-white hover:bg-[#2d3b52] transition-colors text-sm font-bold"
            >
              View Case Studies
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "lock_person",
                title: "Security-First Mindset",
                desc: "Security is embedded in our DNA, not an afterthought. We build secure by default.",
              },
              {
                icon: "engineering",
                title: "Skilled Engineers",
                desc: "A team of senior developers and certified security researchers with years of experience.",
              },
              {
                icon: "rocket_launch",
                title: "Startup Friendly",
                desc: "Agile methodologies and flexible pricing models designed for fast-growing companies.",
              },
              {
                icon: "visibility",
                title: "Transparent Workflow",
                desc: "Full visibility into project progress with weekly sprints and clear milestones.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 p-6 rounded-2xl bg-card-dark border border-white/5 hover:border-primary/30 transition-all"
              >
                <div className="text-primary mb-2">
                  <span className="material-symbols-outlined text-[32px]">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-white text-lg font-bold">{item.title}</h3>
                <p className="text-gray-400 text-sm font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-6 md:px-20 lg:px-40 py-20 bg-[#0F1521] relative overflow-hidden font-display">
        <div className="absolute inset-0 opacity-10 bg-cyber-grid"></div>
        <div className="flex flex-col items-center max-w-[1280px] mx-auto w-full relative z-10">
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="text-white text-3xl md:text-4xl font-black leading-tight">
              Our Process
            </h2>
            <div className="w-64 h-32 md:w-96 md:h-48 -mt-6 -mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full relative mb-10">
            <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-gray-700 -z-10"></div>
            {processSteps.map((item) => (
              <div key={item.step} className="flex flex-col gap-4 relative">
                <div
                  className={`w-12 h-12 rounded-full bg-background-dark border-2 ${
                    item.step === 1
                      ? "border-primary text-primary shadow-[0_0_15px_rgba(54,226,123,0.4)]"
                      : "border-gray-600 text-gray-400"
                  } flex items-center justify-center font-bold text-lg z-10`}
                >
                  {item.step}
                </div>
                <h3 className="text-white text-xl font-bold mt-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm font-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-20 lg:px-40 py-24 bg-background-dark font-display">
        <div className="max-w-[100%] mx-auto w-full rounded-3xl bg-gradient-to-r from-[#1b2b23] to-[#131926] p-10 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/10 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center gap-8">
            <h2 className="text-white text-3xl md:text-5xl font-black leading-tight max-w-[800px]">
              Ready to secure and scale your product?
            </h2>
            <p className="text-gray-300 text-lg max-w-[600px] font-body">
              Join the innovative companies that trust Kodesec for their
              critical technology needs.
            </p>
            <Link href="/contact">
              <button className="flex min-w-[200px] cursor-pointer items-center justify-center rounded-full h-14 px-8 bg-primary hover:bg-primary-hover hover:scale-105 transition-all text-[#0B0F1A] text-lg font-bold leading-normal tracking-[0.015em] shadow-[0_0_25px_rgba(54,226,123,0.4)]">
                <span className="truncate">Talk to Our Team</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}