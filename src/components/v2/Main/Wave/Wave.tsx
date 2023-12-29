"use client";

import { Theme } from "type";
import React from "react";
import waveBird from "@/public/image/hero-image_wave-bird.png";
import * as Styled from "./Wave.style";
import LightWave from "./LightWave";
import DarkWave from "./DarkWave";

function Wave() {
  const theme = {
    colorMode: "light",
  };
  return (
    <>
      <Styled.WaveWrapper>
        <LightWave
          style={{
            opacity: `${theme.colorMode === "light" ? 1 : 0}`,
            zIndex: 3,
          }}
        />
        <DarkWave
          style={{
            opacity: `${theme.colorMode === "dark" ? 1 : 0}`,
            zIndex: 3,
          }}
        />
        <Styled.WaveImage
          src={waveBird}
          alt={"메인 히어로 이미지중 중간 새 아이콘"}
          fill
          style={{
            opacity: `${theme.colorMode === "light" ? 1 : 0}`,
            zIndex: 3,
            transition: "opacity 350ms ease 0s",
          }}
        />
      </Styled.WaveWrapper>
    </>
  );
}

export default React.memo(Wave);
