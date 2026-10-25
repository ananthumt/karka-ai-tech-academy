import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Karka AI & Tech Academy",
    short_name: "Karka",
    description:
      "AI-first tech training in Nagercoil with ₹0 upfront tuition under Pay After Placement.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F9FC",
    theme_color: "#4F46E5",
    lang: "en-IN",
    categories: ["education", "productivity"],
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
