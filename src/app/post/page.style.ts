"use client";

import styled from "styled-components";

export const TitleDot = styled.span`
  content: "";
  display: inline-block;
  position: absolute;
  left: calc(-1rem - 8px);
  top: calc(1rem - 5px);
  background: var(--color-text);
  width: 2px;
  height: 16px;
  border-radius: 4px;

  transition: all 250ms cubic-bezier(0.19, -0.49, 0.64, 1.48);
`;

export const Title = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const BlogPostTitle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
`;

export const BlogPostIcons = styled.div`
  display: grid;
  place-items: center;
`;

export const BlogPostContent = styled.p`
  margin-top: 16px;
`;

export const BlogTagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  gap: 8px;
`;

export const BlogTag = styled.span`
  display: inline-flex;
  padding: 2px 8px 2px 8px;
  border-radius: 16px;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 600;
  border: 1.35px solid var(--color-text);
  user-select: none;
`;

export const UnderLineWaveSVG = styled.svg`
  position: absolute;
  top: 100%;
  transform: rotate(-1deg);
  stroke: var(--color-text);
  stroke-width: 2.5;
  stroke-linecap: round;
`;

export const UnderLineWavePath = styled.path`
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1);
`;

export const BlogPostWrapper = styled.article`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 250ms cubic-bezier(0.5, 1.25, 0.75, 1.25);

  &:not(:first-of-type) {
    padding-top: 64px;
  }

  &:hover {
    transform: scale(1.05) translateX(-2px) translateZ(16px);

    ${UnderLineWavePath} {
      stroke-dashoffset: 0;
      transition-timing-function: cubic-bezier(0.8, 1, 0.7, 1);
      transition-duration: 200ms;
      stroke: var(--color-highlight);
    }

    ${TitleDot} {
      content: "";
      display: inline-block;
      position: absolute;
      left: calc(-1rem - 12px);
      top: calc(1rem - 5px);
      background: var(--color-highlight);
      width: 16px;
      height: 16px;
      border-radius: 4px;
    }
  }
`;

export const Background = styled.div`
  background-color: var(--color-frontWave);
`;
