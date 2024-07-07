"use client";

import styled from "styled-components";

export const Article = styled.article`
  max-width: 700px;
  line-height: calc(1.7rem + 0.8rem);
  & > pre {
    background: var(--color-codeBlock);
    font-size: calc(0.9rem + 0.025rem);
    border-radius: 0.75rem;
    border: 1px solid
      color-mix(in oklch, var(--color-text), var(--color-primary) 90%);

    padding-top: 1.75rem;
    padding-bottom: 1.75rem;
    padding-left: 2.75rem;
    padding-right: 2.75rem;

    margin-top: 2rem;
    margin-bottom: 2rem;

    word-break: keep-all;

    overflow-x: auto;
    scrollbar-width: none;
    font-weight: 900;
  }

  & > :is(:first-child) {
    margin-top: 3rem;
  }

  & > h2 {
    color: var(--color-title);
    font-size: calc(1rem + 0.8rem);
    font-weight: 900;
  }

  & > h3 {
    font-size: calc(1rem + 0.35rem);
    font-weight: 400;
  }

  & > :is(h2, h3, h4, h5, h6) {
    margin-top: 3.5rem;
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
      --border-color: color-mix(
        in oklch,
        var(--color-frontWave),
        var(--color-codeBlock)
      );
      font-family: var(--nanum-square-neo) !important;
      font-weight: 700;
      background-color: var(--color-codeBlock);
      padding: 0.15rem 0.35rem;
      margin: 0 0.25rem;
      border-radius: 0.25rem;
      border: 1px solid
        color-mix(in oklch, var(--color-text), var(--color-primary) 90%);
    }
  }
`;
