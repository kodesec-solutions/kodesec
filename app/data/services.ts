import servicesJson from "./services.json";

export type ServiceDelivery = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export type ServiceContent = {
  slug: string;
  title: string;
  shortPositioning: string;
  keyApproach: string[];
  scopeFeatures: string[];
  whatYouGet: string[];
  technologies?: string[];
  delivery: ServiceDelivery;
  bannerImage?: string;
};

export const servicesData = servicesJson as ServiceContent[];

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  return servicesData.find((service) => service.slug === slug);
}
