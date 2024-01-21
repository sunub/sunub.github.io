import React from "react";
import * as Styled from "../HeroImage.style";

import bridge from "@/public/assets/hero-image__light-bridge.avif";
import clouds from "@/public/assets/hero-image__light-clouds.avif";
import softClouds from "@/public/assets/hero-image__soft-light-clouds.avif";
import baseImage from "@/public/assets/hero-image__light-base-scene.avif";
import { Theme } from "type";

function LightMode({ colorTheme }: { colorTheme: Theme }) {
  return (
    <React.Fragment>
      <Styled.Picture>
        <Styled.LightHeroImage
          $colorTheme={colorTheme}
          priority
          src={clouds}
          alt={"메인 히어로 이미지중 구름"}
          style={{
            zIndex: 3,
          }}
        />
        <Styled.LightHeroImage
          $colorTheme={colorTheme}
          priority
          src={softClouds}
          alt={"메인 히어로 이미지중 뒷 배경 투명한 구름"}
          style={{
            filter: "blur(5px)",
            mixBlendMode: "soft-light",
            zIndex: 1,
          }}
        />
        <Styled.LightHeroImage
          $colorTheme={colorTheme}
          src={baseImage}
          priority
          alt={"메인 히어로 이미지중 메인"}
          style={{
            zIndex: 2,
          }}
        />
        <Styled.LightHeroImage
          $colorTheme={colorTheme}
          priority
          src={bridge}
          alt={"메인 히어로 이미지중 물에 비친 다리"}
          $mirrored={true}
          style={{
            zIndex: 2,
          }}
        />
      </Styled.Picture>
    </React.Fragment>
  );
}

export default LightMode;
