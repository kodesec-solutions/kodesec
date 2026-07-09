"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import Logo from "@/public/assets/Logo.png";
import { 
  Shield, 
  Terminal, 
  Code, 
  Cloud, 
  Workflow, 
  Cpu, 
  Sun, 
  Moon, 
  ChevronDown, 
  ArrowRight,
  Menu,
  X,
  Mail
} from "lucide-react";
import { navigationConfig } from "@/config/site";

const { cybersecurityItems, engineeringItems, navItems } = navigationConfig;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesExpanded, setIsServicesExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<{ [key: string]: HTMLAnchorElement | HTMLButtonElement | null }>({});
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMounted(true);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = buttonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };

  const handleMouseLeave = () => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px)";
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header 
      className="fixed left-0 right-0 z-50 px-4 md:px-8 transition-all duration-300"
      style={{
        top: isScrolled ? "12px" : "24px"
      }}
    >
      <nav className="max-w-5xl mx-auto">
        <div
          className={`flex items-center justify-between px-6 transition-all duration-300 rounded-full border border-border backdrop-blur-md ${
            isScrolled 
              ? "py-2.5 bg-glass-bg border-glass-border/40 shadow-lg shadow-black/5 dark:shadow-black/40" 
              : "py-4 bg-glass-bg/10 border-glass-border/10"
          }`}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-muted border border-border hover:bg-muted/80 transition-all"
          >
            <Image
              src={Logo}
              alt="Kodesec Logo"
              className="h-6 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 relative">
            {/* Sliding Indicator */}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all shadow-[0_0_10px_rgba(54,226,123,0.8)]"
              style={{ left: 0, width: 0 }}
            />
            {navItems.map((item) => (
              <div 
                key={item.href}
                className={item.isDropdown ? "group/services relative" : ""}
              >
                {item.isDropdown ? (
                  <>
                    <button
                      ref={(el) => {
                        navLinksRef.current[item.href] = el;
                      }}
                      className={`relative z-10 px-3 py-2 transition-colors text-sm font-medium flex items-center gap-1 cursor-pointer ${
                        pathname.startsWith(item.href)
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item.label}
                      <ChevronDown size={14} className="group-hover/services:rotate-180 transition-transform duration-300" />
                    </button>
                    
                    {/* Mega Menu Dropdown */}
                    <div className="absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 w-[620px] p-6 bg-card border border-border rounded-3xl shadow-2xl backdrop-blur-xl opacity-0 translate-y-2 pointer-events-none group-hover/services:opacity-100 group-hover/services:translate-y-0 group-hover/services:pointer-events-auto transition-all duration-300 ease-out z-50">
                      {/* Invisible bridge to prevent mouse-leave when moving to dropdown */}
                      <div className="absolute -top-[0.75rem] left-0 right-0 h-[0.75rem]" />
                      
                      <div className="grid grid-cols-2 gap-6">
                        {/* Cybersecurity Column */}
                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-3 px-2">Cybersecurity</h4>
                          <div className="space-y-1">
                            {cybersecurityItems.map((subItem) => {
                              const IconComp = subItem.icon;
                              return (
                                <Link 
                                  key={subItem.name} 
                                  href={subItem.href} 
                                  className="group/item flex gap-3.5 p-2 rounded-2xl hover:bg-muted/50 transition-all text-left"
                                >
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover/item:bg-primary group-hover/item:text-primary-foreground transition-colors">
                                    <IconComp size={16} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-foreground group-hover/item:text-primary transition-colors">{subItem.name}</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{subItem.desc}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
 
                        {/* Engineering Column */}
                        <div>
                          <h4 className="text-xs font-mono font-bold tracking-widest text-accent-cyan uppercase mb-3 px-2">Engineering</h4>
                          <div className="space-y-1">
                            {engineeringItems.map((subItem) => {
                              const IconComp = subItem.icon;
                              return (
                                <Link 
                                  key={subItem.name} 
                                  href={subItem.href} 
                                  className="group/item flex gap-3.5 p-2 rounded-2xl hover:bg-muted/50 transition-all text-left"
                                >
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan group-hover/item:bg-accent-cyan group-hover/item:text-white dark:group-hover/item:text-[#1a1f2e] transition-colors">
                                    <IconComp size={16} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-foreground group-hover/item:text-accent-cyan transition-colors">{subItem.name}</p>
                                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{subItem.desc}</p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
 
                      {/* Dropdown Footer - View All Services */}
                      <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground tracking-wider">KODESEC HUB</span>
                        <Link 
                          href="/services"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-light transition-all group/all"
                        >
                          View All Services
                          <ArrowRight size={12} className="group-hover/all:translate-x-0.5 transition-transform duration-200" />
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    ref={(el) => {
                      navLinksRef.current[item.href] = el;
                    }}
                    className={`relative z-10 px-3 py-2 transition-colors text-sm font-medium block cursor-pointer ${
                      pathname === item.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
 
          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
 
            {/* Magnetic CTA */}
            <Link
              href="/contact"
              ref={buttonRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="inline-flex h-11 items-center justify-center px-6 bg-primary text-primary-foreground rounded-full text-xs font-extrabold hover:bg-primary-light transition-all shadow-[0_0_20px_rgba(54,226,123,0.2)]"
              style={{ transition: "transform 0.1s ease-out" }}
            >
              Consultation
            </Link>
          </div>
 
          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center text-foreground border border-border bg-muted/40 rounded-full"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div 
        className={`fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-all duration-500 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Fullscreen Mobile Menu Overlay Drawer */}
      <div 
        className={`fixed top-0 right-0 bottom-0 z-[60] w-full max-w-[340px] bg-card/95 border-l border-border backdrop-blur-2xl p-6 flex flex-col justify-between transition-all duration-500 ease-in-out transform lg:hidden shadow-2xl overflow-y-auto no-scrollbar ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Drawer Header Bar */}
          <div className="flex items-center justify-between w-full mb-8">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-muted border border-border"
            >
              <Image
                src={Logo}
                alt="Kodesec Logo"
                className="h-6 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-11 h-11 flex items-center justify-center text-foreground border border-border bg-muted/40 rounded-full cursor-pointer hover:bg-muted"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Menu List */}
          <div className="flex flex-col space-y-6 text-left">
            {/* Services Dropdown Accordion */}
            <div className="space-y-2">
              <button 
                onClick={() => setIsServicesExpanded(!isServicesExpanded)}
                className="w-full flex items-center justify-between py-2 text-xl font-black text-foreground hover:text-primary transition-all cursor-pointer"
              >
                <span>Services</span>
                <ChevronDown size={18} className={`transition-transform duration-300 ${isServicesExpanded ? "rotate-180 text-primary" : "text-gray-500"}`} />
              </button>
              
              <div 
                className={`grid gap-3 overflow-hidden transition-all duration-300 ease-in-out ${
                  isServicesExpanded ? "max-h-[600px] opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                {/* Cybersecurity Sub-menu */}
                <div className="space-y-2">
                  <p className="text-[10px] font-mono font-bold tracking-widest text-primary uppercase px-1">Cybersecurity</p>
                  <div className="grid grid-cols-1 gap-2">
                    {cybersecurityItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 p-3 rounded-2xl border border-border bg-muted/20 hover:bg-muted/55 hover:border-primary/20 transition-all group text-left"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-[#1a1f2e] transition-colors shrink-0">
                            <Icon size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</p>
                            <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Engineering Sub-menu */}
                <div className="space-y-2 mt-4">
                  <p className="text-[10px] font-mono font-bold tracking-widest text-accent-cyan uppercase px-1">Engineering</p>
                  <div className="grid grid-cols-1 gap-2">
                    {engineeringItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 p-3 rounded-2xl border border-border bg-muted/20 hover:bg-muted/55 hover:border-accent-cyan/20 transition-all group text-left"
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan group-hover:bg-accent-cyan group-hover:text-[#1a1f2e] transition-colors shrink-0">
                            <Icon size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-foreground group-hover:text-accent-cyan transition-colors">{item.name}</p>
                            <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{item.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Other Navigation Links */}
            <div className="space-y-2 pt-2">
              <p className="text-[10px] font-mono font-bold tracking-widest text-accent-purple uppercase px-1">Company</p>
              <div className="space-y-1">
                {navItems.filter(item => !item.isDropdown).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block py-3 px-2 text-lg font-black transition-all rounded-xl hover:bg-muted ${
                      pathname === item.href ? "text-primary bg-muted/50" : "text-foreground hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Area */}
        <div className="mt-8 pt-6 border-t border-border space-y-5">
          <Link
            href="/contact?type=consultation"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full h-12 bg-primary text-[#1a1f2e] text-center font-black rounded-xl hover:bg-primary-hover shadow-lg hover:shadow-[0_0_15px_rgba(54,226,123,0.3)] transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
          >
            Book Free Consultation
            <ArrowRight size={14} />
          </Link>

          <div className="flex justify-center gap-4 text-muted-foreground">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-muted border border-border hover:text-foreground hover:border-primary/20 transition-all" aria-label="LinkedIn">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl bg-muted border border-border hover:text-foreground hover:border-primary/20 transition-all" aria-label="GitHub">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="mailto:contact@kodesec.com" className="p-2 rounded-xl bg-muted border border-border hover:text-foreground hover:border-primary/20 transition-all" aria-label="Email">
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
