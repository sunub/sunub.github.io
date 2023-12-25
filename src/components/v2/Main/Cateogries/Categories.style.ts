"use client";

import Link from "next/link";
import styled from "styled-components";

export const RootWrapper = styled.div`
  grid-area: categories;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
`;

export const CategoryListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
  gap: 1rem;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const Item = styled(Link)`
  display: inline-flex;
  padding: 10px 16px 10px 16px;
  font-weight: 600;
  border-radius: 18px;
  background-color: var(--color-primary);
  box-shadow:
    0px 1px 3px 1px rgba(0, 0, 0, 0.15),
    0px 1px 2px 0px rgba(0, 0, 0, 0.3);
`;
