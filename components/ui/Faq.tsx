import { ChevronDown } from "lucide-react";

/** Accessible FAQ using native <details>, so it works without JavaScript. */
export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
      {items.map((q) => (
        <details key={q.question} className="group bg-tint/[0.01] open:bg-tint/[0.025]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-[0.95rem] font-medium text-fg [&::-webkit-details-marker]:hidden">
            {q.question}
            <ChevronDown className="h-4 w-4 shrink-0 text-fg-3 transition-transform group-open:rotate-180 group-open:text-brand" />
          </summary>
          <p className="px-6 pb-6 text-sm leading-relaxed text-fg-2">{q.answer}</p>
        </details>
      ))}
    </div>
  );
}
