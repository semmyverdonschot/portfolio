import { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // for static export
  experimental: {
    optimizeCss: true, // optional, your previous experiments
  },
  // Remove swcMinify & future
  // Remove headers (not supported with static export)
};

export default nextConfig;
