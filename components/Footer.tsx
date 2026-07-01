import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/Logo.png";
import { footerConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-background-dark border-t border-surface-border">
      <div className="px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Logo and Tagline Column */}
            <div className="flex flex-col gap-4 text-center md:text-left md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-border bg-surface-dark text-primary">
                  <span className="material-symbols-outlined text-[18px]">
                    <Image
                      src={Logo}
                      alt="KODESEC Logo"
                      width={25}
                      height={31}
                      className="h-5 w-auto object-contain"
                    />
                  </span>
                </div>
                <span className="text-xl font-black text-secondary">KODESEC</span>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted font-body">
                {footerConfig.tagline}
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">
                {footerConfig.badgeText}
              </p>
            </div>

            {/* Dynamic Columns */}
            {footerConfig.sections.map((section) => (
              <nav key={section.title} aria-label={section.title} className="flex flex-col gap-4 text-center md:text-left">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-muted transition-colors duration-300 hover:text-primary"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-muted transition-colors duration-300 hover:text-primary"
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

          {/* Bottom Bar */}
          <div className="border-t border-surface-border pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-muted text-center md:text-left">
                {footerConfig.copyright}
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {footerConfig.legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-muted transition-colors duration-300 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
