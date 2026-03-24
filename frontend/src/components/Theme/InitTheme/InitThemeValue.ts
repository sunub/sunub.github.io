function setThemeAttribute() {
	const THEME_STORAGE_KEY = "color-theme";
	const THEME_COOKIE_KEY = THEME_STORAGE_KEY;

	function getStoredTheme(): string | undefined {
		try {
			const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
			if (storedTheme === "light" || storedTheme === "dark") {
				return storedTheme;
			}
		} catch {
			// Ignore storage failures and fall back to the cookie value.
		}

		const rawCookie = document.cookie
			.split(";")
			.map((cookiePart) => cookiePart.trim())
			.find((cookiePart) => cookiePart.startsWith(`${THEME_COOKIE_KEY}=`));

		if (!rawCookie) {
			return undefined;
		}

		const cookieValue = rawCookie.slice(THEME_COOKIE_KEY.length + 1);
		try {
			const decodedTheme = decodeURIComponent(cookieValue);
			return decodedTheme === "light" || decodedTheme === "dark"
				? decodedTheme
				: undefined;
		} catch {
			return cookieValue === "light" || cookieValue === "dark"
				? cookieValue
				: undefined;
		}
	}

	function getInitialColorMode() {
		const persistedTheme = getStoredTheme();
		if (persistedTheme === "light" || persistedTheme === "dark") {
			return persistedTheme;
		}

		const mql = window.matchMedia("(prefers-color-scheme: dark)");
		if (typeof mql.matches === "boolean") {
			return mql.matches ? "dark" : "light";
		}

		return "light";
	}

	function applyTheme(mode: string) {
		document.documentElement.setAttribute("data-color-theme", mode);
		document.documentElement.style.colorScheme = mode;
	}

	const initialColorMode = getInitialColorMode();
	applyTheme(initialColorMode);
	try {
		window.localStorage.setItem(THEME_STORAGE_KEY, initialColorMode);
	} catch {
		// Ignore storage failures and keep the in-memory theme choice.
	}

	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", (event) => {
			if (getStoredTheme()) {
				return;
			}

			const nextColorMode = event.matches ? "dark" : "light";
			applyTheme(nextColorMode);
		});

	window.addEventListener("pageshow", (event: PageTransitionEvent) => {
		if (event.persisted) {
			applyTheme(getInitialColorMode());
		}
	});
}

export const initSetColorsByThemeFn = `(${String(setThemeAttribute)})()`;
