/** @type {import('next').NextConfig} */

const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
};

export default nextConfig;
