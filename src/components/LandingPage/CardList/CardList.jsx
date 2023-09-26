"use client";

import React from "react";
import styled from "styled-components";
import Card from "../Card/index";

const Wrapper = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: ${(props) => props.$division};
	gap: 1rem;

	position: relative;
	overflow-wrap: break-word;
`;

const gapSize = "minmax(min-content ,256px)";
function CardList({ list }) {
	const [boxWidth, setBoxWidth] = React.useState(0);
	const [gap, setGap] = React.useState("");
	const wrapperRef = React.useRef(null);

	React.useEffect(() => {
		const observer = new ResizeObserver((entries) => {
			const [entry] = entries;
			const { width } = entry.contentRect;

			setBoxWidth(width);
		});

		observer.observe(wrapperRef.current);
		return () => observer.disconnect();
	}, []);

	React.useEffect(() => {
		let newGapSize = 3;
		if (boxWidth <= 650) {
			newGapSize = 1;
		} else if (boxWidth < 924 && boxWidth > 648) {
			newGapSize = 2;
		}

		let newGap = gapSize;
		for (let i = 0; i < newGapSize - 1; i++) {
			newGap = newGap.concat(gapSize);
		}

		setGap(newGap);
	}, [boxWidth]);

	return (
		<Wrapper $division={gap} ref={wrapperRef}>
			{list.map((frontMatter) => (
				<Card key={frontMatter.title} frontMatter={frontMatter} />
			))}
		</Wrapper>
	);
}

export default CardList;
