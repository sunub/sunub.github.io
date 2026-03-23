import styled, { css, keyframes } from "styled-components";

const pulseRing = keyframes`
	0% {
		transform: scale(0.88);
		opacity: 0.42;
	}

	70% {
		transform: scale(1.18);
		opacity: 0;
	}

	100% {
		transform: scale(1.22);
		opacity: 0;
	}
`;

export const StatusItem = styled.li`
	list-style: none;
	margin: 2.75rem 0 0;
	padding: 0;
`;

export const StatusCard = styled.div<{ $mode: "loading" | "error" }>`
	display: flex;
	flex-direction: column;
	gap: 0.9rem;
	padding: ${({ $mode }) => ($mode === "error" ? "1.4rem 1.5rem" : "0.5rem 0")};
	border-radius: 1.5rem;
	align-items: ${({ $mode }) => ($mode === "error" ? "flex-start" : "center")};
	text-align: ${({ $mode }) => ($mode === "error" ? "left" : "center")};
	background: ${({ $mode }) =>
		$mode === "error"
			? "color-mix(in oklch, var(--color-highlight) 7%, var(--color-background))"
			: "transparent"};
	border: ${({ $mode }) =>
		$mode === "error"
			? "1px solid color-mix(in oklch, var(--color-highlight) 12%, transparent)"
			: "none"};
`;

export const StatusPulse = styled.div<{ $mode: "loading" | "error" }>`
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 3.25rem;
	height: 3.25rem;
	border-radius: 999px;
	background: ${({ $mode }) =>
		$mode === "error"
			? "color-mix(in oklch, var(--color-highlight) 16%, transparent)"
			: "color-mix(in oklch, var(--color-highlight) 18%, transparent)"};
	color: var(--color-highlight);
	box-shadow: var(--shadow-elevation-low);
`;

export const StatusPulseRing = styled.span`
	position: absolute;
	inset: 0;
	border-radius: inherit;
	background: color-mix(in oklch, var(--color-highlight) 26%, transparent);
	animation: ${pulseRing} 1.8s ease-out infinite;
`;

export const StatusCaption = styled.p`
	max-width: 28rem;
	font-size: 0.92rem;
	line-height: 1.65;
	font-weight: 600;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: color-mix(in oklch, var(--color-highlight) 84%, var(--color-text) 16%);
`;

export const StatusDetail = styled.p`
	font-size: 0.96rem;
	line-height: 1.65;
	color: color-mix(in oklch, var(--color-text) 72%, transparent);
`;

export const StatusButton = styled.button`
	padding: 0.72rem 1.05rem;
	border-radius: 999px;
	border: 1px solid color-mix(in oklch, var(--color-highlight) 18%, transparent);
	background: color-mix(in oklch, white 82%, var(--color-highlight) 18%);
	color: var(--color-text);
	font: inherit;
	font-weight: 700;
	cursor: pointer;
	transition:
		transform 180ms ease,
		box-shadow 180ms ease,
		border-color 180ms ease;

	&:hover {
		transform: translateY(-1px);
		box-shadow: var(--shadow-elevation-low);
		border-color: color-mix(
			in oklch,
			var(--color-highlight) 32%,
			transparent
		);
	}
`;

export const StatusIconSlot = styled.span<{ $mode: "loading" | "error" }>`
	position: relative;
	z-index: 1;
	display: inline-flex;
	align-items: center;
	justify-content: center;

	${({ $mode }) =>
		$mode === "loading"
			? css`
					animation: translateY 1.2s ease-in-out infinite;

					@keyframes translateY {
						0%,
						100% {
							transform: translateY(0);
						}

						50% {
							transform: translateY(2px);
						}
					}
				`
			: ""}
`;
