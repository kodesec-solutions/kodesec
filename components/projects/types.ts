export type ProjectCategory =
  | "All"
  | "Penetration Testing"
  | "Secure Development"
  | "Cloud & DevOps"
  | "Network Security";

export type ProjectCaseStudy = {
  id: string;
  category: Exclude<ProjectCategory, "All">;
  title: string;
  description: string;
  highlights: string[];
  overview: string;
  scope: string;
  approach: string;
  tools: string[];
  results: string;
};
