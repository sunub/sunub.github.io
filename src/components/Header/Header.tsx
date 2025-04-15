import * as Styled from "./Header.style";
import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import Logo from "./Logo";
import Navigation from "./Navigation";
import React from "react";
import Hamburger from "../MobileNav/Hamburger";
import { Search } from "@/widgets/Search";

function Header() {
  return (
    <React.Fragment>
      <Styled.RootWrapper>
        <Styled.HeaderWrapper id="blog-main__header-contents">
          <Styled.Header>
            <Styled.HeaderLeftSideWrapper>
              <Logo />
              <Navigation />
            </Styled.HeaderLeftSideWrapper>

            <Styled.HeaderRightSideWrapper>
              <Search />
              <Styled.ThemeWrapper>
                <ThemeToggler maskId="desktop-header-theme-toggler" />
              </Styled.ThemeWrapper>
              <Hamburger />
            </Styled.HeaderRightSideWrapper>
          </Styled.Header>
        </Styled.HeaderWrapper>
      </Styled.RootWrapper>
      <div id="blog-main__header-scroll-trigger" />
    </React.Fragment>
  );
}

export default Header;
