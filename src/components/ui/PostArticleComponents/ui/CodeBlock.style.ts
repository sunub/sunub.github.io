"use client";

import styled from "styled-components";

export const CodeBlockWrapper = styled.div`
  margin-bottom: 1.5rem;

  code {
    display: flex;
    flex-direction: column;
    text-wrap: pretty;
    word-break: break-all;
    padding: 2rem 1.5rem;
    font-size: 0.9rem;
    border-radius: 3rem;
  }
  pre {
    border-radius: 0.5rem;
    border: 2px solid color-mix(in oklch, var(--color-text) 20%, transparent);
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
  font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", Menlo,
    monospace;
  display: inline-block;

  @media (prefers-color-scheme: dark) {
    background-color: #4b5563;
    color: #e5e7eb;
  }
`;
