"use client";

import { useCallback, useRef } from "react";
import styled from "styled-components";

interface CardGridProps {
	children: React.ReactNode;
}

export function CardGrid({ children }: CardGridProps) {
	const gridRef = useRef<HTMLDivElement>(null);

	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		const card = target.closest("[data-card-root]") as HTMLDivElement;

		if (!card) return;

		const smallCard = card.querySelector<HTMLDivElement>(".small-card");
		if (!smallCard) return;

		const { left, top } = card.getBoundingClientRect();
		const x = e.clientX - left;
		const y = e.clientY - top;

		requestAnimationFrame(() => {
			smallCard.style.setProperty("--mx", `${x}px`);
			smallCard.style.setProperty("--my", `${y}px`);
		});
	}, []);

	const handleMouseLeave = useCallback(
		(e: React.MouseEvent<HTMLDivElement>) => {
			const target = e.target as HTMLElement;
			const card = target.closest("[data-card-root]") as HTMLDivElement;

			if (!card) return;

			const smallCard = card.querySelector<HTMLDivElement>(".small-card");
			if (!smallCard) {
				return;
			}

			requestAnimationFrame(() => {
				smallCard.style.setProperty("--mx", "85px");
				smallCard.style.setProperty("--my", "108px");
			});
		},
		[],
	);

	return (
		<GridContainer
			ref={gridRef}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</GridContainer>
	);
}

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
	gap: 2rem;
	width: 100%;
	padding: 1rem;

	will-change: transform;
	@media (max-width: 768px) {
		grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
		gap: 1rem;
	}
`;
