import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: { remotePatterns: [new URL(`https://cachet.dunkirk.sh/**/r`)] }
};

export default nextConfig;
