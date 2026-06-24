import Link from "next/link";
import styled from "styled-components";
import { WaveUnderline } from "../WaveUnderline/WaveUnderline";

export const WaveIcon = styled(WaveUnderline)`
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  stroke: var(--color-text);
  stroke-linecap: round;

  path {
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    opacity: 0.56;
    vector-effect: non-scaling-stroke;
    transition:
      stroke-dashoffset 350ms cubic-bezier(0.8, 1, 0.7, 1),
      opacity 220ms ease;
    stroke: color-mix(in oklch, var(--color-highlight) 72%, transparent);
  }
`;

export const Anchor = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: center;
  min-width: max-content;
  color: var(--color-text);
  letter-spacing: -0.01em;
  line-height: 1;
  transition: color 200ms ease;

  &:is(:hover, :focus-visible) {
    color: var(--color-highlight);
  }

  &:is(:hover, :focus-visible) ${WaveIcon} path {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid color-mix(in oklch, var(--color-highlight), white 24%);
    outline-offset: 6px;
  }
`;

export const Label = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const WaveSlot = styled.span`
  pointer-events: none;
  position: absolute;
  inset-inline: 0;
  bottom: -0.5rem;
  height: 11px;
  overflow: visible;
`;
