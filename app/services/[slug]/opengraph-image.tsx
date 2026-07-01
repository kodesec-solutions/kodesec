import { ImageResponse } from "next/og";
import { getServiceBySlug, servicesData } from "@/app/data/services";

export const dynamic = "force-static";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  const rawTitle = service?.title || "Kodesec Services";
  const title = rawTitle.split(" - ")[0];
  const description = service?.shortPositioning || "Secure digital systems engineered with zero-trust principles.";
  const badges = service?.badges || ["OWASP Aligned", "Zero-Trust", "Manual Exploits"];
  const keyApproach = service?.keyApproach.slice(0, 3) || [];

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(to bottom, #0F1424, #0B0F1A)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow Background */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "rgba(34, 211, 238, 0.06)",
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        {/* Top brand header */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                display: "flex",
                height: "36px",
                width: "36px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                backgroundColor: "rgba(15, 20, 36, 0.8)",
                color: "#36E27B",
                fontSize: "18px",
                fontWeight: "900",
              }}
            >
              KS
            </div>
            <span
              style={{
                fontSize: "20px",
                fontWeight: "900",
                color: "#ffffff",
                letterSpacing: "0.05em",
              }}
            >
              KODESEC SERVICES
            </span>
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#22d3ee",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: "1px solid rgba(34, 211, 238, 0.3)",
              padding: "4px 12px",
              borderRadius: "4px",
              backgroundColor: "rgba(34, 211, 238, 0.05)",
            }}
          >
            Capabilities
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1000px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "900",
              color: "#ffffff",
              lineHeight: "1.15",
              margin: 0,
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#9ca3af",
              lineHeight: "1.5",
              margin: 0,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {description}
          </p>

          {/* Key Approach Bullets */}
          {keyApproach.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
              {keyApproach.map((item, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "16px", color: "#e5e7eb" }}>
                  <span style={{ color: "#36E27B", fontSize: "20px" }}>•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            paddingTop: "32px",
          }}
        >
          <span style={{ fontSize: "16px", color: "#6b7280" }}>
            kodesec.com/services
          </span>
          <div style={{ display: "flex", gap: "12px" }}>
            {badges.slice(0, 2).map((badge, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: "14px",
                  color: "#36E27B",
                  fontWeight: "bold",
                  backgroundColor: "rgba(54, 226, 123, 0.08)",
                  border: "1px solid rgba(54, 226, 123, 0.15)",
                  padding: "6px 12px",
                  borderRadius: "12px",
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
