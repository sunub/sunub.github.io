"use client";

import styled from "styled-components";

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
  transition: opacity 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
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
    font-family: "Source Code Pro", monospace;
    flex-direction: column;
    text-wrap: pretty;
    word-break: break-all;
    padding: 2rem 1.5rem;
    font-size: 0.9rem;
    border-radius: 3rem;
  }
  pre {
    border-radius: 0.5rem;
    font-family: "Source Code Pro", monospace;
    border: 2px solid color-mix(in oklch, var(--color-bird) 30%, transparent);
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

export const InlineCodeStyle = styled.code`
  position: relative;
  top: -0.2rem;

  padding: 0 0.375rem;
  border-radius: 0.375rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  background-color: #f3f4f6;
  color: #4b5563;
  font-size: 0.875rem;
  font-family: "Source Code Pro", monospace;
  display: inline-block;

  @media (prefers-color-scheme: dark) {
    background-color: #4b5563;
    color: #e5e7eb;
  }
`;
