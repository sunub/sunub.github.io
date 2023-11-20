"use client";

import React from "react";
import styled from "styled-components";
import Card from "../Card/index";

const Wrapper = styled.div`
  grid-area: main-card-list;

  width: 100%;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;

  justify-content: center;
  padding-top: 32px;

  position: relative;
  overflow-wrap: break-word;
`;

function CardList({ list }) {
  const [boxWidth, setBoxWidth] = React.useState(0);
  const [gap, setGap] = React.useState(4);

  // React.useEffect(() => {
  // 	const root = document.getElementById("__next");
  // 	const observer = new ResizeObserver((entries) => {
  // 		const [entry] = entries;
  // 		const { width } = entry.contentRect;

  // 		setBoxWidth(() => {
  // 			const newWidth = width;
  // 			return newWidth;
  // 		});
  // 	});

  // 	observer.observe(root);
  // 	return () => observer.disconnect();
  // }, []);

  // React.useEffect(() => {
  // 	if(boxWidth >= 975 && gap !== 4) {
  // 		setGap(() => 4);
  // 	} else if(boxWidth < 975 && boxWidth > 605 && boxWidth && gap !== 3) {
  // 		setGap(() => 3);
  // 	} else if(boxWidth <= 605 && boxWidth > 425 && boxWidth && gap !== 2) {
  // 		setGap(() => 2);
  // 	} else if(boxWidth <= 425 && boxWidth >= 320 && gap !== 1) {
  // 		setGap(() => 1);
  // 	}
  // }, [boxWidth, gap])

  return (
    <Wrapper>
      {list.map((frontMatter) => (
        <Card key={frontMatter.slug} frontMatter={frontMatter} />
      ))}
    </Wrapper>
  );
}

export default CardList;
