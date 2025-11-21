"use client";

import styled from "styled-components";

export const RootContainer = styled.div`
  position: relative;
  padding: 0 2rem;
  background-color: var(--color-background);
`;

export const TitleContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
`;

export const Title = styled.h1`
  font-weight: bold;
  color: color-mix(in oklch, var(--color-bird), var(--color-text) 30%);
  font-size: 2rem;
`;

export const FrontmatterWrapper = styled.div`
  display: grid;
  flex-direction: row;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  justify-items: center;

  gap: 3rem 1rem;
  padding-top: 32px;

  margin-left: auto;
  margin-right: auto;
  padding-bottom: 32px;

  width: 100%;
  max-width: 1000px;

  position: relative;
  overflow-wrap: break-word;

  @media screen and (max-width: 320px) {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 3;
    top: 12px;
    left: 0;
    width: 100%;
    height: 48px;
    background: linear-gradient(
      to top,
      color-mix(in oklch, var(--color-background) 0%, transparent 100%) 0%,
      color-mix(in oklch, var(--color-background) 1%, transparent 99%) 8.1%,
      color-mix(in oklch, var(--color-background) 4.7%, transparent 95.3%) 15.5%,
      color-mix(in oklch, var(--color-background) 10.6%, transparent 89.4%) 22.5%,
      color-mix(in oklch, var(--color-background) 17.6%, transparent 82.4%) 29%,
      color-mix(in oklch, var(--color-background) 26%, transparent 74%) 35.3%,
      color-mix(in oklch, var(--color-background) 35.3%, transparent 64.7%) 41.2%,
      color-mix(in oklch, var(--color-background) 45%, transparent 55%) 47.1%,
      color-mix(in oklch, var(--color-background) 55%, transparent 45%) 52.9%,
      color-mix(in oklch, var(--color-background) 64.7%, transparent 35.3%) 58.8%,
      color-mix(in oklch, var(--color-background) 74%, transparent 26%) 64.7%,
      color-mix(in oklch, var(--color-background) 82.4%, transparent 17.6%) 71%,
      color-mix(in oklch, var(--color-background) 89.4%, transparent 10.6%) 77.5%,
      color-mix(in oklch, var(--color-background) 95.3%, transparent 4.7%) 84.5%,
      color-mix(in oklch, var(--color-background) 99%, transparent 1%) 91.9%,
      var(--color-background) 100%
    );
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 3;
    bottom: 12px;
    width: 100%;
    height: 48px;
    pointer-events: none;
    background: linear-gradient(
      color-mix(in oklch, var(--color-background) 0%, transparent 100%) 0%,
      color-mix(in oklch, var(--color-background) 1%, transparent 99%) 8.1%,
      color-mix(in oklch, var(--color-background) 4.7%, transparent 95.3%) 15.5%,
      color-mix(in oklch, var(--color-background) 10.6%, transparent 89.4%) 22.5%,
      color-mix(in oklch, var(--color-background) 17.6%, transparent 82.4%) 29%,
      color-mix(in oklch, var(--color-background) 26%, transparent 74%) 35.3%,
      color-mix(in oklch, var(--color-background) 35.3%, transparent 64.7%) 41.2%,
      color-mix(in oklch, var(--color-background) 45%, transparent 55%) 47.1%,
      color-mix(in oklch, var(--color-background) 55%, transparent 45%) 52.9%,
      color-mix(in oklch, var(--color-background) 64.7%, transparent 35.3%) 58.8%,
      color-mix(in oklch, var(--color-background) 74%, transparent 26%) 64.7%,
      color-mix(in oklch, var(--color-background) 82.4%, transparent 17.6%) 71%,
      color-mix(in oklch, var(--color-background) 89.4%, transparent 10.6%) 77.5%,
      color-mix(in oklch, var(--color-background) 95.3%, transparent 4.7%) 84.5%,
      color-mix(in oklch, var(--color-background) 99%, transparent 1%) 91.9%,
      var(--color-background) 100%
    );
  }
`;
