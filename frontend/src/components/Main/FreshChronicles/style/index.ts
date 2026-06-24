import Link from "next/link";
import styled, { css } from "styled-components";
import type { FreshChroniclesCardVariant } from "../types";

const disappearCss = css`
  @media (max-width: 320px) {
    display: none;
  }
`;

const wideCardMixin = css`
  @media (min-width: 920px) {
    grid-column: span 2;
		grid-template-columns: minmax(18rem, 0.78fr) minmax(0, 1fr);
		align-items: center;
		padding: 2.25rem 2.4rem;
		column-gap: 2.25rem;
		min-height: 26rem;
  }
`;

export const SectionRoot = styled.section`
	display: flex;
	flex-direction: column;
	gap: 2rem;
`;

export const SectionHeader = styled.header`
	display: flex;
	flex-direction: column;
	padding-bottom: 1.5rem;
	border-bottom: 1px solid var(--section-header-border);
`;

export const SectionEyebrow = styled.span`
	display: inline-flex;
	align-items: center;
  gap: 0.7rem;
	font-size: 0.7rem;
	font-weight: 700;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: var(--color-highlight);

	&::before {
		content: "";
		display: inline-block;
		width: .5rem;
		height: 2px;
		background: var(--section-eyebrow-accent);
	}
`;

export const SectionTitle = styled.h2`
	font-size: clamp(1.5rem, 2.5vw, 2.6rem);
	font-family: var(--bariol-serif), var(--pretendard-font-regular), sans-serif;
	font-weight: 700;
	letter-spacing: -0.04em;
	color: var(--color-text);
`;

export const CardGrid = styled.div`
	display: grid;
	grid-template-columns: var(--fresh-chronicles-card-template-columns);
	gap: 1.5rem;

	@media (min-width: 760px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

export const CardLink = styled(Link)<{
	$variant: FreshChroniclesCardVariant;
}>`
	position: relative;
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 1.5rem;
	min-height: 100%;
	padding: 1.45rem;
	border-radius: clamp(2rem, 5vw, 3.6rem);
	overflow: hidden;
	isolation: isolate;
	background: var(--post-card-bg-gradient);
	border: 1px solid var(--post-card-border);
	box-shadow:
		0 0.45rem 1.05rem rgba(15, 23, 42, 0.07),
		0 0.12rem 0.35rem rgba(15, 23, 42, 0.05);
	backdrop-filter: blur(18px);
	transition:
		transform 260ms ease,
		background 260ms ease,
		border-color 260ms ease,
		box-shadow 260ms ease;

	&::before {
		content: "";
		position: absolute;
		inset: 0 auto 0 0;
		width: clamp(0.5rem, 1.2vw, 0.8rem);
		background: var(--post-card-surface-base);
		border-top-left-radius: inherit;
		border-bottom-left-radius: inherit;
		pointer-events: none;
	}

	&:hover {
		transform: translateY(-0.45rem);
		border-color: var(--post-card-hover-border);
		background: var(--post-card-bg-gradient-hover), var(--post-card-surface-base);
		box-shadow:
			0 0.8rem 1.6rem rgba(15, 23, 42, 0.1),
			0 0.18rem 0.45rem rgba(15, 23, 42, 0.06);
	}

	${({ $variant }) => ($variant === "wide" ? wideCardMixin : "")}
`;

export const CardVisual = styled.div<{ $variant: FreshChroniclesCardVariant }>`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	max-width: ${({ $variant }) => ($variant === "wide" ? "24rem" : "100%")};
	min-width: 0;
	margin-inline: auto;
	overflow: hidden;
	aspect-ratio: 4 / 3;
	border-radius: 42% 58% 48% 52% / 38% 38% 62% 62%;
	border: 0.3rem solid var(--post-card-visual-border);
	background: var(--post-card-visual-gradient);
	box-shadow:
		0 1.3rem 2.6rem var(--post-card-visual-shadow-color),
		0 1rem 2rem rgba(15, 23, 42, 0.14);
	transition:
		transform 320ms ease,
		box-shadow 320ms ease,
		border-color 320ms ease;

	${CardLink}:hover & {
		transform: translateY(-0.15rem) scale(1.01);
		box-shadow:
			0 1.8rem 3rem var(--post-card-frame-shadow),
			0 1.2rem 2.4rem rgba(15, 23, 42, 0.2);
	}

	@media (min-width: 920px) {
		justify-self: ${({ $variant }) => ($variant === "wide" ? "start" : "stretch")};
		max-width: ${({ $variant }) => ($variant === "wide" ? "100%" : "100%")};
	}
