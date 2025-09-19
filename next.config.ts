import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  swcMinify: true,
  experimental: {
    esmExternals: true, 
    optimizeCss: true,  
  },
  output: "export", 
};

export default nextConfig;
