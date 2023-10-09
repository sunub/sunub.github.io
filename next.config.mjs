/** @type {import('next').NextConfig} */

const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	images: {
		unoptimized: true,
	},
	reactStrictMode: true,
	env: {
		DEV_PORT: "http://localhost:3000",
		DEPLOY_PORT: "https://www.sunub.com/",
	},
	compiler: {
		styledComponents: true,
	},
	output: "standalone",
};

export default nextConfig;
