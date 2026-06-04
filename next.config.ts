import type { NextConfig } from "next";
import path from "path";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  transpilePackages: ["lucide-react"],
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
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
