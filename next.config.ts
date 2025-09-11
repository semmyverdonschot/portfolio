// next.config.ts
import { defineNextConfig } from 'next/config'

const nextConfig = defineNextConfig({
  output: 'export',  // <-- this generates the `out/` folder on build
})

export default nextConfig
