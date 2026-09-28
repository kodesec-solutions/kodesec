import { Mail, MapPin, Phone } from "lucide-react";
import type { Site } from "@/lib/content/schemas";
import { cn } from "@/lib/utils";

/** Office address, phone and email (from content/site.yml). */
export function ContactDetails({ site, className }: { site: Site; className?: string }) {
  const a = site.address;
  const tel = site.phone.replace(/[^\d+]/g, "");
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.city} ${a.postcode}`)}`;
  return (
    <address className={cn("space-y-3 text-sm not-italic text-fg-2", className)}>
      <a href={maps} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 transition-colors hover:text-fg">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
        <span>
          {a.street.split(", ").map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
          {a.city} {a.postcode}, {a.countryName}
        </span>
      </a>
      <a href={`tel:${tel}`} className="flex items-center gap-2.5 transition-colors hover:text-fg">
        <Phone className="h-4 w-4 shrink-0 text-brand" />
        {site.phone}
      </a>
      <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 transition-colors hover:text-fg">
        <Mail className="h-4 w-4 shrink-0 text-brand" />
        {site.email}
      </a>
    </address>
  );
}
