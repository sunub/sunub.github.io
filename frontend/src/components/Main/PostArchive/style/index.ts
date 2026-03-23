import Link from "next/link";
import styled, { css } from "styled-components";

const ARCHIVE_SECTION_MAX_WIDTH = "90rem";
const ARCHIVE_LIST_MAX_WIDTH = "84rem";

export const ArchiveSectionRoot = styled.section`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	width: 100%;
	max-width: ${ARCHIVE_SECTION_MAX_WIDTH};
	margin-inline: auto;
`;

export const ArchiveContentRail = styled.div`
	width: 100%;
	max-width: ${ARCHIVE_LIST_MAX_WIDTH};
	margin-inline: auto;
`;

export const ArchiveSectionHeader = styled.header`
	display: flex;
	flex-direction: column;
	gap: 0.7rem;
`;

export const ArchiveSectionEyebrow = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.75rem;
	font-size: 0.8rem;
	font-weight: 800;
	letter-spacing: 0.16em;
	text-transform: uppercase;
	color: var(--color-highlight);

	&::before {
		content: "";
		width: 2.5rem;
		height: 1px;
		background: color-mix(
			in oklch,
			var(--color-highlight) 36%,
			transparent
		);
	}
`;

export const ArchiveSectionTitle = styled.h2`
	font-size: clamp(2.2rem, 3vw, 3.2rem);
	font-family: var(--bariol-serif), var(--pretendard-font-regular), sans-serif;
	font-weight: 700;
	letter-spacing: -0.04em;
	color: var(--color-text);
`;

export const ArchiveSectionDescription = styled.p`
	max-width: 42rem;
	font-size: 1rem;
	line-height: 1.75;
	color: color-mix(in oklch, var(--color-text) 72%, transparent);
`;

export const ArchiveFilterBar = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.75rem;
`;

export const ArchiveFilterButton = styled.button<{
	$active: boolean;
	$pending?: boolean;
}>`
	display: inline-flex;
	align-items: center;
	gap: 0.55rem;
	padding: 0.78rem 1.1rem;
	border-radius: 999px;
	border: 1px solid
		${({ $active }) =>
			$active
				? "color-mix(in oklch, var(--color-highlight) 28%, transparent)"
				: "color-mix(in oklch, var(--color-text) 12%, transparent)"};
	background: ${({ $active }) =>
		$active
			? "color-mix(in oklch, var(--color-highlight) 16%, white 84%)"
			: "color-mix(in oklch, var(--color-text) 4%, var(--color-background))"};
	color: ${({ $active }) =>
		$active
			? "color-mix(in oklch, var(--color-highlight) 72%, black 28%)"
			: "color-mix(in oklch, var(--color-text) 82%, transparent)"};
	box-shadow: ${({ $active }) =>
		$active ? "var(--shadow-elevation-low)" : "none"};
	opacity: ${({ $pending }) => ($pending ? 0.82 : 1)};
	cursor: pointer;
	transition:
		transform 180ms ease,
		box-shadow 180ms ease,
		border-color 180ms ease,
		background 180ms ease;

	&:hover {
		transform: translateY(-1px);
		box-shadow: var(--shadow-elevation-low);
	}

	html[data-color-theme="dark"] & {
		border-color: ${({ $active }) =>
			$active
				? "color-mix(in oklch, var(--color-highlight) 30%, transparent)"
				: "var(--post-card-border)"};
		background: ${({ $active }) =>
			$active
				? "color-mix(in oklch, var(--color-highlight) 18%, var(--post-card-surface-base) 82%)"
				: "var(--post-card-surface-base)"};
		color: ${({ $active }) =>
			$active
				? "color-mix(in oklch, white 82%, var(--color-highlight) 18%)"
				: "var(--color-text)"};
		box-shadow: ${({ $active }) =>
			$active ? "0 0.9rem 1.8rem rgba(0, 0, 0, 0.28)" : "none"};
	}
`;

export const ArchiveFilterLabel = styled.span`
	font-size: 0.92rem;
	font-weight: 700;
	line-height: 1;
`;

