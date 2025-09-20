import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    esmExternals: true,
  },
  images: {
    unoptimized: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
