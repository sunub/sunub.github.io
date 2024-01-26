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

export const Picture = styled.picture`
  display: contents;
  margin-left: auto;
  margin-right: auto;
`;

export const HeroImageWrapper = styled.div`
  display: grid;
  grid-template: [hero-image] 1fr / [hero-image] 1fr;
  justify-items: center;
`;

export const DarkHeroImage = styled(Image).attrs({
  quality: 70,
  sizes: "100vw",
})<{ $mirrored?: boolean }>`
  pointer-events: none;
  grid-area: hero-image;
  height: auto;
  object-fit: cover;
  opacity: var(--color-dark-heroimage);
  transition: opacity 350ms ease 0s;
  transform: ${({ $mirrored }) =>
    $mirrored && "scaleY(-1) translateY(-141%) scaleY(0.5)"};
  filter: ${({ $mirrored }) => $mirrored && "blur(10px)"};
`;

export const LightHeroImage = styled(Image).attrs({
  quality: 70,
  sizes: "100vw",
})<{ $mirrored?: boolean }>`
  pointer-events: none;
  grid-area: hero-image;
  height: auto;
  object-fit: cover;
  opacity: var(--color-light-heroimage);
  transition: opacity 350ms ease 0s;
  transform: ${({ $mirrored }) =>
    $mirrored && "scaleY(-1) translateY(-141%) scaleY(0.5)"};
  filter: ${({ $mirrored }) => $mirrored && "blur(10px)"};
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
    $mirrored && "scaleY(-1) translateY(-141%) scaleY(0.5)"};
  filter: ${({ $mirrored }) => $mirrored && "blur(10px)"};
`;
