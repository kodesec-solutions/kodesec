import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServiceBySlug, servicesData } from "@/app/data/services";
import ServiceDetailClient from "@/components/ServiceDetailClient";
import JsonLd from "@/components/JsonLd";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Kodesec",
    };
  }

  const cleanTitle = service.title.split(" - ")[0];

  return {
    title: `${cleanTitle} | Kodesec Services`,
    description: service.shortPositioning.slice(0, 155),
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    keywords: [
      cleanTitle.toLowerCase(),
      ...service.badges.map((b) => b.toLowerCase()),
      "security validation",
      "remediation advice",
      "kodesec",
    ],
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const cleanTitle = service.title.split(" - ")[0];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://kodesec.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://kodesec.com/services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cleanTitle,
        "item": `https://kodesec.com/services/${service.slug}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://kodesec.com/services/${service.slug}/#service`,
    "name": cleanTitle,
    "description": service.shortPositioning,
    "provider": {
      "@type": "Organization",
      "@id": "https://kodesec.com/#organization",
      "name": "Kodesec",
      "url": "https://kodesec.com"
    },
    "areaServed": "Worldwide"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": service.problems.map((prob) => ({
      "@type": "Question",
      "name": `How does KodeSec address ${prob.title.toLowerCase()}?`,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": prob.desc
      }
    }))
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={faqSchema} />
      <ServiceDetailClient service={service} />
    </>
  );
}
