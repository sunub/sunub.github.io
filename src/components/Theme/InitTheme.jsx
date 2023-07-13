import React from "react";
import { COLORS } from "src/constants/constants";

function setColorsByTheme() {
	const COLORS = {
		text: {
			light: `oklch(21.08% 0.055 34.69)`,
			dark: `oklch(100% 0 31.08)`,
		},
		background: {
			light: `oklch(97.14% 0.011 31.07)`,
			dark: `oklch(54.74% 0.023 238.99)`,
		},
		primary: {
			light: `oklch(100% 0 0 / 0.8)`,
			dark: `oklch(34% 0.019 229.64)`,
		},
		highlightColor: {
			light: `oklch(70.8% 0.165 32.85)`,
			dark: `oklch(64.86% 0.181 249.54)`,
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
