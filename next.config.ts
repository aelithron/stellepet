import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["192.168.5.1"],
  images: { remotePatterns: [new URL(`https://cachet.dunkirk.sh/**/r`)] }
};

export default nextConfig;
