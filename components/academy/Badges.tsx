import { cn } from "@/lib/utils";

export const roleLabels: Record<string, string> = {
  red: "Red team",
  blue: "Blue team",
  dev: "Developers",
  cloud: "Cloud",
  devops: "DevOps",
};

const levelStyle: Record<string, string> = {
  beginner: "border-brand/40 text-brand bg-brand/5",
  practitioner: "border-sky-400/40 text-sky-300 bg-sky-400/5",
  expert: "border-rose-400/40 text-rose-300 bg-rose-400/5",
};

export function LevelChip({ level, className }: { level: string; className?: string }) {
  return <span className={cn("chip", levelStyle[level], className)}>{level}</span>;
}

export function RoleChips({ roles }: { roles: string[] }) {
  return (
    <>
      {roles.map((r) => (
        <span key={r} className="chip">
          {roleLabels[r] ?? r}
        </span>
      ))}
    </>
  );
}
