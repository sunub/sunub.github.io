"use client";

import styled from "styled-components";
import Link from "next/link";
import { ListItemStyles } from "@/shared/style/List";

// SearchInput 스타일
export const SearchOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100cqw;
  height: 100cqh;
  background-color: color-mix(in oklch, var(--color-background), transparent);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

export const SearchContainer = styled.div`
  position: absolute;
  top: calc(50cqh - 25cqh);
  left: calc(50cqw - 35cqw);
  width: 70cqw;
  max-height: 60cqh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: var(--color-background);
  border-radius: 0.5rem;
  box-shadow: var(--shadow-elevation-high);
  padding: 16px 32px;
`;

// SearchHeader 스타일
export const ContentHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 16px;
  border: none;
  outline: none;
`;

export const ClearIconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text);

  &:hover {
    color: var(--color-highlight);
  }
`;

// UnderLineWaveIcon 스타일
export const UnderLineWaveSVG = styled.svg`
  width: 100%;
  position: absolute;
  top: 3.4rem;
  stroke: var(--color-text);
  stroke-width: 2.5;
  stroke-linecap: round;
`;

export const UnderLineWavePath = styled.path<{ $delay: number }>`
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1);
  stroke-dashoffset: 0;
  transition-timing-function: cubic-bezier(0.8, 1, 0.7, 1);
  transition-duration: 350ms;
  stroke: color-mix(in oklch, var(--color-text), transparent);
`;

// SearchResults 스타일
export const ResultsList = styled.ul`
  width: 100%;
  max-height: 60cqh;
  overflow-y: auto;
  padding: 16px 0;
  margin: 16px 0 0;
  list-style: none;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: 1rem;
`;

export const ResultItem = styled.li`
  ${ListItemStyles}
  padding-left: 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-in-out;
`;

export const ResultLink = styled(Link)`
  display: block;
  width: 100%;
`;

export const ResultTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  padding: 0;

  ${ResultItem}:hover & {
    color: var(--color-highlight);
  }
`;

export const ResultDescription = styled.p`
  font-size: 0.875rem;
  color: color-mix(in oklch, var(--color-text), transparent);
`;
