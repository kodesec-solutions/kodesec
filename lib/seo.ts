import type { Metadata } from "next";
import { getSite, getMember, type Post, type Lesson, type AcademyTrack, type Service } from "@/lib/content/loaders";

export const SITE_URL = "https://kodesec.com";
export const ORG_ID = `${SITE_URL}/#organization`;
const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`);

/**
 * One helper for every page's metadata. Title pattern: "<Topic> | Kodesec" (template in app/layout.tsx),
 * so pages pass only their topic.
 */
export function buildMetadata(opts: {
  title?: string;
  description: string;
  path: string;
  image?: string | null;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}): Metadata {
  const images = opts.image ? [{ url: abs(opts.image) }] : undefined;
  return {
    ...(opts.title ? { title: opts.title } : {}),
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: opts.type ?? "website",
      url: abs(opts.path),
      siteName: "Kodesec",
      locale: "en_US",
      ...(opts.title ? { title: `${opts.title} | Kodesec` } : {}),
      description: opts.description,
      ...(images ? { images } : {}),
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime, modifiedTime: opts.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      ...(opts.title ? { title: `${opts.title} | Kodesec` } : {}),
      description: opts.description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

// ------------------------------------------------------------------ JSON-LD builders

export function organizationLd() {
  const site = getSite();
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: SITE_URL,
    logo: abs("/brand/kodesec-mark.svg"),
    image: abs("/brand/kodesec-mark.svg"),
    email: site.email,
    description: site.description,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    areaServed: ["GB", "BD", "Worldwide"],
    sameAs: site.social.map((s) => s.href),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Kodesec",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

function authorsLd(slugs: string[]) {
  return slugs.map((s) => {
    const m = getMember(s);
    if (!m) return { "@type": "Person", name: s };
    if (m.kind === "organization") return { "@id": ORG_ID };
    return { "@type": "Person", name: m.name, jobTitle: m.role, url: abs(`/about#${m.slug}`), sameAs: Object.values(m.links) };
  });
}

export function articleLd(post: Post) {
  const url = abs(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: authorsLd(post.authors),
    publisher: { "@id": ORG_ID },
    mainEntityOfPage: url,
    image: post.cover ? abs(post.cover) : abs("/opengraph-image"),
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };
}

export function courseLd(track: AcademyTrack) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${track.title} — Kodesec Academy`,
    description: track.summary,
    url: abs(track.href),
    provider: { "@id": ORG_ID },
    isAccessibleForFree: true,
    inLanguage: "en",
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `${track.lessonCount} lessons` },
    offers: { "@type": "Offer", price: 0, priceCurrency: "USD", category: "Free" },
  };
}

export function lessonLd(lesson: Lesson, track: AcademyTrack) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    url: abs(lesson.href),
    learningResourceType: "Lesson",
    educationalLevel: lesson.level,
    teaches: lesson.objectives,
    timeRequired: lesson.duration,
    dateModified: lesson.updated,
    isAccessibleForFree: true,
    isPartOf: { "@type": "Course", name: `${track.title} — Kodesec Academy`, url: abs(track.href) },
    author: authorsLd(lesson.authors),
    publisher: { "@id": ORG_ID },
  };
}

export function serviceLd(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`/services/${service.slug}#service`),
    name: service.title,
    description: service.summary,
    provider: { "@id": ORG_ID },
    areaServed: ["BD", "Worldwide"],
    url: abs(`/services/${service.slug}`),
  };
}

export function faqLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({ "@type": "Question", name: q.question, acceptedAnswer: { "@type": "Answer", text: q.answer } })),
  };
}
