import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  head: {
    charset: "utf-8",
    viewport: "width=device-width, initial-scale=1.0",
    title: "E-Cantine",
    description: "E-Cantine",
    link: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  },
};

export default nextConfig;
