"use client";

import styled from "styled-components";

export const Section = styled.section``;

export const Title = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  font-size: 4rem;

  margin-top: 64px;
  margin-bottom: 48px;
  margin-left: auto;
  margin-right: auto;
  color: var(--color-text);
`;

export const Background = styled.div`
  background-color: var(--color-frontWave);
`;

export const Wrapper = styled.div`
  display: grid;
  flex-direction: row;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  justify-items: center;

  gap: 3rem 1rem;
  padding-top: 32px;

  margin-left: auto;
  margin-right: auto;

  width: 100%;
  max-width: 1000px;

  position: relative;
  overflow-wrap: break-word;

  @media screen and (max-width: 320px) {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  }
`;

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
    font-size: calc(1rem + 0.8rem);
  }

  & > :is(h2, h3, h4, h5, h6) {
    color: var(--color-title);
    font-weight: 800;
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
    & > span {
      color: var(--color-title);
    }
  }

  & > :is(p) {
    font-size: calc(1rem + 0.2rem);
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;

    & > code {
      --border-color: color-mix(
        in oklch,
        var(--color-bird),
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

export const LinkSVG = styled.svg`
  position: absolute;
  left: -40px;
  opacity: 0;
  transition: all 350ms cubic-bezier(0, 1.01, 0.25, 1);
`;

export const LinkAnchor = styled.a`
  display: inline-flex;
  position: relative;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: none;
  outline-offset: 4px;

  &:hover {
    ${LinkSVG} {
      opacity: 1;
    }
  }
`;
