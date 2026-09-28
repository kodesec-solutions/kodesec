"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Icon } from "@/components/ui/Icon";

/**
 * Light is gathered from across the top of the section, funnels into a neon beam, and the beam
 * strikes the services panel where the light fans out into each service. Everything is dark on
 * the first screen and lights up only as you scroll into the section (--beam 0..1, --flare 0..1).
 * No cursor effects; black background.
 */

export type BeamService = { slug: string; title: string; tagline: string; icon: string };

const FIXES: Record<string, string[]> = {
  cybersecurity: ["Manual penetration testing", "Attack paths closed & re-tested"],
  "software-development": ["Secure-by-default engineering", "Pentested before launch"],
  cloud: ["AWS · Azure · GCP", "Secure, cost-optimised cloud"],
  devops: ["Terraform · Kubernetes · CI/CD", "Monitoring from day one"],
  "quality-assurance": ["Manual + automated testing", "API & mobile testing"],
};

// Funnel geometry in a 1000 x 1000 box stretched over the stage (non-scaling strokes).
const SRC_X = [30, 150, 290, 430, 560, 780, 890, 975]; // light sources along the top edge
const intake = (x0: number, bx: number) => `M ${x0} 0 C ${x0} 200 ${bx} 260 ${bx} 480`;
const fanOut = (bx: number, tx: number) => `M ${bx} 820 C ${bx} 900 ${tx} 900 ${tx} 1000`;
const FUNNEL = (bx: number) =>
  `M 0 0 L 1000 0 C 1000 120 ${bx + 70} 260 ${bx + 26} 520 C ${bx + 20} 700 ${bx + 260} 860 ${Math.min(1000, bx + 420)} 1000 L ${Math.max(0, bx - 520)} 1000 C ${bx - 300} 860 ${bx - 20} 700 ${bx - 26} 520 C ${bx - 70} 260 0 120 0 0 Z`;

