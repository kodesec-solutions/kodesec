"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Option = { value: string; label: string };

/**
 * Contact form → Web3Forms. Includes Web3Forms' honeypot ("botcheck").
 * Phase 4 moves this behind the public-api Worker (Turnstile + hidden key).
 */
export default function ContactForm({ topics }: { topics: Option[] }) {
  const params = useSearchParams();
  const initial = topics.find((t) => t.value === params.get("type"))?.value ?? topics[0].value;
  const [topic, setTopic] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!key) {
      setStatus("error");
      setError("The form isn't configured yet. Please email us directly.");
      return;
    }
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return;
    data.append("access_key", key);
    data.append("subject", `Website enquiry: ${topics.find((t) => t.value === topic)?.label ?? topic}`);
    data.append("topic", topic);
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Something went wrong.");
      setStatus("sent");
      form.reset();
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer?.push({ event: "contact_submitted", topic });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Network error — please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="card p-10 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand/15 text-brand">
          <Check className="h-6 w-6" />
        </span>
        <h2 className="mt-5 text-xl font-semibold text-fg">Message sent</h2>
        <p className="mt-2 text-sm text-fg-2">Thanks — an engineer will reply within one business day.</p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-line-2 bg-tint/[0.02] px-4 py-3 text-sm text-fg placeholder:text-fg-3 outline-none transition focus:border-brand/60 focus:bg-tint/[0.04]";

  return (
    <form onSubmit={onSubmit} className="card space-y-6 p-6 md:p-8">
      <fieldset>
        <legend className="text-sm font-medium text-fg">What can we help with?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t.value}
              type="button"
              aria-pressed={topic === t.value}
              onClick={() => setTopic(t.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                topic === t.value ? "border-brand/60 bg-brand/10 text-fg" : "border-line-2 text-fg-2 hover:text-fg",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm text-fg-2">Name</span>
          <input name="name" required autoComplete="name" className={cn(field, "mt-2")} />
        </label>
        <label className="block">
          <span className="text-sm text-fg-2">Work email</span>
          <input name="email" type="email" required autoComplete="email" className={cn(field, "mt-2")} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm text-fg-2">Company (optional)</span>
          <input name="company" autoComplete="organization" className={cn(field, "mt-2")} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-sm text-fg-2">Tell us about your project</span>
          <textarea name="message" required rows={5} className={cn(field, "mt-2 resize-y")} />
        </label>
      </div>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      {status === "error" && <p className="text-sm text-danger">{error}</p>}

      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send message"} <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
