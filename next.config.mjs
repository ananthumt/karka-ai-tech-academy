/** @type {import('next').NextConfig} */

// Long-lived caching for immutable static assets; conservative defaults elsewhere.
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    // Chat widget uses the Web Speech API, which needs microphone on same-origin.
    value: "camera=(), geolocation=(), microphone=(self)",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    // Was `unoptimized: true`, which shipped every .webp at full weight
    // (several assets are 200+ KB). Let Next resize and serve responsive srcsets.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  experimental: {
    // Only pull the icon modules actually imported rather than the whole pack.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        // The chat + leads endpoints must never be cached by a CDN.
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store, max-age=0" }],
      },
    ];
  },

  async redirects() {
    return [
      // Friendly aliases for the new tools.
      { source: "/course-recommendation", destination: "/course-finder", permanent: true },
      { source: "/compare-courses", destination: "/compare", permanent: true },
    ];
  },
};

export default nextConfig;
