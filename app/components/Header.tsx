"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0B0F1A]/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav className="px-6 md:px-20 lg:px-40">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-white font-bold text-2xl tracking-tight">
              Kodesec
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/work"
              className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
            >
              Work
            </Link>
            <Link
              href="/services"
              className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-primary transition-colors text-sm font-medium"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-primary hover:bg-primary-hover rounded-full text-[#0B0F1A] text-sm font-bold transition-all hover:scale-105 shadow-[0_0_20px_rgba(54,226,123,0.3)]"
            >
              Get Started
            </Link>
          </div>

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
        <div className="lg:hidden fixed inset-0 top-20 bg-[#0B0F1A]/98 backdrop-blur-md z-40">
          <div className="flex flex-col items-center gap-6 pt-8 px-6">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-primary transition-colors text-lg font-medium"
            >
              Home
            </Link>
            <Link
              href="/work"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-primary transition-colors text-lg font-medium"
            >
              Work
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-primary transition-colors text-lg font-medium"
            >
              Services
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-300 hover:text-primary transition-colors text-lg font-medium"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-8 py-3 bg-primary hover:bg-primary-hover rounded-full text-[#0B0F1A] font-bold transition-all shadow-[0_0_20px_rgba(54,226,123,0.3)]"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
