import postcss from "postcss";
import postcssPresetEnv from "postcss-preset-env";

const css = `html { --a: red; --mix: color-mix(in oklch, var(--a), blue); }`;
postcss([postcssPresetEnv()])
	.process(css, { from: undefined })
	.then((r) => console.log(r.css));
