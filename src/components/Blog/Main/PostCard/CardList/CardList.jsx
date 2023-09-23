"use client";

import React from "react";
import styled from "styled-components";
import Content from "./Content";
import { chunkArray } from "@/utils/utils";

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

function resize() {
	const root = document.getElementById("side-ng__main-content");
	const clientWidth = root.clientWidth;
}

export default function CardList({ post }) {
	const id = React.useId();
	const chunkedPost = chunkArray([...post], 3);
	return (
		<>
			{chunkedPost.map((row) => {
				return (
					<Wrapper key={crypto.randomUUID()}>
						{row.map((frontMatter) => {
							return (
								<Content key={id} frontMatter={frontMatter} />
							);
						})}
					</Wrapper>
				);
			})}
		</>
	);
}
