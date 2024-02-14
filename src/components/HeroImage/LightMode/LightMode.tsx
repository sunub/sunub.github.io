import React from "react";
import * as Styled from "../HeroImage.style";
import { getLightHeroImageURL } from "@/db/firebase.mjs";
import * as LightBridge from "@/public/assets/hero-image__light-bridge.avif";
import * as LightHeroImage from "@/public/assets/hero-image__light-image.avif";

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
        <Styled.LightHeroImage
          src={LightBridge}
          alt={"메인 히어로 이미지중 물에 비친 다리"}
          $mirrored={true}
          style={{
            zIndex: 2,
            width: "100%",
            height: "auto",
          }}
        />
      </Styled.Picture>
    </React.Fragment>
  );
}

export default LightMode;
