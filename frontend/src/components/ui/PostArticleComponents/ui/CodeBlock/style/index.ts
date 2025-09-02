'use client';

import styled from 'styled-components';

export const ClipboardButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;

  aspect-ratio: 1;
  border-radius: 8px;

  display: grid;
  place-items: center;
  background: transparent;
  color: var(--color-bird);
  border: 2px solid color-mix(in oklch, var(--color-bird) 20%, transparent);
  opacity: 0;
  transition:
    opacity 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out,
    transform 0.2s ease-in-out;
  will-change: opacity, box-shadow, transform;

  &:hover {
    box-shadow: 0 4px 6px var(--color-bird);
    transform: scale(0.95);
  }
  &:active {
    box-shadow: 0 2px 4px var(--color-bird);
    & > svg {
      transition: transform 0.2s ease-in-out;
      transform: scale(0.75);
    }
  }
`;

export const CodeBlockWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  font-weight: 700;

  &:hover ${ClipboardButton} {
    opacity: 1;
  }

  code {
    display: flex;
    font-family: 'Source Code Pro', monospace;
    flex-direction: column;
    text-wrap: pretty;
    word-break: break-all;
    padding: 2rem 1.5rem;
    font-size: 0.9rem;
    border-radius: 3rem;
  }
  pre {
    border-radius: 0.5rem;
    font-family:
      DM Mono,
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Monaco,
      Consolas,
      Liberation Mono,
      Courier New,
      monospace;
    border: 2px solid color-mix(in oklch, var(--color-bird) 30%, transparent);
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

export const InlineCodeStyle = styled.code`
  position: relative;
  top: -0.2rem;

  padding: 0 0.375rem;
  border-radius: 0.25rem;

  margin: -0.2em 0;
  padding: 0.2em 0.3em;

  background-color: light-dark(
    color-mix(in oklch, var(--color-background) 10%, oklch(0.738 0 0) 10%),
    oklch(0.738 0 0 / 15%)
  );
  color: var(--color-text);
  font-size: 0.92em;
  font-weight: 500;
  font-family:
    DM Mono,
    ui-monospace,
    SFMono-Regular,
    Menlo,
    Monaco,
    Consolas,
    Liberation Mono,
    Courier New,
    monospace;
  display: inline-block;
`;
