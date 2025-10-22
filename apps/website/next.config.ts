import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nexoperandi/ui", "@nexoperandi/agent-core"],
};

export default nextConfig;