export default function ServiceBeam({ services }: { services: BeamService[] }) {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll → --beam / --flare. Starts only once the section is well inside the viewport,
  // so nothing glows at the bottom edge of the first screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 until the section top has risen to 60% of the viewport, 1 once it reaches ~5%
      const p = reduced ? 1 : Math.max(0, Math.min(1, (vh * 0.6 - r.top) / (vh * 0.55)));
      el.style.setProperty("--beam", p.toFixed(3));
      el.style.setProperty("--flare", Math.max(0, Math.min(1, (p - 0.8) / 0.2)).toFixed(3));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const n = services.length;
  const tileX = (i: number) => ((i + 0.5) / n) * 1000;

  const funnel = (bx: number, withFan: boolean, id: string) => (
    <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.16" />
          <stop offset="0.45" stopColor="#2ECC71" stopOpacity="0.1" />
          <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${id}-line`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0" />
          <stop offset="0.35" stopColor="#a78bfa" stopOpacity="0.7" />
          <stop offset="1" stopColor="#b8f5d2" stopOpacity="1" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="28" />
        </filter>
      </defs>

      {/* soft funnel of light: wide at the top, tight around the beam, flaring into the panel */}
      <path d={FUNNEL(bx)} fill={`url(#${id}-fill)`} filter={`url(#${id}-blur)`} className="kd-funnel" />

      {/* intake streams: light released from across the top, flowing into the beam */}
      <g className="kd-intake" fill="none" stroke={`url(#${id}-line)`} strokeWidth="1.2">
        {SRC_X.map((x) => (
          <path key={x} d={intake(x, bx)} vectorEffect="non-scaling-stroke" strokeOpacity="0.35" />
        ))}
        {SRC_X.map((x, i) => (
          <path
            key={`f${x}`}
            d={intake(x, bx)}
            vectorEffect="non-scaling-stroke"
            stroke="#e9fff3"
            strokeWidth="1.6"
            strokeDasharray="40 260"
            className="kd-stream"
            style={{ animationDelay: `${-i * 0.37}s` }}
          />
        ))}
      </g>

      {/* fan-out: the beam's light releasing into each service */}
      {withFan && (
        <g className="kd-fan" fill="none">
          {services.map((s, i) => (
            <g key={s.slug}>
              <path d={fanOut(bx, tileX(i))} stroke="#b8f5d2" strokeOpacity="0.45" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
              <path
                d={fanOut(bx, tileX(i))}
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeDasharray="30 170"
                vectorEffect="non-scaling-stroke"
                className="kd-stream kd-stream-fast"
                style={{ animationDelay: `${-i * 0.3}s` }}
              />
            </g>
          ))}
        </g>
      )}
    </svg>
  );

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      aria-labelledby="services-beam-title"
      className="kd-beam-section relative isolate overflow-hidden border-t border-line bg-black pb-24 md:pb-32"
      style={{ "--beam": 0, "--flare": 0 } as React.CSSProperties}
    >
      <div className="container-kd relative">
        {/* ---------------------------------------------------------------- stage */}
        <div className="relative min-h-[620px] pt-24 md:min-h-[720px] md:pt-32">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 hidden md:block">{funnel(660, true, "kdf-d")}</div>
            <div className="absolute inset-0 md:hidden">{funnel(860, false, "kdf-m")}</div>
          </div>

          {/* beam */}
          <div aria-hidden="true" className="kd-beam pointer-events-none absolute bottom-0 left-[86%] top-0 w-0 md:left-[66%]">
            <span className="kd-beam-cone" />
            <span className="kd-beam-halo" />
            <span className="kd-beam-glow" />
            <span className="kd-beam-core" />
            <span className="kd-beam-foot" />
          </div>

          {/* copy */}
          <div className="relative z-10 max-w-xl">
            <p className="eyebrow">Services</p>
            <h2 id="services-beam-title" className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl md:text-6xl">
              <span className="text-gradient">Four ways in.</span>
              <br />
              <span className="bg-gradient-to-r from-mint via-brand to-violet-400 bg-clip-text text-transparent">One secure system.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-fg-2 md:text-lg">
              Start wherever the risk is. Every engagement ends tested, hardened and re-verified.
            </p>
            <Link href="/book" className="kd-neon-btn btn mt-9 bg-white text-bg">
              Book a scoping call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ---------------------------------------------------------------- panel */}
        <div className="kd-panel relative z-10 rounded-2xl border border-line-2 bg-[#05090a]">
          <span aria-hidden="true" className="kd-edge" />
          <span aria-hidden="true" className="kd-impact left-[86%] md:left-[66%]" />
          {/* where each fan-out stream enters the panel */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 hidden md:block">
            {services.map((s, i) => (
              <span key={s.slug} className="kd-entry" style={{ left: `${((i + 0.5) / n) * 100}%` }} />
            ))}
          </div>

          <div className="flex items-center justify-between border-b border-line px-5 py-3.5 font-mono text-[11px] text-fg-3">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]" />
              kodesec <span className="text-fg-3/60">/</span> <span className="text-fg-2">services</span>
            </span>
            <span className="hidden sm:block">{n} practices · all engagements re-tested</span>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-5">
            {services.map((s, i) => (
              <li
                key={s.slug}
                className={[
                  "border-line",
                  i > 0 ? "border-t sm:border-t-0" : "",
                  i % 2 === 1 ? "sm:border-l" : "",
                  i >= 2 ? "sm:border-t lg:border-t-0" : "",
                  i > 0 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <Link href={`/services/${s.slug}`} className="flex h-full flex-col p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-fg-3">0{i + 1}</span>
                    <ArrowUpRight className="h-4 w-4 text-fg-3" />
                  </div>
                  <span className="mt-6 flex h-11 w-11 items-center justify-center rounded-xl border border-line-2 bg-surface text-brand">
                    <Icon name={s.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold leading-snug text-fg">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-2">{s.tagline}</p>
                  {(FIXES[s.slug] ?? []).length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-line pt-5 text-[13px] text-fg-2">
                      {FIXES[s.slug].map((f) => (
                        <li key={f} className="flex items-center gap-2">
                          <Check className="h-3.5 w-3.5 shrink-0 text-brand" /> {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <span className="mt-auto pt-7 text-sm font-medium text-fg-2">Explore service →</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
