"use client";

import styled from "styled-components";

export function PostCardSkeleton() {
	return <SmallCard />;
}

const RootContainer = styled.div`
	position: relative;
	width: 170px;
	height: 216px;

	&[data-visible="false"] {
		opacity: 0.5;
	}

	&[data-visible="true"] {
		opacity: 1;
		transition: opacity 0.3s ease;
	}
`;

const SmallCard = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 170px;
	height: 216px;
	border-radius: 1rem;
	z-index: 1;

	background-image: radial-gradient(
300px circle at var(--mx, 85px) var(--my, 108px),
var(--color-background),
color-mix(in oklch, var(--color-bird) 40%, transparent 30%)
);

	opacity: 0.5;
	transition: opacity 0.2s ease;

	${RootContainer}:hover & {
		opacity: 1;
	}
`;
