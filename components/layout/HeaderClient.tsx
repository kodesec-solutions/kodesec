"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme/ThemeToggle";

export type NavChild = { label: string; href: string; description: string; icon: string; badge?: string };
export type NavItem = { label: string; href: string; children?: NavChild[]; footer?: { label: string; href: string } };

export default function HeaderClient({ items, offset = 0 }: { items: NavItem[]; offset?: number }) {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // sit below the top strip, then slide up into its place as it scrolls away
      if (headerRef.current) {
        const top = `${Math.max(0, offset - window.scrollY)}px`;
        headerRef.current.style.top = top;
        headerRef.current.style.setProperty("--hdr-top", top);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  // close menus on navigation
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const enter = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(label);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 120);
  };
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:pt-4" style={{ top: offset }}>
      <div
        className={cn(
          "mx-auto flex h-14 max-w-[1200px] items-center justify-between gap-4 rounded-full border px-3 pl-5 transition-all duration-300",
          scrolled || mobile
            ? "border-line-2 bg-bg/75 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] light:shadow-[0_10px_40px_-24px_rgba(6,30,18,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent light:border-line-2 light:bg-bg/80 light:backdrop-blur-xl",
        )}
      >
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {items.map((item) =>
            item.children ? (
              <div key={item.label} className="relative" onMouseEnter={() => enter(item.label)} onMouseLeave={leave}>
                <button
                  type="button"
                  aria-expanded={open === item.label}
                  aria-haspopup="true"
                  onClick={() => setOpen(open === item.label ? null : item.label)}
                  className={cn(
                    "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors",
                    isActive(item.href) || open === item.label ? "text-fg" : "text-fg-2 hover:text-fg",
                  )}
                >
                  {item.label}
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open === item.label && "rotate-180")} />
                </button>
                <div
                  className={cn(
                    "absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3 transition-all duration-200",
                    open === item.label ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0",
                  )}
                >
                  <div className="overflow-hidden rounded-2xl border border-line-2 bg-bg-2/95 p-2 shadow-2xl backdrop-blur-xl">
                    <ul className="grid grid-cols-2 gap-1">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-tint/[0.04]"
                          >
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line-2 bg-surface text-brand transition-colors group-hover:border-brand/40">
                              <Icon name={c.icon} className="h-4 w-4" />
                            </span>
                            <span>
                              <span className="flex items-center gap-2 text-sm font-medium text-fg">
                                {c.label}
                                {c.badge && <span className="chip h-5 px-1.5 text-[0.6rem]">{c.badge}</span>}
                              </span>
                              <span className="mt-0.5 block text-xs leading-relaxed text-fg-3">{c.description}</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    {item.footer && (
                      <Link
                        href={item.footer.href}
                        className="mt-1 flex items-center justify-between rounded-xl border-t border-line px-3 py-3 text-xs text-fg-2 hover:text-fg"
                      >
                        {item.footer.label}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-colors",
                  isActive(item.href) ? "text-fg" : "text-fg-2 hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden lg:inline-flex" />
          <Link href="/contact" className="hidden text-sm text-fg-2 transition-colors hover:text-fg sm:block sm:px-3">
            Contact
          </Link>
          <Link href="/book" className="btn btn-primary btn-sm">
            Book a call
          </Link>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-2 lg:hidden"
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-x-3 bottom-3 top-[calc(4.75rem+var(--hdr-top,0px))] overflow-y-auto rounded-3xl border border-line-2 bg-bg-2/95 p-5 backdrop-blur-xl transition-all duration-300 lg:hidden",
          mobile ? "visible opacity-100" : "invisible pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="space-y-6">
          {items.map((item) => (
            <div key={item.label}>
              <Link href={item.href} className="block text-lg font-medium text-fg">
                {item.label}
              </Link>
              {item.children && (
                <ul className="mt-3 space-y-1 border-l border-line pl-4">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link href={c.href} className="block py-1.5 text-sm text-fg-2 hover:text-fg">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="flex items-center justify-between">
            <span className="text-sm text-fg-2">Theme</span>
            <ThemeToggle labels />
          </div>
          <Link href="/contact" className="block text-lg font-medium text-fg">
            Contact
          </Link>
          <Link href="/book" className="btn btn-brand w-full">
            Book a call <ArrowRight className="h-4 w-4" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
