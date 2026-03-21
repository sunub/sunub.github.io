import Link from "next/link";
import styled, { css } from "styled-components";
import type { FreshChroniclesCardVariant } from "../types";

const wideCardMixin = css`
	@media (min-width: 920px) {
		grid-column: span 2;
		grid-template-columns: minmax(18rem, 0.92fr) minmax(0, 1.08fr);
		min-height: 28rem;
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
	gap: 0.5rem;
	padding-bottom: 1.5rem;
	border-bottom: 1px solid color-mix(in oklch, var(--color-text) 12%, transparent);
`;

export const SectionEyebrow = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.75rem;
	font-size: 0.8rem;
	font-weight: 700;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: var(--color-highlight);

	&::before {
		content: "";
		display: inline-block;
		width: 2.5rem;
		height: 1px;
		background: color-mix(
			in oklch,
			var(--color-highlight) 40%,
			transparent
		);
	}
`;

export const SectionTitle = styled.h2`
	font-size: clamp(2.4rem, 4vw, 3.6rem);
	font-family: var(--bariol-serif), var(--pretendard-font-regular), sans-serif;
	font-weight: 700;
	letter-spacing: -0.04em;
	color: var(--color-text);
`;

export const CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(1, minmax(0, 1fr));
	gap: 1.5rem;

	@media (min-width: 760px) {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}
`;

export const CardLink = styled(Link)<{ $variant: FreshChroniclesCardVariant }>`
	position: relative;
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	min-height: 100%;
	border-radius: 2rem;
	overflow: hidden;
	isolation: isolate;
	background:
		radial-gradient(
			circle at top right,
			color-mix(in oklch, var(--fresh-chronicles-accent) 18%, transparent),
			transparent 45%
		),
		var(--fresh-chronicles-surface);
	border: 1px solid color-mix(in oklch, var(--color-text) 10%, transparent);
	box-shadow: var(--shadow-elevation-low);
	transition:
		transform 260ms ease,
		border-color 260ms ease,
		box-shadow 260ms ease;

	&:hover {
		transform: translateY(-0.35rem);
		border-color: color-mix(
			in oklch,
			var(--fresh-chronicles-accent) 28%,
			var(--color-text) 10%
		);
		box-shadow: var(--shadow-elevation-high);
	}

	${({ $variant }) => ($variant === "wide" ? wideCardMixin : "")}
`;

export const CardVisual = styled.div<{ $variant: FreshChroniclesCardVariant }>`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 2rem;
	overflow: hidden;
	background:
		radial-gradient(
			circle at 16% 16%,
			color-mix(in oklch, var(--fresh-chronicles-accent) 22%, transparent),
			transparent 35%
		),
		linear-gradient(
			145deg,
			var(--fresh-chronicles-visual-surface),
			color-mix(
				in oklch,
				var(--fresh-chronicles-accent) 7%,
				var(--fresh-chronicles-surface)
			)
		);
	min-height: ${({ $variant }) => ($variant === "wide" ? "18rem" : "15rem")};

	@media (min-width: 920px) {
		min-height: ${({ $variant }) => ($variant === "wide" ? "100%" : "15rem")};
	}
`;

export const CardVisualOrb = styled.span<{ $secondary?: boolean }>`
	position: absolute;
	width: ${({ $secondary }) => ($secondary ? "10rem" : "15rem")};
	height: ${({ $secondary }) => ($secondary ? "10rem" : "15rem")};
	border-radius: 999px;
	filter: blur(18px);
	opacity: ${({ $secondary }) => ($secondary ? 0.22 : 0.18)};
	background: color-mix(in oklch, var(--fresh-chronicles-accent) 65%, transparent);
	transform: ${({ $secondary }) =>
		$secondary ? "translate(-40%, 35%)" : "translate(40%, -35%)"};
`;

export const CardVisualFrame = styled.div<{
	$variant: FreshChroniclesCardVariant;
}>`
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	width: ${({ $variant }) => ($variant === "wide" ? "16rem" : "10rem")};
	height: ${({ $variant }) => ($variant === "wide" ? "16rem" : "10rem")};
	border-radius: ${({ $variant }) => ($variant === "wide" ? "2rem" : "1.5rem")};
	background:
		linear-gradient(
			155deg,
			color-mix(
				in oklch,
				white 84%,
				var(--fresh-chronicles-accent) 16%
			),
			color-mix(
				in oklch,
				var(--fresh-chronicles-accent) 24%,
				transparent
			)
		);
	box-shadow:
		0 1.5rem 2.5rem
			color-mix(in oklch, var(--fresh-chronicles-accent) 18%, transparent),
		inset 0 1px 0 color-mix(in oklch, white 70%, transparent);
	color: color-mix(
		in oklch,
		var(--fresh-chronicles-accent) 62%,
		black 38%
	);
	transform: rotate(-6deg);
	transition: transform 300ms ease;

	${CardLink}:hover & {
		transform: rotate(0deg) scale(1.02);
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
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: ${({ $variant }) =>
		$variant === "wide" ? "2rem 2rem 1.8rem" : "1.75rem"};
`;

export const CardBadge = styled.span`
	position: absolute;
	top: 1.5rem;
	right: 1.5rem;
	display: inline-flex;
	align-items: center;
	gap: 0.45rem;
	padding: 0.45rem 0.8rem;
	border-radius: 999px;
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	background: color-mix(
		in oklch,
		var(--fresh-chronicles-accent) 12%,
		white 88%
	);
	color: color-mix(
		in oklch,
		var(--fresh-chronicles-accent) 70%,
		black 30%
	);
	border: 1px solid
		color-mix(in oklch, var(--fresh-chronicles-accent) 18%, transparent);

	&::before {
		content: "";
		display: inline-block;
		width: 0.45rem;
		height: 0.45rem;
		border-radius: 999px;
		background: var(--fresh-chronicles-accent);
	}
`;

export const CardMeta = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.35rem;
	padding-right: 5rem;
`;

export const CardEyebrow = styled.span`
	font-size: 0.8rem;
	font-weight: 700;
	letter-spacing: 0.06em;
	color: var(--fresh-chronicles-accent);
	text-transform: uppercase;
`;

export const CardDate = styled.time`
	font-size: 0.9rem;
	color: color-mix(in oklch, var(--color-text) 58%, transparent);
`;

export const CardTitle = styled.h3<{ $variant: FreshChroniclesCardVariant }>`
	font-size: ${({ $variant }) => ($variant === "wide" ? "2rem" : "1.5rem")};
	font-weight: 800;
	line-height: 1.2;
	letter-spacing: -0.04em;
	color: var(--color-text);

	@media (min-width: 920px) {
		font-size: ${({ $variant }) => ($variant === "wide" ? "2.6rem" : "1.65rem")};
	}
`;

export const CardSummary = styled.p<{ $variant: FreshChroniclesCardVariant }>`
	color: color-mix(in oklch, var(--color-text) 72%, transparent);
	font-size: ${({ $variant }) => ($variant === "wide" ? "1.05rem" : "0.98rem")};
	line-height: 1.75;
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: ${({ $variant }) => ($variant === "wide" ? 4 : 3)};
`;

export const CardFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
	margin-top: auto;
	padding-top: 1.15rem;
	border-top: 1px solid color-mix(in oklch, var(--color-text) 10%, transparent);
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
	background: color-mix(in oklch, var(--color-text) 4%, transparent);
	color: color-mix(in oklch, var(--color-text) 72%, transparent);
`;

export const CardAction = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.45rem;
	font-size: 0.9rem;
	font-weight: 700;
	color: var(--fresh-chronicles-accent);
`;
