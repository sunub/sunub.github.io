"use client";

import styled, { css, keyframes } from "styled-components";

const LinkSVG = styled.svg`
  position: absolute;
  right: -3rem;
  opacity: 0;
  transition: all 700ms cubic-bezier(0, 1.01, 0.25, 1);
`;

const LinkAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline-offset: 4px;

  &:hover {
    ${LinkSVG} {
      opacity: 1;
    }
  }
`;

const baseHeadingStyles = css`
  position: relative;
  display: flex;
  width: fit-content;
  align-items: center;
  margin-top: 1.5em;
  margin-bottom: 1em;
  padding: 0;
  border: none;
  outline-offset: 4px;
  &:hover {
    ${LinkSVG} {
      opacity: 1;
    }
  }
`;

const fontSizeMap = {
	h1: "2.5rem",
	h2: "2.25rem",
	h3: "1.875rem",
	h4: "1.5rem",
	h5: "1.25rem",
	h6: "1.125rem",
};

const H1 = styled.h1`
  ${baseHeadingStyles}
  font-size: ${fontSizeMap.h1};
`;

const H2 = styled.h2`
  ${baseHeadingStyles}
  font-size: ${fontSizeMap.h2};
`;

const H3 = styled.h3`
  ${baseHeadingStyles}
  font-size: ${fontSizeMap.h3};
`;

const H4 = styled.h4`
  ${baseHeadingStyles}
  font-size: ${fontSizeMap.h4};
`;

const H5 = styled.h5`
  ${baseHeadingStyles}
  font-size: ${fontSizeMap.h5};
`;

const H6 = styled.h6`
  ${baseHeadingStyles}
  font-size: ${fontSizeMap.h6};
`;

const slideInAnimation = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const P = styled.div`
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  text-wrap: pretty;
  /* animation: ${slideInAnimation} 0.5s ease-out;
  will-change: transform, opacity; */
`;

export { LinkAnchor, LinkSVG, H1, H2, H3, H4, H5, H6, P };
