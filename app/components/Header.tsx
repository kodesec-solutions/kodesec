"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Logo from "@/public/assets/Logo.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/why-us", label: "Why Us" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activeLink = navLinksRef.current[pathname];
    if (activeLink && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        duration: 0.3,
        ease: "power3.out",
      });
    }
  }, [pathname]);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8">
      <nav className="max-w-7xl mx-auto">
        <div
          className={`flex items-center justify-between px-6 py-4 rounded-full bg-[#1a1f2e] border border-white/10 shadow-2xl transition-all duration-300 ${
            isScrolled ? "shadow-[0_8px_32px_rgba(0,0,0,0.4)]" : ""
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
          >
            <Image
              src={Logo}
              alt="Kodesec Logo"
              className="w-8 h-8 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 relative">
            {/* Sliding Indicator - Bottom Glow Line */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all shadow-[0_0_10px_rgba(54,226,123,0.8)]"
              style={{ left: 0, width: 0 }}
            />
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  navLinksRef.current[item.href] = el;
                }}
                className={`relative z-10 px-3 py-2 transition-colors text-sm font-medium ${
                  pathname === item.href
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Contact Button */}
          <Link
            href="/contact"
            className="hidden lg:flex items-center px-5 py-2.5 bg-primary text-[#1a1f2e] rounded-full text-sm font-semibold hover:bg-primary hover:text-[#0B0F1A] transition-all"
          >
            Consultation
          </Link>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 mx-4">
          <div className="flex flex-col gap-2 p-6 rounded-3xl bg-[#1a1f2e] border border-white/10 shadow-2xl">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  pathname === item.href
                    ? "text-primary font-bold"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 px-5 py-2.5 bg-primary text-[#0B0F1A] rounded-full text-sm font-semibold text-center hover:bg-primary-hover transition-all"
            >
              contact@kodesec.com
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
