import React from "react";
import * as Styled from "./HeroImage.style";
import LightMode from "./LightMode";
import DarkMode from "./DarkMode";
import Image from "next/image";
import LightHeroImage from "@/public/assets/hero-image__light-image.avif";

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
