import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  experimental: {
    optimizeCss: true, // enables Critters to inline critical CSS
  },
};

export default nextConfig;
