import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SocialIcon } from "@/components/ui/Icon";
import { getServices, getSite } from "@/lib/content/loaders";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { ContactDetails } from "@/components/ui/ContactDetails";

export default function Footer() {
  const site = getSite();
  const services = getServices();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden ">
      <div className="container-kd grid gap-12 pb-10 pt-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-2">{site.tagline}</p>
          <ContactDetails site={site} className="mt-6 max-w-xs" />
          <ul className="mt-6 flex gap-2">
            {site.social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line-2 text-fg-2 transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:col-span-8">
          {site.footer.map((col) => {
            const links = col.links === "services" ? services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })) : col.links;
            return (
              <div key={col.title}>
                <h2 className="font-mono text-eyebrow uppercase tracking-[0.14em] text-fg-3">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-fg-2 transition-colors hover:text-fg">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container-kd flex flex-col gap-3 border-t border-line py-6 text-xs text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.legalName}. {site.address.city}, {site.address.countryName}.
        </p>
        <ThemeToggle labels />
        <p className="flex items-center gap-2 font-mono uppercase tracking-[0.12em]">
          Security-first by design
        </p>
      </div>

      {/* Giant wordmark: soft gradient fill (no outline), brighter at the top and sinking into the dark at the bottom, spanning the full width */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden px-2">
        <svg viewBox="0 8 1000 180" preserveAspectRatio="xMidYMin meet" className="block h-auto w-full">
          <defs>
            {/* Gentle top→bottom tone shift across the letters (cap top ≈13, baseline 180). Never reaches transparent, so letters stay crisp. */}
            <linearGradient id="kd-footer-wordmark" gradientUnits="userSpaceOnUse" x1="0" y1="13" x2="0" y2="180">
              <stop offset="0%" style={{ stopColor: "color-mix(in srgb, var(--color-tint) 15%, transparent)" }} />
              <stop offset="100%" style={{ stopColor: "color-mix(in srgb, var(--color-tint) 6%, transparent)" }} />
            </linearGradient>
          </defs>
          <text
            x="500"
            y="180"
            textAnchor="middle"
            textLength="990"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif"
            fontSize="235"
            fontWeight="800"
            letterSpacing="-6"
            fill="url(#kd-footer-wordmark)"
          >
            KODESEC
          </text>
        </svg>
      </div>
    </footer>
  );
}
