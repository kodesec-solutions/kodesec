import {
  Activity, ArrowRight, BookOpen, Boxes, Bug, Building2, CircleCheck, Cloud, CloudCog, Code, Compass, Container,
  FileCode2, FlaskConical, Gauge, GitBranch, Globe, GraduationCap, Infinity as InfinityIcon, Layers, LayoutTemplate,
  Lock, Microscope, MousePointerClick, Network, PiggyBank, Plug, Radar, Rocket, ScanSearch, Server, Shield, ShieldCheck,
  Smartphone, Sparkles, TabletSmartphone, Target, Terminal, Users, Webhook, Workflow, Wrench, type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Activity, ArrowRight, BookOpen, Boxes, Bug, Building2, CheckCircle: CircleCheck, CheckCircle2: CircleCheck, CircleCheck,
  Cloud, CloudCog, Code, Compass, Container, FileCode2, FlaskConical, Gauge, GitBranch, Globe, GraduationCap,
  Infinity: InfinityIcon, Layers, LayoutTemplate, Lock, Microscope, MousePointerClick, Network, PiggyBank, Plug, Radar,
  Rocket, ScanSearch, Server, Shield, ShieldCheck, Smartphone, Sparkles, TabletSmartphone, Target, Terminal, Users,
  Webhook, Workflow, Wrench,
};

/** Resolve an icon name stored in content files (e.g. `icon: Shield`). Unknown names fall back to Shield. */
export function Icon({ name, className }: { name: string; className?: string }) {
  const C = icons[name] ?? Shield;
  return <C className={className} aria-hidden="true" />;
}

/** Brand icons (lucide v1 no longer ships them). */
export function SocialIcon({ name, className }: { name: string; className?: string }) {
  const p = { className, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true } as const;
  switch (name) {
    case "linkedin":
      return (<svg {...p}><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>);
    case "github":
      return (<svg {...p}><path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3"/></svg>);
    case "x":
      return (<svg {...p}><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41z"/></svg>);
    case "youtube":
      return (<svg {...p}><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>);
    case "facebook":
      return (<svg {...p}><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07"/></svg>);
    default:
      return <ArrowRight className={className} aria-hidden="true" />;
  }
}
