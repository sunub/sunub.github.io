import type { ReactNode } from "react";
import {
	CardGrid,
	SectionEyebrow,
	SectionHeader,
	SectionRoot,
	SectionTitle,
} from "../style";
import type { FreshChroniclesCardData } from "../types";
import { FreshChroniclesCard } from "./FreshChroniclesCard";

export function FreshChroniclesGrid({
	cards,
	title,
	eyebrow,
	children,
}: {
	cards: FreshChroniclesCardData[];
	title: string;
	eyebrow: string;
	children?: ReactNode;
}) {
	if (cards.length === 0 && !children) {
		return null;
	}

	return (
		<SectionRoot data-testid="fresh-chronicles-section">
			<SectionHeader>
				<SectionEyebrow>{eyebrow}</SectionEyebrow>
				<SectionTitle>{title}</SectionTitle>
			</SectionHeader>
			<CardGrid data-testid="fresh-chronicles-grid">
				{cards.map((card, index) => (
					<FreshChroniclesCard
						key={`${card.post.category}-${card.post.slug}`}
						card={card}
						index={index}
					/>
				))}
				{children}
			</CardGrid>
		</SectionRoot>
	);
}
