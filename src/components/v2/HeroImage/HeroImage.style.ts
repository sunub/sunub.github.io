"use client";

import styled from "styled-components";
import Image from "next/image";

export const RootWrapper = styled.div`
  position: relative;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const BackgroundWrapper = styled.div`
  display: grid;
  grid: [hero-background] 1fr / [hero-background] 1fr;
  place-items: center;
  height: 550px;
`;

export const HeroImageWrapper = styled.div`
  display: grid;
  grid-template: [hero-image] 1fr / [hero-image] 1fr;
`;

export const HeroImage = styled(Image).attrs({
  priority: true,
  quality: 70,
  sizes: "100vw",
})<{ $mirrored?: boolean }>`
  pointer-events: none;
  grid-area: hero-image;
  width: 100%;
  height: auto;
  object-fit: cover;
  transform: ${({ $mirrored }) =>
    $mirrored && "scaleY(-1) translateY(-75%) scaleY(0.5)"};
  filter: ${({ $mirrored }) => $mirrored && "blur(10px)"};
`;
