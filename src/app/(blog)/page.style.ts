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
