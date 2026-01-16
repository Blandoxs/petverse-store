import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  basePath: "/petverse-store",
  assetPrefix: "/petverse-store/",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
