import { getBusinesses, type OwaspTopicEntry } from "@/lib/content/loaders";
import type { BusinessProfile } from "@/components/owasp/BusinessContext";

/** Business profiles for the picker: the shared words from _businesses.yml, overridden by the lesson's own vars. */
export function businessProfiles(topic?: OwaspTopicEntry): BusinessProfile[] {
  return getBusinesses().map(({ slug, label, ...base }) => ({
    slug,
    label,
    // `who` is the other person in a simulation (B, then C, D… as the viewer tries more numbers)
    vars: { label, who: "B", ...base, ...(topic?.vars[slug] ?? {}) },
  }));
}
