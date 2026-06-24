export default {
	plugins: {
		autoprefixer: {},
		"postcss-preset-env": {
			features: {
				"oklab-function": true,
				"color-mix": true,
				"custom-properties": {
					preserve: true,
				},
			},
		},
	},
};
