import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.output.publicPath = '/_next/';
    return config;
  },

  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;
