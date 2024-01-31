import * as Styled from "./Header.style";
import Spacer from "@/components/Spacer";
import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import Logo from "./Logo";
import Navigation from "./Navigation";

function Header() {
  return (
    <Styled.RootWrapper>
      <Styled.DemoWrapper />
      <Spacer size={60} axis={"vertical"} />
      <Styled.HeaderWrapper>
        <Styled.Header>
          <Styled.LogoAndNavWrapper>
            <Logo />
            <Navigation />
          </Styled.LogoAndNavWrapper>
          <Styled.ThemeWrapper>
            <ThemeToggler maskId="desktop-header-theme-toggler" />
          </Styled.ThemeWrapper>
        </Styled.Header>
      </Styled.HeaderWrapper>
    </Styled.RootWrapper>
  );
}

export default Header;
