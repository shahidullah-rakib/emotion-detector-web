import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "emotion-detector-web";


const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: isProd ? `/${repo}` : "",
  assetPrefix: isProd ? `/${repo}/` : "",
  reactCompiler: true,
};

export default nextConfig;
