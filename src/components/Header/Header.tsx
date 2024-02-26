import * as Styled from "./Header.style";
import Spacer from "@/components/Spacer";
import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import Logo from "./Logo";
import Navigation from "./Navigation";
import React from "react";
import Hamburger from "../MobileNav/Hamburger";

function Header() {
  return (
    <React.Fragment>
      <Styled.RootWrapper>
        <Spacer size={60} axis={"vertical"} />
        <Styled.HeaderWrapper id="blog-main__header-contents">
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
      <Hamburger />
    </React.Fragment>
  );
}

export default Header;
