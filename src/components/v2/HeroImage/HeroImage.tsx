import React from "react";
import * as Styled from "./HeroImage.style";
import LightMode from "./LightMode";
import DarkMode from "./DarkMode";
import { Theme } from "type";

function HeroImage({ colorTheme }: { colorTheme: Theme }) {
  return (
    <Styled.RootWrapper>
      <Styled.HeroImageWrapper>
        <LightMode colorTheme={colorTheme} />
        <DarkMode colorTheme={colorTheme} />
      </Styled.HeroImageWrapper>
    </Styled.RootWrapper>
  );
}

export default HeroImage;
