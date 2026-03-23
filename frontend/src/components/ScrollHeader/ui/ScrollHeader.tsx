import { getRequestTheme } from "@/utils/theme";
import { HeaderWrapper } from "../style";
import { ScrollTrigger } from "./ScrollTrigger";

export async function ScrollHeader({
	children,
}: {
	children: React.ReactNode;
}) {
	const isDarkTheme = (await getRequestTheme()) === "dark";

	return (
		<HeaderWrapper
			className="blog-main__scroll-header"
			$isDarkTheme={isDarkTheme}
		>
			<ScrollTrigger>{children}</ScrollTrigger>
		</HeaderWrapper>
	);
}
