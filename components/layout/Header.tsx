import { TOP_BAR_HEIGHT } from "./TopBar";
import HeaderClient, { type NavItem } from "./HeaderClient";
import { getAcademy, getServices, getSite } from "@/lib/content/loaders";

/** Builds the nav from content/site.yml, filling the Services and Academy menus from their content folders. */
export default function Header() {
  const site = getSite();
  const services = getServices();
  const tracks = getAcademy();

  const items: NavItem[] = site.nav.map((n) => {
    if (n.children === "services") {
      return {
        label: n.label,
        href: n.href,
        children: services.map((s) => ({ label: s.title, href: `/services/${s.slug}`, description: s.tagline, icon: s.icon })),
        footer: { label: "See pricing and engagement models", href: "/pricing" },
      };
    }
    if (n.children === "academy") {
      return {
        label: n.label,
        href: n.href,
        children: tracks.map((t) => ({
          label: t.title,
          href: t.href,
          description: t.summary.split(".")[0] + ".",
          icon: t.icon,
          badge: t.status === "coming-soon" ? "Soon" : undefined,
        })),
        footer: { label: "Browse the free Kodesec Academy", href: "/academy" },
      };
    }
    return { label: n.label, href: n.href };
  });

  return <HeaderClient items={items} offset={site.topBar?.text ? TOP_BAR_HEIGHT : 0} />;
}
