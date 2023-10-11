/** @type {import('next').NextConfig} */

const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
	compiler: {
		styledComponents: true,
	},
	output: "standalone",
};

export default nextConfig;
