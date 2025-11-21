import { cookies } from "next/headers";
import type { Theme } from "type";
import { HeaderWrapper } from "../style";
import { ScrollTrigger } from "./ScrollTrigger";

function themeGuard(theme: unknown): asserts theme is Theme {
	if (theme !== "light" && theme !== "dark") {
		throw new Error("Invalid theme value. Expected 'light' or 'dark'.");
	}
}

export async function ScrollHeader({
	children,
}: {
	children: React.ReactNode;
}) {
	const savedTheme = (await cookies()).get("color-theme")?.value || "light";
	themeGuard(savedTheme);
	const isDarkTheme = savedTheme === "dark";

	return (
		<HeaderWrapper
			className="blog-main__scroll-header"
			$isDarkTheme={isDarkTheme}
		>
			<ScrollTrigger>{children}</ScrollTrigger>
		</HeaderWrapper>
	);
}
