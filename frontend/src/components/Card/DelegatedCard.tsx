"use client";

import type { FrontMatter } from "db/blog/Schema";
import Link from "next/link";
import { useMemo } from "react";
import styled from "styled-components";
import Elevation from "@/constants/Elevation";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function DelegatedCard({
	frontMatter,
}: {
	frontMatter: FrontMatter;
}) {
	const { title, date, slug, category } = frontMatter;

	const [cardRef, isVisible] = useIntersectionObserver<HTMLDivElement>({
		rootMargin: "100px",
		threshold: 0,
		triggerOnce: true,
	});

	const formattedDate = useMemo(() => {
		return new Intl.DateTimeFormat("ko-kr", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(new Date(date));
	}, [date]);

	if (!frontMatter) {
		return null;
	}

	return (
		<RootContainer
			ref={cardRef}
			data-card-root
			data-visible={isVisible}
		>
			<Wrapper className="cards">
				<LinkWrapper
					className="card"
					href={`/post/${category}/${slug}`}
					tabIndex={0}
					prefetch={false}
				>
					<Header>{title}</Header>
					<Footer>{formattedDate}</Footer>
				</LinkWrapper>
			</Wrapper>
			{isVisible && <SmallCard className="small-card" />}
		</RootContainer>
	);
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
	${Elevation(170, 216, 15, "short", "other")}
	position: relative;
	z-index: 2;
	box-shadow: 0 8px 32px rgba(0, 0, 0, 0.17);
	backdrop-filter: blur(10px);
	padding: 2px;
	background: rgba(255, 255, 255, 0.15);
	transition: box-shadow 300ms ease;

	&:hover {
		box-shadow: var(--long-shadow);
		outline: 4px solid color-mix(in oklch, var(--color-bird) 15%, transparent);
	}
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

	@media (max-width: 768px) {
		flex-direction: column;
		& > time {
			font-size: 0.575rem;
		}
	}
`;

const Footer = styled.time`
	grid-area: card-footer;
	font-size: 10px;
	word-break: break-all;
	justify-self: center;
`;

const LinkWrapper = styled(Link)`
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
