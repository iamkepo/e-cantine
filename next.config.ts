import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['*'],
    unoptimized: true,
  },
  async headers() {
      return [
          {
              // matching all API routes
              source: "/api/v1/:path*",
              headers: [
                  // other headers omitted for brevity...
                  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
                  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
              ]
          }
      ]
  },
};

export default nextConfig;
