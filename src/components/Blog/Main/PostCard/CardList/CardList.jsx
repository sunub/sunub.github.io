import React from "react";
import styled from "styled-components";
import Content from "./Content";
import Elevation from "@/constants/Elevation";
import { chunkArray, range } from "@/utils/utils";

const Wrapper = styled.li`
	position: relative;
	width: fit-content;
	transform-origin: center top;

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
			{chunkedPost.map((row) => (
				<ul key={crypto.randomUUID()}>
					{row.map(
						({ category, date, summary, slug, title, tags }) => {
							<Wrapper key={`${tags}${crypto.randomUUID()}`}>
								<article>
									<Content
										category={category}
										tags={tags}
										date={date}
										summary={summary}
										title={title}
										slug={slug}
									/>
								</article>
							</Wrapper>;
						}
					)}
				</ul>
			))}
		</>
	);
}
