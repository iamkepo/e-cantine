import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
