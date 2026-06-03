import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  transpilePackages: ["lucide-react"],
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/tools/:slug.json", destination: "/api/json/tools/:slug" },
        { source: "/categories/:slug.json", destination: "/api/json/categories/:slug" },
        { source: "/compare/:slug.json", destination: "/api/json/comparisons/:slug" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
