import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SocialIcon } from "@/components/ui/Icon";
import JsonLd from "@/components/JsonLd";
import { getPeople, getSite } from "@/lib/content/loaders";
import { PartnerCard } from "@/components/home/Partnership";
import { ContactDetails } from "@/components/ui/ContactDetails";
import { breadcrumbLd, buildMetadata, ORG_ID, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Kodesec",
  description: "Kodesec is a founder-led team of penetration testers, cloud architects and engineers based in Dhaka, working with teams worldwide.",
  path: "/about",
});

const values = [
  { title: "Honest findings", text: "We report what we can prove. No inflated severities, no padded reports." },
  { title: "Engineers, not salespeople", text: "The person on your scoping call is the person doing the work." },
  { title: "Teach what we know", text: "The Academy exists because a safer internet needs more people who can find and fix these bugs." },
  { title: "Security by default", text: "Everything we build ships with threat models, least privilege and tests." },
];

export default function AboutPage() {
  const people = getPeople();
  const site = getSite();
  const partners = site.partners;
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([{ name: "About", path: "/about" }]),
          ...people.map((p) => ({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${SITE_URL}/about#${p.slug}`,
            name: p.name,
            jobTitle: p.role,
            description: p.bio,
            image: `${SITE_URL}${p.image}`,
            worksFor: { "@id": ORG_ID },
            knowsAbout: p.expertise,
            sameAs: Object.values(p.links),
          })),
        ]}
      />
      <PageHero
        crumbs={[{ name: "About" }]}
        eyebrow="About"
        title="A small team that breaks things for a living"
        lead="Kodesec was founded by four engineers from offensive security, cloud and backend engineering. We work directly with the teams we help, and we teach what we learn in the open."
      />

      <Section className="border-t border-line">
        <SectionHeading eyebrow="Founders" title="The people you'll work with" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p) => (
            <article key={p.slug} id={p.slug} className="card scroll-mt-28 overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden border-b border-line bg-surface">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={`Portrait of ${p.name}`} loading="lazy" className="h-full w-full object-cover grayscale-[35%] transition duration-500 hover:grayscale-0" />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-fg">{p.name}</h3>
                <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.1em] text-brand">{p.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-fg-2">{p.bio}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {p.expertise.map((e) => (
                    <li key={e} className="rounded-full border border-line-2 px-2.5 py-1 text-[0.7rem] text-fg-3">
                      {e}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex gap-3">
                  {Object.entries(p.links).map(([k, href]) => (
                    <a key={k} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on ${k}`} className="text-fg-3 hover:text-brand">
                      <SocialIcon name={k} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {partners.length > 0 && (
        <Section className="border-t border-line" id="partners">
          <SectionHeading eyebrow="Partners" title="Who we build with" lead="We collaborate with teams whose work we trust — and who trust us with the security of theirs." />
          <div className="mt-12 grid max-w-4xl gap-6">
            {partners.map((p) => (
              <PartnerCard key={p.url} partner={p} />
            ))}
          </div>
        </Section>
      )}

      <Section className="border-t border-line" id="office">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Office" title="Visit or call us" lead="Our registered office is in London. We work with teams across the UK, Bangladesh and worldwide." />
          </div>
          <div className="card p-7 md:p-8 lg:col-span-7">
            <ContactDetails site={site} className="text-base [&_svg]:h-5 [&_svg]:w-5" />
            <div className="mt-7 flex flex-wrap gap-3 border-t border-line pt-6">
              <Link href="/book" className="btn btn-sm btn-primary">
                Book a call <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link href="/contact" className="btn btn-sm btn-ghost">
                Send a message
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-line">
        <SectionHeading eyebrow="How we work" title="What we believe" />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {values.map((v, i) => (
            <div key={v.title} className="card p-7">
              <span className="font-mono text-xs text-fg-3">0{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-fg">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-2">{v.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/book" className="btn btn-primary">
            Book a call <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/academy" className="btn btn-ghost">
            Visit the Academy
          </Link>
        </div>
      </Section>
    </>
  );
}
