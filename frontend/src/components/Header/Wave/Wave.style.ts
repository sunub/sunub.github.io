import Image from "next/image";
import styled from "styled-components";

export const WaveWrapper = styled.div`
  display: grid;
  grid: [wave-image] 1fr / [wave-image] 1fr;
  position: relative;
  overflow: hidden;
  left: 0px;
  right: 0px;
  width: 100%;
  transform: translateY(1px);
  z-index: 3;
  user-select: none;
  pointer-events: none;
`;

export const WaveFloatingTitleAnchor = styled.div`
  position: absolute;
  inset-inline: 0;
  bottom: clamp(2.4rem, 6vw, 4rem);
  z-index: 2;
  display: flex;
  justify-content: center;
  padding-inline: 1rem;
`;

export const WaveFloatingTitleTrack = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  max-width: min(100%, 40rem);
  row-gap: 0.4rem;
  column-gap: clamp(0.42rem, 1vw, 0.72rem);
  user-select: none;

  @media screen and (max-width: 768px) {
    row-gap: 0.3rem;
    column-gap: clamp(0.24rem, 0.8vw, 0.4rem);
  }
`;

export const WaveFloatingTitleLetterWrapper = styled.div<{
	$hasWordGap?: boolean;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: clamp(1.05rem, 0.85rem + 0.8vw, 1.65rem);
  padding: 0.28rem clamp(0.18rem, 0.14rem + 0.35vw, 0.4rem) 0.46rem;
  margin-inline-end: ${({ $hasWordGap }) =>
		$hasWordGap ? "clamp(0.9rem, 2vw, 1.5rem)" : "0"};
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    color-mix(in oklch, var(--color-frontWave) 74%, transparent) 0%,
    color-mix(in oklch, var(--color-frontWave) 26%, transparent) 100%
  );
  box-shadow:
    0 0.9rem 1.8rem color-mix(in oklch, var(--color-highlight) 10%, transparent),
    inset 0 1px 0 color-mix(in oklch, white 20%, transparent);
  backdrop-filter: blur(12px);
  transform-origin: center 75%;

  &::after {
    content: "";
    position: absolute;
    inset-inline: 24%;
    bottom: 0.28rem;
    height: 1px;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      transparent,
      color-mix(in oklch, var(--color-highlight) 48%, transparent),
      transparent
    );
    opacity: 0.7;
  }

  @media screen and (max-width: 768px) {
    min-width: 0.95rem;
    padding: 0.22rem 0.16rem 0.4rem;
  }
`;

export const WaveFloatingTitleLetter = styled.span`
  position: relative;
  display: inline-block;
  font-family: var(--bariol-serif), var(--pretendard-font-regular), sans-serif;
  font-size: clamp(0.72rem, 0.5rem + 1vw, 1.35rem);
  font-weight: 700;
  line-height: 1;
  color: color-mix(in oklch, var(--color-highlight) 76%, var(--color-text) 24%);
  text-shadow:
    0 0.4rem 1rem color-mix(in oklch, var(--color-highlight) 16%, transparent),
    0 1px 0 color-mix(in oklch, var(--color-frontWave) 72%, transparent);
  will-change: transform;

  @media screen and (max-width: 768px) {
    font-size: clamp(0.68rem, 0.54rem + 0.74vw, 1rem);
  }
`;

export const WaveImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  transform: translateY(20px);
`;

export const WaveSvgWrapper = styled.div`
  grid-area: wave-image;

  position: sticky;
  display: grid;
  align-items: flex-end;
`;

export const WaveBirdSvgWrapper = styled.div`
  grid-area: wave-image;
  display: grid;
  align-items: flex-end;
`;

export const WaveSvg = styled.svg`
  position: relative;
  left: -3%;
  right: -3%;
  bottom: 0em;
  min-width: 600px;
  max-width: unset;
  width: 106%;
`;

export const WaveBirdSvg = styled.svg`
  grid-area: wave-image;
  min-width: 600px;
  max-width: unset;
  width: 106%;
`;

export const WaveBirdMirroredSvg = styled.svg`
  position: absolute;
  bottom: 0.75em;
  min-width: 600px;
  max-width: unset;
  opacity: 0.4;
  filter: blur(3.75px);
  transform: scaleY(-1) translateY(-80%) scaleY(0.3);
`;

export const WaveBirdWrapper = styled.div``;
