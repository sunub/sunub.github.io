import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";

const css = `:root { --a: red; --mix: color-mix(in oklch, var(--a), blue); }`;

postcss([
	postcssPresetEnv({
		features: {
			"color-mix": true,
			"oklab-function": true,
		},
	}),
])
	.process(css, { from: undefined })
	.then((r) => console.log("OUTPUT:", r.css))
	.catch((e) => console.error(e));
