"use server";

import process from "node:process";
import { cookies } from "next/headers";

async function checkHasColorTheme() {
	const cookieStore = await cookies();
	return cookieStore.get("color-theme");
}

async function setInitColorTheme(preferenceColorTheme: string) {
	const cookieStore = await cookies();
	const nodeenv = process.env.NODE_ENV;
	let sameSite: "lax" | "none" | "static" = "lax";
	let secure: boolean = true;

	if (nodeenv === "development") {
		[sameSite, secure] = ["none", false];
	}

	cookieStore.set("color-theme", preferenceColorTheme, {
		path: "/",
		sameSite,
		secure,
	});
}

export { setInitColorTheme, checkHasColorTheme };
