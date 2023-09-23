"use client";

import React from "react";
import styled from "styled-components";
import Card from "../Card/index";

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
	position: relative;
	gap: 2rem;

	overflow-wrap: break-word;
	white-space: normal;
`;

function CardList({ list }) {
	const listId = React.useId();
	const postId = React.useId();

	return list.map((posts) => (
		<Wrapper key={listId}>
			{posts.map((frontMatter) => (
				<Card key={postId} frontMatter={frontMatter} />
			))}
		</Wrapper>
	));
}

export default CardList;
