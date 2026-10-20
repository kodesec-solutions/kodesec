"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, HelpCircle, RotateCcw, X } from "lucide-react";
import type { OwaspTopic } from "@/lib/content/schemas";
import { plain } from "@/lib/academy/template";
import { Biz, useBusiness } from "./BusinessContext";
import { CopyButton } from "./CopyButton";
import { cn } from "@/lib/utils";

type Checklist = OwaspTopic["checklist"];
type Answer = "yes" | "no" | "unsure";

const choices: { value: Answer; label: string; icon: React.ReactNode }[] = [
  { value: "yes", label: "That's us", icon: <Check className="h-4 w-4" /> },
  { value: "no", label: "Not us", icon: <X className="h-4 w-4" /> },
  { value: "unsure", label: "Not sure", icon: <HelpCircle className="h-4 w-4" /> },
];

/**
 * "Does this apply to you?" as a quick quiz: one statement at a time, three taps. "That's us" and "Not sure"
 * both add the matching question for your developer; answers about what the simulation shows offer to replay it.
 */
export function SelfAssessment({ checklist }: { checklist: Checklist }) {
  const items = checklist.items;
  const [answers, setAnswers] = useState<(Answer | null)[]>(() => items.map(() => null));
  const [step, setStep] = useState(0);
  const [askBiz, setAskBiz] = useState(true);
  const { current, profiles, choose } = useBusiness();
  const done = step >= items.length;
  const flagged = items.filter((_, i) => answers[i] === "yes" || answers[i] === "unsure");
  const yes = answers.filter((a) => a === "yes").length;
  const unsure = answers.filter((a) => a === "unsure").length;
  const level = flagged.length === 0 ? 0 : flagged.length < 3 ? 1 : 2;

  const answer = (a: Answer) => {
    setAnswers((list) => list.map((v, i) => (i === step ? a : v)));
    setStep((s) => s + 1);
  };
  const reset = () => {
    setAnswers(items.map(() => null));
    setStep(0);
    setAskBiz(true);
  };


  return (
    <div className="card mt-8 overflow-hidden">
      {/* progress */}
      <div className="flex items-center gap-4 border-b hairline px-5 py-3">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">
          {askBiz ? "First" : done ? "Your result" : `${step + 1} of ${items.length}`}
        </span>
        <div className="flex flex-1 gap-1" aria-hidden>
          {items.map((_, i) => (
            <i
              key={i}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors duration-300",
                answers[i] === "yes" && "bg-warn",
                answers[i] === "unsure" && "bg-warn/50",
                answers[i] === "no" && "bg-brand",
                !answers[i] && (i === step ? "bg-fg-3" : "bg-line-2"),
              )}
            />
          ))}
        </div>
        <span className="hidden text-xs text-fg-3 sm:inline">for {current.label.toLowerCase()}</span>
      </div>

      {askBiz ? (
        <div className="kd-qcard px-5 py-8 md:px-10 md:py-12">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">So the questions fit you</p>
          <p className="mt-3 text-2xl font-semibold leading-snug text-fg md:text-[1.9rem]">What kind of business do you run?</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {profiles.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => {
                  choose(p.slug);
                  setAskBiz(false);
                }}
                className={cn(
                  "inline-flex h-11 items-center rounded-full border px-5 text-sm font-medium transition-colors",
                  p.slug === current.slug ? "border-fg bg-fg text-bg" : "border-line-2 text-fg-2 hover:border-brand/50 hover:text-fg",
                )}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      ) : !done ? (
        <div key={step} className="kd-qcard px-5 py-8 md:px-10 md:py-12" aria-live="polite">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">Is this true for you?</p>
          <p className="mt-3 max-w-2xl text-2xl font-semibold leading-snug text-fg md:text-[1.9rem]">
            <Biz text={items[step].statement} />
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {choices.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => answer(c.value)}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors",
                  c.value === "yes" ? "border-fg bg-fg text-bg hover:bg-mint" : "border-line-2 text-fg-2 hover:border-brand/50 hover:text-fg",
                )}
              >
                {c.icon}
                {c.label}
              </button>
            ))}
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="ml-auto inline-flex h-11 items-center gap-1.5 px-2 text-sm text-fg-3 hover:text-fg"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="kd-qcard grid gap-8 px-5 py-8 md:grid-cols-[1fr_1.4fr] md:px-10 md:py-10">
          <div>
            <p className={cn("text-4xl font-semibold tracking-tight", level === 0 ? "text-brand" : "text-warn")}>
              {level === 0 ? "Low exposure" : level === 1 ? "Some exposure" : "Worth a check"}
            </p>
            <p className="mt-3 leading-relaxed text-fg-2">
              {level === 0
                ? "Nothing you ticked points at this risk. Good. It's still worth a check after big changes."
                : level === 1
                  ? "Start with the questions on the right."
                  : checklist.verdict}
            </p>
            <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-fg-3">
              {`${yes} apply · ${unsure} not sure · ${items.length - yes - unsure} don't`}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <button type="button" className="pill-toggle" onClick={reset}>
                <RotateCcw className="h-3.5 w-3.5" /> Start over
              </button>
            </div>
          </div>

          {flagged.length > 0 && (
            <div className="rounded-2xl border hairline bg-bg-2/60 p-5">
              <p className="font-semibold text-fg">Ask your developer</p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-[0.95rem] leading-relaxed text-fg-2 marker:font-mono marker:text-brand">
                {flagged.map((item, i) => (
                  <li key={i}>
                    <Biz text={item.question} />
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <CopyButton label="Copy questions" text={() => flagged.map((p, i) => `${i + 1}. ${plain(p.question, current.vars)}`).join("\n")} />
                <Link href="/book" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:underline">
                  Not sure about the answers? Ask us <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
