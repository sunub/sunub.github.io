"use client";

import React from "react";
import Header from "../Header/Header";
import HeroImage from "../HeroImage";
import * as Styled from "./HeaderContents.style";
import Wave from "./Wave";
import { ThemeContext } from "@/components/Theme/ThemeProvider";

function HeaderContents() {
  const { colorTheme } = React.useContext(ThemeContext);

  return (
    <Styled.Wrapper $colorTheme={colorTheme}>
      <Header initColorTheme={colorTheme} />
      <HeroImage colorTheme={colorTheme} />
      <Wave colorTheme={colorTheme} />
    </Styled.Wrapper>
  );
}

export default HeaderContents;
