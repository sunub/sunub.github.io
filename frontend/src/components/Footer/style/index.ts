"use client";

import styled from "styled-components";

export const Container = styled.footer`
  display: flex;
  flex-direction: row;

  background: var(--color-frontWave);
  transition: background 350ms ease 0s;

  align-items: flex-end;
  justify-content: flex-end;

  padding-left: 32px;
  padding-right: 32px;

  padding-top: 64px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--color-text);
  gap: 1rem;

  padding-top: 32px;
  padding-bottom: 32px;
`;

export const CopyRightWrapper = styled.div``;

export const CopyRight = styled.span`
  line-height: 16px;
`;

export const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;
