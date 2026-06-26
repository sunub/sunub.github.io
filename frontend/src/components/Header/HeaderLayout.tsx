import { ScrollHeader } from "@/components/ScrollHeader/ui/ScrollHeader";
import { Header, HeaderWrapper, RootWrapper } from "./Header.style";

export function HeaderLayout({ children }: { children?: React.ReactNode }) {
	return (
		<ScrollHeader>
			<RootWrapper>
				<HeaderWrapper id="blog-main__header-contents">
					<Header aria-label="banner">{children}</Header>
				</HeaderWrapper>
			</RootWrapper>
		</ScrollHeader>
	);
}
