/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "api.ts"],
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
