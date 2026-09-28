import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import type { Site } from "@/lib/content/schemas";

type Partner = Site["partners"][number];

/** Partner wordmark: official logo file if provided, otherwise a clean text mark. */
function PartnerMark({ partner }: { partner: Partner }) {
  if (partner.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={partner.logo} alt={partner.name} className="h-8 w-auto" />;
  }
  const [base, tld] = partner.name.split(/(?=\.[a-z]+$)/i);
  return (
    <span className="text-[1.15rem] font-bold leading-none tracking-tight text-fg">
      {base}
      {tld && <span className="font-medium italic text-sky-500 light:text-sky-700">{tld}</span>}
    </span>
  );
}

/** "Kodesec × Partner" collaboration card, used on the home page and /about. */
export function PartnerCard({ partner }: { partner: Partner }) {
  return (
    <article className="card overflow-hidden">
      {/* the two marks, joined */}
      <div className="relative flex flex-col items-center justify-center gap-6 border-b border-line px-6 py-10 sm:flex-row sm:gap-0 md:py-12">
        <div className="flex h-16 w-60 items-center justify-center rounded-xl border border-line-2 bg-bg-2">
          <Logo href={null} />
        </div>
        <div className="relative flex h-10 w-px items-center justify-center sm:h-px sm:w-28" aria-hidden="true">
          <span className="absolute inset-0 bg-gradient-to-b from-brand via-mint to-sky-400 sm:bg-gradient-to-r" />
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-line-2 bg-bg font-mono text-sm text-fg">
            ×
          </span>
        </div>
        <div className="flex h-16 w-60 items-center justify-center rounded-xl border border-line-2 bg-bg-2">
          <PartnerMark partner={partner} />
        </div>
      </div>

      <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fg-3">About {partner.short ?? partner.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-fg-2 md:text-[15px]">{partner.about}</p>
        </div>
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand">Together</p>
          <p className="mt-3 text-sm leading-relaxed text-fg md:text-[15px]">{partner.together}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-line px-6 py-5 md:px-8">
        <a href={partner.url} target="_blank" rel="noopener" className="btn btn-sm btn-ghost">
          Visit {partner.name} <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
        <Link href="/contact?type=general" className="btn btn-sm btn-primary">
          Talk to us about a joint project <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}

/** Home-page section: "In partnership". */
export default function Partnership({ partners }: { partners: Partner[] }) {
  if (partners.length === 0) return null;
  return (
    <section id="partners" aria-labelledby="partners-title" className="relative scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="container-kd">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center">In partnership</p>
          <h2 id="partners-title" className="mt-4 text-3xl font-semibold leading-[1.1] text-fg sm:text-4xl md:text-[2.75rem]">
            {partners.length === 1 ? (
              <>
                Kodesec <span className="text-fg-3">×</span> <span className="text-aurora">{partners[0].name}</span>
              </>
            ) : (
              "Built with great partners"
            )}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-fg-2 md:text-lg">
            AI and automation move fast. Security has to move with them — so we build alongside the teams creating it.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-6">
          {partners.map((p) => (
            <PartnerCard key={p.url} partner={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
