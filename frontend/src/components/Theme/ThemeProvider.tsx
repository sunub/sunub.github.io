"use client";

import React, { useCallback } from "react";
import type { Theme } from "type";
import {
	applyDocumentTheme,
	getDocumentTheme,
	getPreferredTheme,
	getSystemTheme,
	persistTheme,
	readStoredTheme,
} from "@/utils/theme";

interface ThemeContextProps {
	colorTheme: Theme;
	setColorTheme: (nextValue: Theme) => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
	colorTheme: "light",
	setColorTheme: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [colorTheme, rawSetColorTheme] = React.useState<Theme>(() => {
		if (typeof document === "undefined") {
			return "light";
		}

		return getDocumentTheme();
	});

	const updateTheme = useCallback((nextTheme: Theme) => {
		applyDocumentTheme(nextTheme);
		persistTheme(nextTheme);
		rawSetColorTheme(nextTheme);
	}, []);

	React.useEffect(() => {
		rawSetColorTheme(getDocumentTheme());
	}, []);

	React.useEffect(() => {
		function matchMediaHandler({ matches: isDark }: { matches: boolean }) {
			if (readStoredTheme()) {
				return;
			}

			const nextColorTheme = isDark ? "dark" : "light";
			applyDocumentTheme(nextColorTheme);
			rawSetColorTheme(nextColorTheme);
		}

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", matchMediaHandler);

		return () => mediaQuery.removeEventListener("change", matchMediaHandler);
	}, []);

	React.useEffect(() => {
		if (readStoredTheme()) {
			return;
		}

		const nextTheme = getSystemTheme();
		applyDocumentTheme(nextTheme);
		rawSetColorTheme(nextTheme);
	}, []);

	React.useEffect(() => {
		function syncTheme() {
			const nextTheme = getPreferredTheme();
			applyDocumentTheme(nextTheme);
			rawSetColorTheme(nextTheme);
		}

		window.addEventListener("pageshow", syncTheme);
		window.addEventListener("storage", syncTheme);

		return () => {
			window.removeEventListener("pageshow", syncTheme);
			window.removeEventListener("storage", syncTheme);
		};
	}, []);

	const contextValue = React.useMemo(
		() => ({
			colorTheme,
			setColorTheme: updateTheme,
		}),
		[colorTheme, updateTheme],
	);

	return (
		<ThemeContext.Provider value={contextValue as ThemeContextProps}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = React.useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return context;
}

export default ThemeProvider;
