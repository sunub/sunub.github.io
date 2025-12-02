'use client';

import styled from "styled-components";

export function PostCardSkeleton() {
  return <SmallCard />
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

const Wrapper = styled.div`
	position: relative;
	z-index: 2;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.17);
	backdrop-filter: blur(10px);
	padding: 2px;
	background: rgba(255, 255, 255, 0.15);
`;

const Header = styled.h3`
	grid-area: card-header;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: var(--size4);
	text-align: left;
	word-break: break-all;
	font-weight: 700;

	& > h3 {
		font-size: 1.375rem;
	}
`;

const Footer = styled.time`
	grid-area: card-footer;
	font-size: 10px;
	word-break: break-all;
	justify-self: center;
`;

const LinkWrapper = styled.div`
	display: grid;
	align-items: center;
	grid:
		[card-icon] 0.2fr
		[card-header] minmax(1ch, 1fr)
		[card-footer] 15px / 1fr;
	height: 100%;
	padding: 1rem;
	transition: background 350ms ease;
	cursor: pointer;
	touch-action: manipulation;
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
