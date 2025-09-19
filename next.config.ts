import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  output: "export",

  experimental: {
    optimizeCss: true,
    esmExternals: true,
  },

  compiler: {
    styledComponents: false,
  },

  future: {
    strictPostcssConfiguration: true,
  },

  transpilePackages: [],
  excludeDefaultMomentLocales: true,
};

export default nextConfig;
