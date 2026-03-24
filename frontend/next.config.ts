import bundleAnalyzer from "@next/bundle-analyzer";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const connectSrcDirective = [
	"'self'",
	"https://vitals.vercel-insights.com",
	"https://cloudflareinsights.com",
]
	.filter(Boolean)
	.join(" ");

const ContentSecurityPolicy = `
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.vercel-insights.com vercel.live va.vercel-scripts.com https://static.cloudflareinsights.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://d2u919r15udwpw.cloudfront.net; 
    media-src 'self';
    connect-src ${connectSrcDirective}; 
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

const nextConfig: NextConfig = {
	modularizeImports: {
		"lodash.throttle": {
			transform: "lodash.throttle",
		},
		"lucide-react": {
			transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
		},
	},
	productionBrowserSourceMaps: false,
	experimental: {
		optimizePackageImports: ["lucide-react"],
	},
	basePath: "",
	reactStrictMode: true,
	skipTrailingSlashRedirect: true,
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],

	poweredByHeader: false,
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "d2u919r15udwpw.cloudfront.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "sunub.site",
			},
			{
				protocol: "https",
				hostname: "github.com",
			},
		],
		minimumCacheTTL: 60 * 60 * 24 * 30,
		deviceSizes: [640, 750, 828, 1080, 1200],
		imageSizes: [16, 32, 48, 64, 96],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
				source: "/assets/(light|dark)_(bridge|clouds|cars)\\.(avif|webp)",
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
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
	openAnalyzer: true,
})(nextConfig);

const withMDX = createMDX({
	extension: /\.mdx?$/,
});

export default withMDX(withBundleAnalyzer);
