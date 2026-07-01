import type { Metadata } from "next";
import PrivacyPolicyClient from "@/components/PrivacyPolicyClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how KodeSec collects, utilizes, and protects customer personal and operational data.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyClient />;
}
