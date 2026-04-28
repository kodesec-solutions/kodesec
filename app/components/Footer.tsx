import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/Logo.png";

export default function Footer() {
  return (
    <footer className="bg-background-dark border-t border-surface-border">
      <div className="px-6 py-16 lg:px-20">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
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
                Building secure digital systems for modern businesses.
              </p>
              <p className="text-xs uppercase tracking-[0.16em] text-primary font-semibold">
                Security-first development & testing
              </p>
            </div>

            <nav aria-label="Services" className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
                Services
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/services/secure-application-development" className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                    Secure Development
                  </Link>
                </li>
                <li>
                  <Link href="/services/manual-website-penetration-testing" className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                    Penetration Testing
                  </Link>
                </li>
                <li>
                  <Link href="/services/network-infrastructure-penetration-testing" className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                    Network Security
                  </Link>
                </li>
                <li>
                  <Link href="/services/infrastructure-automation-cloud-solutions" className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                    Cloud &amp; DevOps
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Company" className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/why-us" className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                    Why Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                    Careers
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Connect" className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
                Connect
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors duration-300 hover:text-primary"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors duration-300 hover:text-primary"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors duration-300 hover:text-primary"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="border-t border-surface-border pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-muted">© 2026 KODESEC. All rights reserved.</p>
              <div className="flex flex-wrap gap-6">
                <Link href="/privacy-policy" className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-service" className="text-sm text-muted transition-colors duration-300 hover:text-primary">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
