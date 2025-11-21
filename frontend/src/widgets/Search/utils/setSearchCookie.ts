"use server";

import { cookies } from "next/headers";

export async function toggleSearchCookie() {
	const cookieStore = await cookies();
	const currentCookie = cookieStore.get("search");

	let isSearchOpen = false;
	if (currentCookie) {
		try {
			const parsed = JSON.parse(currentCookie.value) as {
				isSearchOpen?: boolean;
			};
			isSearchOpen = parsed.isSearchOpen ?? false;
		} catch {
			isSearchOpen = false;
		}
	}

	const cookieValue = JSON.stringify({ isSearchOpen: !isSearchOpen });
	cookieStore.set("search", cookieValue, {
		sameSite: "strict",
		path: "/",
	});
}
