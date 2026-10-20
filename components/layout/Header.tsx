import { TOP_BAR_HEIGHT } from "./TopBar";
import HeaderClient, { type NavItem } from "./HeaderClient";
import { getServices, getSite } from "@/lib/content/loaders";

/** Builds the nav from content/site.yml, filling the Services and Academy menus from their content folders. */
export default function Header() {
  const site = getSite();
  const services = getServices();

  const items: NavItem[] = site.nav.map((n) => {
    if (n.children === "services") {
      return {
        label: n.label,
        href: n.href,
        children: services.map((s) => ({ label: s.title, href: `/services/${s.slug}`, description: s.tagline, icon: s.icon })),
        footer: { label: "See pricing and engagement models", href: "/pricing" },
      };
    }
    // The Academy is a plain, highlighted link (no dropdown), so visitors spot it straight away.
    if (n.children === "academy") return { label: n.label, href: n.href, highlight: true };
    return { label: n.label, href: n.href };
  });

  return <HeaderClient items={items} offset={site.topBar?.text ? TOP_BAR_HEIGHT : 0} />;
}
