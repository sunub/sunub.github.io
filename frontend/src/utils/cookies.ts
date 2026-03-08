"use server";

import { cookies } from "next/headers";

export async function setCookie(
	name: string,
	value: string,
	options?: { maxAge?: number; path?: string },
) {
	const cookieOptions = {
		maxAge: options?.maxAge ?? 60 * 60 * 24,
		path: options?.path ?? "/",
	};

	try {
		const cookieStore = await cookies();
		cookieStore.set(name, value, cookieOptions);
	} catch (error) {
		console.error("Error setting cookie:", error);
		throw new Error("Failed to set cookie");
	}
}

export async function getCookie(name: string): Promise<string | undefined> {
	try {
		const cookieStore = await cookies();
		if (!cookieStore.has(name)) {
			return undefined;
		}
		return cookieStore.get(name)?.value;
	} catch (error) {
		console.error("Error getting cookie:", error);
		throw new Error("Failed to get cookie");
	}
}
