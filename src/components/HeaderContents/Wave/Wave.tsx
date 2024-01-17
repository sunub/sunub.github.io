import React from "react";
import lightWaveBird from "@/public/assets/hero-image__light-wave-bird.avif";
import darkWaveBird from "@/public/assets/hero-image__dark-wave-bird.avif";
import * as Styled from "./Wave.style";
import WaveSvg from "./WaveSvg";
import { Theme } from "type";

function Wave({ colorTheme }: { colorTheme: Theme }) {
  return (
    <Styled.WaveWrapper>
      <Styled.BackgroundColor />
      <WaveSvg
        style={{
          transition: "all 350ms ease 0s",
          zIndex: 3,
        }}
      />
      <Styled.WaveBirdWrapper>
        <Styled.WaveImage
          src={lightWaveBird}
          alt={"메인 히어로 이미지중 중간 새 아이콘"}
          fill
          priority
          style={{
            opacity: `${colorTheme === "light" ? 1 : 0}`,
            zIndex: 3,
            filter: "brightness(1.2)",
          }}
        />
        <Styled.WaveImage
          src={darkWaveBird}
          alt={"메인 히어로 이미지중 중간 새 아이콘"}
          fill
          priority
          style={{
            opacity: `${colorTheme === "dark" ? 1 : 0}`,
            zIndex: 3,
            filter: "brightness(1.2)",
          }}
        />
      </Styled.WaveBirdWrapper>
    </Styled.WaveWrapper>
  );
}

export default Wave;
