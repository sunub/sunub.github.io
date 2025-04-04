/** @type {import('next').NextConfig} */
import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import { PrismaClient } from "@prisma/client";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  basePath: "",
  reactStrictMode: true,
  skipTrailingSlashRedirect: true,
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24,
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96],
    dangerouslyAllowSVG: true,
  },

  compiler: {
    styledComponents: {
      ssr: true,
      displayName: process.env.NODE_ENV === "development",
      pure: true,
      cssProp: false,
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.optimization.moduleIds = "named";

      config.externals = [
        ...config.externals,
        function (
          { context, request }: { context: any; request: string },
          callback: (error: Error | null, result: boolean | undefined) => void
        ) {
          if (
            context.includes("workers") &&
            ["gray-matter", "zod"].includes(request)
          ) {
            return callback(null, false);
          }
          return callback(null, undefined);
        },
      ];
    }
    return config;
  },

  compress: true,
  output: "standalone",
  redirects: async () => {
    if (process.env.POSTGRES_URL === undefined) {
      return [];
    }

    try {
      const prisma = new PrismaClient();
      const redirects = await prisma.redirects.findMany({
        select: {
          source: true,
          destination: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 100,
      });

      await prisma.$disconnect();

      return redirects.map(({ source, destination }) => ({
        source,
        destination,
        permanent: true,
      }));
    } catch (error) {
      console.error("리다이렉트 로드 중 오류 발생:", error);
      return [];
    }
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
      {
        source: "/assets/(.*)",
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
    media-src 'self';
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

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})(nextConfig);

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

export default withMDX(withBundleAnalyzer);
