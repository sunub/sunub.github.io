<<<<<<< HEAD
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
      <Header />
      <HeroImage colorTheme={colorTheme} />
=======
import React from "react";
import Header from "../Header/Header";
import HeroImage from "../HeroImage";
import Spacer from "@/components/Spacer";
import * as Styled from "./HeaderContents.style";
import { Theme } from "type";
import Wave from "./Wave";
import useColorTheme from "@/hooks/use-colorTheme";

async function HeaderContents({
  heroImageVisible,
}: {
  heroImageVisible: boolean;
}) {
  const colorTheme = await useColorTheme();

  return (
    <Styled.Wrapper $theme={colorTheme}>
      <Header initColorTheme={colorTheme} />
      {heroImageVisible && <HeroImage colorTheme={colorTheme} />}
>>>>>>> refs/remotes/origin/sunub
      <Wave colorTheme={colorTheme} />
    </Styled.Wrapper>
  );
}

export default HeaderContents;
