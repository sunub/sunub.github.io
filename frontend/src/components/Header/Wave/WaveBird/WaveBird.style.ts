'use client';

import styled from 'styled-components';

export const WaveBirdWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const WaveBirdSvg = styled.svg`
  grid-area: wave-image;
  /* min-width: 600px;
  width: 106%; */
  max-width: unset;
  z-index: 2;
`;

export const WaveBirdMirroredSvg = styled.svg`
  position: absolute;
  bottom: 0.75em;
  max-width: unset;
  opacity: 0.4;
  filter: blur(3.75px);
  transform: scaleY(-1) translateY(-80%) scaleY(0.3);
  z-index: 1;
`;
