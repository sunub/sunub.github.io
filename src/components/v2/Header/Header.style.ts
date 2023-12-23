"use client";

import styled from "styled-components";

export const RootWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  height: 60px;
  max-height: 60px;

  margin-left: auto;
  margin-right: auto;
`;

export const Wrapper = styled.header`
  display: flex;
  align-items: baseline;
`;

export const NavigationWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const NavigationItem = styled.li`
  list-style: none;
  font-size: 24px;
  font-weight: 400;
  line-height: normal;
  color: #733b33;
  cursor: pointer;
`;

export const PostNaviation = styled.div`
  display: flex;
  align-items: baseline;
`;

export const PostNavBtn = styled.button``;
