import Listing, { type ListingItem } from "@/components/listing/Listing";
import JsonLd from "@/components/JsonLd";
import { getAcademy, getAllLessons, type AcademyTrack } from "@/lib/content/loaders";
import { formatDate } from "@/lib/format";
import { breadcrumbLd, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Kodesec Academy — Free Security Training",
  description:
    "Free, structured security lessons for red teamers, blue teamers, developers, cloud and DevOps engineers — written by working penetration testers.",
  path: "/academy",
});

const trackItem = (t: AcademyTrack): ListingItem => ({
  href: t.href,
  title: t.title,
  description: t.summary,
  meta: t.status === "coming-soon" ? "Coming soon" : `${t.lessonCount} lesson${t.lessonCount === 1 ? "" : "s"} · Free`,
  cover: t.cover,
  coverAlt: t.coverAlt,
  coverLabel: `kodesec/${t.slug}`,
  keywords: t.roles.join(" "),
});

export default function AcademyPage() {
  const tracks = getAcademy();
  const featured = tracks.find((t) => t.status === "published") ?? tracks[0];
  const rest = tracks.filter((t) => t.slug !== featured?.slug);
  const lessons: ListingItem[] = getAllLessons().map((l) => {
    const track = tracks.find((t) => t.slug === l.track);
    return {
      href: l.href,
      title: l.title,
      description: l.objectives[0] ? `Learn to ${l.objectives[0].charAt(0).toLowerCase()}${l.objectives[0].slice(1)}.` : "",
      date: formatDate(l.updated),
      meta: `${track?.title ?? l.track} · ${l.level}`,
      coverLabel: `kodesec/${l.slug}`,
      keywords: [...l.objectives, ...l.roles].join(" "),
    };
  });

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: "Academy", path: "/academy" }])} />
      <Listing
        heading="Welcome to the Academy."
        featuredLabel="Featured track"
        featured={featured ? trackItem(featured) : null}
        items={rest.map(trackItem)}
        searchOnly={lessons}
        searchPlaceholder="Search tracks and lessons"
        empty="No tracks or lessons match your search."
      />
    </>
  );
}
