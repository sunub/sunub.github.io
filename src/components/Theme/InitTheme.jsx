import React from "react";
import { COLORS } from "@/constants/constants";

function setColorsByTheme() {
	const COLORS = "🌈";

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
		const cssVarName = `--color-${name}`;
		root.style.setProperty(cssVarName, colorByTheme[colorMode]);
	});
}

export default function InitTheme() {
	const boundFn = String(setColorsByTheme).replace(
		'"🌈"',
		JSON.stringify(COLORS)
	);

	const calledFunction = `(${boundFn})()`;

	return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
}