export const ArchiveFilterCount = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 1.7rem;
	height: 1.7rem;
	padding: 0 0.45rem;
	border-radius: 999px;
	background: color-mix(in oklch, var(--color-highlight) 16%, white 84%);
	font-size: 0.76rem;
	font-weight: 800;
	color: color-mix(in oklch, var(--color-highlight) 72%, black 28%);

	html[data-color-theme="dark"] & {
		background: color-mix(
			in oklch,
			var(--color-highlight) 22%,
			var(--post-card-surface-base) 78%
		);
		color: color-mix(in oklch, white 84%, var(--color-highlight) 16%);
	}
`;

export const ArchiveMeta = styled.p`
	font-size: 0.95rem;
	line-height: 1.7;
	color: var(--post-card-muted-text);
`;

export const ArchiveList = styled.ul`
	position: relative;
	padding: 0;
	margin: 0 auto;
	list-style: none;
	overflow-anchor: none;
	width: 100%;
	max-width: ${ARCHIVE_LIST_MAX_WIDTH};
`;

export const ArchiveRow = styled.li`
	list-style: none;

	&:not(:first-of-type) {
		margin-top: 2rem;
	}
`;

export const ArchiveRowGrid = styled.div<{ $columns: number }>`
	display: grid;
	gap: 2rem;
	width: 100%;
	justify-content: center;

	${({ $columns }) =>
		$columns === 1
			? css`
					grid-template-columns: minmax(18rem, 30rem);
				`
			: $columns === 2
				? css`
						grid-template-columns: repeat(2, minmax(18rem, 24rem));
					`
				: css`
						grid-template-columns: repeat(3, minmax(18rem, 24rem));
					`}
`;

export const ArchiveCardLink = styled(Link)`
	position: relative;
	display: flex;
	flex-direction: column;
	min-height: 100%;
	border-radius: 2rem;
	overflow: hidden;
	isolation: isolate;
	background:
		radial-gradient(
			circle at top right,
			color-mix(in oklch, var(--post-card-accent) 16%, transparent),
			transparent 42%
		),
		var(--post-card-surface-base);
	border: 1px solid var(--post-card-border);
	box-shadow: var(--shadow-elevation-low);
	transition:
		transform 240ms ease,
		box-shadow 240ms ease,
		border-color 240ms ease;

	&:hover {
		transform: translateY(-0.4rem);
		box-shadow: var(--shadow-elevation-high);
		border-color: color-mix(
			in oklch,
			var(--post-card-accent) 30%,
			var(--color-text) 8%
		);
	}

	html[data-color-theme="dark"] & {
		background:
			radial-gradient(
				circle at top right,
				color-mix(in oklch, var(--post-card-accent) 24%, transparent),
				transparent 46%
			),
			linear-gradient(
				180deg,
				color-mix(in oklch, white 2%, var(--post-card-surface-base) 98%),
				var(--post-card-surface-base)
			);
		box-shadow:
			0 1.25rem 2.25rem rgba(0, 0, 0, 0.42),
			inset 0 1px 0 rgba(255, 255, 255, 0.04);

		&:hover {
			box-shadow:
				0 2rem 3rem rgba(0, 0, 0, 0.55),
				0 0 0 1px
					color-mix(in oklch, var(--post-card-accent) 14%, transparent);
		}
	}
`;

export const ArchiveCardVisual = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 15rem;
	padding: 1.8rem;
	overflow: hidden;
	background:
		radial-gradient(
			circle at 14% 18%,
			color-mix(in oklch, white 16%, transparent),
			transparent 36%
		),
		linear-gradient(
			145deg,
			var(--post-card-visual-surface),
			color-mix(
				in oklch,
				var(--post-card-accent) 12%,
				white 88%
			)
		);

	html[data-color-theme="dark"] & {
		background:
			radial-gradient(
				circle at 14% 18%,
				color-mix(in oklch, var(--post-card-accent) 30%, transparent),
				transparent 36%
			),
			linear-gradient(
				145deg,
				var(--post-card-visual-surface),
				color-mix(
					in oklch,
					var(--post-card-accent) 18%,
					var(--post-card-surface-base) 82%
				)
			);
	}
`;

export const ArchiveCardVisualLayer = styled.span<{ $secondary?: boolean }>`
	position: absolute;
	width: ${({ $secondary }) => ($secondary ? "8.5rem" : "12rem")};
	height: ${({ $secondary }) => ($secondary ? "8.5rem" : "12rem")};
	border-radius: 999px;
	filter: blur(18px);
	opacity: ${({ $secondary }) => ($secondary ? 0.24 : 0.18)};
	background: color-mix(in oklch, var(--post-card-accent) 65%, transparent);
	transform: ${({ $secondary }) =>
		$secondary ? "translate(-45%, 38%)" : "translate(38%, -42%)"};

	html[data-color-theme="dark"] & {
		opacity: ${({ $secondary }) => ($secondary ? 0.3 : 0.24)};
	}
`;

