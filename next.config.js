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
	productionBrowserSourceMaps: true,
	compiler: {
		styledComponents: true,
	},
	webpack: (config, options) => {
		config.module.rules.push({
			test: /\.mdx?$/,
			use: [
				options.defaultLoaders.babel,
				{
					loader: "@mdx-js/loader",
					options: {},
				},
			],
		});
		return config;
	},
};

export default nextConfig;
