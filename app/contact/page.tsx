import Link from "next/link";
import { Suspense } from "react";
import { Calendar, Mail, MapPin } from "lucide-react";
import ContactForm from "@/components/booking/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { SocialIcon } from "@/components/ui/Icon";
import { getServices, getSite } from "@/lib/content/loaders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Talk to the Kodesec team about penetration testing, secure engineering, cloud security or the Academy. We reply within one business day.",
  path: "/contact",
});

export default function ContactPage() {
  const site = getSite();
  const topics = [
    ...getServices().map((s) => ({ value: s.slug, label: s.title })),
    { value: "academy", label: "Academy" },
    { value: "careers", label: "Careers" },
    { value: "general", label: "Something else" },
  ];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact" }]}
        eyebrow="Contact"
        title="Talk to an engineer"
        lead="Tell us what you're building or worried about. You'll hear back from one of the founders within one business day."
      />
      <section className="pb-24">
        <div className="container-kd grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="card min-h-[520px]" />}>
              <ContactForm topics={topics} />
            </Suspense>
          </div>
          <aside className="space-y-4 lg:col-span-4">
            <Link href="/book" className="card card-hover flex gap-4 p-6">
              <Calendar className="h-5 w-5 shrink-0 text-brand" />
              <span>
                <span className="block font-medium text-fg">Prefer to talk?</span>
                <span className="mt-1 block text-sm text-fg-2">Book a free 30-minute scoping call.</span>
              </span>
            </Link>
            <a href={`mailto:${site.email}`} className="card card-hover flex gap-4 p-6">
              <Mail className="h-5 w-5 shrink-0 text-brand" />
              <span>
                <span className="block font-medium text-fg">Email</span>
                <span className="mt-1 block text-sm text-fg-2">{site.email}</span>
              </span>
            </a>
            <div className="card flex gap-4 p-6">
              <MapPin className="h-5 w-5 shrink-0 text-brand" />
              <span>
                <span className="block font-medium text-fg">Office</span>
                <span className="mt-1 block text-sm text-fg-2">
                  {site.address.street}, {site.address.city} {site.address.postcode}, {site.address.countryName}
                </span>
                <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="mt-1 block text-sm text-fg-2 hover:text-fg">
                  {site.phone}
                </a>
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              {site.social.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-fg-2 transition hover:border-brand/50 hover:text-brand"
                >
                  <SocialIcon name={s.icon} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