`;

export const CardVisualOrb = styled.span<{ $secondary?: boolean }>`
	position: absolute;
	width: ${({ $secondary }) => ($secondary ? "10rem" : "15rem")};
	height: ${({ $secondary }) => ($secondary ? "10rem" : "15rem")};
	border-radius: 999px;
	filter: blur(18px);
	opacity: ${({ $secondary }) => ($secondary ? 0.2 : 0.16)};
	background: var(--post-card-orb-bg);
	transform: ${({ $secondary }) =>
		$secondary ? "translate(-40%, 35%)" : "translate(40%, -35%)"};

	html[data-color-theme="dark"] & {
		opacity: ${({ $secondary }) => ($secondary ? 0.24 : 0.2)};
	}
`;

export const CardVisualFrame = styled.div<{
	$variant: FreshChroniclesCardVariant;
}>`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${({ $variant }) => ($variant === "wide" ? "11rem" : "8.25rem")};
	height: ${({ $variant }) => ($variant === "wide" ? "11rem" : "8.25rem")};
	border-radius: ${({ $variant }) => ($variant === "wide" ? "2.25rem" : "1.75rem")};
	background: var(--post-card-frame-bg);
	border: 1px solid var(--post-card-border);
	box-shadow:
		0 1.5rem 2.5rem var(--post-card-frame-shadow),
		inset 0 1px 0 var(--post-card-frame-inset-shadow);
	color: var(--post-card-frame-color);
	transform: rotate(-4deg);
	transition: transform 300ms ease;

	${CardLink}:hover & {
		transform: rotate(0deg) scale(1.04);
	}
`;

export const CardVisualMedia = styled.div`
	position: absolute;
	inset: 0;
	z-index: 1;
	display: flex;
	align-items: stretch;
	justify-content: stretch;
	overflow: hidden;
	border-radius: inherit;

	& > * {
		width: 100%;
		height: 100%;
	}

	& img {
		display: block;
		object-fit: cover;
	}
`;

export const CardContent = styled.div<{ $variant: FreshChroniclesCardVariant }>`
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	gap: ${({ $variant }) => ($variant === "wide" ? "1rem" : "0.9rem")};
	padding: ${({ $variant }) =>
		$variant === "wide" ? "0.2rem 0.15rem 0.25rem" : "0 0.15rem 0.15rem"};
	min-width: 0;
	justify-content: center;
`;

export const CardBadge = styled.span`
	position: static;
	display: inline-flex;
	align-items: center;
	gap: 0.45rem;
	padding: 0.45rem 0.8rem;
	border-radius: 999px;
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	width: fit-content;
	background: var(--post-card-badge-bg);
	color: var(--post-card-badge-color);
	border: 1px solid var(--post-card-badge-border);

	&::before {
		content: "";
		display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 999px;
		background: var(--post-card-accent);
	}
`;

export const CardMeta = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	padding-right: 0;
`;

export const CardMetaRow = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.65rem 0.9rem;
`;

export const CardEyebrow = styled.span`
	font-size: 0.8rem;
	font-weight: 700;
	letter-spacing: 0.06em;
	color: var(--post-card-accent);
	text-transform: uppercase;
	opacity: 0.92;
  ${disappearCss}
`;

export const CardDate = styled.time`
	font-size: clamp(0.25rem, 4dvw, 0.9rem);
	color: var(--post-card-subtle-text);
