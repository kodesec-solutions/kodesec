import * as React from "react"
import { Mail } from "lucide-react"
import { teamConfig } from "@/config/site"
import { cn } from "@/lib/utils"

function Linkedin({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function Github({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

export interface AuthorProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  authorName: string
}

export function AuthorProfile({ className, authorName, ...props }: AuthorProfileProps) {
  // Try to find the author in teamConfig.founders
  const author = teamConfig.founders.find(
    (f) => f.name.toLowerCase() === authorName.toLowerCase() ||
           f.role.toLowerCase().includes(authorName.toLowerCase()) ||
           authorName.toLowerCase().includes(f.name.split(" ")[0].toLowerCase())
  )

  if (!author) {
    return (
      <div className={cn("rounded-2xl border border-white/5 bg-[#0F1424]/40 p-6 text-left", className)} {...props}>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.02] border border-white/10 text-xl font-bold font-mono text-primary/60">
            KS
          </div>
          <div>
            <h4 className="text-sm font-black text-white">{authorName}</h4>
            <p className="text-[10px] font-mono text-primary font-bold">KodeSec Research Team</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "rounded-[1.5rem] border border-white/5 bg-[#0F1424]/40 p-6 text-left hover:border-primary/10 transition-all",
        className
      )}
      {...props}
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
        <div className="flex items-start sm:items-center gap-4">
          {/* Avatar */}
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] relative">
            {author.image ? (
              <img
                src={author.image}
                alt={author.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-lg font-black font-mono text-primary/40 bg-white/[0.01]">
                {author.avatar}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F1A]/60 to-transparent pointer-events-none" />
          </div>

          <div>
            <h4 className="text-base font-black text-white tracking-tight leading-snug">{author.name}</h4>
            <p className="text-xs font-mono text-primary font-bold mt-0.5">{author.role}</p>
            <p className="mt-2 text-xs text-gray-400 leading-relaxed font-medium max-w-xl font-sans">
              {author.bio}
            </p>
          </div>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-2 pt-2 sm:pt-0 shrink-0 self-end sm:self-center">
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-primary/20 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={14} />
          </a>
          <a
            href={author.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-primary/20 transition-all"
            aria-label="GitHub"
          >
            <Github size={14} />
          </a>
          <a
            href={`mailto:${author.email}`}
            className="p-2 rounded-lg bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:border-primary/20 transition-all"
            aria-label="Email"
          >
            <Mail size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
export default AuthorProfile
