import * as Styled from "./Header.style";
<<<<<<< HEAD
=======
import Link from "next/link";
import Image from "next/image";
>>>>>>> refs/remotes/origin/sunub
import Spacer from "@/components/Spacer";
import ThemeToggler from "@/components/Theme/Toggler/ThemeToggler";
import Logo from "./Logo";
import Navigation from "./Navigation";
<<<<<<< HEAD

function Header() {
=======
import { Theme } from "type";

function Header({ initColorTheme }: { initColorTheme: Theme | string }) {
>>>>>>> refs/remotes/origin/sunub
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
<<<<<<< HEAD
            <ThemeToggler maskId="desktop-header-theme-toggler" />
=======
            <ThemeToggler
              initColorTheme={initColorTheme}
              maskId="desktop-header-theme-toggler"
            />
>>>>>>> refs/remotes/origin/sunub
          </Styled.ThemeWrapper>
        </Styled.Header>
      </Styled.RootWrapper>
    </>
  );
}

export default Header;
