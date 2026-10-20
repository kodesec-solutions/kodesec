/**
 * Placeholder text for the OWASP academy. Lesson copy says "{person}" and the business picker decides
 * whether that reads "customer", "patient" or "student".
 *
 *   {person}        → customer
 *   {Person}        → Customer   (a capital first letter capitalises the value)
 *   {records|slug}  → orders     (spaces become dashes, for URLs and file names)
 *
 * Unknown placeholders are left as they are, so a typo shows up on the page instead of vanishing.
 */
export type Vars = Record<string, string>;

export function fill(text: string, vars: Vars): string {
  return text.replace(/\{(\w+)(?:\|(slug|lower))?\}/g, (match, key: string, filter?: string) => {
    const lower = key.charAt(0).toLowerCase() + key.slice(1);
    let value = vars[lower];
    if (value === undefined) return match;
    if (filter === "slug") value = value.replace(/ /g, "-");
    if (filter === "lower") value = value.toLowerCase();
    return key.charAt(0) !== lower.charAt(0) ? value.charAt(0).toUpperCase() + value.slice(1) : value;
  });
}

export type Token = { kind: "text" | "strong" | "mark"; value: string };

/** Splits "**bold** and [[highlighted]]" into tokens. Nothing else is interpreted: content never carries HTML. */
export function tokens(text: string): Token[] {
  const out: Token[] = [];
  const re = /\*\*([^*]+)\*\*|\[\[([^\]]+)\]\]/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) out.push({ kind: "text", value: text.slice(last, m.index) });
    out.push(m[1] !== undefined ? { kind: "strong", value: m[1] } : { kind: "mark", value: m[2] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ kind: "text", value: text.slice(last) });
  return out;
}

/** Plain text, for clipboard copies and metadata. */
export const plain = (text: string, vars: Vars) => tokens(fill(text, vars)).map((t) => t.value).join("");
