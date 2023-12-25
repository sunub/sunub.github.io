"use client";

import styled from "styled-components";

export const Wrapper = styled.main`
  display: grid;
  position: relative;
  grid-template:
    "newest categories"
    "newest tags" 1fr / 2fr 1fr;

  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;

  gap: 64px 96px;
`;

export const RightSideWrapper = styled.div`
  position: sticky;
  top: 4rem;
  left: 0;
`;
