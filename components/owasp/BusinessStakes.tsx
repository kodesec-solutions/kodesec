"use client";

import { CircleAlert, MessageSquareQuote, PencilLine, Users } from "lucide-react";
import type { OwaspTopic } from "@/lib/content/schemas";
import { Biz, BusinessPicker, useBusiness } from "./BusinessContext";
import { CopyButton } from "./CopyButton";
import { plain } from "@/lib/academy/template";

/**
 * "What's at stake for you": the lesson seen through the visitor's business. Uses the lesson's own per-business
 * words ({exposed}, {changed}, {abuse}…) when it has them, and the first question to put to the developer.
 */
export function BusinessStakes({ topic }: { topic: OwaspTopic }) {
  const { current } = useBusiness();
  const v = current.vars;
  const question = topic.checklist.items[0].question;

  const cards: { icon: React.ReactNode; label: string; text: string }[] = [
    { icon: <Users className="h-4 w-4" />, label: "Who is affected", text: "Your {people}, and anyone who trusts you with their details." },
    ...(v.exposed ? [{ icon: <CircleAlert className="h-4 w-4" />, label: "What could leak", text: "{Exposed}." }] : []),
    ...(v.changed ? [{ icon: <PencilLine className="h-4 w-4" />, label: "What could be changed", text: "Someone could {changed}." }] : []),
    ...(v.abuse ? [{ icon: <CircleAlert className="h-4 w-4" />, label: "What it could cost", text: "{Abuse}." }] : []),
  ];

  return (
    <div className="mt-8">
      <BusinessPicker />
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {cards.slice(0, 2).map((c) => (
          <div key={c.label} className="card p-6">
            <p className="acc-text flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
              {c.icon}
              {c.label}
            </p>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-fg">
              <Biz text={c.text} />
            </p>
          </div>
        ))}
        <div className="card acc-border p-6">
          <p className="acc-text flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em]">
            <MessageSquareQuote className="h-4 w-4" />
            Ask this first
          </p>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-fg">
            “<Biz text={question} />”
          </p>
          <CopyButton className="mt-4" label="Copy question" text={() => plain(question, v)} />
        </div>
      </div>
    </div>
  );
}
