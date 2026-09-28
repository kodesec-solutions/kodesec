import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const TOP_BAR_HEIGHT = 34; // px — matches Neon's strip

/** Neon-style announcement strip at the very top of every page (scrolls away with the page). */
export default function TopBar({ text, href }: { text: string; href: string }) {
  return (
    <div data-theme="dark" className="relative z-[60] border-b border-line bg-[#101312]" style={{ height: TOP_BAR_HEIGHT }}>
      <span aria-hidden="true" className="kd-halftone kd-halftone-left" />
      <span aria-hidden="true" className="kd-halftone kd-halftone-right" />
      <Link
        href={href}
        className="group relative mx-auto flex h-full max-w-[1200px] items-center justify-center gap-1.5 px-10 text-[13px] font-medium text-fg transition-colors hover:text-mint sm:text-sm"
      >
        {/* phones: only the part before ":" so it never gets cut off */}
        <span className="truncate sm:hidden">{text.split(":")[0]}</span>
        <span className="hidden truncate sm:inline">{text}</span>
        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-fg-2 transition-transform group-hover:translate-x-0.5 group-hover:text-mint" />
      </Link>
    </div>
  );
}
