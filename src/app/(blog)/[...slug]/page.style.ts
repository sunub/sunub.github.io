"use client";

import styled from "styled-components";

export const Main = styled.main`
  background: var(--color-frontWave);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  width: 100%;

  text-align: center;
  word-break: break-all;

  padding-top: 5rem;
  padding-bottom: 5rem;
  margin-left: auto;
  margin-right: auto;

  & > h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 2rem;
    text-wrap: pretty;
  }
`;

export const Article = styled.article`
  max-width: 800px;

  line-height: calc(1.5rem + 0.8rem);

  & > :is(:first-child) {
    margin-top: 3rem;
  }

  & > h2 {
    font-size: calc(1rem + 0.8rem);
  }

  & > :is(h2, h3, h4, h5, h6) {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  & > :is(p) {
    font-size: calc(1rem + 0.2rem);
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;

    & > code {
      font-family: Wotfard !important;
      font-weight: 700;
      background-color: color-mix(
        in oklch,
        var(--color-navlink),
        transparent 40%
      );
      padding: 0.25rem 0.5rem;
      margin: 0 0.3rem;
      border-radius: 0.25rem;
    }
  }
`;
