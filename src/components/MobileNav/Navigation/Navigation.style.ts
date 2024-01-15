"use client";

import Link from "next/link";
import styled from "styled-components";

export const RootWrapper = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const NavigationWrapper = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  padding-bottom: 3rem;
  padding-top: 6rem;
  height: calc(100% + 0px);

  @media screen and (min-width: 768px) {
    padding-left: 3rem;
  }

  @media screen and (max-width: 425px) {
    padding-left: 1rem;
  }
`;

export const Wrapper = styled.div`
  z-index: 1000;
  position: relative;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.5dvh, 2rem);

  font-size: 32px;
  font-weight: 700;
`;

export const List = styled.li`
  width: fit-content;
  color: var(--color-text);
`;

export const Item = styled(Link)``;

export const ThemeWrapper = styled.div`
  position: fixed;
  bottom: 56px;
  left: 56px;
`;

export const Backdrop = styled.button`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: calc(100% + 0px);
  padding-left: 3rem;

  background: color-mix(in oklch, var(--color-bakcgruond) 30%, transparent);
  backdrop-filter: blur(8px);
`;
