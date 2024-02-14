import React from "react";
import * as Styled from "../HeroImage.style";
import { getLightHeroImageURL } from "@/db/firebase.mjs";

async function LightMode() {
  const { lightHeroImage, lightBridge } = await getLightHeroImageURL();
  return (
    <React.Fragment>
      <Styled.Picture>
        <Styled.LightHeroImage
          src={`${lightHeroImage}?format=image/avif&width=1600&height=546&quality=70`}
          width={1600}
          height={546}
          alt={"메인 히어로 이미지중 메인"}
          style={{
            zIndex: 2,
            width: "100%",
            height: "auto",
          }}
        />
        <Styled.LightHeroImage
          src={`${lightBridge}?format=image/avif&width=1600&height=546&quality=70`}
          alt={"메인 히어로 이미지중 물에 비친 다리"}
          width={1600}
          height={546}
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
