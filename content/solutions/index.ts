import { SolutionContent } from "./types";
import { designEngineering } from "./design-engineering";
import { cybersecurity } from "./cybersecurity";
import { cloudDevops } from "./cloud-devops";
import { qualityAssurance } from "./quality-assurance";

export * from "./types";

export const solutions: SolutionContent[] = [
  designEngineering,
  cybersecurity,
  cloudDevops,
  qualityAssurance
];

export function getSolutionBySlug(slug: string): SolutionContent | undefined {
  return solutions.find((sol) => sol.slug === slug);
}
