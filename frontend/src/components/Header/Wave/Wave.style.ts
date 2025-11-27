"use client";

import Image from "next/image";
import styled from "styled-components";

export const WaveWrapper = styled.div`
  display: grid;
  grid: [wave-image] 1fr / [wave-image] 1fr;
  position: relative;
  overflow: hidden;
  left: 0px;
  right: 0px;
  width: 100%;
  transform: translateY(1px);
  z-index: 3;
  user-select: none;
  pointer-events: none;
`;

export const WaveImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  transform: translateY(20px);
`;

export const WaveSvgWrapper = styled.div`
  grid-area: wave-image;

  position: sticky;
  display: grid;
  align-items: flex-end;
`;

export const WaveBirdSvgWrapper = styled.div`
  grid-area: wave-image;
  display: grid;
  align-items: flex-end;
`;

export const WaveSvg = styled.svg`
  position: relative;
  left: -3%;
  right: -3%;
  bottom: 0em;
  min-width: 600px;
  max-width: unset;
  width: 106%;
`;

export const WaveBirdSvg = styled.svg`
  grid-area: wave-image;
  min-width: 600px;
  max-width: unset;
  width: 106%;
`;

export const WaveBirdMirroredSvg = styled.svg`
  position: absolute;
  bottom: 0.75em;
  min-width: 600px;
  max-width: unset;
  opacity: 0.4;
  filter: blur(3.75px);
  transform: scaleY(-1) translateY(-80%) scaleY(0.3);
`;

export const WaveBirdWrapper = styled.div``;
