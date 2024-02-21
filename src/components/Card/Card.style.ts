"use client";

import styled from "styled-components";
import Elevation from "@/constants/Elevation";
import Link from "next/link";

export const Wrapper = styled.article`
  ${Elevation(170, 216, 15, "short", "other")}

  transition: box-shadow 300ms ease;
  &:hover {
    box-shadow: var(--long-shadow);
  }
  @media screen and (max-width: 320px) {
    width: 120px;
  }
`;

export const Header = styled.h3`
  grid-area: card-header;

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: var(--size4);
  text-align: left;
  word-break: break-all;
  font-weight: 700;

  & > h3 {
    font-size: calc(1.375rem);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    & > time {
      font-size: calc(0.575rem);
    }
  }
`;

export const Footer = styled.time`
  grid-area: card-footer;

  font-size: 10px;
  word-break: break-all;
  justify-self: center;
`;

export const LinkWrapper = styled(Link)`
  display: grid;
  align-items: center;

  grid:
    [card-icon] 0.2fr
    [card-header] minmax(1ch, 1fr)
    [card-footer] 15px / 1fr;

  height: 100%;
  padding: 1rem;

  transition: background 350ms ease 0s;
  cursor: pointer;
  touch-action: manipulation;
`;

export const IconWrapper = styled.div`
  grid-area: card-icon;
  display: flex;
`;
