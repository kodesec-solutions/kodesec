import { LegalPage } from "@/components/content/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern your use of Kodesec services and the kodesec.com website.",
  path: "/terms-of-service",
});

export default function Page() {
  return <LegalPage slug="terms-of-service" />;
}
