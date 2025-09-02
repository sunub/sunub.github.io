'use client';

import styled, { keyframes } from 'styled-components';

const slideInAnimation = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Main = styled.main`
  background-color: var(--color-background);
  font-weight: 300;
`;

export const ArticleRootWrapper = styled.div`
  max-width: 45rem;
  width: 100cqw;

  margin-left: auto;
  margin-right: auto;
`;

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
  font-size: 2.5rem;
  line-height: 3.5rem;
  margin-bottom: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;
  text-wrap: pretty;

  animation: ${slideInAnimation} 0.5s ease-out forwards;
  will-change: transform, opacity;
`;

export const Time = styled.time`
  animation: ${slideInAnimation} 0.5s ease-out forwards;
  will-change: transform, opacity;
`;

export const ArticleWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  gap: 2.25rem;
`;

export const Article = styled.article`
  width: 100%;
  height: 100%;

  max-width: 850px;
  font-size: 18px;
  line-height: calc(1.7rem + 0.8rem);

  & > * {
    opacity: 0;
    transform: translateX(-10px);
  }
  & > pre {
    background: var(--color-codeBlock);
    font-size: calc(0.9rem + 0.025rem);
    border-radius: 0.75rem;
    border: 1px solid color-mix(in oklch, var(--color-text), var(--color-primary) 90%);

    padding-top: 1.75rem;
    padding-bottom: 1.75rem;
    padding-left: 2.75rem;
    padding-right: 2.75rem;

    margin-top: 2rem;
    margin-bottom: 2rem;

    word-break: keep-all;

    overflow-x: auto;
    scrollbar-width: none;
    font-weight: 500;
  }

  & > :is(:first-child) {
    margin-top: 3rem;
  }

  & > h2 {
    color: var(--color-title);
    font-size: calc(1rem + 0.8rem);
    font-weight: 700;
  }

  & > h3 {
    font-size: calc(1rem + 0.35rem);
    font-weight: 500;
  }

  & > :is(h2, h3, h4, h5, h6) {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    & > span {
      color: var(--color-title);
    }
  }

  & > :is(p) {
    font-size: calc(0.8rem + 0.25rem);
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;

    & > code {
      --border-color: color-mix(in oklch, var(--color-frontWave), var(--color-codeBlock));
      font-weight: 700;
      background-color: var(--color-codeBlock);
      padding: 0.15rem 0.35rem;
      margin: 0 0.25rem;
      border-radius: 0.25rem;
      border: 1px solid color-mix(in oklch, var(--color-text), var(--color-primary) 90%);
    }
  }
`;
