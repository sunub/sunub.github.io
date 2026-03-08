function setThemeAttribute() {
	function setColorThemeCookie(name: string, value: string, days: number) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		const expires = `expires=${date.toUTCString()}`;
		// biome-ignore lint/suspicious/noDocumentCookie: document.cookie is needed here
		document.cookie = `${name}=${value};${expires};path=/`;
	}

	function getCookie(name: string): string | undefined {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) {
			const part = parts.pop();
			return part ? part.split(";").shift() : undefined;
		}

		return undefined;
	}

	function getInitialColorMode() {
		const persistedTheme = getCookie("color-theme");
		if (persistedTheme === "light" || persistedTheme === "dark") {
			return persistedTheme;
		}

		const mql = window.matchMedia("(prefers-color-scheme: dark)");
		if (typeof mql.matches === "boolean") {
			const nextTheme = mql.matches ? "dark" : "light";
			setColorThemeCookie("color-theme", nextTheme, 1000);
			return nextTheme;
		}

		return "light";
	}

	function applyTheme(mode: string) {
		document.documentElement.setAttribute("data-color-theme", mode);
	}

	const initialColorMode = getInitialColorMode();
	applyTheme(initialColorMode);

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (event) => {
			const nextColorMode = event.matches ? "dark" : "light";
			applyTheme(nextColorMode);
			setColorThemeCookie("color-theme", nextColorMode, 1000);
		});

	window.addEventListener("pageshow", (event: PageTransitionEvent) => {
		if (event.persisted) {
			applyTheme(getInitialColorMode());
		}
	});
}

export const initSetColorsByThemeFn = `(${String(setThemeAttribute)})()`;
