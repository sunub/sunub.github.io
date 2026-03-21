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
}: {
	cards: FreshChroniclesCardData[];
	title: string;
	eyebrow: string;
}) {
	if (cards.length === 0) {
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
			</CardGrid>
		</SectionRoot>
	);
}
