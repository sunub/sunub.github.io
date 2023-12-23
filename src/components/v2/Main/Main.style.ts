"use client";

import styled from "styled-components";

export const Wrapper = styled.main`
  display: grid;
  grid-template:
    "newest categories"
    "newest _" 1fr / 2fr 1fr;
`;

export const NewestWrapper = styled.div`
  grid-area: newest;
`;

export const CategoriesWrapper = styled.div`
  grid-area: categories;
`;
