import React from "react";
import Header from "../Header/Header";
import HeroImage from "../HeroImage";
import Spacer from "@/components/Spacer";
import * as Styled from "./HeaderContents.style";
import { Theme } from "type";
import Wave from "./Wave";
import useColorTheme from "@/hooks/use-colorTheme";

function HeaderContents({
  heroImageVisible,
  initColorTheme,
}: {
  heroImageVisible: boolean;
  initColorTheme: Theme | string;
}) {
  const colorTheme = useColorTheme();

  return (
    <Styled.Wrapper $theme={colorTheme}>
      <Spacer size={60} axis={"vertical"} />
      <Header initColorTheme={initColorTheme} />
      {heroImageVisible && <HeroImage colorTheme={colorTheme} />}
      <Wave colorTheme={colorTheme} />
    </Styled.Wrapper>
  );
}

export default HeaderContents;
