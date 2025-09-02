'use client';

import styled from 'styled-components';

export const ArticleHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 100cqw;

  text-align: center;
  word-break: break-all;

  margin-left: auto;
  margin-right: auto;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

export const PostTitle = styled.h1`
  font-weight: 900;
  font-size: 3rem;
  line-height: 3.5rem;
  margin-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  text-wrap: pretty;
`;

export const ArticleWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  gap: 2.25rem;
`;

export const Article = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 100%;

  max-width: 850px;
  font-size: 18px;
  line-height: calc(1.7rem + 0.8rem);
`;

export const ContentBlink = styled.div<{ $width: string }>`
  display: inline-block;
  width: ${props => props.$width};
  height: 1.5rem;
  background-color: color-mix(in oklch, var(--color-text) 20%, transparent);
  border-radius: 0.25rem;
  animation: blink 1.75s ease-in-out infinite;
  @keyframes blink {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.2;
    }
  }
`;
