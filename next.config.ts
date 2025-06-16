import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['*'],
    unoptimized: true,
  },
};

export default nextConfig;
