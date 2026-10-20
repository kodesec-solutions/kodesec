import { Building2, ClipboardCheck, LayoutGrid } from "lucide-react";
import { THEMES } from "./sims/kit";

// TODO(team): review the "how to use" copy.
const steps = [
  { icon: Building2, color: THEMES.violet, title: "Choose your business", text: "Pick shop, clinic, school or software company. Every example adapts to you." },
  { icon: LayoutGrid, color: THEMES.sky, title: "Open a risk", text: "Ten lessons, one per OWASP Top 10 risk. Each takes about three minutes." },
  { icon: ClipboardCheck, color: THEMES.teal, title: "Check your own site", text: "Answer a few quick questions and copy the ones to ask your developer." },
];

/** A short guide under the Academy hero, so visitors know how to get value quickly. */
export function HowToUse() {
  return (
    <ol aria-label="How to use the Academy" className="mt-10 grid gap-px overflow-hidden rounded-xl border hairline bg-line sm:grid-cols-2 lg:grid-cols-3">
      {steps.map(({ icon: Icon, color, title, text }, i) => (
        <li key={title} className="flex gap-3 bg-bg p-4">
          <span className="grid h-8 w-8 flex-none place-items-center rounded-lg" style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}>
            <Icon className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-fg">
              <span className="mr-1.5 font-mono text-[0.68rem] text-fg-3">{String(i + 1).padStart(2, "0")}</span>
              {title}
            </span>
            <span className="mt-1 block text-[0.8rem] leading-snug text-fg-2">{text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
