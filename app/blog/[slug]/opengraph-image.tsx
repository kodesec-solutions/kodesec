import { ImageResponse } from "next/og";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

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

// We can export generateImageMetadata or use generateStaticParams
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: String(post.slug) }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title || "Kodesec Research Article";
  const excerpt = post?.excerpt || "Read the latest cybersecurity write-ups and technical engineering notes from the Kodesec research team.";
  const author = post?.author || "Kodesec Research";
  const date = post?.date || "July 2026";
  const readingTime = post?.readingTime || "5 min read";

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
            background: "rgba(54, 226, 123, 0.08)",
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
              KODESEC RESEARCH
            </span>
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "#36E27B",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              border: "1px solid rgba(54, 226, 123, 0.3)",
              padding: "4px 12px",
              borderRadius: "4px",
              backgroundColor: "rgba(54, 226, 123, 0.05)",
            }}
          >
            Security Write-up
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "1000px" }}>
          <h1
            style={{
              fontSize: "52px",
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
              fontSize: "20px",
              color: "#9ca3af",
              lineHeight: "1.5",
              margin: 0,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
            }}
          >
            {excerpt}
          </p>
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
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", fontWeight: "bold" }}>Author</span>
              <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "bold", marginTop: "4px" }}>{author}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", fontWeight: "bold" }}>Published</span>
              <span style={{ fontSize: "16px", color: "#ffffff", fontWeight: "bold", marginTop: "4px" }}>{date}</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "16px",
              color: "#36E27B",
              fontWeight: "bold",
              backgroundColor: "rgba(54, 226, 123, 0.1)",
              padding: "8px 16px",
              borderRadius: "20px",
            }}
          >
            {readingTime}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
