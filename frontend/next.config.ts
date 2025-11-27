/** @type {import('next').NextConfig} */

import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	basePath: "",
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: "/api/proxy/:path*",
				destination: `${process.env.EC2_PUBLIC_API_URL || "http://localhost:4000"}/:path*`,
			},
		];
	},
	skipTrailingSlashRedirect: true,
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "d2u919r15udwpw.cloudfront.net",
				port: "",
				pathname: "/**",
			},
		],
		minimumCacheTTL: 60 * 60 * 24 * 30,
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
	compress: true,
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
			{
				source:
					"/assets/(bridge|clouds|cars|dark_bridge|dark_clouds|dark_cars)\\.(avif|webp)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
					{
						key: "X-Priority",
						value: "high",
					},
				],
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
						value: "public, max-age=0, s-maxage=86400, stale-while-revalidate",
					},
				],
			},
		];
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.optimization = {
				...config.optimization,
				splitChunks: {
					chunks: "all",
					cacheGroups: {
						default: false,
						vendors: false,
						hero: {
							name: "hero",
							test: /HeroImage/,
							priority: 30,
							reuseExistingChunk: true,
						},
						styles: {
							name: "styles",
							test: /styled-components/,
							priority: 20,
							reuseExistingChunk: true,
						},
						commons: {
							name: "commons",
							minChunks: 2,
							priority: 10,
							reuseExistingChunk: true,
						},
					},
				},
			};
		}
		return config;
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
	{
		key: "Cache-Control",
		value: "private, no-cache, must-revalidate",
	},
	{
		key: "Accept-CH",
		value: "Sec-CH-Prefers-Color-Scheme",
	},
	{
		key: "Critical-CH",
		value: "Sec-CH-Prefers-Color-Scheme",
	},
	{
		key: "Vary",
		value: "Sec-CH-Prefers-Color-Scheme",
	},
];

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
})(nextConfig);

const withMDX = createMDX({
	extension: /\.mdx?$/,
});

export default withMDX(withBundleAnalyzer);
