import Link from "next/link";
import { AuroraBars } from "@/components/effects/AuroraBars";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden pt-24">
      <AuroraBars intensity="soft" />
      <div className="container-kd relative text-center">
        <p className="font-mono text-sm text-brand">404 · not found</p>
        <h1 className="mt-5 text-4xl font-semibold md:text-6xl">
          <span className="text-gradient">This page slipped past the perimeter.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-fg-2">The link may be old or mistyped. Try one of these instead.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Home</Link>
          <Link href="/academy" className="btn btn-ghost">Academy</Link>
          <Link href="/blog" className="btn btn-ghost">Blog</Link>
        </div>
      </div>
    </section>
  );
}
