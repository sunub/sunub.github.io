"use client";

import React from "react";
import styled from "styled-components";
import Card from "../Card/index";

const Wrapper = styled.div`
	grid-area: main-card-list;

	width: 100%;
	display: grid;
	flex-direction: row;
	grid-template-columns: repeat(
		${(props) => props.$division},
		minmax(min-content, 5px)
	);
	justify-content: center;
	gap: 1rem;
	padding-top: 32px;

	position: relative;
	overflow-wrap: break-word;
`;

function CardList({ list }) {
	const [boxWidth, setBoxWidth] = React.useState(0);
	const [gap, setGap] = React.useState(4);

	React.useEffect(() => {
		const root = document.getElementById("__next");
		const observer = new ResizeObserver((entries) => {
			const [entry] = entries;
			const { width } = entry.contentRect;

			setBoxWidth(width);
		});

		observer.observe(root);
		return () => observer.disconnect();
	}, []);

	return (
		<Wrapper $division={gap}>
			{list.map((frontMatter) => (
				<Card key={frontMatter.title} frontMatter={frontMatter} />
			))}
		</Wrapper>
	);
}

export default CardList;
