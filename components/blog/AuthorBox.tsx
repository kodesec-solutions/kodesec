import Link from "next/link";
import type { TeamMember } from "@/lib/content/schemas";
import { SocialIcon } from "@/components/ui/Icon";

export function AuthorBox({ member }: { member: TeamMember }) {
  return (
    <div className="card flex gap-5 p-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={member.image} alt="" className="h-14 w-14 shrink-0 rounded-full border border-line-2 bg-surface object-cover p-0.5" />
      <div className="min-w-0">
        <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-fg-3">Written by</p>
        <p className="mt-1 font-semibold text-fg">
          {member.kind === "person" ? <Link href={`/about#${member.slug}`}>{member.name}</Link> : member.name}
          <span className="ml-2 text-sm font-normal text-fg-3">{member.role}</span>
        </p>
        {member.kind === "person" && <p className="mt-2 text-sm leading-relaxed text-fg-2">{member.bio}</p>}
        <div className="mt-3 flex gap-2">
          {Object.entries(member.links).map(([k, href]) => (
            <a key={k} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on ${k}`} className="text-fg-3 hover:text-brand">
              <SocialIcon name={k} className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
