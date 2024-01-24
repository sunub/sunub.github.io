import React from "react";
import * as Styled from "../HeroImage.style";

import bridge from "@/public/assets/hero-image__light-bridge.avif";
import baseImage from "@/public/assets/hero-image__light-image.avif";
import { Theme } from "type";

function LightMode({ colorTheme }: { colorTheme: Theme }) {
  return (
    <React.Fragment>
      <Styled.Picture>
        <Styled.LightHeroImage
          $colorTheme={colorTheme}
          src={baseImage}
          loading="lazy"
          alt={"메인 히어로 이미지중 메인"}
          style={{
            zIndex: 2,
          }}
        />
        <Styled.LightHeroImage
          $colorTheme={colorTheme}
          src={bridge}
          loading="lazy"
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
