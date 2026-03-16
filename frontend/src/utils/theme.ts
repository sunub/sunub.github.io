import { cookies, headers } from "next/headers";
import { cache } from "react";
import type { Theme } from "type";

export function coerceTheme(value: string | null | undefined): Theme {
	return value === "dark" ? "dark" : "light";
}

export const getRequestTheme = cache(async (): Promise<Theme> => {
	const cookieStore = await cookies();
	const persistedTheme = cookieStore.get("color-theme")?.value;

	if (persistedTheme === "light" || persistedTheme === "dark") {
		return persistedTheme;
	}

	const headersList = await headers();
	return headersList.get("sec-ch-prefers-color-scheme") === "dark"
		? "dark"
		: "light";
});
