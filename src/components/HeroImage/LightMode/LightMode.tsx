import React from "react";
import * as Styled from "../HeroImage.style";
import LightBridge from "@/public/assets/hero-image__light-bridge.avif";
import LightHeroImage from "@/public/assets/hero-image__light-image.avif";

// firebase url = `${lightHeroImage}?format=image/avif&width=1600&height=546&quality=70`
// firebase url = `${lightBridge}?format=image/avif&width=1600&height=546&quality=70`

function LightMode() {
  return (
    <React.Fragment>
      <Styled.Picture>
        <Styled.LightHeroImage
          src={LightHeroImage}
          alt={"메인 히어로 이미지중 메인"}
          style={{
            zIndex: 2,
            width: "100%",
            height: "auto",
          }}
        />
        <Styled.Shadow />
      </Styled.Picture>
    </React.Fragment>
  );
}

export default LightMode;
