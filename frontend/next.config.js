/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Performance: compress responses
  compress: true,

  // Image optimization
  images: {
    domains: ["res.cloudinary.com", "localhost"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",        value: "DENY" },
          { key: "X-Content-Type-Options",  value: "nosniff" },
          { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },

  // Bundle analysis (npm i @next/bundle-analyzer to enable)
  // webpack: (config) => { config.resolve.alias["three"] = "three"; return config; },
};

module.exports = nextConfig;
