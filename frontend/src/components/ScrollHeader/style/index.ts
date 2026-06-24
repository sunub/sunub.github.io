import styled from "styled-components";

export const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  overflow: hidden;
  isolation: isolate;
  margin-top: 1rem;
  transition:
    background-color 220ms ease-in-out,
    box-shadow 220ms ease-in-out,
    border-color 220ms ease-in-out;

  & > * {
    position: relative;
    z-index: 1;
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: color-mix(in oklch, var(--color-elevation) 72%, transparent);
    -webkit-backdrop-filter: blur(14px) saturate(145%);
    backdrop-filter: blur(14px) saturate(145%);
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    pointer-events: none;
  }

  background-color: transparent;
  border-bottom: 1px solid transparent;

  &[data-is-scrolled='true']::before {
    opacity: 1;
  }

  &[data-is-scrolled='true'] {
    border-bottom-color: color-mix(in oklch, var(--color-text) 10%, transparent);
    box-shadow: 0 10px 24px color-mix(in oklch, var(--color-highlight) 12%, transparent);
  }

  html[data-color-theme='dark'] &::before {
    background: color-mix(in oklch, var(--color-background) 70%, transparent);
  }

  html[data-color-theme='dark'] &[data-is-scrolled='true'] {
    border-bottom-color: color-mix(in oklch, white 12%, transparent);
    box-shadow: 0 10px 30px color-mix(in oklch, black 32%, transparent);
  }

`;
