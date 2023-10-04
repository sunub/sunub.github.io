"use client";

import React from "react";
import styled from "styled-components";
import Card from "../Card/index";
import { Spacer } from "@/constants/Spacer";

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	/* grid-template-columns: ${(props) => props.$division}; */
	justify-content: center;
	gap: 1rem;

	position: relative;
	overflow-wrap: break-word;
`;

const gapSize = "minmax(min-content ,256px)";
function CardList({ list }) {
	const [boxWidth, setBoxWidth] = React.useState(0);
	const [gap, setGap] = React.useState("");

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

	React.useEffect(() => {
		let newGap = `${gapSize} ${gapSize} ${gapSize}`;
		if (boxWidth <= 630) {
			newGap = `${gapSize}`;
		} else if (boxWidth <= 936) {
			newGap = `${gapSize} ${gapSize}`;
		}
		setGap(newGap);
	}, [boxWidth]);

	return (
		<>
			<Wrapper $division={gap}>
				{list.map((frontMatter) => (
					<Card key={frontMatter.title} frontMatter={frontMatter} />
				))}
			</Wrapper>
		</>
	);
}

export default CardList;
