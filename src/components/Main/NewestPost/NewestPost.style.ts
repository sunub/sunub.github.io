"use client";

import styled from "styled-components";

export const RootWrapper = styled.div`
  grid-area: newest;
  font-family: var(--bariol-serif), var(--nanum-square-neo), serif;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
`;