`;

export const CardTitle = styled.h3<{ $variant: FreshChroniclesCardVariant }>`
	font-size: clamp(1.25rem, 5dvw ,2.25rem);
	font-weight: 800;
	line-height: 1.14;
	letter-spacing: -0.04em;
	color: var(--color-text);
	text-wrap: pretty;

	${CardLink}:hover & {
		color: var(--post-card-title-hover-color);
	}

	@media (min-width: 920px) {
		font-size: ${({ $variant }) => ($variant === "wide" ? "2.9rem" : "1.85rem")};
	}
`;

export const CardSummary = styled.p<{ $variant: FreshChroniclesCardVariant }>`
	color: var(--post-card-muted-text);
	font-size: ${({ $variant }) => ($variant === "wide" ? "1.05rem" : "0.98rem")};
	line-height: 1.72;
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${({ $variant }) => ($variant === "wide" ? 4 : 3)};
  ${disappearCss}
`;

export const CardFooter = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	margin-top: auto;
	padding-top: 0.45rem;
  ${disappearCss}
`;

export const TagList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
`;

export const TagItem = styled.span`
	display: inline-flex;
	align-items: center;
	padding: 0.45rem 0.75rem;
	border-radius: 999px;
	font-size: 0.8rem;
	font-weight: 600;
	background: var(--post-card-tag-bg);
	color: var(--post-card-tag-text);
`;

export const CardAction = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.7rem;
	font-size: 0.9rem;
	font-weight: 800;
	color: var(--post-card-accent);
	width: fit-content;
	padding-bottom: 0.2rem;
	border-bottom: 2px solid transparent;
	transition:
		gap 220ms ease,
		border-color 220ms ease,
		transform 220ms ease;

	${CardLink}:hover & {
		gap: 0.95rem;
		border-color: currentColor;
	}
`;

export const ArchiveCardLink = styled(Link)`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 25rem;
	padding: 2rem;
	border-radius: 2rem;
	overflow: hidden;
	isolation: isolate;
	background: var(--archive-card-bg-gradient), var(--post-card-surface-strong);
	border: 1px solid var(--post-card-border);
	box-shadow: var(--shadow-elevation-low);
	transition:
		transform 260ms ease,
		border-color 260ms ease,
		box-shadow 260ms ease;

	&:hover {
		transform: translateY(-0.35rem);
		border-color: var(--archive-card-hover-border);
		box-shadow: var(--shadow-elevation-high);
	}
`;

export const ArchiveCardOverlay = styled.div`
	position: absolute;
	inset: 0;
	background: var(--archive-card-gradient-base);
	opacity: 0.72;

	html[data-color-theme="dark"] & {
		opacity: 1;
	}
`;

export const ArchiveCardInner = styled.div`
	position: relative;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1.4rem;
	text-align: center;
	max-width: 15rem;
`;

export const ArchiveCardIconFrame = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 6rem;
	height: 6rem;
	border-radius: 999px;
	background: var(--post-card-icon-surface);
	border: 1px solid var(--post-card-border);
	box-shadow:
		0 1.5rem 2.5rem var(--archive-card-icon-shadow),
		inset 0 1px 0 var(--archive-card-icon-inset-shadow);
	color: var(--post-card-icon-text);
	transition:
		transform 300ms ease,
		color 260ms ease;

	${ArchiveCardLink}:hover & {
		transform: scale(1.08);
		color: var(--color-highlight);
	}
`;

export const ArchiveCardTitle = styled.h3`
	font-size: clamp(1.8rem, 3vw, 2.2rem);
	font-weight: 800;
	line-height: 1.2;
	letter-spacing: -0.04em;
	color: var(--color-text);
`;

export const ArchiveCardDescription = styled.p`
	font-size: 0.95rem;
	line-height: 1.75;
	color: var(--post-card-muted-text);
`;

export const ArchiveCardAction = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	font-size: 0.95rem;
	font-weight: 700;
	color: var(--color-highlight);
	transition: gap 220ms ease;

	${ArchiveCardLink}:hover & {
		gap: 0.75rem;
	}
`;
