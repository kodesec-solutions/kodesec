import { Suspense } from "react";
import { Check } from "lucide-react";
import Booking from "@/components/booking/Booking";
import { PageHero } from "@/components/ui/PageHero";
import { getPricing, getServices, getSite } from "@/lib/content/loaders";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book a Scoping Call",
  description: "Pick a time for a free 30-minute scoping call with a Kodesec engineer. You'll get a clear plan and a fixed quote.",
  path: "/book",
});

const expectations = [
  "30 minutes with an engineer, not a salesperson",
  "We map your systems, goals and deadlines",
  "You get a written plan and fixed quote within 48 hours",
  "NDA available before you share details",
];

export default function BookPage() {
  const site = getSite();
  const services = getServices().map((s) => ({ slug: s.slug, title: s.title }));
  const plans = getPricing().models.map((m) => ({ slug: m.id, title: m.name }));
  return (
    <>
      <PageHero crumbs={[{ name: "Book a call" }]} eyebrow="Book a call" title="Pick a time that works for you" />
      <section className="pb-24">
        <div className="container-kd grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="card p-7">
              <h2 className="font-semibold text-fg">What happens on the call</h2>
              <ul className="mt-5 space-y-4 text-sm text-fg-2">
                {expectations.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="card min-h-[640px] animate-pulse" />}>
              <Booking calLink={site.booking.calLink} email={site.email} services={services} plans={plans} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
