"use client";

import styled from "styled-components";

export const RootWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
`;

export const Wrapper = styled.header`
  height: 60px;
  max-height: 60px;
  display: flex;
  align-items: center;

  padding-left: 2rem;
  padding-right: 2rem;
`;

export const NavigationWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const NavigationItem = styled.li`
  list-style: none;
  font-size: 32px;
  font-weight: 400;
  line-height: normal;
  color: #733b33;
  cursor: pointer;
`;
