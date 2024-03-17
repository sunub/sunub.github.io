"use client";

import React from "react";
import * as Styled from "./Wave.style";
import WaveSvg from "./WaveSvg";
import WaveBird from "./WaveBird";

function Wave() {
  return (
    <Styled.WaveWrapper>
      <WaveSvg id="blog-main__wave-svg-img" />
      <WaveBird />
    </Styled.WaveWrapper>
  );
}

export default Wave;
