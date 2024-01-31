"use client";

import styled from "styled-components";

export const LinkSVG = styled.svg`
  position: absolute;
  left: -40px;
  opacity: 0;
  transition: all 350ms cubic-bezier(0, 1.01, 0.25, 1);
`;

export const LinkAnchor = styled.a`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: none;
  outline-offset: 4px;

  &:hover {
    ${LinkSVG} {
      opacity: 1;
    }
  }
`;
