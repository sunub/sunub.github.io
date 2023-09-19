import React from "react";
import styled from "styled-components";
import Content from "./Content";

const Wrapper = styled.li`
	position: relative;
	transform-origin: center top;

	overflow-wrap: break-word;
	white-space: normal;
`;

export default function CardList({ post }) {
	return (
		<>
			{post.map(({ category, date, summary, slug, title, tags }) => (
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
				</Wrapper>
			))}
		</>
	);
}
