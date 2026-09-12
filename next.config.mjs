/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "dexie",
      "dexie-react-hooks",
      "clsx",
      "tailwind-merge",
      "@/data/mockRoadmapTimeline",
      "@/data/mockGrammarTheoryData",
    ],
  },
  httpAgentOptions: {
    keepAlive: true,
  },
  // Keep compiled pages cached in memory for smooth instant transitions without re-compilation
  onDemandEntries: {
    maxInactiveAge: 3600 * 1000, // 1 hour cache
    pagesBufferLength: 50,       // keep up to 50 pages in memory
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/api/dictionary",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=86400, stale-while-revalidate=604800",
          },
          {
            key: "Connection",
            value: "keep-alive",
          },
        ],
      },
      {
        source: "/api/ai/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-transform",
          },
          {
            key: "Connection",
            value: "keep-alive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
