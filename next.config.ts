import type { NextConfig } from "next";

const repoName = "emotion-detector-web";


const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  reactCompiler: true,
};

export default nextConfig;
