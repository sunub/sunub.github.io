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
      <Wave colorTheme={colorTheme} />
    </Styled.Wrapper>
  );
}

export default HeaderContents;
