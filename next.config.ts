import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  swcMinify: true,
  output: "export",
  experimental: {
    optimizeCss: true,
    esmExternals: true,
  },

  future: {
    webpack5: true,
  },
  compiler: {
    styledComponents: false,
  },
};

export default nextConfig;
