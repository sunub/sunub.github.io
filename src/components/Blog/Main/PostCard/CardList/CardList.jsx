"use client";

import React from "react";
import styled from "styled-components";
import Content from "./Content";
import Elevation from "@/constants/Elevation";
import { chunkArray, range } from "@/utils/utils";

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	width: 100%;
	position: relative;

	overflow-wrap: break-word;
	white-space: normal;
`;

function resize() {
	const root = document.getElementById("side-ng__main-content");
	const clientWidth = root.clientWidth;
}

export default function CardList({ post }) {
	const chunkedPost = chunkArray([...post], 3);
	return (
		<>
			{chunkedPost.map((row) => {
				return (
					<Wrapper key={crypto.randomUUID()}>
						{row.map(
							({
								category,
								date,
								summary,
								slug,
								title,
								tags,
							}) => {
								return (
									<Content
										key={crypto.randomUUID()}
										category={category}
										date={date}
										summary={summary}
										slug={slug}
										title={title}
										tags={tags}
									/>
								);
							}
						)}
					</Wrapper>
				);
			})}
		</>
	);
}
