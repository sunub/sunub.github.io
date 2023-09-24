"use client";

import React from "react";
import styled from "styled-components";
import Card from "../Card/index";

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	width: 100%;
	position: relative;
	gap: 2rem;

	overflow-wrap: break-word;
	white-space: normal;
`;

function CardList({ list }) {
	return list.map((posts, i) => (
		<Wrapper key={i}>
			{posts.map((frontMatter) => (
				<Card key={frontMatter.title} frontMatter={frontMatter} />
			))}
		</Wrapper>
	));
}

export default CardList;
