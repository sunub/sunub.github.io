"use client";

import styled from "styled-components";

export const RootWrapper = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const UnfilledSVG = styled.svg`
  position: absolute;
  height: 100%;
  top: 0px;
  left: 0px;
  transform: translateX(-100%);
`;
