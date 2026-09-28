import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div data-reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={cn("mt-4 text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl md:text-[2.75rem]", Tag === "h1" && "md:text-6xl")}>
        {title}
      </Tag>
      {lead && <p className="mt-5 text-base leading-relaxed text-fg-2 md:text-lg">{lead}</p>}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
  tone,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  /** "light" = fixed mint band with dark text. Default is the dark site background. */
  tone?: "light";
}) {
  return (
    <section id={id} className={cn("relative py-20 md:py-28", tone === "light" && "theme-light bg-[#dcf5e6]", className)}>
      <div className="container-kd">{children}</div>
    </section>
  );
}
