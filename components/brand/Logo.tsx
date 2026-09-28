import Link from "next/link";
import { cn } from "@/lib/utils";

/** The Kodesec "K" mark, redrawn as a vector from the brand asset. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="110 8 280 482" className={className} aria-hidden="true" focusable="false">
      <path fill="#2ECC71" d="M120 130 233 18v152l147 148v162L210 310l-90 90z" />
      <path fill="#1F7A4D" d="M233 170 380 18v162l-70 70z" />
    </svg>
  );
}

/** Mark + KODESEC wordmark. "SEC" carries the brand green. */
export function Logo({ className, href = "/" }: { className?: string; href?: string | null }) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-7 w-auto drop-shadow-[0_0_10px_rgba(46,204,113,0.35)]" />
      <span className="font-sans text-[1.05rem] font-semibold tracking-[0.18em] text-fg">
        KODE<span className="text-brand">SEC</span>
      </span>
    </span>
  );
  if (href === null) return inner;
  return (
    <Link href={href} aria-label="Kodesec home" className="rounded-md">
      {inner}
    </Link>
  );
}
