import { ThemeWrapper } from "./Header.style";
import { HeaderComposer } from "./HeaderComposer";

async function Header() {
	return (
		<HeaderComposer.layout>
			<HeaderComposer.leftSide>
				<HeaderComposer.logo />
				<HeaderComposer.navigation />
			</HeaderComposer.leftSide>

			<HeaderComposer.rightSide>
				<HeaderComposer.search />
				<ThemeWrapper>
					<HeaderComposer.themeToggler
						maskId="mobile-header-theme-toggler"
						data-testid="desktop-theme-toggler-button"
					/>
				</ThemeWrapper>
				<HeaderComposer.hamburger />
			</HeaderComposer.rightSide>
		</HeaderComposer.layout>
	);
}

export default Header;
