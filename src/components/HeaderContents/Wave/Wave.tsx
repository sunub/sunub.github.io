"use client";

import React from "react";
import * as Styled from "./Wave.style";
import WaveSvg from "./WaveSvg";
import WaveBird from "./WaveBird";

function Wave() {
  return (
    <Styled.WaveWrapper>
      <WaveSvg />
      <WaveBird />
    </Styled.WaveWrapper>
  );
}

export default Wave;
