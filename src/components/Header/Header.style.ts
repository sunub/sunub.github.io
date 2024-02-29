'use client';

import styled from 'styled-components';

export const RootWrapper = styled.div<{ $isBlur: boolean }>`
  transition: all 350ms ease 0s;
  background: var(--color-headerBackground);
`;

export const DemoWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 812px;
  background: var(--color-landscape);
  z-index: -1;
`;

export const HeaderWrapper = styled.div`
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
  position: relative;
  font-size: 24px;
  color: var(--color-navlink);
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
