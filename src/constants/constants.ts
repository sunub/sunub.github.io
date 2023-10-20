const COLORS = {
	text: {
		light: `oklch(21.08% 0.055 34.69)`,
		dark: `oklch(100% 0 31.08)`,
	},
	background: {
		light: `oklch(97.14% 0.011 31.07)`,
		dark: `oklch(23.93% 0 0)`,
	},
	primary: {
		light: `oklch(100% 0 0 / 0.8)`,
		dark: `oklch(34% 0.019 229.64)`,
	},
	highlightColor: {
		light: `oklch(70.8% 0.165 32.85)`,
		dark: `oklch(64.86% 0.181 249.54)`,
	},
	header: {
		light: `oklch(90.8% 0.046 29.64)`,
		dark: `oklch(30.4% 0.005 247.98)`,
	},
	icon: {
		light: `oklch(61.8% 0.027 30.58)`,
		dark: `oklch(97.14% 0.011 31.07)`,
	},
	elevation: {
		light: "oklch(100% 0 0)",
		dark: "oklch(45.42% 0.007 239.95)",
	},
	bird: {
		light: "oklch(73.44% 0.152 21.47)",
		dark: "oklch(93.29% 0.129 112.44)",
	},
};

const COLOR_MODE_KEY = "theme-preference";

export { COLORS, COLOR_MODE_KEY };
