/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
	env: {
		DEV_PORT: "http://localhost:3000",
		DEPLOY_PORT: "https://sunub.github.io",
	},
};

export default nextConfig;
