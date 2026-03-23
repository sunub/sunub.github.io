import Link from "next/link";
import styled from "styled-components";
import { HeaderWaveUnderline } from "./HeaderWaveUnderline";

export const RootWrapper = styled.div`
  transition: all 350ms ease 0s;
  position: relative;
  z-index: 1;
  background: transparent;
  padding-top: 1rem;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 60px;
  max-width: 1100px;
  max-height: 60px;

  margin-left: auto;
  margin-right: auto;
  padding-left: 32px;
  padding-right: 32px;
  z-index: 1000;
`;

export const HeaderRightSideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  height: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

export const HeaderLeftSideWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: 2rem;
`;

export const HeaderLeftSideActionNav = styled.nav`
  display: flex;
  align-items: center;

  font-size: 1.25rem;
  line-height: 1;
`;

export const HeaderLeftSideActionLabel = styled.span`
  display: inline-flex;
  align-items: center;
`;

export const HeaderLeftSideActionWaveSlot = styled.span`
  pointer-events: none;
  position: absolute;
  inset-inline: 0;
  bottom: 0;
  height: 11px;
  overflow: visible;
`;

export const HeaderLeftSideActionWaveIcon = styled(HeaderWaveUnderline)`
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

export const HeaderLeftSideActionLink = styled(Link)`
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  min-width: max-content;
  padding: 0 0 0.55rem;
  color: var(--color-text);
  letter-spacing: -0.01em;
  line-height: 1;
  transition: color 200ms ease;

  &:is(:hover, :focus-visible) {
    color: var(--color-highlight);
  }

  &:is(:hover, :focus-visible) ${HeaderLeftSideActionWaveIcon} path {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  &:focus-visible {
    outline: 2px solid color-mix(in oklch, var(--color-highlight), white 24%);
    outline-offset: 6px;
  }
`;

export const NavigationWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media screen and (max-width: 768px) {
    display: none;
    opacity: 0;
  }
`;

export const NavigationItem = styled.li`
  position: relative;
  font-size: 24px;
  color: var(--color-navlink);
`;

export const PostNaviation = styled.div`
  /* display: flex;
  align-items: baseline; */
`;

export const ThemeWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    display: none;
    opacity: 0;
  }
`;
