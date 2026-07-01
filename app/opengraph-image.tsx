import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Kodesec - Cybersecurity & Software Engineering";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
        {/* Glow Effects */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            left: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(54, 226, 123, 0.12)",
            filter: "blur(80px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            right: "-150px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(34, 211, 238, 0.08)",
            filter: "blur(80px)",
            display: "flex",
          }}
        />

        {/* Top Header Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              height: "48px",
              width: "48px",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backgroundColor: "rgba(15, 20, 36, 0.8)",
              color: "#36E27B",
              fontSize: "24px",
              fontWeight: "900",
            }}
          >
            KS
          </div>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "900",
              color: "#ffffff",
              letterSpacing: "0.05em",
            }}
          >
            KODESEC
          </span>
        </div>

        {/* Core Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#36E27B",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Cybersecurity & Software Engineering
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: "900",
              color: "#ffffff",
              lineHeight: "1.1",
              maxWidth: "900px",
            }}
          >
            Build Faster. Ship Securely.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#9ca3af",
              lineHeight: "1.5",
              maxWidth: "750px",
            }}
          >
            High-fidelity manual penetration testing, secure app architecture, and DevSecOps integrations.
          </div>
        </div>

        {/* Footer Row */}
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
            kodesec.com
          </span>
          <div
            style={{
              display: "flex",
              gap: "24px",
              fontSize: "16px",
              color: "#9ca3af",
              fontWeight: "bold",
            }}
          >
            <span style={{ color: "#36E27B" }}>✓ OWASP ASVS</span>
            <span>✓ Zero-Trust</span>
            <span>✓ Manual Exploit Delivery</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
