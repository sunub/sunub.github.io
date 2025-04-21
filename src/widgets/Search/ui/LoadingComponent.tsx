"use client";

import React, { memo } from "react";
import styled, { keyframes } from "styled-components";

const LoadingComponent = memo(() => {
  return (
    <Wrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path $duraction={0} d="M12 2v4" />
        <Path $duraction={100} d="m16.2 7.8 2.9-2.9" />
        <Path $duraction={200} d="M18 12h4" />
        <Path $duraction={300} d="m16.2 16.2 2.9 2.9" />
        <Path $duraction={400} d="M12 18v4" />
        <Path $duraction={500} d="m4.9 19.1 2.9-2.9" />
        <Path $duraction={600} d="M2 12h4" />
        <Path $duraction={700} d="m4.9 4.9 2.9 2.9" />
      </svg>
      <Span $delay={100}>로</Span>
      <Span $delay={200}>딩</Span>
      <Span $delay={300}>중</Span>
      <Span $delay={400}>.</Span>
      <Span $delay={500}>.</Span>
      <Span $delay={600}>.</Span>
    </Wrapper>
  );
});

const loadingAnimation = keyframes`
  0%, 100% {
    transform: scaleY(1);
    opacity: 1;
  }
  50% {
    transform: scaleY(.85);
    opacity: 0.45;
  }
`;

const waveMotion = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
`;

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  padding-left: 2rem;
`;

const Path = styled.path<{ $duraction: number }>`
  fill: var(--color-text);
  animation: ${loadingAnimation} 1s linear infinite;
  animation-delay: ${(props) => props.$duraction}ms;
  transform-origin: center;
`;

const Span = styled.span<{ $delay?: number }>`
  display: inline-block;
  animation: ${waveMotion} 1s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}ms;
`;
export { LoadingComponent };
