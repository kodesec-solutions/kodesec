import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#030605" }}>
        <svg width="84" height="144" viewBox="110 8 280 482">
          <path fill="#2ECC71" d="M120 130 233 18v152l147 148v162L210 310l-90 90z" />
          <path fill="#1F7A4D" d="M233 170 380 18v162l-70 70z" />
        </svg>
      </div>
    ),
    size,
  );
}
