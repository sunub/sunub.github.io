/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
	env: {
		DEV_PORT: "http://localhost:3000",
		DEPLOY_PORT: "https://sunub.github.io",
	},
	productionBrowserSourceMaps: true,
	compiler: {
		styledComponents: true,
	},
	output: "standalone",
	experimental: {
		turbo: {
			rules: {
				".md": [
					{
						loader: "@mdx-js/loader",
						options: {
							format: "md",
						},
					},
				],
				".mdx": ["@mdx-js/loader"],
			},
		},
	},
};

export default nextConfig;