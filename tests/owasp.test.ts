import { describe, expect, it } from "vitest";
import { fill, plain, tokens } from "@/lib/academy/template";
import { getBusinesses, getOwaspTopics } from "@/lib/content/loaders";
import { businessProfiles } from "@/lib/academy/profiles";

describe("academy templates", () => {
  const vars = { person: "patient", records: "appointment records" };

  it("fills placeholders, capitalises and slugs", () => {
    expect(fill("A {person} and {Person}", vars)).toBe("A patient and Patient");
    expect(fill("/api/{records|slug}", vars)).toBe("/api/appointment-records");
    expect(fill("{unknown} stays", vars)).toBe("{unknown} stays");
  });

  it("tokenises bold and highlight only", () => {
    expect(tokens("**Stop.** Then [[this]] <b>x</b>")).toEqual([
      { kind: "strong", value: "Stop." },
      { kind: "text", value: " Then " },
      { kind: "mark", value: "this" },
      { kind: "text", value: " <b>x</b>" },
    ]);
    expect(plain("**{Person}** waits", vars)).toBe("Patient waits");
  });
});

describe("OWASP lessons", () => {
  it("has ranks 1 to 10, one lesson each", () => {
    expect(getOwaspTopics().map((t) => t.rank)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("leaves no unfilled placeholder for any business", () => {
    for (const topic of getOwaspTopics()) {
      for (const profile of businessProfiles(topic)) {
        const text = JSON.stringify({ ...topic, vars: undefined, seo: undefined });
        const left = fill(text, profile.vars).match(/\{[A-Za-z]+(\|\w+)?\}/g);
        expect(left, `${topic.slug} / ${profile.slug}`).toBeNull();
      }
    }
  });

  it("only uses known businesses in lesson vars", () => {
    const known = getBusinesses().map((b) => b.slug);
    for (const t of getOwaspTopics()) expect(Object.keys(t.vars).every((k) => known.includes(k)), t.slug).toBe(true);
  });
});
