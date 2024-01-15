"use client";

import styled from "styled-components";
import Image from "next/image";

export const BackgroundColor = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;

  width: 100%;
  background-color: oklch(82.9% 0.09573202406959574 31.111262465234525 / 68%);
`;

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

export const WaveImage = styled(Image)`
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
