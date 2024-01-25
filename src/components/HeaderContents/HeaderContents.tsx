"use client";

import React from "react";
import Header from "../Header/Header";
import HeroImage from "../HeroImage";
import * as Styled from "./HeaderContents.style";
import Wave from "./Wave";
import { ThemeContext } from "@/components/Theme/ThemeProvider";
import { createPortal } from "react-dom";

function HeaderContents() {
  const [portalRef, setPortalRef] = React.useState<HTMLDivElement | null>(null);
  const { colorTheme } = React.useContext(ThemeContext);

  React.useLayoutEffect(() => {
    setPortalRef(
      document.getElementById(
        "blog-header__hero-image-portal",
      ) as HTMLDivElement,
    );
  }, []);

  return (
    <Styled.Wrapper>
      <Header />
      <HeroImage colorTheme={colorTheme} />
      <Wave />
    </Styled.Wrapper>
  );
}

export default HeaderContents;
