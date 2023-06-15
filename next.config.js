/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    DEV_PORT: "http://localhost:3000",
    DEPLOY_PORT: "https://sunub.github.io",
  },
};

export default nextConfig;