export const ArchiveCardVisualFrame = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 9.5rem;
	height: 9.5rem;
	border-radius: 1.75rem;
	background:
		linear-gradient(
			155deg,
			color-mix(in oklch, white 84%, var(--post-card-accent) 16%),
			color-mix(in oklch, var(--post-card-accent) 24%, transparent)
		);
	box-shadow:
		0 1.4rem 2.4rem
			color-mix(in oklch, var(--post-card-accent) 18%, transparent),
		inset 0 1px 0 color-mix(in oklch, white 70%, transparent);
	color: color-mix(in oklch, var(--post-card-accent) 62%, black 38%);
	transform: rotate(-6deg);
	transition: transform 260ms ease;

	html[data-color-theme="dark"] & {
		border: 1px solid
			color-mix(in oklch, var(--post-card-accent) 30%, transparent);
		background:
			linear-gradient(
				155deg,
				color-mix(
					in oklch,
					var(--post-card-surface-base) 84%,
					var(--post-card-accent) 16%
				),
				color-mix(
					in oklch,
					var(--post-card-accent) 28%,
					var(--post-card-surface-base) 72%
				)
			);
		box-shadow:
			0 1.5rem 2.5rem
				color-mix(in oklch, var(--post-card-accent) 24%, transparent),
			inset 0 1px 0 rgba(255, 255, 255, 0.1);
		color: color-mix(in oklch, white 72%, var(--post-card-accent) 28%);
	}

	${ArchiveCardLink}:hover & {
		transform: rotate(0deg) scale(1.02);
	}
`;

export const ArchiveCardMedia = styled.div<{ $background?: string }>`
	position: absolute;
	inset: 0;
	z-index: 1;
	background: ${({ $background }) => $background ?? "transparent"};
`;

export const ArchiveCardImage = styled.img<{ $objectFit: "cover" | "contain" }>`
	display: block;
	width: 100%;
	height: 100%;
	object-fit: ${({ $objectFit }) => $objectFit};
`;

export const ArchiveCardContent = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 1.6rem 1.55rem 1.5rem;
	flex: 1;
`;

export const ArchiveCardMeta = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.35rem;
`;

export const ArchiveCardCategory = styled.span`
	font-size: 0.78rem;
	font-weight: 800;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: var(--post-card-accent);
`;

export const ArchiveCardDate = styled.time`
	font-size: 0.9rem;
	color: var(--post-card-subtle-text);
`;

export const ArchiveCardTitle = styled.h3`
	font-size: 1.55rem;
	font-weight: 800;
	line-height: 1.22;
	letter-spacing: -0.04em;
	color: var(--color-text);
	text-wrap: balance;

	${ArchiveCardLink}:hover & {
		color: color-mix(in oklch, var(--post-card-accent) 76%, var(--color-text) 24%);
	}
`;

export const ArchiveCardSummary = styled.p`
	font-size: 0.98rem;
	line-height: 1.72;
	color: var(--post-card-muted-text);
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
`;

export const ArchiveCardFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	margin-top: auto;
	padding-top: 1rem;
	border-top: 1px solid var(--post-card-border);
`;

export const ArchiveTagList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.45rem;
`;

export const ArchiveTag = styled.span`
	display: inline-flex;
	align-items: center;
	padding: 0.44rem 0.72rem;
	border-radius: 999px;
	background: var(--post-card-tag-bg);
	font-size: 0.76rem;
	font-weight: 700;
	color: var(--post-card-tag-text);
`;

export const ArchiveCardAction = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	font-size: 0.86rem;
	font-weight: 800;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	color: var(--post-card-accent);
	transition: transform 220ms ease;

	${ArchiveCardLink}:hover & {
		transform: translateX(0.2rem);
	}
`;

export const ArchiveEmptyState = styled.div`
	padding: 2rem 1.5rem;
	border-radius: 1.5rem;
	background: var(--post-card-surface-base);
	border: 1px solid var(--post-card-border);
	color: var(--post-card-muted-text);
`;
