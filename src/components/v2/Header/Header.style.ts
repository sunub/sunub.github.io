"use client";

import styled from "styled-components";

export const RootWrapper = styled.div`
  width: 100%;
  height: 60px;
  max-width: 1100px;
  max-height: 60px;

  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
  z-index: 1000;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const LogoAndNavWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

export const NavigationWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    display: none;
    opacity: 0;
  }
`;

export const NavigationItem = styled.li`
  font-size: 24px;
  font-weight: 400;
  line-height: normal;
  color: var(--color-navlink);
  cursor: pointer;
`;

export const PostNaviation = styled.div`
  display: flex;
  align-items: baseline;
`;

export const ThemeWrapper = styled.div`
  display: grid;
  place-items: center;

  @media screen and (max-width: 768px) {
    display: none;
    opacity: 0;
  }
`;
