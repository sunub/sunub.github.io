"use client";
import React from "react";
import { COLORS, COLOR_MODE_KEY } from "@/constants/constants";

export const ThemeContext = React.createContext<any>({});

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [colorMode, rawSetColorMode] = React.useState<string | null>(null);

	React.useEffect(() => {
		const root = document.documentElement;
		const initColorValue = root.getAttribute("data-theme");
		rawSetColorMode(initColorValue);
	}, []);

	const contextValue = React.useMemo(() => {
		const setColorMode = (newValue: "dark" | "light") => {
			const root = window.document.documentElement;
			root.setAttribute("data-theme", newValue);

			localStorage.setItem(COLOR_MODE_KEY, newValue);
			Object.entries(COLORS).map(([name, colorByTheme]) => {
				const cssVariable = `--color-${name}`;

				root.style.setProperty(cssVariable, colorByTheme[newValue]);
			});

			rawSetColorMode(newValue);
		};

		return { colorMode, setColorMode };
	}, [colorMode, rawSetColorMode]);

	return (
		<ThemeContext.Provider value={contextValue}>
			{children}
		</ThemeContext.Provider>
	);
}
