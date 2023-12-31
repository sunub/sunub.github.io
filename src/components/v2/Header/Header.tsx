import * as Styled from "./Header.style";
import Link from "next/link";
import Image from "next/image";
import Spacer from "@/components/Spacer";
import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import Logo from "./Logo";
import Navigation from "./Navigation";
import { Theme } from "type";

function Header({ initColorTheme }: { initColorTheme: Theme | string }) {
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
            <ThemeToggler
              initColorTheme={initColorTheme}
              maskId="desktop-header-theme-toggler"
            />
          </Styled.ThemeWrapper>
        </Styled.Header>
      </Styled.RootWrapper>
    </>
  );
}

export default Header;
