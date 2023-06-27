/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	// trailingSlash: true,
	images: {
		unoptimized: true,
	},
	reactStrictMode: false,
	// webpack: (config, options) => {
	// 	config.module.rules.push({
	// 		test: /\.s[ac]ss$/i,
	// 		use: ["style-loader", "css-loader", "sass-loader"],
	// 	});
	// 	return config;
	// },
	env: {
		DEV_PORT: "http://localhost:3000",
		DEPLOY_PORT: "https://sunub.github.io",
		REDIS_URL:
			"redis://default:YdbkSrMUyxtEKTAQohUY7GMbaT8Oz5vT@redis-11746.c299.asia-northeast1-1.gce.cloud.redislabs.com:11746",
	},
};

export default nextConfig;
