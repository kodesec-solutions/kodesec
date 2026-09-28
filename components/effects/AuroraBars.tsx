"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero background: a "spectral aurora" of thin vertical light bars in stacked, overlapping
 * bands (Neon-style). Mostly black, with blocky clusters of green → teal → mint bars that
 * drift like an aurora curtain, and hot near-white bars where it's brightest. The pointer
 * pulls a pool of light along with it.
 *
 * Rendering: bars are drawn crisp on one canvas; the frame is copied at quarter size onto a
 * second canvas that CSS blurs and screen-blends on top (a cheap GPU glow). Pauses when
 * off-screen or the tab is hidden; prefers-reduced-motion draws one still frame.
 *
 * Ported from the GuardPipe landing page, recoloured to the Kodesec greens.
 */

const PITCH = 9; // px between bar centres
const BAR = 2; // bar width

type Band = [top: number, bottom: number];

const PRESETS: Record<"full" | "soft", { bands: Band[]; alpha: number; rest: number }> = {
  // Overlapping bands down the whole hero (landing page)
  full: {
    bands: [
      [0.02, 0.28],
      [0.18, 0.44],
      [0.38, 0.66],
      [0.58, 0.84],
      [0.76, 0.98],
    ],
    alpha: 0.85,
    rest: 0.6,
  },
  // Fewer, dimmer bands in the top half (inner-page headers)
  soft: {
    bands: [
      [0.0, 0.34],
      [0.22, 0.58],
      [0.46, 0.8],
    ],
    alpha: 0.5,
    rest: 0.45,
  },
};

// Deep green → brand green (#2ECC71) → teal → mint, the Kodesec logo family.
const STOPS: [number, number, number][] = [
  [31, 122, 77],
  [46, 204, 113],
  [20, 184, 166],
  [52, 211, 153],
  [184, 245, 210],
];
const HOT: [number, number, number] = [236, 255, 244];

// Deterministic 1-D value noise, smoothly interpolated.
function hash(n: number) {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}
function noise(x: number) {
  const i = Math.floor(x);
  const f = x - i;
  const u = f * f * (3 - 2 * f);
  return hash(i) * (1 - u) + hash(i + 1) * u;
}
function colorAt(t: number): [number, number, number] {
  const x = Math.max(0, Math.min(0.999, t)) * (STOPS.length - 1);
  const i = Math.floor(x);
  const f = x - i;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

export function AuroraBars({
  intensity = "full",
  className,
  focus = [0.68, 0.4],
}: {
  intensity?: "full" | "soft";
  className?: string;
  /** Resting position of the light pool before the mouse moves, as fractions of width/height. */
  focus?: [number, number];
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!wrap || !canvas || !glow) return;
    const ctx = canvas.getContext("2d");
    const gctx = glow.getContext("2d");
    if (!ctx || !gctx) return;

    const { bands, alpha, rest } = PRESETS[intensity];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let visible = true;
    let t = 0;
    let last = performance.now();
    // Pointer in canvas px, eased so the light glides after it.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0, active: rest, tActive: rest };

    function resize() {
      if (!canvas || !glow || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      glow.width = Math.max(1, Math.round(width / 4));
      glow.height = Math.max(1, Math.round(height / 4));
      pointer.x = pointer.tx = width * focus[0];
      pointer.y = pointer.ty = height * focus[1];
    }

    function draw() {
      if (!ctx || !gctx || !canvas || !glow) return;
      ctx.clearRect(0, 0, width, height);
      const cols = Math.ceil(width / PITCH) + 1;
      const spread = Math.max(140, width * 0.12);

      bands.forEach(([top, bottom], r) => {
        const y0 = top * height;
        const y1 = bottom * height;
        const bandMid = (y0 + y1) / 2;
        // How much the pointer lights this band (vertical falloff).
        const vy = Math.exp(-((pointer.y - bandMid) ** 2) / (2 * (height * 0.22) ** 2));
        for (let c = 0; c < cols; c++) {
          const x = c * PITCH;
          const u = x / width;
          // Aurora curtain: two drifting waves plus slow noise.
          let v =
            0.55 * Math.sin(u * 5.2 + t * 0.21 + r * 1.7) +
            0.35 * Math.sin(u * 11.3 - t * 0.33 + r * 0.9) +
            0.6 * (noise(u * 7 + r * 13.1 + t * 0.12) - 0.5);
          // Blocky clusters: bars come in square-ish groups.
          const gate = noise(c / 7 + r * 31.7 + t * 0.06);
          v = gate > 0.56 ? v + 0.2 : v - 0.9;
          // Per-bar shimmer.
          v += (hash(c * 3.1 + r * 17 + Math.floor(t * 6) * 0.13) - 0.5) * 0.18;
          // Pointer pool.
          const dx = x - pointer.x;
          const pool = Math.exp(-(dx * dx) / (2 * spread * spread)) * vy * pointer.active;
          v += pool * 1.1;
          if (v <= 0.05) continue;
          const a = Math.min(1, v);
          const hot = a > 0.97 && pool > 0.55;
          const [cr, cg, cb] = colorAt(u * 0.8 + 0.1 * Math.sin(t * 0.1 + r));
          const mix = hot ? 0.55 : 0;
          const R = cr + (HOT[0] - cr) * mix;
          const G = cg + (HOT[1] - cg) * mix;
          const B = cb + (HOT[2] - cb) * mix;
          ctx.fillStyle = `rgba(${R | 0},${G | 0},${B | 0},${(a * (hot ? 0.95 : alpha)).toFixed(3)})`;
          ctx.fillRect(x, y0, hot ? BAR + 1 : BAR, y1 - y0);
        }
      });

      // Glow pass: quarter-size copy; CSS blurs and screen-blends it.
      gctx.clearRect(0, 0, glow.width, glow.height);
      gctx.drawImage(canvas, 0, 0, glow.width, glow.height);
    }

    function loop(now: number) {
      const dt = Math.max(0, Math.min(64, now - last)) / 1000;
      last = now;
      t += dt;
      const k = Math.min(1, dt * 3.2);
      pointer.x += (pointer.tx - pointer.x) * k;
      pointer.y += (pointer.ty - pointer.y) * k;
      pointer.active += (pointer.tActive - pointer.active) * Math.min(1, dt * 2);
      draw();
      raf = requestAnimationFrame(loop);
    }

    const start = () => {
      if (reduced || raf || !visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const inside = e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      pointer.tActive = inside ? 1 : rest * 0.6;
      if (inside) {
        pointer.tx = e.clientX - rect.left;
        pointer.ty = e.clientY - rect.top;
      }
    };
    const onResize = () => {
      resize();
      draw();
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });

    resize();
    draw();
    start();
    observer.observe(wrap);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intensity, focus[0], focus[1]]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90" />
      <canvas
        ref={glowRef}
        className="kd-bars-glow absolute inset-0 h-full w-full"
        style={{ filter: "blur(16px) saturate(1.6)", mixBlendMode: "screen" }}
      />
      {/* CRT scanlines + a vignette so the edges fall to full black */}
      <div
        className="kd-scanlines absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 90% at 50% 45%, transparent 35%, color-mix(in srgb, var(--color-bg) 75%, transparent) 75%, var(--color-bg) 100%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-bg" />
    </div>
  );
}
