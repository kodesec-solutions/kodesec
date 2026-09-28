"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import Cal, { getCalApi } from "@calcom/embed-react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { subscribeTheme } from "@/components/theme/theme";

type Option = { slug: string; title: string };

/**
 * Cal.com inline booking. ?service=<slug>&plan=<id> preselects context: it's passed to Cal as
 * booking-form prefill + metadata, so it arrives with the booking (and in the webhook).
 */
export default function Booking({
  calLink,
  email,
  services,
  plans,
}: {
  calLink: string;
  email: string;
  services: Option[];
  plans: Option[];
}) {
  const params = useSearchParams();
  const theme: "light" | "dark" = useSyncExternalStore(
    subscribeTheme,
    () => (document.documentElement.getAttribute("data-theme") === "light" ? ("light" as const) : ("dark" as const)),
    () => "dark" as const,
  );
  const service = services.find((s) => s.slug === params.get("service"));
  const plan = plans.find((p) => p.slug === params.get("plan"));

  const config = useMemo(() => {
    const c: Record<string, string> = { theme, layout: "month_view" };
    if (service) c["metadata[service]"] = service.slug;
    if (plan) c["metadata[plan]"] = plan.slug;
    const notes = [service && `Service: ${service.title}`, plan && `Engagement model: ${plan.title}`].filter(Boolean).join("\n");
    if (notes) c.notes = notes;
    return c;
  }, [service, plan, theme]);

  useEffect(() => {
    if (!calLink) return;
    (async () => {
      const cal = await getCalApi({ namespace: "kodesec" });
      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: { dark: { "cal-brand": "#2ECC71" }, light: { "cal-brand": "#1F7A4D" } },
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          const w = window as unknown as { dataLayer?: unknown[] };
          w.dataLayer?.push({ event: "booking_completed", service: service?.slug, plan: plan?.slug });
        },
      });
    })();
  }, [calLink, service, plan, theme]);

  return (
    <div>
      {(service || plan) && (
        <p className="mb-5 flex flex-wrap items-center gap-2 text-sm text-fg-2">
          Booking for
          {service && <span className="chip chip-brand">{service.title}</span>}
          {plan && <span className="chip chip-brand">{plan.title}</span>}
        </p>
      )}
      {calLink ? (
        <div className="card min-h-[640px] overflow-hidden p-2">
          <Cal
            namespace="kodesec"
            calLink={calLink}
            style={{ width: "100%", height: "100%", minHeight: 620, overflow: "auto" }}
            config={config}
          />
        </div>
      ) : (
        <div className="card p-8 text-center">
          <p className="text-lg font-medium text-fg">Online booking is being set up.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-fg-2">
            In the meantime, email us or send the contact form and we&apos;ll reply within one business day with times.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${email}`} className="btn btn-primary">
              <Mail className="h-4 w-4" /> {email}
            </a>
            <Link href="/contact" className="btn btn-ghost">
              Contact form
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
