import styled from "styled-components";

export const ArchiveHero = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	margin: 2.5rem auto 0;
	padding: 0 2rem;
	max-width: 58rem;
	text-align: center;
`;

export const ArchiveEyebrow = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.7rem;
	font-size: 0.82rem;
	font-weight: 800;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--color-highlight);

	&::before,
	&::after {
		content: "";
		display: inline-block;
		width: 2.2rem;
		height: 1px;
		background: color-mix(
			in oklch,
			var(--color-highlight) 36%,
			transparent
		);
	}
`;

export const ArchiveTitle = styled.h1`
	width: 100%;
  max-width: 1000px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 3rem;
  margin-left: auto;
  margin-right: auto;
`;

export const ArchiveTitleAccent = styled.span`
	font-weight: bold;
  color: color-mix(in oklch, var(--color-bird), var(--color-text) 30%);
  font-size: 3rem;
  font-family: var(--crafty-girls-font);
`;

export const ArchiveDescription = styled.p`
	max-width: 42rem;
	font-size: 1.04rem;
	line-height: 1.85;
	color: color-mix(in oklch, var(--color-text) 72%, transparent);
`;

export const ArchivePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--color-background);
`;

export const ArchivePageRoot = styled.main`
	position: relative;
	width: 100%;
	max-width: none;
	margin: 0;
	padding: 0 clamp(1.25rem, 3.5vw, 3rem) 6rem;
	box-sizing: border-box;

  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;

  padding-left: 48px;
  padding-right: 48px;

	@media (max-width: 720px) {
		padding-left: 1.25rem;
		padding-right: 1.25rem;
	}
`;
