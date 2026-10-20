import {
  siDocker, siGithubactions, siGooglecloud, siKubernetes, siNextdotjs, siNodedotjs, siOwasp,
  siPostgresql, siPython, siTerraform, siLinux,
} from "simple-icons";

type Mark = { path: string; color: string };

const si = (i: { path: string }, color: string): Mark => ({ path: i.path, color });

// simple-icons dropped AWS, Azure and Active Directory, so these are simplified marks.
const MARKS: Record<string, Mark> = {
  Azure: {
    color: "#2E9BFF",
    path: "M10 3 3 20h4.5l2.5-6 5 1.5L10 3zm1.6 2.6L21 20H9l7-1.8-4.4-12.6z",
  },
  "Google Cloud": si(siGooglecloud, "#4285F4"),
  Kubernetes: si(siKubernetes, "#4F8CFF"),
  Docker: si(siDocker, "#2496ED"),
  Terraform: si(siTerraform, "#A97BFF"),
  "GitHub Actions": si(siGithubactions, "#2088FF"),
  "Node.js": si(siNodedotjs, "#5FA04E"),
  "Next.js": si(siNextdotjs, "#FFFFFF"),
  Python: si(siPython, "#4B8BBE"),
  PostgreSQL: si(siPostgresql, "#5B8DEF"),
  Linux: si(siLinux, "#FCC624"),
  "Active Directory": {
    color: "#3AA0FF",
    path: "M12 2 3 6.5v5c0 5 3.8 9.3 9 10.5 5.2-1.2 9-5.5 9-10.5v-5zm0 4a2.2 2.2 0 1 1 0 4.4A2.2 2.2 0 0 1 12 6zm-4 9c0-2 1.8-3.3 4-3.3s4 1.3 4 3.3z",
  },
  "OWASP ASVS": si(siOwasp, "#FFFFFF"),
};

export function StackLogo({ name, className }: { name: string; className?: string }) {
  if (name === "AWS") {
    // simplified: "aws" wordmark with the orange smile arrow
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
        <text x="12" y="11.5" textAnchor="middle" fontSize="10.5" fontWeight="800" fontFamily="Arial, Helvetica, sans-serif" fill="#fff">aws</text>
        <path d="M3 15.5c5 3.6 13 3.6 17.5-.3" fill="none" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M17.2 14.6l4.2.1-1.2 3.9z" fill="#FF9900" />
      </svg>
    );
  }
  const m = MARKS[name];
  if (!m) return null;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill={m.color}>
      <path d={m.path} />
    </svg>
  );
}
