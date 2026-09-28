import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Kodesec — penetration testing, secure engineering and a free security academy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#030605",
          backgroundImage:
            "radial-gradient(ellipse 60% 55% at 20% 0%, rgba(46,204,113,0.45), transparent 70%), radial-gradient(ellipse 50% 45% at 85% 10%, rgba(20,184,166,0.35), transparent 70%), radial-gradient(ellipse 40% 30% at 55% 25%, rgba(210,255,230,0.18), transparent 70%)",
          color: "#f1f5f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="40" height="69" viewBox="110 8 280 482">
            <path fill="#2ECC71" d="M120 130 233 18v152l147 148v162L210 310l-90 90z" />
            <path fill="#1F7A4D" d="M233 170 380 18v162l-70 70z" />
          </svg>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: 7 }}>
            KODE<span style={{ color: "#2ECC71" }}>SEC</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Engineering security into every layer.</div>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#2ECC71" }}>Deploy with confidence.</div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#a8b3ad" }}>
            Penetration testing · Secure engineering · Free security academy
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#6c7872" }}>
          <span>kodesec.com</span>
          <span style={{ color: "#b8f5d2" }}>● Security-first by design</span>
        </div>
      </div>
    ),
    size,
  );
}
