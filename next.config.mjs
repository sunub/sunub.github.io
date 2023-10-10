/** @type {import('next').NextConfig} */

const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
	env: {
		DEV_PORT: "http://localhost:3000",
		DEPLOY_PORT: "https://sunub-github-io.vercel.app/",
	},
	compiler: {
		styledComponents: true,
	},
	output: "standalone",
};

export default nextConfig;
