"use client";

import styled from "styled-components";
import Image from "next/image";

export const WaveWrapper = styled.div`
  display: grid;
  grid: [wave-image] 1fr / [wave-image] 1fr;
  position: relative;
  overflow: hidden;
  left: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  transform: translateY(1px);
  z-index: 3;
  user-select: none;
  pointer-events: none;
`;

export const WaveImage = styled(Image).attrs({
  priority: true,
  quality: 70,
  sizes: "100vw",
})`
  width: 100%;
  height: auto;
  object-fit: cover;
  transform: translateY(20px);
`;

export const WaveSvgWrapper = styled.div`
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
