"use client";

import { motion } from "motion/react";
import styled from "styled-components";

export const TitleDot = styled.span`
  content: '';
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

export const DateCompo = styled.time`
  color: var(--color-text);
`;

export const BlogPostTitle = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
`;

export const BlogPostContent = styled.p`
  margin-top: 16px;
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

export const BlogPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: transform 250ms cubic-bezier(0.5, 1.25, 0.75, 1.25);

  &:hover {
    transform: scale(1.05) translateX(-2px) translateZ(16px);

    ${UnderLineWavePath} {
      stroke-dashoffset: 0;
      transition-timing-function: cubic-bezier(0.8, 1, 0.7, 1);
      transition-duration: 200ms;
      stroke: var(--color-highlight);
    }

    ${TitleDot} {
      content: '';
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

export const BlogPostList = styled.ul`
  padding-left: 1rem;
  overflow-anchor: none;
`;

export const BlogPostListItem = styled(motion.li)<{ $isInitialize?: boolean }>`
  width: fit-content;
  text-wrap: pretty;
  word-break: keep-all;

  opacity: ${(props) => (props.$isInitialize ? 0 : 1)};
  transform: ${(props) => (props.$isInitialize ? "translateY(-10px)" : "translateY(0)")};
  will-change: transform, opacity;
  font-family: var(--pretendard-font-regular);

  &:not(:first-of-type) {
    margin-top: 2rem;
  }
`;

export const Footer = styled.footer`
  padding-top: 1rem;
`;
