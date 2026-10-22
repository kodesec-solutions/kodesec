import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kodesec",
    short_name: "Kodesec",
    description: "Penetration testing, secure engineering and a free security academy.",
    start_url: "/",
    display: "standalone",
    background_color: "#030605",
    theme_color: "#030605",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
