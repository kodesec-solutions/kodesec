import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/Logo.png";
import { footerConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          
          {/* LOGO & BRAND DESCRIPTION */}
          <div className="flex flex-col gap-4 text-left md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0D121F] text-primary group-hover:border-primary/50 transition-all">
                <Image
                  src={Logo}
                  alt="KODESEC Logo"
                  width={25}
                  height={31}
                  className="h-5 w-auto object-contain"
                />
              </div>
              <span className="text-xl font-heading font-bold text-white group-hover:text-primary transition-colors">
                KODESEC
              </span>
            </Link>
            <p className="max-w-sm text-xs leading-relaxed text-gray-400 font-sans">
              {footerConfig.tagline}
            </p>
            <p className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary">
              {footerConfig.badgeText}
            </p>
          </div>

          {/* FOOTER LINK COLUMNS */}
          {footerConfig.sections.map((section) => (
            <nav key={section.title} aria-label={section.title} className="flex flex-col gap-4 text-left">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-300 transition-colors duration-200 hover:text-primary"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs text-gray-300 transition-colors duration-200 hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>&copy; {new Date().getFullYear()} Kodesec. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
