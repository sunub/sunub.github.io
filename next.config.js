/** @type {import('next').NextConfig} */
const { PrismaClient } = require("@prisma/client");

const nextConfig = {
  basePath: "",
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  swcMinify: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  redirects: async () => {
    if (process.env.POSTGRES_URL === undefined) {
      return [];
    }

    const prisma = new PrismaClient();
    const redirects = await prisma.redirects.findMany({
      select: {
        source: true,
        destination: true,
      },
    });

    return redirects.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

const ContentSecurityPolicy = `
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src * blob: data:;
    media-src 'none';
    connect-src *;
`;

const securityHeaders = [
  {
    key: "Permissions-Policy",
    value: "unload=()",
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\n/g, ""),
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains; preload",
  },
  {
    key: "Access-Control-Allow-Headers",
    value: "Cache-Control",
  },
];
module.exports = nextConfig;
