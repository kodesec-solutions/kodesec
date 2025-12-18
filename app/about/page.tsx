"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TbTargetArrow,
  TbBulb,
  TbUsers,
  TbTrophy,
  TbWorld,
  TbShieldCheck,
  TbRocket,
  TbHeart,
} from "react-icons/tb";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero fade in
      gsap.fromTo(
        ".about-hero",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power2.out" }
      );

      // Timeline items
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
          },
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
        });
      });

      // Value cards
      gsap.utils.toArray<HTMLElement>(".value-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
          },
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: i * 0.08,
        });
      });

      // Team cards
      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
          },
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          delay: i * 0.08,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const values = [
    {
      icon: <TbShieldCheck />,
      title: "Integrity",
      description:
        "We maintain the highest standards of honesty and transparency in all our dealings.",
    },
    {
      icon: <TbRocket />,
      title: "Innovation",
      description:
        "We continuously explore new technologies and methodologies to deliver cutting-edge solutions.",
    },
    {
      icon: <TbTrophy />,
      title: "Excellence",
      description:
        "We strive for perfection in every project, ensuring quality that exceeds expectations.",
    },
    {
      icon: <TbHeart />,
      title: "Client Success",
      description:
        "Your success is our success. We're committed to building long-term partnerships.",
    },
  ];

  const timeline = [
    {
      year: "2024",
      title: "Kodesec Founded",
      description:
        "Experienced professionals unite to launch Kodesec Solutions with a focus on quality and innovation.",
    },
    {
      year: "2024",
      title: "First Projects",
      description:
        "Completed initial projects demonstrating expertise in web development, security, and QA.",
    },
    {
      year: "2024-2025",
      title: "Growth Phase",
      description:
        "Building our portfolio and establishing ourselves as a reliable tech partner.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">

      <section className="relative flex flex-col items-center justify-center overflow-hidden py-20 lg:py-32 bg-cyber-grid font-display">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="relative z-10 flex max-w-[960px] flex-col px-6 text-center">
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
              <span className="mr-2 h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              Defining the Standard of Cyber Safety
            </div>
          </div>
          <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
            Securing the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Digital Innovation</span>
          </h1>
          <p className="mb-10 max-w-2xl mx-auto text-base font-normal leading-relaxed text-slate-400 md:text-lg font-body">
            We are a team of ethical hackers and elite developers dedicated to building resilient digital fortresses. We don't just patch vulnerabilities; we engineer trust.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-full bg-primary px-6 text-base font-bold text-[#0B0F1A] transition-all hover:bg-primary-hover hover:shadow-[0_0_20px_rgba(54,226,123,0.3)]">
              Explore Services
            </Link>
            <Link href="/why-us" className="flex h-12 min-w-[160px] cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-base font-bold text-white transition-all hover:bg-white/10 backdrop-blur-sm">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <TbRocket className="text-3xl" />
              </div>
              <h3 className="text-3xl font-bold text-white">Our Mission</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                To deliver high-quality technology solutions that help businesses innovate and grow. We combine our team's individual expertise with startup agility to create solutions that make a real impact.
              </p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                <TbBulb className="text-3xl" />
              </div>
              <h3 className="text-3xl font-bold text-white">Our Vision</h3>
              <p className="text-lg text-gray-400 leading-relaxed">
                To grow into a trusted technology partner known for quality, innovation, and genuine commitment to client success. We aspire to prove that startups led by experienced professionals can deliver enterprise-grade solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center hover:border-primary/50 transition-all hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-4xl mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Milestones that shaped Kodesec Solutions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-slate-700"></div>

              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`timeline-item relative mb-16 last:mb-0 ${
                    index % 2 === 0 ? "text-right pr-1/2" : "text-left pl-1/2"
                  }`}
                >
                  <div
                    className={`flex items-center ${
                      index % 2 === 0
                        ? "justify-end pr-8 lg:pr-16"
                        : "justify-start pl-8 lg:pl-16"
                    }`}
                  >
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md hover:border-primary/50 transition-all">
                      <div className="text-primary font-bold text-2xl mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-slate-900"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Leadership
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Meet the experts driving our vision forward
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO & Founder",
                expertise: "Strategic Leadership",
              },
              {
                name: "Michael Chen",
                role: "CTO",
                expertise: "Technology Innovation",
              },
              {
                name: "Emily Rodriguez",
                role: "Head of Security",
                expertise: "Cybersecurity",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="team-card bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center hover:border-primary/50 transition-all hover:-translate-y-2"
              >
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-4xl mx-auto mb-6">
                  <TbUsers />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <div className="text-primary font-semibold mb-2">
                  {member.role}
                </div>
                <p className="text-gray-400 text-sm">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Work With Us?
            </h2>
            <p className="text-xl text-gray-400">
              Let's discuss how we can help transform your business with
              innovative technology solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/#contact"
                className="px-8 py-4 bg-primary hover:bg-primary-hover text-[#0B0F1A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[0_0_20px_rgba(54,226,123,0.3)] transition-all"
              >
                Get in Touch
              </a>
              <a
                href="/#services"
                className="px-8 py-4 bg-slate-800 border border-slate-700 text-white font-semibold rounded-lg hover:border-primary/50 transition-all"
              >
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
