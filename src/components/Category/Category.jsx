"use client";

import React from "react";
import Card from "../LandingPage/Card";
import styled from "styled-components";

const Wrapper = styled.div`
	grid-area: main-content;
`;

function Category({ title, categories }) {
	return (
		<>
			<Wrapper>
				<h1>{title}</h1>
				<div>
					{categories &&
						categories.map((frontMatter) => (
							<Card
								key={React.useId()}
								frontMatter={frontMatter}
							/>
						))}
				</div>
			</Wrapper>
		</>
	);
}

export default Category;
