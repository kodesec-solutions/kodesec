import { cn } from "@/lib/utils";

/**
 * Abstract, looping motion graphic for a lesson, drawn in HTML/CSS on a flat colour field (in the style of the
 * motion-designer reels used as references). One idea per lesson; no words inside. Styles: globals.css `.ma-*`.
 */
export function MotionArt({ slug, className, children }: { slug: string; className?: string; children?: React.ReactNode }) {
  return (
    <div aria-hidden={children ? undefined : true} className={cn("ma absolute inset-0", `ma-${slug}`, className)}>
      <Art slug={slug} />
      <span className="ma-corner ma-c1" />
      <span className="ma-corner ma-c2" />
      <span className="ma-corner ma-c3" />
      <span className="ma-corner ma-c4" />
      {children}
    </div>
  );
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);
const style = (vars: Record<string, string | number>) => vars as React.CSSProperties;

function Art({ slug }: { slug: string }) {
  switch (slug) {
    // a wall of doors; one at a time swings open
    case "broken-access-control":
      return (
        <div className="ma-doors">
          {range(12).map((i) => (
            <i key={i} style={style({ "--i": i })} />
          ))}
        </div>
      );
    // switches flicking on and off in a cascade
    case "security-misconfiguration":
      return (
        <div className="ma-switches">
          {range(5).map((i) => (
            <i key={i} style={style({ "--i": i })}>
              <b />
            </i>
          ))}
        </div>
      );
    // a field of linked arcs, turning in a wave (parts joined to parts)
    case "software-supply-chain-failures":
      return (
        <div className="ma-truchet">
          {range(48).map((i) => (
            <i key={i} style={style({ "--i": i, "--r": (i * 7) % 4 })} />
          ))}
        </div>
      );
    // nested rings turning against each other, like a combination dial
    case "cryptographic-failures":
      return (
        <div className="ma-dial">
          {range(5).map((i) => (
            <i key={i} style={style({ "--i": i })} />
          ))}
          <b />
        </div>
      );
    // kinetic type: rows of the same word sliding; one row solid
    case "injection":
      return (
        <div className="ma-type">
          {range(5).map((i) => (
            <p key={i} className={i === 2 ? "solid" : ""} style={style({ "--i": i })}>
              <span>INPUT INPUT INPUT INPUT INPUT INPUT INPUT INPUT</span>
            </p>
          ))}
        </div>
      );
    // a plan: one shape morphing, small markers orbiting it
    case "insecure-design":
      return (
        <div className="ma-morph">
          <b />
          {range(12).map((i) => (
            <i key={i} style={style({ "--i": i })} />
          ))}
        </div>
      );
    // fingerprint-like arcs pulsing outwards
    case "authentication-failures":
      return (
        <div className="ma-print">
          {range(7).map((i) => (
            <i key={i} style={style({ "--i": i })} />
          ))}
        </div>
      );
    // a seal: a starburst turning and breathing
    case "software-and-data-integrity-failures":
      return (
        <div className="ma-burst">
          {range(12).map((i) => (
            <i key={i} style={style({ "--i": i })} />
          ))}
          <b />
        </div>
      );
    // a grid of dots, a sweep lighting them up
    case "security-logging-and-alerting-failures":
      return (
        <div className="ma-radar">
          {range(64).map((i) => (
            <i key={i} style={style({ "--x": i % 8, "--y": Math.floor(i / 8) })} />
          ))}
          <b />
        </div>
      );
    // balls on rails with different easings; one falls off its rail
    case "mishandling-of-exceptional-conditions":
      return (
        <div className="ma-ease">
          {range(5).map((i) => (
            <p key={i} style={style({ "--i": i })}>
              <i />
            </p>
          ))}
        </div>
      );
    default:
      return null;
  }
}
