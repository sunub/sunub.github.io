import type { Theme } from "type";

export const THEME_STORAGE_KEY = "color-theme";
export const THEME_COOKIE_KEY = THEME_STORAGE_KEY;
const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function coerceTheme(value: string | null | undefined): Theme {
	return value === "dark" ? "dark" : "light";
}

function parseStoredTheme(value: string | null | undefined): Theme | null {
	return value === "light" || value === "dark" ? value : null;
}

export function readThemeCookie(cookieSource: string): Theme | null {
	for (const cookiePair of cookieSource.split(";")) {
		const [rawKey, rawValue = ""] = cookiePair.split("=");
		if (rawKey?.trim() !== THEME_COOKIE_KEY) {
			continue;
		}

		try {
			return parseStoredTheme(decodeURIComponent(rawValue.trim()));
		} catch {
			return parseStoredTheme(rawValue.trim());
		}
	}

	return null;
}

export function readStoredTheme(): Theme | null {
	if (typeof window === "undefined") {
		return null;
	}

	try {
		const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
		const parsedStoredTheme = parseStoredTheme(storedTheme);
		if (parsedStoredTheme) {
			return parsedStoredTheme;
		}
	} catch {
		// Ignore storage failures and fall back to the cookie value.
	}

	return readThemeCookie(document.cookie);
}

export function getSystemTheme(): Theme {
	if (typeof window === "undefined") {
		return "light";
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

export function getPreferredTheme(): Theme {
	return readStoredTheme() ?? getSystemTheme();
}

export function applyDocumentTheme(nextTheme: Theme) {
	if (typeof document === "undefined") {
		return;
	}

	document.documentElement.setAttribute("data-color-theme", nextTheme);
	document.documentElement.style.colorScheme = nextTheme;
}

export function getDocumentTheme(): Theme {
	if (typeof document === "undefined") {
		return "light";
	}

	return coerceTheme(document.documentElement.getAttribute("data-color-theme"));
}

export function persistTheme(nextTheme: Theme) {
	if (typeof document === "undefined") {
		return;
	}

	try {
		window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
	} catch {
		// Ignore storage failures and still persist the cookie below.
	}

	// biome-ignore lint/suspicious/noDocumentCookie: We intentionally mirror the theme into a cookie to preserve first-paint theme selection for existing visitors.
	document.cookie = `${THEME_COOKIE_KEY}=${encodeURIComponent(nextTheme)}; Path=/; Max-Age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}
