import {
  BadgeCheck,
  Bell,
  Boxes,
  Cog,
  Fingerprint,
  KeyRound,
  LifeBuoy,
  Lock,
  type LucideIcon,
  PencilRuler,
  ShieldCheck,
} from "lucide-react";

type Kind = "wheel" | "rack" | "stack" | "orbit" | "radar";

/** Which graphic and centre icon each lesson uses for its safety measures. */
const LOOK: Record<string, { kind: Kind; icon: LucideIcon }> = {
  "broken-access-control": { kind: "wheel", icon: KeyRound },
  "security-misconfiguration": { kind: "rack", icon: Cog },
  "software-supply-chain-failures": { kind: "stack", icon: Boxes },
  "cryptographic-failures": { kind: "orbit", icon: Lock },
  injection: { kind: "radar", icon: ShieldCheck },
  "insecure-design": { kind: "wheel", icon: PencilRuler },
  "authentication-failures": { kind: "orbit", icon: Fingerprint },
  "software-and-data-integrity-failures": { kind: "stack", icon: BadgeCheck },
  "security-logging-and-alerting-failures": { kind: "radar", icon: Bell },
  "mishandling-of-exceptional-conditions": { kind: "rack", icon: LifeBuoy },
};

/**
 * A lesson's three safety measures as a motion graphic on its colour field: a spinning wheel, a server rack,
 * stacked layers, an orbit or a radar sweep, each with the lesson's own centre icon. Styles: globals.css `.dg-*`.
 */
export function DefenseGraphic({ slug, keywords }: { slug: string; keywords: string[] }) {
  const { kind, icon: Icon } = LOOK[slug] ?? LOOK["broken-access-control"];
  const centre = (
    <span className="dg-core">
      <Icon strokeWidth={1.6} />
    </span>
  );

  if (kind === "wheel") {
    const text = keywords.map((k) => k.toUpperCase()).join("  •  ") + "  •  ";
    return (
      <div className="dg dg-wheel">
        <svg viewBox="0 0 200 200" className="dg-ring" aria-hidden="true">
          <defs>
            <path id={`dg-c-${slug}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <circle cx="100" cy="100" r="92" className="dg-dash" />
          <text>
            <textPath href={`#dg-c-${slug}`} textLength="488" lengthAdjust="spacingAndGlyphs">
              {text}
            </textPath>
          </text>
          <circle cx="100" cy="100" r="64" className="dg-dash dg-dash-2" />
        </svg>
        {centre}
      </div>
    );
  }

  if (kind === "rack") {
    return (
      <div className="dg dg-rack">
        {keywords.map((k, i) => (
          <div key={k} className="dg-unit" style={{ "--i": i } as React.CSSProperties}>
            <span className="dg-leds">
              <i />
              <i />
              <i />
            </span>
            <span className="dg-name">{k}</span>
            <span className="dg-ok">✓</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "stack") {
    return (
      <div className="dg dg-stack">
        {centre}
        {keywords.map((k, i) => (
          <div key={k} className="dg-layer" style={{ "--i": i } as React.CSSProperties}>
            <span className="dg-name">{k}</span>
            <span className="dg-ok">✓</span>
          </div>
        ))}
      </div>
    );
  }

  if (kind === "orbit") {
    return (
      <div className="dg dg-orbit">
        <span className="dg-path" />
        <div className="dg-spin">
          {keywords.map((k, i) => (
            <span key={k} className="dg-chip" style={{ "--i": i } as React.CSSProperties}>
              <span>{k}</span>
            </span>
          ))}
        </div>
        {centre}
      </div>
    );
  }

  // radar
  return (
    <div className="dg dg-radar">
      <span className="dg-rings" />
      <span className="dg-sweep" />
      {centre}
      {keywords.map((k, i) => (
        <span key={k} className={`dg-blip b${i}`} style={{ "--i": i } as React.CSSProperties}>
          <i />
          {k}
        </span>
      ))}
    </div>
  );
}
