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
  practitioner: "border-info/40 text-info bg-info/5",
  expert: "border-danger/40 text-danger bg-danger/5",
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
