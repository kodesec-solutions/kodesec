import type { Metadata } from "next";
import ServicesPageClient from "@/components/solutions/ServicesPageClient";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Engineering & Cybersecurity Solutions Portfolio",
  description:
    "Explore Kodesec's enterprise engineering disciplines: offensive penetration testing, zero-trust cloud infrastructure, secure web/app development, and QA test automation.",
  alternates: {
    canonical: "/services",
  },
  keywords: [
    "cybersecurity services",
    "penetration testing company",
    "secure software development",
    "cloud security auditing",
    "DevSecOps consulting",
    "QA test automation",
    "SOC2 compliance readiness"
  ],
  openGraph: {
    title: "Engineering & Cybersecurity Solutions Portfolio | Kodesec",
    description:
      "Explore Kodesec's enterprise engineering disciplines: offensive penetration testing, zero-trust cloud infrastructure, secure web/app development, and QA test automation.",
    url: "https://kodesec.com/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering & Cybersecurity Solutions Portfolio | Kodesec",
    description:
      "Explore Kodesec's enterprise engineering disciplines: offensive penetration testing, zero-trust cloud infrastructure, secure web/app development, and QA test automation.",
  },
};

export default function ServicesPage() {
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
        "name": "Solutions",
        "item": "https://kodesec.com/services"
      }
    ]
  };

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <ServicesPageClient />
    </>
  );
}
