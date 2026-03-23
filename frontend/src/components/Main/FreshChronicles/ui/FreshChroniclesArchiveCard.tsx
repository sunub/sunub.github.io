import { ArrowRight } from "lucide-react";
import { getArchiveCardDescription } from "@/server/posts";
import { ARCHIVE_TOP_HREF } from "@/shared/utils/archiveRoute";
import {
	ArchiveCardAction,
	ArchiveCardDescription,
	ArchiveCardIconFrame,
	ArchiveCardInner,
	ArchiveCardLink,
	ArchiveCardOverlay,
	ArchiveCardTitle,
} from "../style";

const FALLBACK_DESCRIPTION =
	"아카이브의 모든 글을 한곳에서 이어서 탐험해보세요.";

export async function FreshChroniclesArchiveCard({
	href = ARCHIVE_TOP_HREF,
	title = "더 많은 글 보기",
	description,
	actionLabel = "아카이브 바로가기",
}: {
	href?: string;
	title?: string;
	description?: string;
	actionLabel?: string;
}) {
	const resolvedDescription =
		description ??
		(await getArchiveCardDescription().catch(() => FALLBACK_DESCRIPTION));

	return (
		<ArchiveCardLink
			href={href}
			aria-label={`${title} - ${actionLabel}`}
			data-testid="fresh-chronicles-archive-card"
		>
			<ArchiveCardOverlay aria-hidden="true" />
			<ArchiveCardInner>
				<ArchiveCardIconFrame aria-hidden="true">
					<ArrowRight size={40} strokeWidth={2.4} />
				</ArchiveCardIconFrame>
				<ArchiveCardTitle>{title}</ArchiveCardTitle>
				<ArchiveCardDescription>{resolvedDescription}</ArchiveCardDescription>
				<ArchiveCardAction>
					{actionLabel}
					<ArrowRight size={16} strokeWidth={2.2} />
				</ArchiveCardAction>
			</ArchiveCardInner>
		</ArchiveCardLink>
	);
}
