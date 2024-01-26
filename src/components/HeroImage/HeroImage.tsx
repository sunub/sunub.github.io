import React from "react";
import * as Styled from "./HeroImage.style";
import LightMode from "./LightMode";
import DarkMode from "./DarkMode";

function HeroImage() {
  return (
    <Styled.RootWrapper>
      <Styled.HeroImageWrapper>
        <LightMode />
        <DarkMode />
      </Styled.HeroImageWrapper>
    </Styled.RootWrapper>
  );
}

export default HeroImage;
