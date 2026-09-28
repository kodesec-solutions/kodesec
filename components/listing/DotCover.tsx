/**
 * Generated monochrome dot-matrix cover (Aikido-style), for items without an image.
 * A dotted sphere with scattered stars and a mono label chip in the middle. Deterministic per seed.
 */

function rand(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return Math.abs(h) || 1;
}

export function DotCover({ label, seed, className }: { label: string; seed: string; className?: string }) {
  const W = 480;
  const H = 280;
  const r = rand(hash(seed));
  const cx = W * (0.42 + r() * 0.16);
  const cy = H * 0.5;
  const R = 92 + r() * 22;
  const dots: { x: number; y: number; o: number; s: number }[] = [];

  // sphere: dense ring + lit hemisphere (upper-left)
  for (let y = cy - R - 6; y <= cy + R + 6; y += 5) {
    for (let x = cx - R - 6; x <= cx + R + 6; x += 5) {
      const d = Math.hypot(x - cx, y - cy) / R;
      if (d > 1.06) continue;
      const rim = Math.exp(-((d - 0.97) ** 2) / 0.004);
      const lit = d < 1 ? Math.max(0, 1 - Math.hypot(x - (cx - R * 0.35), y - (cy - R * 0.35)) / (R * 1.3)) * 0.55 : 0;
      const o = Math.min(1, rim * 0.95 + lit + (r() - 0.5) * 0.25);
      if (o > 0.12 && r() < 0.35 + o * 0.65) dots.push({ x, y, o, s: o > 0.8 ? 1.4 : 1 });
    }
  }
  // stars
  for (let i = 0; i < 70; i++) dots.push({ x: r() * W, y: r() * H, o: 0.15 + r() * 0.6, s: r() < 0.1 ? 1.4 : 0.9 });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <rect width={W} height={H} fill="#141414" />
      {dots.map((d, i) => (
        <rect key={i} x={d.x} y={d.y} width={d.s * 1.6} height={d.s * 1.6} fill="#ffffff" opacity={d.o} />
      ))}
      <g transform={`translate(${cx} ${cy})`}>
        <rect x={-(label.length * 3.9 + 12)} y="-10" width={label.length * 7.8 + 24} height="20" rx="3" fill="#e5e7eb" stroke="#9ca3af" />
        <rect x={-(label.length * 3.9 + 10)} y="-8" width={label.length * 7.8 + 20} height="16" rx="2" fill="#f3f4f6" />
        <text y="4" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="11" fontWeight="600" fill="#111">
          {label}
        </text>
      </g>
    </svg>
  );
}
