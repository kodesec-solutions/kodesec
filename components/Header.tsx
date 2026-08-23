"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import Logo from "@/public/assets/Logo.png";
import { 
  ChevronDown, 
  ArrowRight,
  Menu,
  X,
  Shield
} from "lucide-react";
import { navigationConfig } from "@/config/site";
import { solutions } from "@/content/solutions";
import * as LucideIcons from "lucide-react";

const { navItems } = navigationConfig;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<{ [key: string]: HTMLAnchorElement | HTMLButtonElement | null }>({});

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const activePath = pathname.startsWith("/services") ? "/services" : pathname;
    const activeLink = navLinksRef.current[activePath];
    if (activeLink && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        left: activeLink.offsetLeft,
        width: activeLink.offsetWidth,
        duration: 0.3,
        ease: "power3.out",
      });
    } else if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        width: 0,
        duration: 0.3,
      });
    }
  }, [pathname]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isMobileMenuOpen || isScrolled 
        ? "bg-[#030609]/95 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl" 
        : "bg-transparent py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3 group shrink-0" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0D121F] text-primary transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(54,226,123,0.2)] shrink-0">
            <Image
              src={Logo}
              alt="Kodesec Logo"
              width={26}
              height={32}
              className="h-6 w-auto object-contain"
            />
          </div>
          <span className="text-xl font-heading font-bold tracking-tight text-white group-hover:text-primary transition-colors whitespace-nowrap">
            KODESEC
          </span>
        </Link>

        {/* DESKTOP NAVIGATION BAR */}
        <nav className="hidden lg:flex items-center gap-1  rounded-full px-4 py-1.5 backdrop-blur-md relative">
          
          {/* Animated Selection Indicator */}
          <div 
            ref={indicatorRef} 
            className="absolute h-[80%] top-[10%] rounded-full bg-white/10 pointer-events-none transition-all duration-300"
          />

          {/* Solutions Dropdown Trigger */}
          <div 
            className="relative"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setIsDropdownOpen(true);
            }}
            onMouseLeave={() => {
              timeoutRef.current = setTimeout(() => {
                setIsDropdownOpen(false);
              }, 150);
            }}
          >
            <button
              ref={(el) => { navLinksRef.current["/services"] = el; }}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-heading font-semibold uppercase tracking-wider transition-colors rounded-full whitespace-nowrap group ${
                pathname.startsWith("/services") ? "text-primary" : "text-gray-300 hover:text-white"
              }`}
            >
              <span>Solutions</span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-200 shrink-0 ${
                  isDropdownOpen ? "rotate-180 text-primary" : "text-current opacity-80 group-hover:opacity-100"
                }`} 
              />
            </button>

            {/* Glassmorphic Dropdown Card (Boraq.io style) */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[460px] transition-all duration-200 transform before:absolute before:-top-4 before:left-0 before:right-0 before:h-4 ${
              isDropdownOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
            }`}>
              <div className="bg-[#0A0E17]/95 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl">
                <div className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase px-2 mb-3">
                  Security & Engineering Solutions
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {solutions.map((sol) => {
                    const IconComp = (LucideIcons as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>>)[sol.iconName] || Shield;
                    return (
                      <Link
                        key={sol.slug}
                        href={`/services/${sol.slug}`}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                          <IconComp size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-heading font-bold text-white group-hover:text-primary transition-colors flex items-center gap-1.5">
                            {sol.title}
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">
                            {sol.tagline}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Regular Nav Items */}
          {navItems.filter(item => !item.isDropdown).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => { navLinksRef.current[item.href] = el; }}
                className={`px-4 py-2 text-xs font-heading font-semibold uppercase tracking-wider transition-colors rounded-full whitespace-nowrap ${
                  isActive ? "text-primary" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div className="hidden lg:flex items-center gap-1 shrink-0">
          <Link
            href="/contact?type=consultation"
            className="btn-primary"
          >
            <span>Start a Project</span>
            <ArrowRight size={14} className="shrink-0" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-white rounded-full hover:bg-white/10 transition-all shrink-0 active:scale-95 z-50 relative"
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X size={22} className="text-primary" /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE DRAWER OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-[100dvh] z-40 bg-[#030609] pt-[80px] p-6 flex flex-col justify-between overflow-y-auto lg:hidden">
          <div className="space-y-6 pt-2">
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase mb-3 px-1">
                Navigation
              </div>

              {/* Solutions Collapsible Accordion */}
              <div className="rounded-2xl border border-white/10 bg-[#0D121F]/60 overflow-hidden mb-3">
                <button 
                  onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                  className="w-full flex items-center justify-between p-4 text-base font-heading font-bold text-white hover:text-primary transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Shield size={16} />
                    </div>
                    <span>Solutions</span>
                  </div>
                  <ChevronDown size={18} className={`transition-transform duration-300 ${isServicesExpanded ? "rotate-180 text-primary" : "text-gray-400"}`} />
                </button>

                {isServicesExpanded && (
                  <div className="px-3 pb-3 space-y-1.5 border-t border-white/5 pt-2">
                    {solutions.map((sol) => {
                      const IconComp = (LucideIcons as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number | string }>>)[sol.iconName] || Shield;
                      const isSolActive = pathname === `/services/${sol.slug}`;
                      return (
                        <Link
                          key={sol.slug}
                          href={`/services/${sol.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-start gap-3 p-3 rounded-xl transition-all ${
                            isSolActive ? "bg-primary/10 border border-primary/30 text-white" : "hover:bg-white/5 border border-transparent text-gray-300"
                          }`}
                        >
                          <div className="p-2 rounded-lg bg-white/5 text-primary shrink-0 mt-0.5">
                            <IconComp size={14} />
                          </div>
                          <div>
                            <div className="text-sm font-heading font-semibold text-white">
                              {sol.title}
                            </div>
                            <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                              {sol.tagline}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Regular Nav Items */}
              <div className="space-y-1.5">
                {navItems.filter(item => !item.isDropdown).map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-4 rounded-xl font-heading font-bold text-base transition-all ${
                        isActive 
                          ? "bg-primary/10 border border-primary/30 text-primary" 
                          : "text-gray-200 hover:text-white hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight size={14} className={`transition-all ${isActive ? "text-primary opacity-100" : "opacity-40"}`} />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Actions & Status Footer */}
          <div className="pt-6 border-t border-white/10 space-y-4 mb-4">
            <div className="flex items-center gap-2 px-1 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-[11px]">Available for new projects</span>
            </div>

            <Link
              href="/contact?type=consultation"
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-primary w-full text-center justify-center py-3.5 text-sm shadow-[0_0_25px_rgba(54,226,123,0.2)]"
            >
              <span>Start a Project</span>
              <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
