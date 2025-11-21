"use client";

import Link from "next/link";
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

export const NavigationWrapper = styled.nav`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  padding: 3rem 0;
  height: 100cqh;

  @media screen and (min-width: 768px) {
    padding-left: 3rem;
  }

  @media screen and (max-width: 425px) {
    padding-left: 1rem;
  }
`;

export const Backdrop = styled.button<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: calc(100% + 0px);
  padding-left: 3rem;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
  user-select: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  z-index: ${({ $isOpen }) => ($isOpen ? 999 : -1)};
`;

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  z-index: 1000;
  position: relative;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transform: ${({ $isOpen }) => ($isOpen ? "translateX(0)" : "translateX(-100%)")};
  transition: transform ${({ $isOpen }) => ($isOpen ? "600ms" : "100ms")} ease-in-out;
`;

export const ListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.5dvh, 2rem);

  font-size: 1.5rem;
  font-weight: 400;
`;

export const List = styled.li`
  width: fit-content;
  color: color-mix(in oklch, var(--color-text), var(--color-bird) 30%);
`;

export const Item = styled(Link)``;

export const ThemeWrapper = styled.div`
  position: fixed;
  bottom: 56px;
  left: 56px;
  z-index: 1000;
`;
