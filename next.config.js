/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // enables static HTML export
  images: { unoptimized: true }
};

module.exports = nextConfig;
