import { HeaderWrapper } from "../style";
import { ScrollTrigger } from "./ScrollTrigger";

export function ScrollHeader({ children }: { children: React.ReactNode }) {
	return (
		<HeaderWrapper className="blog-main__scroll-header">
			<ScrollTrigger>{children}</ScrollTrigger>
		</HeaderWrapper>
	);
}
