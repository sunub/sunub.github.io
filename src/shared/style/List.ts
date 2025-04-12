"use client";

import styled, { css } from "styled-components";

export const ListIndicator = styled.span`
  content: "";
  display: inline-block;
  position: absolute;
  background: var(--color-text);

  top: calc(1rem - 10px);
  left: calc(-1.25px);

  width: 2px;
  height: 16px;
  border-radius: 4px;

  transition: all 250ms cubic-bezier(0.19, -0.49, 0.64, 1.48);
`;

export const ListItemStyles = css`
  display: flex;
  position: relative;

  flex-direction: column;
  text-decoration: none;
  transition: all 250ms cubic-bezier(0.5, 1.25, 0.75, 1.25);

  &:hover {
    ${ListIndicator} {
      content: "";
      display: inline-block;
      position: absolute;
      background: var(--color-highlight);
      width: 16px;
      height: 16px;
      border-radius: 4px;
    }
  }
`;
