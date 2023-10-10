/** @type {import('next').NextConfig} */

const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	images: {
		unoptimized: true,
	},
	reactStrictMode: true,
	env: {
		DEV_PORT: "http://localhost:3000",
<<<<<<< HEAD
		DEPLOY_PORT: "https://sunub-github-io.vercel.app/",
=======
		DEPLOY_PORT: "https://www.sunub.com/",
>>>>>>> parent of dbd3bec (While building fetch error is occurred)
	},
	compiler: {
		styledComponents: true,
	},
	output: "standalone",
};

export default nextConfig;
