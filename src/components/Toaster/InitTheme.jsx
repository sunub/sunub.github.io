import React from "react";

function setColorsByTheme() {
	const COLORS = {
		text: {
			light: `oklch(32.31% 0.0262 34.69 / 90%)`,
			dark: `oklch(97.14% 0.011 31.07)`,
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
			dark: `oklch(90.97% 0.046 246.35)`,
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
			light: "oklch(97.14% 0.011 31.07)",
			dark: "oklch(45.42% 0.007 239.95)",
		},
		bird: {
			light: "oklch(73.44% 0.152 21.47)",
			dark: "oklch(93.29% 0.129 112.44)",
		},
	};

	function getInitialColorMode() {
		const persistedColorPreference =
			window.localStorage.getItem("theme-preference");
		const hasPersistedPreference =
			typeof persistedColorPreference === "string";

		if (hasPersistedPreference) {
			return persistedColorPreference;
		}

		const mql = window.matchMedia("(prefers-color-scheme: dark)");
		const hasMediaQueryPreference = typeof mql.matches === "boolean";
		if (hasMediaQueryPreference) {
			if (mql.matches) {
				setLocalStorage("dark");
				return "dark";
			}
			setLocalStorage("light");
			return "light";
		}

		return "light";
	}

	function setLocalStorage(data) {
		window.localStorage.setItem("theme-preference", data);
	}

	const colorMode = getInitialColorMode();

	const root = document.firstElementChild;

	root.setAttribute("data-color-mode", colorMode);
	Object.entries(COLORS).forEach(([name, colorByTheme]) => {
		const cssVar = `--color-`;
		const cssVarName = cssVar + name;
		root.style.setProperty(cssVarName, colorByTheme[colorMode]);
	});

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", ({ matches: isDark }) => {
			const currColorMode = isDark === true ? "dark" : "light";
			Object.entries(COLORS).forEach(([name, colorByTheme]) => {
				const cssVar = "--color-";
				const cssVarName = cssVar + name;
				document.firstElementChild.style.setProperty(
					cssVarName,
					colorByTheme[currColorMode]
				);
			});
		});
}

export default function InitTheme() {
	const boundFn = String(setColorsByTheme);

	const calledFunction = `(${boundFn})()`;

	return (
		<script dangerouslySetInnerHTML={{ __html: calledFunction }}></script>
	);
}
