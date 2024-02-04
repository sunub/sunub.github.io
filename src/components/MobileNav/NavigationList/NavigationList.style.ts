"use client";

import styled from "styled-components";
import Link from "next/link";

export const Wrapper = styled.div<{ $isOpen: boolean }>`
  z-index: 1000;
  position: relative;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};

  transition: all 0.3s ease;
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
