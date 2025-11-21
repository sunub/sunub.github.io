"use client";

import styled from "styled-components";

export const Wrapper = styled.div`
  grid-area: tags;
  margin-top: 64px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  user-select: none;
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  gap: 1rem;
`;

export const Tag = styled.span`
  display: inline-flex;
  font-weight: 600;
  padding: 10px 16px 10px 16px;
  border-radius: 18px;
  background-color: var(--color-primary);
  /* box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.3); */
  user-select: none;
`;
