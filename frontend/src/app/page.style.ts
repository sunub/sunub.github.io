"use client";

import styled from "styled-components";

export const HeaderContentsWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;

  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;

  gap: 1rem 96px;
  padding-left: 48px;
  padding-right: 48px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
`;
