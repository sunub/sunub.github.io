import * as Styled from "./Header.style";
import Spacer from "@/components/Spacer";
import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  return (
    <>
      <Spacer size={60} axis={"vertical"} />
      <Styled.RootWrapper>
        <Styled.Header>
          <Styled.LogoAndNavWrapper>
            <Logo />
            <Navigation />
          </Styled.LogoAndNavWrapper>
          <Styled.ThemeWrapper>
            <ThemeToggler maskId="desktop-header-theme-toggler" />
          </Styled.ThemeWrapper>
        </Styled.Header>
      </Styled.RootWrapper>
    </>
  );
}

export default Header;
