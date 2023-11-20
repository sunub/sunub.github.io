"use client";

import React from "react";
import styled from "styled-components";
import Card from "../Card/index";

const Wrapper = styled.div`
  grid-area: main-card-list;

  display: grid;
  flex-direction: row;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  justify-items: center;

  gap: 3rem 1rem;
  padding-top: 32px;

  margin-left: auto;
  margin-right: auto;

  width: 100%;

  position: relative;
  overflow-wrap: break-word;
`;

function CardList({ list }) {
  return (
    <Wrapper>
      {list.map((frontMatter) => (
        <Card key={frontMatter.slug} frontMatter={frontMatter} />
      ))}
    </Wrapper>
  );
}

export default CardList;
